import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatDto } from './dto/chat.dto';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get the status of the chat service.
   * @returns An object with the status code.
   */
  getStatus() {
    return {
      status: 200,
    };
  }

  /**
   * Get the chat response based on the user's message and module details.
   * @param token - The user's token.
   * @param userId - The user's ID.
   * @param dto - The chat data transfer object.
   * @returns An object with the status code and the chat response message.
   */
  async getChat(token: string, userId: string, dto: ChatDto) {
    try {
      try {
        const user = await this.prisma.user.findUnique({
          where: {
            id: userId,
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
      let receivedMessage;

      if (process.env.API_KEY) {
        if (module_id) {
          const module_details = await this.prisma.module.findUnique({
            where: {
              id: parseInt(module_id),
            },
            select: {
              description: true,
            },
          });

          receivedMessage = await this.getResponse(
            message,
            module_details.description,
          );

          console.log(receivedMessage);
        } else {
          receivedMessage = await this.getResponse(message);
        }

        return {
          status: 200,
          message: receivedMessage,
        };
      } else {
        return {
          status: 200,
          message: 'pong',
        };
      }
    } catch (error) {
      return {
        status: 500,
        message: 'cant run',
      };
    }
  }

  /**
   * Get the response using the user's message and module message.
   * @param message - The user's message.
   * @param module_message - The module's message.
   * @returns The generated response.
   */
  async getResponse(message: string, module_message?: string) {
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
      if (module_message && module_message.length > 0) {
        prompt = `${process.env.CHAT_SYS_PROMPT} DOUBT: ${message}, FROM TOPIC: ${module_message}`;
      } else {
        prompt = `${process.env.CHAT_SYS_PROMPT}  DOUBT: ${message}`;
      }

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      return text;
    }

    return run();
  }
}
