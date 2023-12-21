import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Get('status')
  getStatus() {
    return this.authService.getStatus();
  }

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }
  // TODO: for email confirmation, 
  // @Post('signup/confirm')

  // TODO: for token reset,
  // @Post('signout')

  // TODO: for password reset,
  // @Post('password/reset')

  // TODO: Github Signup
  // @Post('signup/github')

  // TODO: Google Signup
  // @Post('signup/google')

  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }

  // TODO: Github Signin
  // @Post('signin/github')

  // TODO: Google Signin
  // @Post('signin/google')
}
