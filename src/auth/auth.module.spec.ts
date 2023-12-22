import { Test } from '@nestjs/testing';
import { AuthModule } from './auth.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AppModule } from '../app.module';

describe('AuthModule', () => {
  let authModule: AuthModule;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule, AppModule],
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: 'REDIS',
          useValue: {
            get: jest.fn(),
            del: jest.fn(),
          },
        },
      ],
    }).compile();

    authModule = moduleRef.get<AuthModule>(AuthModule);
  });

  it('should be defined', () => {
    expect(authModule).toBeDefined();
  });
});
