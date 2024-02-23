// ERROR HANDLING FOR undefined values

import { Injectable } from '@nestjs/common';
// import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QuizDto } from './dto/quiz.dto';

/**
 * Service responsible for handling learn-related operations.
 */
@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  getStatus() {
    return 'Auth service is up';
  }

  async getQuiz(dto: QuizDto) {
    try {
      console.log(dto);
      const totalQuestionsCount = parseInt(dto.numberOfQuestions);
      const easyQuestionsCount = Math.ceil(totalQuestionsCount * 0.5);
      const mediumQuestionsCount = Math.ceil(totalQuestionsCount * 0.3);
      const hardQuestionsCount =
        totalQuestionsCount - easyQuestionsCount - mediumQuestionsCount;
      console.log(easyQuestionsCount, mediumQuestionsCount, hardQuestionsCount);

      const questions = [];
      if (easyQuestionsCount > 0) {
        const easyQuestions = await this.prisma.question.findMany({
          where: {
            topics: {
              hasSome: dto.topics, // Provide a default value for topics
            },
            // level: 'easy',
          },
          take: easyQuestionsCount,
        });
        console.log(easyQuestions);
        questions.push(...easyQuestions);
      }

      console.log(questions);

      if (mediumQuestionsCount > 0) {
        const mediumQuestions = await this.prisma.question.findMany({
          where: {
            topics: {
              hasSome: dto.topics || [],
            },
            level: 'medium',
          },
          take: mediumQuestionsCount,
        });
        questions.push(...mediumQuestions);
      }

      console.log(questions);

      if (hardQuestionsCount > 0) {
        const hardQuestions = await this.prisma.question.findMany({
          where: {
            topics: {
              hasSome: dto.topics,
            },
            level: 'hard',
          },
          take: hardQuestionsCount,
        });
        questions.push(...hardQuestions);
      }

      console.log(questions);

      return {
        status: 200,
        message: questions,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        message: `Internal Server Error ${error}`,
      };
    }
  }

  async getTopics(): Promise<string[]> {
    const questions = await this.prisma.question.findMany();
    const topicsSet: Set<string> = new Set<string>();

    questions.forEach((question) => {
      question.topics.forEach((topic) => {
        topicsSet.add(topic);
      });
    });

    return Array.from(topicsSet);
  }
}
