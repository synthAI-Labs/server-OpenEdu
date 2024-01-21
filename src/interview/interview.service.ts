import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { InterviewDto } from './dto/interview.dto';

@Injectable()
export class InterviewService {
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
    async getInterviewQuestion(token: string, userId: string, dto: any) {
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


     const receivedMessage = await this.getResponse(dto.job_description);
                return {
                    status: 200,
                    message: receivedMessage,
                };
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
    async getResponse(message: string) {
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
        console.log("\n\n" + process.env.INTERVIEW_SYS_PROMPT  + "\n\n\n\n")
        async function run() {
            const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

            let prompt: string;
                prompt = `${process.env.INTERVIEW_SYS_PROMPT}  DOUBT: ${message}`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            return text;
        }

        return run();
    }
}
