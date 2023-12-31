import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('health')
  getHealth() {
    return this.appService.checkHealth();
  }

  @Get(':imagePath')
  getImage(@Res() res, @Param('imagePath') imagePath: string) {
    return res.sendFile(imagePath, { root: 'uploads' });
  }
}
