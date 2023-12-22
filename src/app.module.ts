import { Module } from '@nestjs/common';
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

@Module({
  imports: [PrismaModule, TerminusModule, HttpModule],
  controllers: [
    AppController,
    AuthController,
    DashboardController,
    LearnController,
  ],
  providers: [
    AppService,
    AuthService,
    DashboardService,
    LearnService,
    {
      provide: 'REDIS',
      useValue: new Redis({
        host: 'localhost', // replace with your Redis host
        port: 6379, // replace with your Redis port
      }),
    },
  ],
})
export class AppModule { }