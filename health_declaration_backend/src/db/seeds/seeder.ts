import { Symptom } from '../../entities/symptom.entity';
import { Connection, IsNull } from 'typeorm';
import { AppDataSource } from '../data-source';
const symptoms = require('./data/symptoms');

const seed = async () => {
  const dataSource = await AppDataSource.initialize();

  const symptomRepository = dataSource.getRepository(Symptom);

  for (const symptom of symptoms) {
    const exists = await symptomRepository.findOneBy({ name: symptom.name });
    if (!exists) {
      const newSymptom = symptomRepository.create(symptom);
      await symptomRepository.save(newSymptom);
    }
  }

  console.log('Seed data inserted successfully');
  await dataSource.destroy();
};

seed().catch((err) => {
  console.error('Error seeding data:', err);
});
