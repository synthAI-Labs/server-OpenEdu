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
            },
        });

        if (!user) {
            throw new NotFoundException('User not found');
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
}
