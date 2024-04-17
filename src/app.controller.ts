import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { PermissionsGuard } from './common/permissions.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
