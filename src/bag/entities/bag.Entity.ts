import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BagStatus } from '../../enums/bag.status';
import { PassengerEntity } from 'src/passenger/entities/passenger.Entity';

@Entity()
@ObjectType()
export class Bag {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  Id!: number;

  @Column()
  @Field()
  color!: string;

  @Column({ unique: true })
  @Field()
  baggAgeTag!: string;

  @Column()
  @Field(() => Int)
  weight!: number;

  @Column('enum', { enum: BagStatus })
  @Field(() => BagStatus)
  status!: BagStatus;

  @ManyToOne(() => PassengerEntity, (P) => P.bags)
  @Field(() => PassengerEntity)
  passengerId!: PassengerEntity;
}
