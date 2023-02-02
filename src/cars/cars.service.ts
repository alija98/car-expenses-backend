import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { AddCarDto } from './add-car.dto';
import { Car } from './car.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly _carsRepository: Repository<Car>,
  ) {}

  async getCars(user: User) {
    const query = this._carsRepository.createQueryBuilder('car');
    query.where({ user });

    try {
      const cars = await query.getMany();
      return cars;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async addCar(addCarDto: AddCarDto, user: User): Promise<Car> {
    const { brand, model, description } = addCarDto;
    const car = this._carsRepository.create({
      brand,
      description: description || '',
      model,
      user,
    });

    try {
      await this._carsRepository.save(car);
      return car;
    } catch (error) {
      console.log('error je ', error);

      throw new InternalServerErrorException();
    }
  }
}
