import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { LearnService } from "./learn.service";


@Controller('learn/courses')
export class LearnController {
    constructor(private authService: LearnService) { }

    @Get('')
    async getLearn() {
        return this.authService.getLearn();
    }

    @Get('/:id')
    async getLearnById(@Param('id') courseId: string) {
        return this.authService.getCourseById(courseId);
    }
}
