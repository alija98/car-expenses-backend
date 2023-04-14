import { Car } from '../cars/car.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  name: string;

  @Column()
  password: string;

  @OneToMany(() => Car, (car) => car.user, { eager: true })
  cars: Car[];
}
