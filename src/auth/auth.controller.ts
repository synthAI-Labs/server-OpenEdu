import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, LoginDto } from './dto';

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
  @Post('signup/confirm/:userEmail')
  confirm(@Param('userEmail') userEmail: string, @Body('code') code: string) {
    return this.authService.confirmEmail(userEmail, code);
  }

  // TODO: for token reset,
  @Post('signout')
  signout(@Headers('authorization') token: string, @Headers('user_id') userId: string) {
    return this.authService.signOut(token, userId);
  }

  // TODO: for password reset,
  // @Post('password/reset')

  // TODO: Github Signup
  // @Post('signup/github')

  // TODO: Google Signup
  // @Post('signup/google')

  @Post('signin')
  signin(@Body() dto: LoginDto) {
    return this.authService.signin(dto);
  }

  // TODO: Github Signin
  // @Post('signin/github')

  // TODO: Google Signin
  // @Post('signin/google')
}
