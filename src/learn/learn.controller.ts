import { Body, Controller, Get, Post } from "@nestjs/common";
import { LearnService } from "./learn.service";


@Controller('learn')
export class LearnController {
    constructor(private authService: LearnService) { }

    @Get('courses')
    async getLearn() {
        return this.authService.getLearn();
    }
}
