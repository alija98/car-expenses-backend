import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { LoginDto } from './login.dto';

export class CreateUserDto extends LoginDto {
  @IsNotEmpty()
  passwordConfirmation: string;
}
