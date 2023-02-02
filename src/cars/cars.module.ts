import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Car } from './car.entity';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';

@Module({
  imports: [TypeOrmModule.forFeature([Car]), AuthModule],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
