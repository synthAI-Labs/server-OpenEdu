import { Injectable, NotFoundException, BadRequestException, ConflictException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { DashboardDto } from "./dto";

@Injectable()
export class DashboardService {
    constructor(private prisma: PrismaService) { }

    private validateTokenAndUserId(token: string, userId: string): void {
        if (!token || token.trim() === '' || userId === 'undefined' || userId === 'null' || userId.trim() === '') {
            throw new BadRequestException('Invalid token or user ID');
        }
    }

    private validateIdFormat(id: string, field: string): number {
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            throw new BadRequestException(`Invalid ${field} format`);
        }
        return parsedId;
    }

    async getProfile(token: string, userId: string) {
        this.validateTokenAndUserId(token, userId);

        const user = await this.prisma.user.findUnique({
            where: {
                token: token,
                id: this.validateIdFormat(userId, 'user ID'),
            },
            include: {
                achievements: true,
            },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

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
            }
        });

        return userAchievements;
    }

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

        if (alreadyClaimed.achievements.some(ach => ach.id === this.validateIdFormat(achievementId, 'achievement ID'))) {
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
