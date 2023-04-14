import { IsNotEmpty, IsString } from 'class-validator';
import { EngineTypes } from 'src/types';

export class AddCarDto {
  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsString()
  model: string;

  image?: string;

  @IsNotEmpty()
  engineType: EngineTypes;

  @IsNotEmpty()
  @IsString()
  registrationDate: string;

  @IsNotEmpty()
  @IsString()
  nmbrOfKm: number;

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsString()
  yearOfProduction: number;
}
