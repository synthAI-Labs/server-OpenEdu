import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DashboardDto } from './dto';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) { }

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
   * @throws BadRequestException if the token or user ID is invalid.
   */
  private validateTokenAndUserId(token: string, userId: string): void {
    if (
      !token ||
      token.trim() === '' ||
      userId === 'undefined' ||
      userId === 'null' ||
      userId.trim() === ''
    ) {
      throw new BadRequestException('Invalid token or user ID');
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
      },
      include: {
        achievements: true,
      },
    });

    return updatedUser;
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
