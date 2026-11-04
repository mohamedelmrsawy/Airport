import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

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
}
