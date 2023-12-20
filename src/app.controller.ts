import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getStatus() {
    return this.appService.getHello();
  }

  @Get('health')
  getHealth() {
    return this.appService.checkHealth();
  }
}
