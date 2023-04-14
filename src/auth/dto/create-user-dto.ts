import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { LoginDto } from './login.dto';

export class CreateUserDto extends LoginDto {
  @IsNotEmpty()
  passwordConfirmation: string;

  @IsString()
  @MinLength(3)
  name: string;
}
