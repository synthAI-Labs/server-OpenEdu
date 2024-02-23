import {
  Controller,
  Get,
  Post,
  Param,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { LearnService } from './learn.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('learn/courses')
export class LearnController {
  constructor(private learnService: LearnService) {}

  @Get('status')
  getStatus() {
    return this.learnService.getStatus();
  }

  // return all courses
  @Get('')
  async getLearn() {
    return this.learnService.getLearn();
  }

  // return course by id, with topics covered
  @Get('/:id')
  async getLearnById(
    @Param('id') courseId: string,
    @Headers('userId') userId?: string,
  ) {
    return this.learnService.getCourseById(courseId, userId);
  }

  // enroll in a course
  @Post('/enroll/:id')
  @UseGuards(JwtAuthGuard)
  async enroll(
    @Headers('authorization') token: string,
    @Headers('user_id') userId: string,
    @Param('id') courseId: string,
    // @Headers('course_id') courseId: string,
  ) {
    return this.learnService.enroll(courseId, userId, token);
  }

  @Get('/m/:moduleId')
  async getModule(@Param('moduleId') moduleId: string) {
    return this.learnService.getModule(moduleId);
  }

  @Post('complete/m/:moduleId')
  // @UseGuards(JwtAuthGuard)
  async completeModule(
    @Headers('authorization') token: string,
    @Headers('user_id') userId: string,
    @Param('moduleId') moduleId: string,
  ) {
    return this.learnService.completeModule(moduleId, userId, token);
  }
}
