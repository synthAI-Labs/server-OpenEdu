import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatDto } from './dto/chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get('status')
  getStatus() {
    return this.chatService.getStatus();
  }

  @Post('')
  getChat(
    @Headers('authorization') token: string,
    @Headers('user_id') userId: string,
    @Body() dto: ChatDto,
  ) {
    return this.chatService.getChat(token, userId, dto);
  }
}
