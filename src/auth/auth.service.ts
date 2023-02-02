import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.payload.interface';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly _usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async signUp(createUserDto: CreateUserDto): Promise<void> {
    const { username, password, passwordConfirmation } = createUserDto;

    if (password !== passwordConfirmation)
      throw new BadRequestException(
        'Password not matching password confirmation.',
      );

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this._usersRepository.create({
      username,
      password: hashedPassword,
    });

    try {
      await this._usersRepository.save(user);
    } catch (error) {
      console.log(error.code);
      if (error.code === '23505') {
        throw new ConflictException('This username is already taken');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  async signIn(authCredentialsDto: LoginDto): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this._usersRepository.findOneBy({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    }
    {
      throw new UnauthorizedException('Your credentials are not valid');
    }
  }
}
