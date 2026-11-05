import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FlightStatus } from '../../enums/flight.status';
import { Book } from '../../booking/entities/booking.Entity';
import { Staff } from '../../staff/entities/staff.Entity';
import { AirportEntity } from '../../airport/entities/airport.Entity';
import { Seat } from '../../seat/entities/seat.Entity';

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

  @ManyToOne(() => AirportEntity, (a) => a.departureFlights)
  @Field(() => AirportEntity)
  departureAirportRelation!: AirportEntity;

  @ManyToOne(() => AirportEntity, (a) => a.arrivalFlights)
  @Field(() => AirportEntity)
  destinationAirportRelation!: AirportEntity;

  @OneToMany(() => Seat, (seat) => seat.flight)
  @Field(() => [Seat])
  seats!: Seat[];
}
