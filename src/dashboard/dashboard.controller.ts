import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardDto } from './dto';
import { UserSettingsDto } from './dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get('status')
  getStatus() {
    return this.dashboardService.getStatus();
  }

  @Get('p/:username')
  getPublicProfile(@Param('username') userName: string) {
    return this.dashboardService.getPublicProfile(username);
  }

  // @UseGuards(JwtAuthGuard) // Protect the route with JWT authentication
  @Post('dashboard/profile')
  getProfile(
    @Headers('authorization') token: string,
    @Headers('user_id') userId: string,
  ) {
    return this.dashboardService.getProfile(token, userId);
  }

  // @UseGuards(JwtAuthGuard) // Protect the route with JWT authentication
  @Put('dashboard/profile')
  @ApiBody({ type: DashboardDto })
  updateProfile(
    @Headers('authorization') token: string,
    @Headers('user_id') userId: string,
    @Body() dto: DashboardDto,
  ) {
    return this.dashboardService.updateProfile(token, userId, dto);
  }

  @Put('dashboard/profile/settings')
  @ApiBody({ type: UserSettingsDto })
  updateSettings(
    @Headers('authorization') token: string,
    @Headers('user_id') userId: string,
    @Body() dto: UserSettingsDto,
  ) {
    return this.dashboardService.updateSettings(token, userId, dto);
  }

  @Post('dashboard/achievements')
  getAchievements(
    @Headers('authorization') token: string,
    @Headers('user_id') userId: string,
  ) {
    return this.dashboardService.getAchievements(token, userId);
  }

  @Post('dashboard/achievements/:achievementId/claim')
  claimAchievement(
    @Headers('authorization') token: string,
    @Headers('user_id') userId: string,
    @Param('achievementId') achievementId: string,
  ) {
    return this.dashboardService.claimAchievement(token, userId, achievementId);
  }
}
