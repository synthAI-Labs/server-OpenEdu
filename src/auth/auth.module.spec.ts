import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from './auth.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigService } from '@nestjs/config'; // import ConfigService
import { ConfigModule } from '@nestjs/config'; // import ConfigModule

describe('AuthModule', () => {
    let authModule: AuthModule;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AuthModule, PrismaModule, ConfigModule], // add ConfigModule to imports
            controllers: [AuthController],
            providers: [AuthService, PrismaService, ConfigService], // add ConfigService to providers
        }).compile();

        authModule = module.get<AuthModule>(AuthModule);
    });

    it('should be defined', () => {
        expect(authModule).toBeDefined();
    });
});