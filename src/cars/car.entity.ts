import { User } from '../auth/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  IsNull,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { EngineTypes } from 'src/types';

@Entity()
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  image: string;

  @Column()
  engineType: EngineTypes;

  @Column()
  registrationDate: string;

  @Column()
  nmbrOfKm: number;

  @Column()
  color: string;

  @Column()
  yearOfProduction: number;

  @ManyToOne(() => User, (user) => user.cars, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
