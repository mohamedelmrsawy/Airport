import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { FlightEntity } from 'src/flight/entities/flight.Entity';
import { PassengerEntity } from 'src/passenger/entities/passenger.Entity';
import { Seat } from 'src/seat/entities/seat.Entity';

@Entity()
@ObjectType()
export class Book {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  Id!: number;

  @Column()
  @Field(() => String)
  name!: string;

  @Column()
  @Field(() => Int)
  passportNumber!: string;

  @Column()
  @Field(() => String)
  email!: string;

  @Column()
  @Field(() => Int)
  age!: number;

  @Column({ type: String })
  @Field(() => String)
  seatNumber!: string;

  @Column()
  @Field(() => Int)
  flightId!: number;

  @Column()
  @Field(() => Int)
  passengerId!: number;

  @Column()
  @Field(() => Int)
  seatId!: number;

  @ManyToOne(() => FlightEntity, (f) => f.booking)
  @Field(() => FlightEntity)
  flight!: FlightEntity;

  @ManyToOne(() => PassengerEntity, (p) => p.booking)
  @Field(() => PassengerEntity)
  passenger!: PassengerEntity;

  @OneToOne(() => Seat)
  @JoinColumn()
  @Field(() => Seat)
  seat!: Seat;
}
