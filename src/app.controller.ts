import { Body, Controller, Get, Headers, Param, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ContactDto } from './contact.dto';
import { isEmail } from 'class-validator';

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
      return res.sendFile('boy1.png', { root: 'uploads' });
    }
  }

  @Post('/contact')
  contact(@Body() dto: ContactDto) {
    return this.appService.contact(dto);
  }

  @Post('/subscribe')
  subscribe(@Body('email') Email: string) {
    const emailIsGiven = isEmail(Email)
    if (emailIsGiven) {
      return this.appService.subscribe(Email)
    } else {
      return {
        status: 403,
        message: 'Email is not valid'
      }
    }
  }

  @Post('/unsubscribe')
  unsubscribe(@Body('email') Email: string) {
    const emailIsGiven = isEmail(Email)
    if (emailIsGiven) {
      return this.appService.unsubscribe(Email)
    } else {
      return {
        status: 403,
        message: 'Email is not valid'
      }
    }
  }

  @Post('/sendNewsLetter')
  sendNewsLetter(@Headers('code') secretCode: string, @Body('message') message: string) {
    return this.appService.sendNewsLetter(secretCode, message)
  }
}
