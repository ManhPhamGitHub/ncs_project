import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { HealthDeclarationSymptom } from './health-declaration-symptom.entity';

@Entity()
export class HealthDeclaration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 4, scale: 2 })
  temperature: number;

  @Column()
  contactWithSuspected: boolean;

  @Column({ nullable: true })
  additionalNotes?: string;

  @OneToMany(
    () => HealthDeclarationSymptom,
    (symptom) => symptom.healthDeclaration,
  )
  healthDeclarationSymptoms: HealthDeclarationSymptom[];

  @CreateDateColumn()
  submittedAt: Date;
}
