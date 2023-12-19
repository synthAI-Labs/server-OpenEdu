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

@Module({
  imports: [PrismaModule],
  controllers: [AppController, AuthController, DashboardController, LearnController],
  providers: [AppService, AuthService, DashboardService, LearnService],
})
export class AppModule { }