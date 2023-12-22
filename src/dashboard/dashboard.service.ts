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
  constructor(private prisma: PrismaService) {}

  /**
   * Validates the token and user ID.
   * @param token - The token to validate.
   * @param userId - The user ID to validate.
   * @throws BadRequestException if the token or user ID is invalid.
   */
  private validateTokenAndUserId(token: string, userId: string) {
    this.verifyUser(userId);

    if (
      !token ||
      token.trim() === '' ||
      userId === 'undefined' ||
      userId === 'null' ||
      userId.trim() === ''
    ) {
      return new BadRequestException('Invalid token or user ID');
    }
  }

  /**
   * Validates the ID format.
   * @param id - The ID to validate.
   * @param field - The field name associated with the ID.
   * @returns The parsed ID.
   * @throws BadRequestException if the ID format is invalid.
   */
  private validateIdFormat(id: string, field: string): number {
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      throw new BadRequestException(`Invalid ${field} format`);
    }
    return parsedId;
  }

  /**
   * Verifies if a user is verified based on their user ID.
   * @param userId - The ID of the user to verify.
   * @throws ForbiddenException if the user is not verified.
   */
  async verifyUser(userId: string) {
    const userVerified = await this.prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });

    if (!userVerified.emailVerified) {
      return new NotFoundException('User not verified');
    }
  }

  /**
   * Retrieves the public profile of a user.
   * @param profileId - The ID of the user's profile.
   * @returns The public profile of the user, including their ID, name, email, bio, photo, interests, username, and settings.
   * @throws NotFoundException if the user is not found.
   */
  async getPublicProfile(profileId: string) {
    this.verifyUser(profileId);
    const user = await this.prisma.user.findUnique({
      where: {
        id: parseInt(profileId),
      },
    });

    if (!user) {
      throw new NotFoundException(`User not Found`);
    }

    const userSettings = await this.prisma.user.findUnique({
      where: {
        id: parseInt(profileId),
      },
      include: {
        settings: true,
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
      interests: userSettings.settings.publicInterests ? user.interests : null,
      username: user.username,
      settings: userSettings.settings,
    };

    return profile;
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
   * @throws NotFoundException if the user is not found.
   */
  async getProfile(token: string, userId: string) {
    this.validateTokenAndUserId(token, userId);

    const user = await this.prisma.user.findUnique({
      where: {
        token: token,
        id: this.validateIdFormat(userId, 'user ID'),
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
  }

  /**
   * Updates the user profile.
   * @param token - The user token.
   * @param userId - The user ID.
   * @param dto - The dashboard DTO containing the updated profile information.
   * @returns The updated user profile.
   * @throws NotFoundException if the user is not found.
   */
  async updateProfile(token: string, userId: string, dto: DashboardDto) {
    this.validateTokenAndUserId(token, userId);
    this.verifyUser(userId);

    const user = await this.prisma.user.findUnique({
      where: {
        id: this.validateIdFormat(userId, 'user ID'),
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
  }

  /**
   * Updates the user settings.
   * @param token - The user token.
   * @param userId - The user ID.
   * @param dto - The user settings DTO containing the updated settings information.
   * @returns The updated user settings.
   * @throws NotFoundException if the user is not found.
   */
  async updateSettings(token: string, userId: string, dto: UserSettingsDto) {
    this.validateTokenAndUserId(token, userId);

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
  }

  /**
   * Retrieves the user achievements.
   * @param token - The user token.
   * @param userId - The user ID.
   * @returns The user achievements.
   * @throws NotFoundException if the user is not found.
   */
  async getAchievements(token: string, userId: string) {
    this.validateTokenAndUserId(token, userId);

    const user = await this.prisma.user.findUnique({
      where: {
        id: this.validateIdFormat(userId, 'user ID'),
        token: token,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found, invalid token');
    }

    const userAchievements = await this.prisma.user.findMany({
      where: {
        id: this.validateIdFormat(userId, 'user ID'),
      },
      include: {
        achievements: {
          include: {},
        },
      },
    });

    return userAchievements;
  }

  /**
   * Claims an achievement for the user.
   * @param token - The user token.
   * @param userId - The user ID.
   * @param achievementId - The ID of the achievement to claim.
   * @returns The updated user profile.
   * @throws NotFoundException if the user or achievement is not found.
   * @throws ConflictException if the achievement is already claimed by the user.
   */
  async claimAchievement(token: string, userId: string, achievementId: string) {
    this.validateTokenAndUserId(token, userId);

    const user = await this.prisma.user.findUnique({
      where: {
        id: this.validateIdFormat(userId, 'user ID'),
        token: token,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found, invalid token');
    }

    const achievement = await this.prisma.achievement.findUnique({
      where: {
        id: this.validateIdFormat(achievementId, 'achievement ID'),
      },
    });

    if (!achievement) {
      throw new NotFoundException('Achievement not found');
    }

    const alreadyClaimed = await this.prisma.user.findUnique({
      where: { id: this.validateIdFormat(userId, 'user ID') },
      select: { achievements: true },
    });

    if (
      alreadyClaimed.achievements.some(
        (ach) =>
          ach.id === this.validateIdFormat(achievementId, 'achievement ID'),
      )
    ) {
      throw new ConflictException('Achievement already claimed');
    }

    const updatedUser = await this.prisma.user.update({
      where: {
        id: this.validateIdFormat(userId, 'user ID'),
      },
      data: {
        achievements: {
          connect: {
            id: this.validateIdFormat(achievementId, 'achievement ID'),
          },
        },
      },
      include: {
        achievements: true,
      },
    });

    return updatedUser;
  }
}
