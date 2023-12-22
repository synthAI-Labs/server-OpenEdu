import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpHealthIndicator } from '@nestjs/terminus'; // import HttpHealthIndicator

describe('AppModule', () => {
  let appModule: AppModule;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: HttpHealthIndicator,
          useValue: {
            isHealthy: jest.fn().mockResolvedValue({
              status: 'ok',
            }),
          },
        },
      ],
    }).compile();

    appModule = module.get<AppModule>(AppModule);
  });

  it('should be defined', () => {
    expect(appModule).toBeDefined();
  });
});
