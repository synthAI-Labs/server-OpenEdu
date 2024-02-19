import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectService {
    constructor( private readonly prisma: PrismaService) {}
    getStatus() {
        return {
            status: '200 OK',
            message: 'Project Service is up and running!'
        }
    }

    async getAllProjects() {
        try {
        const appProjects = await this.prisma.projects.findMany(
            {
                select: {
                    id: true,
                    name: true,
                    image: true,
                    description: true,
                    createdDate: true,
                    Githublink: true,
                    isLink: false,
                    content: false,
                }
            }
        );
        
        return {
            status: 200,
            message: 'Success',
            data: appProjects
        };
    } catch (error) {
        return {
            status: 500,
            message: 'Internal Server Error',
        }
    }
    }
}
