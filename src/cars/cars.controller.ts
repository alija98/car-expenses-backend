import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { AddCarDto } from './add-car.dto';
import { Car } from './car.entity';
import { CarsService } from './cars.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('cars')
@UseGuards(AuthGuard())
export class CarsController {
  constructor(private carsService: CarsService) {}
  @Get()
  getCars(@GetUser() user: User): Promise<Car[]> {
    return this.carsService.getCars(user);
  }

  @Post()
  addCar(@Body() addCarDto: AddCarDto, @GetUser() user: User): Promise<Car> {
    return this.carsService.addCar(addCarDto, user);
  }
}
