import { InputType, Field, Int } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class BookingDto {
  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  seatNumber!: string;

  @Field(() => Int, { nullable: true })
  @IsNotEmpty()
  flightNumber!: number;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  passportNumber!: string;

  @Field(() => String, { nullable: true })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @Field(() => Int, { nullable: true })
  @IsNotEmpty()
  age!: number;
}
