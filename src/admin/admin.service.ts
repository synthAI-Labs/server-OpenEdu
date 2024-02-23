import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  getStatus(): string {
    return 'Admin Service is UP and Running!';
  }

  getStats(token: string, userId: string) {
    if (
      token === undefined ||
      userId === undefined ||
      userId === null ||
      token === null ||
      token.length < 10
    )
      return {
        status: 400,
        message: 'Bad Request',
      };
    try {
      const isAdmin = this.prisma.user.findFirst({
        where: {
          id: userId,
          token: token,
          role: 'ADMIN',
        },
      });

      if (!isAdmin) {
        return {
          status: 401,
          message: 'Unauthorized',
        };
      }

      const totalUsers = this.prisma.user.count();
      const totalNewsLetterSubscriber =
        this.prisma.newsletterSubscription.count();
      return {
        status: 200,
        message: 'Stats fetched successfully',
        data: {
          totalUsers,
          totalNewsLetterSubscriber,
        },
      };
    } catch (error) {
      return {
        status: 500,
        message: 'Internal Server Error',
      };
    }
  }
}
