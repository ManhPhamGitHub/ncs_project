import { Body, Controller, Get, Post } from '@nestjs/common';
import { HealthService } from './health.service';
import { CreateHealthDeclarationDto } from './dto/create-health.dto';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Post()
  async createHealthDeclaration(@Body() dto: CreateHealthDeclarationDto) {
    const declaration = await this.healthService.createHealthDeclaration(dto);
    return declaration;
  }

  @Get()
  findAll() {
    return this.healthService.findHealthDeclaration();
  }
}
