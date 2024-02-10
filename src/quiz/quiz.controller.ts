import {
  Controller,
  Get,
  // Post,
  // Param,
  // Headers,
  // UseGuards,
  Body,
} from '@nestjs/common';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { QuizService } from './quiz.service';
import { QuizDto } from './dto/quiz.dto';

@Controller('quiz')
export class QuizController {
  constructor(private learnService: QuizService) {}

  @Get('status')
  getStatus() {
    return this.learnService.getStatus();
  }

  @Get()
  getQuiz(@Body() dto: QuizDto) {
    return this.learnService.getQuiz(dto);
  }

  @Get('topics')
  getTopics() {
    return this.learnService.getTopics();
  }
}
