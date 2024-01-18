import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatDto } from './dto/chat.dto';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) { }

  getStatus() {
    return {
      status: 200,
    };
  }

  async getChat(token: string, userId: string, dto: ChatDto) {
    try {
      try {
        const user = await this.prisma.user.findUnique({
          where: {
            id: parseInt(userId),
            token: token,
          },
        });

        if (!user) {
          return {
            status: 404,
            message: 'User not Found',
          };
        }
      } catch (error) {
        return {
          status: 401,
          message: 'invalid request',
        };
      }

      const { message, module_id }: ChatDto = dto;

      if (process.env.DEV === 'true') {
        return {
          status: 200,
          message: 'pong',
        };
      } else if (process.env.PROD === 'true') {
        const module_details = await this.prisma.module.findUnique({
          where: {
            id: parseInt(module_id),
          },
          select: {
            description: true,
          },
        });

        const receivedMessage = await this.getResponse(
          message,
          module_details.description,
        );
        return {
          status: 200,
          message: receivedMessage,
        };
      } else {
        return {
          status: 500,
          message: 'Internal Server Error',
        };
      }
    } catch (error) {
      return {
        status: 500,
        message: error as string,
      };
    }
  }

  async getResponse(message: string, module_message: string) {
    // if (process.env.AI === 'true') {
    //   const answer = await fetch(process.env.AI_URL, {
    //     method: 'POST',
    //     headers: {
    //       user: 'ADMIN',
    //       password: 'ADMIN',
    //       custom_secret: process.env.AI_SECRET,
    //     },
    //     body: JSON.stringify({
    //       doubt: message,
    //       text: module_message,
    //     }),
    //   });
    //   return answer.json();
    // }

    const genAI = new GoogleGenerativeAI(process.env.API_KEY);

    async function run() {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      let prompt: string;
      if (module_message.length < 2) {
        prompt = ` DOUBT: ${message}`;
      } else {
        prompt = ` DOUBT: ${message}, FROM TOPIC: ${module_message}}`;
      }

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      return text;
    }

    return run();
  }
}
