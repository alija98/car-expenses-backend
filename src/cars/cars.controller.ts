import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { AddCarDto } from './add-car.dto';
import { Car } from './car.entity';
import { CarsService } from './cars.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('cars')
@UseGuards(AuthGuard())
export class CarsController {
  constructor(private carsService: CarsService) {}
  @Get()
  getCars(@GetUser() user: User): Promise<Car[]> {
    return this.carsService.getCars(user);
  }

  @Get('/:id')
  getCarById(@Param('id') carId: string, @GetUser() user: User): Promise<Car> {
    return this.carsService.getCarById(carId, user);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  addCar(@Body() addCarDto: AddCarDto, @GetUser() user: User): Promise<Car> {
    return this.carsService.addCar(addCarDto, user);
  }

  @Delete()
  removeCar(
    @Body() car: { carId: string },
    @GetUser() user: User,
  ): Promise<void> {
    return this.carsService.removeCar(car.carId, user);
  }
}
