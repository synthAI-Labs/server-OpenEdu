import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class LearnService {
    constructor(private prisma: PrismaService) { }

    getLearn() {
        return this.prisma.course.findMany();
    }
}
