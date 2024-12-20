import { Controller, Get } from '@nestjs/common';
import { SymptomService } from './symptom.service';

@Controller('symptoms')
export class SymptomController {
  constructor(private readonly symptomService: SymptomService) {}

  @Get('')
  findAll() {
    return this.symptomService.findSymptoms();
  }
}
