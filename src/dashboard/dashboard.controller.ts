import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardDto } from './dto';
import { UserSettingsDto } from './dto';
import { ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Public } from '../custom.decorator/custom.deco';
@Controller('')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Public()
  @Get('status')
  getStatus() {
    return this.dashboardService.getStatus();
  }

  @Public()
  @Get('p/:username')
  getPublicProfile(@Param('username') userName: string) {
    return this.dashboardService.getPublicProfile(userName);
  }

  // @UseGuards(JwtAuthGuard) // Protect the route with JWT authentication
  @Post('dashboard/profile')
  // @UseGuards(JwtAuthGuard)
  getProfile(
    @Headers('authorization') token: string,
    @Headers('user_id') userId: string,
  ) {
    return this.dashboardService.getProfile(token, userId);
  }

  // @UseGuards(JwtAuthGuard) // Protect the route with JWT authentication
  @Put('dashboard/profile')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: DashboardDto })
  updateProfile(
    @Headers('authorization') token: string,
    @Headers('user_id') userId: string,
    @Body() dto: DashboardDto,
  ) {
    return this.dashboardService.updateProfile(token, userId, dto);
  }

  @Put('dashboard/profile/settings')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: UserSettingsDto })
  updateSettings(
    @Headers('authorization') token: string,
    @Headers('user_id') userId: string,
    @Body() dto: UserSettingsDto,
  ) {
    return this.dashboardService.updateSettings(token, userId, dto);
  }

  // Not in use Right now
  // Will be used in future

  // @Post('dashboard/achievements')
  // getAchievements(
  //   @Headers('authorization') token: string,
  //   @Headers('user_id') userId: string,
  // ) {
  //   return this.dashboardService.getAchievements(token, userId);
  // }

  @Post('dashboard/achievements/:achievementId/claim')
  @UseGuards(JwtAuthGuard)
  claimAchievement(
    @Headers('authorization') token: string,
    @Headers('user_id') userId: string,
    @Param('achievementId') achievementId: string,
  ) {
    return this.dashboardService.claimAchievement(token, userId, achievementId);
  }
}
