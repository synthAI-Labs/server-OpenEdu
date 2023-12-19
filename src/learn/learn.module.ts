import { Module } from '@nestjs/common';
import { LearnService } from './learn.service';
import { LearnController } from './learn.controller';

@Module({
  controllers: [LearnController],
  providers: [LearnService],
})
export class LearnModule {}
