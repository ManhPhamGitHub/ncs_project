import { Module } from '@nestjs/common';
import { SymptomController } from './symptom.controller';
import { SymptomService } from './symptom.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Symptom } from 'src/entities/symptom.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Symptom])],
  controllers: [SymptomController],
  providers: [SymptomService],
})
export class SymptomModule {}
