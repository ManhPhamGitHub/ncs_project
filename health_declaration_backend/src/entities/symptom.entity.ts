import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { HealthDeclarationSymptom } from './health-declaration-symptom.entity';

@Entity()
export class Symptom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}
