import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class LearnService {
    constructor(private prisma: PrismaService) { }

    private validateIdFormat(id: string, field: string): number {
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            throw new ForbiddenException(`Invalid ${field} format`);
        }
        return parsedId;
    }

    async getLearn() {
        return this.prisma.course.findMany();
    }

    async getCourseById(courseId: string) {
        const parsedCourseId = this.validateIdFormat(courseId, 'course ID');

        const course = await this.prisma.course.findUnique({
            where: { id: parsedCourseId },
        });

        if (!course) {
            throw new ForbiddenException('Course not found');
        }

        return course;
    }

    async enroll(courseId: string, userId: string, token: string) {
        const parsedCourseId = this.validateIdFormat(courseId, 'course ID');
        const parsedUserId = this.validateIdFormat(userId, 'user ID');

        const course = await this.prisma.course.findUnique({
            where: { id: parsedCourseId },
        });

        if (!course) {
            throw new ForbiddenException('Course not found');
        }

        const user = await this.prisma.user.findUnique({
            where: {
                id: parsedUserId,
                token: token as string,
            },
        });

        if (!user) {
            throw new ForbiddenException('User not found');
        }

        const alreadyEnrolled = await this.prisma.user.findUnique({
            where: { id: parsedUserId },
            select: { coursesEnrolled: true },
        });

        if (alreadyEnrolled.coursesEnrolled.includes(parsedCourseId.toString())) {
            throw new ForbiddenException('Already enrolled');
        }

        const updatedUser = await this.prisma.user.update({
            where: { id: parsedUserId },
            data: {
                coursesEnrolled: {
                    push: parsedCourseId.toString(),
                },
            },
        });

        return updatedUser;
    }

    async getTopics(courseId: string) {
        const parsedCourseId = this.validateIdFormat(courseId, 'course ID');

        const course = await this.prisma.course.findUnique({
            where: { id: parsedCourseId },
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
        const parsedCourseId = this.validateIdFormat(courseId, 'course ID');
        const parsedTopicId = this.validateIdFormat(topicId, 'topic ID');
        const parsedModuleId = this.validateIdFormat(moduleId, 'module ID');

        const course = await this.prisma.course.findUnique({
            where: { id: parsedCourseId },
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

        const topic = course.subtopics.find((t) => t.id === parsedTopicId);

        if (!topic) {
            throw new ForbiddenException('Topic not found');
        }

        const module = topic.modules.find((m) => m.id === parsedModuleId);

        if (!module) {
            throw new ForbiddenException('Module not found');
        }

        return module;
    }
}
