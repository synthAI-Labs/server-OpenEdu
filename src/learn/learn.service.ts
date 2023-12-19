import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class LearnService {
    constructor(private prisma: PrismaService) { }

    async getLearn() {
        return this.prisma.course.findMany();
    }

    async getCourseById(courseId: string) {
        const course = await this.prisma.course.findUnique({
            where: { id: parseInt(courseId) },
        });

        if (!course) {
            throw new ForbiddenException('Course not found');
        }

        return course;
    }


    async enroll(courseId: string, userId: string, token: string) {
        const course = await this.prisma.course.findUnique({
            where: { id: parseInt(courseId), },
        });

        if (!course) {
            throw new ForbiddenException('Course not found');
        }

        const user = await this.prisma.user.findUnique({
            where: {
                id: parseInt(userId),
                token: token as string,
            },
        });

        if (!user) {
            throw new ForbiddenException('User not found');
        }

        const alreadyEnrolled = await this.prisma.user.findUnique({
            where: { id: parseInt(userId) },
            select: { coursesEnrolled: true },
        });

        if (alreadyEnrolled.coursesEnrolled.includes(courseId)) {
            return "Already enrolled";
        }


        const updatedUser = await this.prisma.user.update({
            where: { id: parseInt(userId) },
            data: {
                coursesEnrolled: {
                    push: courseId,
                },
            },
        });

        return updatedUser;
    }

    async getTopics(courseId: string) {
        const course = await this.prisma.course.findUnique({
            where: { id: parseInt(courseId) },
            include: {
                subtopics: {
                    include: {
                        modules: true,
                    },
                },
            },
        });

        if (!course) {
            throw new ForbiddenException('Course not found');
        }

        return course.subtopics;
    }

    async getModule(courseId: string, topicId: string, moduleId: string) {
        const course = await this.prisma.course.findUnique({
            where: { id: parseInt(courseId) },
            include: {
                subtopics: {
                    include: {
                        modules: true,
                    },
                },
            },
        });

        if (!course) {
            throw new ForbiddenException('Course not found');
        }

        const topic = course.subtopics.find((topic) => topic.id === parseInt(topicId));

        if (!topic) {
            throw new ForbiddenException('Topic not found');
        }

        const module = topic.modules.find((module) => module.id === parseInt(moduleId));

        if (!module) {
            throw new ForbiddenException('Module not found');
        }

        return module;
    }
}


