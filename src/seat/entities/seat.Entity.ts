import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { SeatStatus } from '../../enums/seat.status';
import { FlightEntity } from 'src/flight/entities/flight.Entity';

@Entity()
@ObjectType()
export class Seat {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  Id!: number;

  @Column()
  @Field()
  seatNumber!: string;

  @Column({ type: 'enum', enum: SeatStatus, default: SeatStatus.AVAILABLE })
  @Field(() => SeatStatus)
  status!: SeatStatus;

  @ManyToOne(() => FlightEntity, (f) => f.seats)
  @Field(() => FlightEntity)
  flight!: FlightEntity;
}
