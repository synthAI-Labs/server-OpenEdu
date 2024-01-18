import { Body, Controller, Get, Headers, Param, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, LoginDto, ResetPasswordDto } from './dto';
import { ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Public } from '../custom.decorator/custom.deco';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @Get('status')
  getStatus() {
    return this.authService.getStatus();
  }

  @Public()
  @Post('signup')
  @ApiBody({ type: AuthDto })
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  // TODO: for email confirmation,
  @Public()
  @Post('signup/confirm/:userEmail')
  @ApiBody({ type: String })
  confirm(@Param('userEmail') userEmail: string, @Body('code') code: string) {
    return this.authService.confirmEmail(userEmail, code);
  }

  // TODO: for token reset,
  @Public()
  @Post('signout')
  @UseGuards(JwtAuthGuard)
  signout(
    @Headers('authorization') token: string,
    @Headers('user_id') userId: string,
  ) {
    return this.authService.signOut(token, userId);
  }

  // TODO: password reset request, forgot password
  @Public()
  @Post('password/forgot')
  @ApiBody({ type: String })
  forgotPassword(
    @Headers('authorization') token: string,
    @Headers('user_id') userId: string,
    @Body('userEmail') userEmail: string
  ) {
    return this.authService.forgotPassword(token, userId, userEmail);
  }

  @Public()
  @Post('password/forgot/confirm/:userEmail')
  @ApiBody({ type: ResetPasswordDto })
  confirmResetPassword(
    @Param('userEmail') userEmail: string,
    @Body() dto: ResetPasswordDto,
  ) {
    return this.authService.confirmResetPassword(userEmail, dto);
  }

  // TODO: for password change,
  @Public()
  @Post('password/change')
  @ApiBody({ type: String })
  resetPassword(
    @Headers('authorization') token: string,
    @Headers('user_id') userId: string,
    @Body('newPassword') password: string,
  ) {
    return this.authService.resetPassword(token, userId, password);
  }

  // TODO: Github Signup
  // @Post('signup/github')

  // TODO: Google Signup
  // @Post('signup/google')

  @Public()
  @Post('signin')
  @ApiBody({ type: LoginDto })
  signin(@Body() dto: LoginDto) {
    return this.authService.signin(dto);
  }

  // TODO: Github Signin
  // @Post('signin/github')

  // TODO: Google Signin
  // @Post('signin/google')
}
