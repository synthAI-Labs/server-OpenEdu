import { Module, Scope } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { PrismaModule } from './prisma/prisma.module';
import { DashboardController } from './dashboard/dashboard.controller';
import { DashboardService } from './dashboard/dashboard.service';
import { LearnController } from './learn/learn.controller';
import { LearnService } from './learn/learn.service';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import Redis from 'ioredis';
import { MulterModule } from '@nestjs/platform-express/multer';
import { ChatModule } from './chat/chat.module';
import { ChatController } from './chat/chat.controller';
import { ChatService } from './chat/chat.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';
import { InterviewController } from './interview/interview.controller';
import { InterviewService } from './interview/interview.service';
import { ResumeController } from './resume/resume.controller';
import { ResumeService } from './resume/resume.service';
import { QuizController } from './quiz/quiz.controller';
import { QuizService } from './quiz/quiz.service';
import { ProjectModule } from './project/project.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    PrismaModule,
    TerminusModule,
    HttpModule,
    MulterModule.register({
      dest: './uploads',
    }),
    ChatModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.EXPIRES_IN },
    }),
    ProjectModule,
    AdminModule,
  ],
  controllers: [
    AppController,
    AuthController,
    DashboardController,
    LearnController,
    ChatController,
    InterviewController,
    ResumeController,
    QuizController,
  ],
  providers: [
    AppService,
    AuthService,
    DashboardService,
    LearnService,
    ChatService,
    InterviewService,
    ResumeService,
    QuizService,
    {
      provide: 'REDIS',
      useFactory: () => {
        const client = new Redis(process.env.REDDIS_URL);
        client.on('error', (err) => console.error('Redis error', err));
        return client;
      },
      scope: Scope.DEFAULT,
    },
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AppModule {}
