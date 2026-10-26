import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FlightStatus } from '../../enums/flight.status';
import { Book } from 'src/booking/entities/booking.Entity';
import { Staff } from 'src/staff/entities/staff.Entity';
import { AirportEntity } from 'src/airport/entities/airport.Entity';
import { Seat } from 'src/seat/entities/seat.Entity';

@ObjectType()
@Entity('flights')
export class FlightEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  Id!: number;

  @Column({ unique: true })
  @Field(() => Int)
  flightNumber!: number;

  @Column()
  @Field()
  departureAirport!: string;

  @Column()
  @Field()
  destinationAirport!: string;

  @Column()
  @Field(() => Date)
  departureTime!: Date;

  @Column()
  @Field(() => Date)
  arrivalTime!: Date;

  @Column()
  @Field()
  airline!: string;

  @Column()
  @Field(() => Int)
  availableSeats!: number;

  @Column({ type: 'enum', enum: FlightStatus })
  @Field(() => FlightStatus)
  status!: FlightStatus;

  @OneToMany(() => Book, (b) => b.flight)
  @Field(() => [Book])
  booking!: Book[];

  @OneToMany(() => Staff, (s) => s.flight)
  @Field(() => [Staff])
  staffs!: Staff[];

  @ManyToOne(() => AirportEntity, (a) => a.flight)
  @Field(() => AirportEntity)
  airport!: AirportEntity;

  @OneToMany(() => Seat, (seat) => seat.flight)
  @Field(() => [Seat])
  seats!: Seat[];
}
