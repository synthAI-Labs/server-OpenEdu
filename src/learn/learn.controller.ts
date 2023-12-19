import { Controller, Get, Put, Param, Headers } from "@nestjs/common";
import { LearnService } from "./learn.service";

@Controller('learn/courses')
export class LearnController {
    constructor(private learnService: LearnService) { }

    @Get('')
    async getLearn() {
        return this.learnService.getLearn();
    }

    @Get('/:id')
    async getLearnById(@Param('id') courseId: string) {
        return this.learnService.getCourseById(courseId);
    }

    @Put('/:id/enroll')
    async enroll(@Headers('authorization') token: string, @Headers('user_id') userId: string, @Param('id') courseId: string) {
        return this.learnService.enroll(courseId, userId, token);
    }
}
