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

}
