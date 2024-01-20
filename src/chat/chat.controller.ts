import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatDto } from './dto/chat.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get('status')
  getStatus() {
    return this.chatService.getStatus();
  }

  @Post('')
  @UseGuards(JwtAuthGuard)
  getChat(
    @Headers('authorization') token: string,
    @Headers('user_id') userId: string,
    @Body() dto: ChatDto,
  ) {
    return this.chatService.getChat(token, userId, dto);
  }
}
