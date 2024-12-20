import { Test, TestingModule } from '@nestjs/testing';
import { HealthService } from './health.service';
import { Repository } from 'typeorm';
import { HealthDeclaration } from '../entities/health-declaration.entity';
import { HealthDeclarationSymptom } from '../entities/health-declaration-symptom.entity';
import { Symptom } from '../entities/symptom.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('HealthService', () => {
  let service: HealthService;
  let healthDeclarationRepository: Repository<HealthDeclaration>;
  let symptomRepository: Repository<Symptom>;
  let healthDeclarationSymptomRepository: Repository<HealthDeclarationSymptom>;

  const mockRepository = () => ({
    find: jest.fn(),
    findByIds: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthService,
        {
          provide: getRepositoryToken(HealthDeclaration),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(Symptom),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(HealthDeclarationSymptom),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<HealthService>(HealthService);
    healthDeclarationRepository = module.get<Repository<HealthDeclaration>>(
      getRepositoryToken(HealthDeclaration),
    );
    symptomRepository = module.get<Repository<Symptom>>(
      getRepositoryToken(Symptom),
    );
    healthDeclarationSymptomRepository = module.get<
      Repository<HealthDeclarationSymptom>
    >(getRepositoryToken(HealthDeclarationSymptom));
  });

  describe('create', () => {
    it('should create and return a new health declaration', async () => {
      const dto = {
        name: 'Manh Pham',
        temperature: 36.5,
        symptomIds: [1, 2],
        contactWithSuspected: false,
        additionalNotes: '',
      };

      const symptoms = [
        { id: 1, name: 'Cough' },
        { id: 2, name: 'Fever' },
      ];

      jest.spyOn(symptomRepository, 'findByIds').mockResolvedValue(symptoms);
      jest
        .spyOn(healthDeclarationRepository, 'save')
        .mockResolvedValue({ id: 1, ...dto } as any);

      const result = await service.createHealthDeclaration(dto);

      expect(result).toEqual({ id: 1, ...dto });
      expect(symptomRepository.findByIds).toHaveBeenCalledWith([1, 2]);
      expect(healthDeclarationRepository.save).toHaveBeenCalledWith({
        name: dto.name,
        temperature: dto.temperature,
        contactWithSuspected: dto.contactWithSuspected,
        additionalNotes: dto.additionalNotes,
      });
    });

    it('should throw an error if symptoms are not found', async () => {
      const dto = {
        name: 'Manh Pham',
        temperature: 36.5,
        symptomIds: [99],
        contactWithSuspected: false,
        additionalNotes: '',
      };

      jest.spyOn(symptomRepository, 'findByIds').mockResolvedValue([]);

      await expect(service.createHealthDeclaration(dto)).rejects.toThrow(
        NotFoundException,
      );
      expect(symptomRepository.findByIds).toHaveBeenCalledWith([99]);
    });
  });

  describe('findHealthDeclaration', () => {
    it('should return a list of health declarations with related symptoms', async () => {
      const mockHealthDeclarations = [
        {
          id: 1,
          name: 'Manh Pham',
          temperature: 36.5,
          contactWithSuspected: false,
          submittedAt: new Date(),
          healthDeclarationSymptoms: [
            {
              id: 1,
              symptom: { id: 1, name: 'Cough' },
            },
            {
              id: 2,
              symptom: { id: 2, name: 'Fever' },
            },
          ],
        },
      ];

      jest
        .spyOn(healthDeclarationRepository, 'find')
        .mockResolvedValue(mockHealthDeclarations as any);

      const result = await service.findHealthDeclaration();

      expect(result).toEqual(mockHealthDeclarations);

      expect(healthDeclarationRepository.find).toHaveBeenCalledWith({
        relations: [
          'healthDeclarationSymptoms',
          'healthDeclarationSymptoms.symptom',
        ],
      });
    });
  });
});
