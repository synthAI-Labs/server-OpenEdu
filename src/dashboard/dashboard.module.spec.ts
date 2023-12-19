import { Test, TestingModule } from '@nestjs/testing';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { DashboardModule } from './dashboard.module';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';

describe('DashboardModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [DashboardModule, PrismaModule, ConfigModule],
      controllers: [DashboardController],
      providers: [DashboardService, PrismaService, ConfigService],
    }).compile();
  });

  it('should be defined', () => {
    const controller: DashboardController =
      module.get<DashboardController>(DashboardController);
    expect(controller).toBeDefined();
  });

  it('should have a valid service', () => {
    const service: DashboardService =
      module.get<DashboardService>(DashboardService);
    expect(service).toBeDefined();
  });
});
