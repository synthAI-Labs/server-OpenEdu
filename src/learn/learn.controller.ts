import { Controller, Get, Post, Param, Headers } from '@nestjs/common';
import { LearnService } from './learn.service';

@Controller('learn/courses')
export class LearnController {
  constructor(private learnService: LearnService) { }

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
  async getLearnById(@Param('id') courseId: string) {
    return this.learnService.getCourseById(courseId);
  }

  // enroll in a course
  @Post('/enroll/:id')
  async enroll(
    @Headers('authorization') token: string,
    @Headers('user_id') userId: string,
    @Param('id') courseId: string,
    // @Headers('course_id') courseId: string,
  ) {
    return this.learnService.enroll(courseId, userId, token);
  }

  // return all topics covered in a course
  @Get('/:id/:topicId')
  async getTopics(
    @Param('id') courseId: string,
    // @Param('topicId') topicId: string,
  ) {
    return this.learnService.getTopics(courseId);
  }

  @Get('/:id/:topicId/:moduleId')
  async getModule(
    @Param('id') courseId: string,
    @Param('topicId') topicId: string,
    @Param('moduleId') moduleId: string,
  ) {
    return this.learnService.getModule(courseId, topicId, moduleId);
  }
}
