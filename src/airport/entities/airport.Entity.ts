import { ObjectType, Field } from '@nestjs/graphql';
import { FlightEntity } from 'src/flight/entities/flight.Entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('airport')
export class AirportEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  location!: string;

  @Column()
  @Field()
  country!: string;

  @OneToMany(() => FlightEntity, (f) => f.airport)
  @Field(() => [FlightEntity])
  flight!: FlightEntity[];
}
