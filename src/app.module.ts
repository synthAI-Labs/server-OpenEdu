import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { PrismaModule } from './prisma/prisma.module';
import { DashboardController } from './dashboard/dashboard.controller';
import { DashboardService } from './dashboard/dashboard.service';

@Module({
  imports: [PrismaModule],
  controllers: [AppController, AuthController, DashboardController],
  providers: [AppService, AuthService, DashboardService],
})
export class AppModule { }