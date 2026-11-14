import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { FlightEntity } from 'src/flight/entities/flight.Entity';

@ObjectType()
@Entity()
export class Airline {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  @Field()
  airlineCode!: string;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  country!: string;

  @Field()
  @Column()
  city!: string;

  @Column()
  @Field()
  isActive!: boolean;

  @OneToMany(() => FlightEntity, (flight) => flight.airlines)
  @Field(() => [FlightEntity])
  flights!: FlightEntity[];
}
