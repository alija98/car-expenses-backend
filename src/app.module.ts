import { Module } from '@nestjs/common';
import { CarsModule } from './cars/cars.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Car } from './cars/car.entity';
import { User } from './auth/user.entity';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { Env } from './shared/enums/env.enum';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CarsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (_configService: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: _configService.get('DB_HOST'),
        port: _configService.get('DB_PORT'),
        username: _configService.get('DB_USERNAME'),
        password: _configService.get('DB_PASSWORD'),
        database: _configService.get('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
        entities: [`${__dirname}/**/*.entity{.ts,.js}`],
        logging: _configService.get('NODE_ENV') === Env.DEV,
      }),
    }),
    AuthModule,
  ],
})
export class AppModule {}
