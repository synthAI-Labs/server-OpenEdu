import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import Redis from 'ioredis';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'REDIS',
      useValue: new Redis(process.env.REDDIS_URL),
    },
  ],
})
export class AuthModule {}
