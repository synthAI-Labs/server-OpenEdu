import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { DashboardDto } from "./dto";

@Injectable()
export class DashboardService {
    constructor(private prisma: PrismaService) { }

    async getProfile(token: string, userId: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                token: token,
                id: parseInt(userId),
            },
            include: {
                achievements: true,
                // Include other related entities as needed
            },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async updateProfile(token: String, userId: string, dto: DashboardDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: parseInt(userId),
                token: token as string,
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
                // Include other related entities as needed
            },
        });

        return updatedUser;
    }

    async getAchievements(token: string, userId: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: parseInt(userId),
                token: token as string,
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
            }
        });

        return userAchievements;
    }

    async claimAchievement(token: string, userId: string, achievementId: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: parseInt(userId),
                token: token as string,
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
            where: { id: parseInt(userId) },
            select: { achievements: true },
        });

        if (alreadyClaimed.achievements.some(ach => ach.id === parseInt(achievementId))) {
            return "Already claimed";
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
    }



}
