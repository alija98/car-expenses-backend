import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(100)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.,!@#\$%\^&\*]).{8,}$/, {
    message:
      'Password must have at least one capital letter, one small letter, one number, and one special character',
  })
  password: string;
}
