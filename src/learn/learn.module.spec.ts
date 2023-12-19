import { Test, TestingModule } from '@nestjs/testing';
import { LearnController } from './learn.controller';
import { LearnService } from './learn.service';
import { LearnModule } from './learn.module';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';

describe('LearnModule', () => {
    let module: TestingModule;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            imports: [LearnModule, PrismaModule, ConfigModule],
            controllers: [LearnController],
            providers: [LearnService, PrismaService, ConfigService],
        }).compile();
    });

    it('should be defined', () => {
        const controller: LearnController = module.get<LearnController>(LearnController);
        expect(controller).toBeDefined();
    });

    it('should have a valid service', () => {
        const service: LearnService = module.get<LearnService>(LearnService);
        expect(service).toBeDefined();
    });
});