import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DashboardDto, UserSettingsDto } from './dto';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  /**
   * Retrieves the status of the authentication service.
   * @returns A string indicating the status of the authentication service.
   */
  getStatus() {
    return 'Auth service is up';
  }

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

    try {
    } catch (error) {
      return false;
    } finally {
      const verifiedUser = await this.verifyUser(userId);

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
  async verifyUser(userId: string): Promise<boolean> {
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
    } catch (error) {}
  }

  /**
   * Retrieves the public profile of a user.
   * @param profileName - The username of the user whose public profile is to be retrieved.
   * @returns An object containing the status, message, and data of the profile.
   * - If the user is not found, the status will be 404 and the message will be 'User Not Found'.
   * - If the user's profile is private, the status will be 403 and the message will be 'Profile is private'.
   * - If there is an internal server error, the status will be 500 and the message will be 'Internal Server Error'.
   * - If the profile is successfully retrieved, the status will be 200, the message will be 'success', and the data will contain the profile information.
   */
  async getPublicProfile(profileName: string) {
    const username: string = profileName;
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          username: username,
        },
      });

      if (!user) {
        return {
          status: 404,
          message: 'User Not Found',
        };
      }

      const userSettings = await this.prisma.user.findUnique({
        where: {
          username: username,
        },
        include: {
          settings: true,
          achievements: true,
          CourseEnrollment: true,
        },
      });

      if (!userSettings.settings.publicProfile) {
        return {
          status: 403,
          message: 'Profile is private',
        };
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

      return {
        status: 200,
        message: 'success',
        data: profile,
      };
    } catch (error) {
      return {
        status: 500,
        message: 'Internal Server Error',
      };
    }
  }

  /**
   * Retrieves the profile of a user based on the provided token and user ID.
   * @param token - The authentication token of the user.
   * @param userId - The ID of the user.
   * @returns An object containing the status, message, and data of the user profile.
   *          - If the token or user ID is invalid, the status will be 403 and the message will be 'Invalid token or user ID'.
   *          - If the user is not found, the status will be 404 and the message will be 'User Not Found'.
   *          - If there is an internal server error, the status will be 500 and the message will be 'Internal Server Error'.
   *          - If the profile is successfully retrieved, the status will be 200, the message will be 'success',
   *            and the data will contain the user profile (with the password field removed).
   */
  async getProfile(token: string, userId: string) {
    try {
      const verifiedUser = await this.validateTokenAndUserId(token, userId);

      if (!verifiedUser) {
        return {
          status: 403,
          message: 'Invalid token or user ID',
        };
      }

      const user = await this.prisma.user.findUnique({
        where: {
          token: token,
          id: userId,
        },
        include: {
          achievements: true,
          CourseEnrollment: true,
          settings: true,
        },
      });

      if (!user) {
        return {
          status: 404,
          message: 'User Not Found',
        };
      }

      delete user.password;
      return {
        status: 200,
        message: 'success',
        data: user,
      };
    } catch (error) {
      return {
        status: 500,
        message: 'Internal Server Error',
      };
    }
  }

  /**
   * Updates the profile of a user.
   * @param token - The authentication token of the user.
   * @param userId - The ID of the user.
   * @param dto - The data transfer object containing the updated profile information.
   * @returns The updated user profile or an error response object.
   */
  async updateProfile(token: string, userId: string, dto: DashboardDto) {
    try {
      const verifiedUser = await this.validateTokenAndUserId(token, userId);

      if (!verifiedUser) {
        return {
          status: 403,
          message: 'Invalid token or user ID',
        };
        // throw new BadRequestException('Invalid token or user ID');
      }

      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
          token: token,
        },
      });

      if (!user) {
        return {
          status: 404,
          message: 'User not found or invalid token',
        };
        // throw new NotFoundException('User not found, invalid token');
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
      return {
        status: 500,
        message: 'Internal Server Error',
      };
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
        return {
          status: 403,
          message: 'Invalid token or user ID',
        };
      }

      const updatedSettings = await this.prisma.userSettings.update({
        where: {
          id: userId,
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
      return {
        status: 500,
        message: 'Internal Server Error',
      };
    }
  }

  /**
   * Retrieves the user achievements.
   * @param token - The user token.
   * @param userId - The user ID.
   * @returns The user achievements.
   * @returns NotFoundException if the user is not found.
   */
  // async getAchievements(token: string, userId: string) {
  //   try {
  //     const verifiedUser = await this.validateTokenAndUserId(token, userId);

  //     if (!verifiedUser) {
  //       return {
  //         "status": 403,
  //         "message": "Invalid token or user ID"
  //       }
  //     }

  //     const user = await this.prisma.user.findUnique({
  //       where: {
  //         id: parseInt(userId),
  //         token: token,
  //       },
  //     });

  //     if (!user) {
  //       return {
  //         "status": 404,
  //         "message": "User not found or invalid token"
  //       }
  //       // throw new NotFoundException('User not found, invalid token');
  //     }

  //     const userAchievements = await this.prisma.user.findMany({
  //       where: {
  //         id: parseInt(userId),
  //       },
  //       include: {
  //         achievements: {
  //           include: {},
  //         },
  //       },
  //     });

  //     return userAchievements;
  //   } catch (error) {
  //     return {
  //       "status": 500,
  //       "message": "Internal Server Error"
  //     }
  //   }
  // }

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
        return {
          status: 403,
          message: 'Invalid token or user ID',
        };
      }

      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
          token: token,
        },
      });

      if (!user) {
        return {
          status: 404,
          message: 'User not found or invalid token',
        };
      }

      const achievement = await this.prisma.achievement.findUnique({
        where: {
          id: parseInt(achievementId),
        },
      });

      if (!achievement) {
        return {
          status: 404,
          message: 'Achievement not found',
        };
      }

      const alreadyClaimed = await this.prisma.user.findUnique({
        where: {
          id: userId,
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
        return {
          status: 403,
          message: 'Achievement already claimed',
        };
      }

      const updatedUser = await this.prisma.user.update({
        where: {
          id: userId,
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
      return {
        status: 500,
        message: 'Internal Server Error',
      };
    }
  }
}
