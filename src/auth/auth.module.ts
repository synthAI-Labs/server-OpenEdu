import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import Redis from 'ioredis';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
  ],
})
export class AuthModule { }
