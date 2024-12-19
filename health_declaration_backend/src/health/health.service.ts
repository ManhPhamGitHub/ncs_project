import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { HealthDeclarationSymptom } from '../entities/health-declaration-symptom.entity';
import { CreateHealthDeclarationDto } from './dto/create-health.dto';
import { Symptom } from 'src/entities/symptom.entity';
import { HealthDeclaration } from 'src/entities/health-declaration.entity';

@Injectable()
export class HealthService {
  constructor(
    @InjectRepository(HealthDeclarationSymptom)
    private readonly healthDeclarationSymptomRepository: Repository<HealthDeclarationSymptom>,
    @InjectRepository(Symptom)
    private readonly symptomRepository: Repository<Symptom>,
    @InjectRepository(HealthDeclaration)
    private readonly healthDeclarationRepository: Repository<HealthDeclaration>,
  ) {}

  async createHealthDeclaration(
    createHealthDeclarationDto: CreateHealthDeclarationDto,
  ) {
    const { symptomIds, ...healthDeclarationDto } = createHealthDeclarationDto;
    const savedHealthDeclaration =
      await this.healthDeclarationRepository.save(healthDeclarationDto);

    await Promise.all(
      symptomIds.map(async (symptomId) => {
        const symptom = await this.symptomRepository.findOne({
          where: { id: symptomId },
        });

        if (!symptom) return;

        const healthDeclaration =
          this.healthDeclarationRepository.create(healthDeclarationDto);

        const healthDeclarationSymptomRecord =
          this.healthDeclarationSymptomRepository.create({
            healthDeclaration: savedHealthDeclaration,
            symptom,
          });

        await this.healthDeclarationSymptomRepository.save(
          healthDeclarationSymptomRecord,
        );
      }),
    );
  }

  findHealthDeclaration() {
    return this.healthDeclarationRepository.find({
      relations: [
        'healthDeclarationSymptoms',
        'healthDeclarationSymptoms.symptom',
      ],
    });
  }

  findSymptoms() {
    return this.symptomRepository.find();
  }
}
