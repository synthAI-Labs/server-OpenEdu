import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DashboardDto, UserSettingsDto } from './dto';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) { }

  /**
   * Validates the token and user ID.
   * @param token - The token to validate.
   * @param userId - The user ID to validate.
   * @returns BadRequestException if the token or user ID is invalid.
   */
  private async validateTokenAndUserId(
    token: string,
    userId: string,
  ): Promise<boolean> {
    if (
      !token ||
      token.trim() === '' ||
      userId === 'undefined' ||
      userId === 'null' ||
      userId.trim() === ''
    ) {
      return false;
    }

    let id: number;

    try {
      id = parseInt(userId);
    } catch (error) {
      return false;
    } finally {
      const verifiedUser = await this.verifyUser(id);

      if (!verifiedUser) {
        return false;
      }
    }
    return true;
  }

  /**
   * Verifies if a user is verified based on their user ID.
   * @param userId - The ID of the user to verify.
   * @returns ForbiddenException if the user is not verified.
   */
  async verifyUser(userId: number): Promise<boolean> {
    try {
      const userVerified = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          emailVerified: true,
        },
      });

      if (!userVerified) {
        return false;
      }

      return true;
    } catch (error) { }
  }

  /**
   * Retrieves the public profile of a user.
   * @param profileId - The ID of the user's profile.
   * @returns The public profile of the user, including their ID, name, email, bio, photo, interests, username, and settings.
   * @returns NotFoundException if the user is not found.
   */
  async getPublicProfile(profileId: string) {
    let id: number;

    try {
      id = parseInt(profileId);
    } catch (error) {
      throw new BadRequestException('Invalid profile ID');
    }

    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });

      if (!user) {
        throw new NotFoundException(`User not Found`);
      }

      const userSettings = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
        include: {
          settings: true,
          achievements: true,
          CourseEnrollment: true,
        },
      });

      if (!userSettings.settings.publicProfile) {
        return 'Profile is private';
      }

      const profile = {
        id: user.id,
        name: userSettings.settings.publicName ? user.name : null,
        email: userSettings.settings.publicEmail ? user.email : null,
        bio: userSettings.settings.publicBio ? user.bio : null,
        photo: userSettings.settings.publicPhoto ? user.photo : null,
        interests: userSettings.settings.publicInterests
          ? user.interests
          : null,
        username: user.username,
        settings: userSettings.settings,
        achievements: userSettings.achievements,
        CourseEnrollment: userSettings.CourseEnrollment,
      };

      return profile;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves the status of the authentication service.
   * @returns A string indicating the status of the authentication service.
   */
  getStatus() {
    return 'Auth service is up';
  }

  /**
   * Retrieves the user profile.
   * @param token - The user token.
   * @param userId - The user ID.
   * @returns The user profile.
   * @returns NotFoundException if the user is not found.
   */
  async getProfile(token: string, userId: string) {
    try {
      const verifiedUser = await this.validateTokenAndUserId(token, userId);

      if (!verifiedUser) {
        throw new BadRequestException('Invalid token or user ID');
      }

      const user = await this.prisma.user.findUnique({
        where: {
          token: token,
          id: parseInt(userId),
        },
        include: {
          achievements: true,
          CourseEnrollment: true,
          settings: true,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Updates the user profile.
   * @param token - The user token.
   * @param userId - The user ID.
   * @param dto - The dashboard DTO containing the updated profile information.
   * @returns The updated user profile.
   * @returns NotFoundException if the user is not found.
   */
  async updateProfile(token: string, userId: string, dto: DashboardDto) {
    try {
      const verifiedUser = await this.validateTokenAndUserId(token, userId);

      if (!verifiedUser) {
        throw new BadRequestException('Invalid token or user ID');
      }

      const user = await this.prisma.user.findUnique({
        where: {
          id: parseInt(userId),
          token: token,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found, invalid token');
      }

      const updatedUser = await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          name: dto.name,
          bio: dto.bio,
          photo: dto.photo,
          email: dto.email,
          username: dto.username,
          interests: dto.interests,
        },
        include: {
          achievements: true,
          CourseEnrollment: true,
          settings: true,
        },
      });

      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Updates the user settings.
   * @param token - The user token.
   * @param userId - The user ID.
   * @param dto - The user settings DTO containing the updated settings information.
   * @returns The updated user settings.
   * @returns NotFoundException if the user is not found.
   */
  async updateSettings(token: string, userId: string, dto: UserSettingsDto) {
    try {
      const verifiedUser = await this.validateTokenAndUserId(token, userId);

      if (!verifiedUser) {
        throw new BadRequestException('Invalid token or user ID');
      }

      const updatedSettings = await this.prisma.userSettings.update({
        where: {
          id: parseInt(userId),
        },
        data: {
          publicProfile: dto.publicProfile,
          publicEmail: dto.publicEmail,
          publicBio: dto.publicBio,
          publicPhoto: dto.publicPhoto,
          publicName: dto.publicName,
          publicInterests: dto.publicInterests,
        },
      });

      return updatedSettings;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves the user achievements.
   * @param token - The user token.
   * @param userId - The user ID.
   * @returns The user achievements.
   * @returns NotFoundException if the user is not found.
   */
  async getAchievements(token: string, userId: string) {
    try {
      const verifiedUser = await this.validateTokenAndUserId(token, userId);

      if (!verifiedUser) {
        throw new BadRequestException('Invalid token or user ID');
      }

      const user = await this.prisma.user.findUnique({
        where: {
          id: parseInt(userId),
          token: token,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found, invalid token');
      }

      const userAchievements = await this.prisma.user.findMany({
        where: {
          id: parseInt(userId),
        },
        include: {
          achievements: {
            include: {},
          },
        },
      });

      return userAchievements;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Claims an achievement for the user.
   * @param token - The user token.
   * @param userId - The user ID.
   * @param achievementId - The ID of the achievement to claim.
   * @returns The updated user profile.
   * @returns NotFoundException if the user or achievement is not found.
   * @returns ConflictException if the achievement is already claimed by the user.
   */
  async claimAchievement(token: string, userId: string, achievementId: string) {
    try {
      const verifiedUser = this.validateTokenAndUserId(token, userId);

      if (!verifiedUser) {
        throw new BadRequestException('Invalid token or user ID');
      }

      const user = await this.prisma.user.findUnique({
        where: {
          id: parseInt(userId),
          token: token,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found, invalid token');
      }

      const achievement = await this.prisma.achievement.findUnique({
        where: {
          id: parseInt(achievementId),
        },
      });

      if (!achievement) {
        throw new NotFoundException('Achievement not found');
      }

      const alreadyClaimed = await this.prisma.user.findUnique({
        where: {
          id: parseInt(userId),
        },
        select: {
          achievements: true,
        },
      });

      if (
        alreadyClaimed.achievements.some(
          (ach) => ach.id === parseInt(achievementId),
        )
      ) {
        throw new ConflictException('Achievement already claimed');
      }

      const updatedUser = await this.prisma.user.update({
        where: {
          id: parseInt(userId),
        },
        data: {
          achievements: {
            connect: {
              id: parseInt(achievementId),
            },
          },
        },
        include: {
          achievements: true,
        },
      });

      return updatedUser;
    } catch (error) {
      throw error;
    }
  }
}
