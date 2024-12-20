import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Symptom } from 'src/entities/symptom.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SymptomService {
  constructor(
    @InjectRepository(Symptom)
    private readonly symptomRepository: Repository<Symptom>,
  ) {}
  findSymptoms() {
    return this.symptomRepository.find();
  }
}
