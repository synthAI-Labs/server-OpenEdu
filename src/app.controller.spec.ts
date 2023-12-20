import { Test, TestingModule } from '@nestjs/testing';
import { TerminusModule } from '@nestjs/terminus';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [TerminusModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('getHello', () => {
    it('should return the result of appService.getHello', () => {
      const expectedResult = 'Hello World';
      jest.spyOn(appService, 'getHello').mockReturnValue(expectedResult);

      const result = appController.getHello();

      expect(result).toBe(expectedResult);
    });
  });

  describe('getHealth', () => {
    it('should return the result of appService.checkHealth', async () => {
      const expectedResult = { status: 'Healthy', services: [] };
      jest.spyOn(appService, 'checkHealth').mockResolvedValue(expectedResult);

      const result = await appController.getHealth();

      expect(result).toBe(expectedResult);
    });
  });
});