import { Body, Controller, Get, Headers, Put, UseGuards } from "@nestjs/common";
import { DashboardService } from "./dashboard.service";
import { DashboardDto } from "./dto";

@Controller('dashboard')
export class DashboardController {
    constructor(private dashboardService: DashboardService) { }

    // @UseGuards(JwtAuthGuard) // Protect the route with JWT authentication
    @Get('profile')
    getProfile(@Headers('authorization') token: string, @Headers('user_id') userId: string) {
        return this.dashboardService.getProfile(token, userId);
    }

    // @UseGuards(JwtAuthGuard) // Protect the route with JWT authentication
    @Put('profile')
    updateProfile(@Headers('authorization') token: string, @Headers('user_id') userId: string, @Body() dto: DashboardDto) {
        return this.dashboardService.updateProfile(token, userId, dto);
    }
}
