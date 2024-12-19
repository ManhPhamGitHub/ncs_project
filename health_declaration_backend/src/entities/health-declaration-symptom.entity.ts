import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { HealthDeclaration } from './health-declaration.entity';
import { Symptom } from './symptom.entity';

@Entity()
export class HealthDeclarationSymptom {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => HealthDeclaration, { onDelete: 'CASCADE' })
  @JoinColumn()
  healthDeclaration: HealthDeclaration;

  @ManyToOne(() => Symptom)
  @JoinColumn()
  symptom: Symptom;
}
