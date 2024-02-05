import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  // UseGuards,
} from '@nestjs/common';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { InterviewService } from './interview.service';
import { InterviewDto, QuestionAnalysisDto } from './dto/interview.dto';

@Controller('interview')
export class InterviewController {
  constructor(private chatService: InterviewService) {}

  @Get('status')
  getStatus() {
    return this.chatService.getStatus();
  }

  @Post('get-interview-question')
  // @UseGuards(JwtAuthGuard)
  getChat(
    @Headers('authorization') token: string,
    @Headers('user_id') userId: string,
    @Body() dto: InterviewDto,
  ) {
    return this.chatService.getInterviewQuestion(token, userId, dto);
  }

  @Post('get-analysis')
  // @UseGuards(JwtAuthGuard)
  getAnalysisOnAnswer(
    @Headers('authorization') token: string,
    @Headers('user_id') userId: string,
    @Body() dto: QuestionAnalysisDto,
  ) {
    return this.chatService.getAnalysis(token, userId, dto);
  }
}
