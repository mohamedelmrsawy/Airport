import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class BookingDto {
  @Field({ nullable: true })
  seatNumber!: string;

  @Field(() => Int, { nullable: true })
  flightNumber!: number;

  @Field(() => String, { nullable: true })
  name!: string;

  @Field({ nullable: true })
  passportNumber!: string;

  @Field(() => String, { nullable: true })
  email!: string;

  @Field(() => Int, { nullable: true })
  age!: number;
}
