import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  Min,
  Max,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateHealthDeclarationDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(35)
  @Max(42)
  temperature: number;

  @IsArray()
  @ArrayNotEmpty()
  symptomIds: number[];

  @IsBoolean()
  contactWithSuspected: boolean;

  @IsOptional()
  additionalNotes?: string;
}
