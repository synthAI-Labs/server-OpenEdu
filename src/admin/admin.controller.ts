import { Controller, Get, Headers, Post } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get()
  getHello() {
    return this.adminService.getStatus();
  }

  @Post('getStats')
  getStats(
    @Headers('authorization') token: string,
    @Headers('userId') userId: string,
  ) {
    return this.adminService.getStats(token, userId);
  }
}
