import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, OneToMany } from 'typeorm';
import {} from 'graphql';
import { Bag } from '../../bag/entities/bag.Entity';
import { Book } from 'src/booking/entities/booking.Entity';

@ObjectType()
@Entity()
export class PassengerEntity {
  @Field(() => Int)
  @Column({ primary: true, generated: true })
  Id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  email!: string;

  @Column({ unique: true })
  @Field()
  passportNumber!: string;

  @Column()
  @Field()
  nationality!: string;

  @OneToMany(() => Bag, (b) => b.passengerId)
  @Field(() => [Bag])
  bags!: Bag[];

  @OneToMany(() => Book, (b) => b.passenger)
  @Field(() => [Book])
  booking!: Book[];
}
