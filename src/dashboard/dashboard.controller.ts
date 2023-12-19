import { Body, Controller, Headers, Param, Post, Put } from "@nestjs/common";
import { DashboardService } from "./dashboard.service";
import { DashboardDto } from "./dto";

@Controller('dashboard')
export class DashboardController {
    constructor(private dashboardService: DashboardService) { }

    // @UseGuards(JwtAuthGuard) // Protect the route with JWT authentication
    @Post('profile')
    getProfile(@Headers('authorization') token: string, @Headers('user_id') userId: string) {
        return this.dashboardService.getProfile(token, userId);
    }

    // @UseGuards(JwtAuthGuard) // Protect the route with JWT authentication
    @Put('profile')
    updateProfile(@Headers('authorization') token: string, @Headers('user_id') userId: string, @Body() dto: DashboardDto) {
        return this.dashboardService.updateProfile(token, userId, dto);
    }

    @Post('achievements')
    getAchievements(@Headers('authorization') token: string, @Headers('user_id') userId: string) {
        return this.dashboardService.getAchievements(token, userId);
    }

    @Post('achievements/:achievementId/claim')
    claimAchievement(@Headers('authorization') token: string, @Headers('user_id') userId: string, @Param('achievementId') achievementId: string) {
        return this.dashboardService.claimAchievement(token, userId, achievementId);
    }
}
