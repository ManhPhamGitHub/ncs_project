import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { HealthDeclaration } from '../entities/health-declaration.entity';
import { HealthDeclarationSymptom } from '../entities/health-declaration-symptom.entity';
import { Symptom } from '../entities/symptom.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      HealthDeclaration,
      HealthDeclarationSymptom,
      Symptom,
    ]),
  ],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
