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
    query.orderBy('ascending');

    try {
      const cars = await query.getMany();
      return cars;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async addCar(addCarDto: AddCarDto, user: User): Promise<Car> {
    const {
      brand,
      model,
      engineType,
      registrationDate,
      nmbrOfKm,
      color,
      yearOfProduction,
    } = addCarDto;
    const imageWithOutNullBytes = addCarDto.image.replace(/\0/g, '');

    const car = this._carsRepository.create({
      brand,
      model,
      user,
      image: imageWithOutNullBytes,
      engineType,
      registrationDate,
      nmbrOfKm,
      color,
      yearOfProduction,
    });

    try {
      await this._carsRepository.save(car);
      return car;
    } catch (error) {
      console.log('error je ', error);

      throw new InternalServerErrorException();
    }
  }

  async removeCar(carId: string, user: User) {
    const doesExists = this._carsRepository.findOneBy({ user: user });

    if (doesExists) {
      try {
        await this._carsRepository.delete({
          id: carId,
        });
        return;
      } catch (error) {
        console.log('error je ', error);

        throw new InternalServerErrorException();
      }
    }
  }

  async getCarById(carId: string, user: User): Promise<Car> {
    try {
      const query = this._carsRepository.createQueryBuilder('car');
      query.where({
        user: user,
        id: carId,
      });
      const car = query.getOneOrFail();
      return car;
    } catch (error) {
      console.log('error je ', error);

      throw new InternalServerErrorException();
    }
  }
}
