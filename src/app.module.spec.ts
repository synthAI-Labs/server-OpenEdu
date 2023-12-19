import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import { AuthController } from '../src/auth/auth.controller';
import { AuthService } from '../src/auth/auth.service';
import { DashboardController } from '../src/dashboard/dashboard.controller';
import { DashboardService } from '../src/dashboard/dashboard.service';
import { LearnController } from '../src/learn/learn.controller';
import { LearnService } from '../src/learn/learn.service';
import { AppModule } from '../src/app.module';

describe('AppModule', () => {
  let appModule: AppModule;
  let appController: AppController;
  let authController: AuthController;
  let dashboardController: DashboardController;
  let learnController: LearnController;
  let appService: AppService;
  let authService: AuthService;
  let dashboardService: DashboardService;
  let learnService: LearnService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    appModule = module.get<AppModule>(AppModule);
    appController = module.get<AppController>(AppController);
    authController = module.get<AuthController>(AuthController);
    dashboardController = module.get<DashboardController>(DashboardController);
    learnController = module.get<LearnController>(LearnController);
    appService = module.get<AppService>(AppService);
    authService = module.get<AuthService>(AuthService);
    dashboardService = module.get<DashboardService>(DashboardService);
    learnService = module.get<LearnService>(LearnService);
  });

  it('should be defined', () => {
    expect(appModule).toBeDefined();
  });

  it('should have AppController defined', () => {
    expect(appController).toBeDefined();
  });

  it('should have AuthController defined', () => {
    expect(authController).toBeDefined();
  });

  it('should have DashboardController defined', () => {
    expect(dashboardController).toBeDefined();
  });

  it('should have LearnController defined', () => {
    expect(learnController).toBeDefined();
  });

  it('should have AppService defined', () => {
    expect(appService).toBeDefined();
  });

  it('should have AuthService defined', () => {
    expect(authService).toBeDefined();
  });

  it('should have DashboardService defined', () => {
    expect(dashboardService).toBeDefined();
  });

  it('should have LearnService defined', () => {
    expect(learnService).toBeDefined();
  });
});
