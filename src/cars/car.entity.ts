import { User } from '../auth/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Optional } from '@nestjs/common';

@Entity()
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  @Optional()
  description: string;

  @ManyToOne(() => User, (user) => user.cars, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
