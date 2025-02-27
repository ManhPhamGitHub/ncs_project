import { Body, Controller, Get, Post } from '@nestjs/common';
import { HealthService } from './health.service';
import { CreateHealthDeclarationDto } from './dto/create-health.dto';

@Controller('healths')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Post()
  async createHealthDeclaration(@Body() dto: CreateHealthDeclarationDto) {
    const declaration = await this.healthService.createHealthDeclaration(dto);
    return declaration;
  }
}
