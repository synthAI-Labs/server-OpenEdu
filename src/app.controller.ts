import { Body, Controller, Get, Param, Post, Res, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { ContactDto } from './contact.dto';

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

  @Get('/i/:imagePath')
  getImage(@Res() res, @Param('imagePath') imagePath: string) {
    if (imagePath.length > 2) {
      return res.sendFile(imagePath, { root: 'uploads' });
    } else {
      return res.sendFile("boy1.png", { root: 'uploads' });
    }
  }

  @Post('/contact')
  contact(@Body() dto: ContactDto) {
    return this.appService.contact(dto);
  }
}
