import { InputType, Field } from '@nestjs/graphql';
import { FlightStatus } from '../../enums/flight.status';
import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';

@InputType()
export class FlightInput {
  @Field()
  @IsNumber()
  flightNumber!: number;

  @Field()
  @IsString()
  departureAirport!: string;

  @Field()
  @IsString()
  destinationAirport!: string;

  @Field()
  @IsDate()
  departureTime!: Date;

  @Field()
  @IsDate()
  arrivalTime!: Date;

  @Field()
  @IsString()
  airline!: string;

  @Field()
  @IsNumber()
  availableSeats!: number;

  @Field(() => FlightStatus)
  @IsEnum(FlightStatus)
  status!: FlightStatus;
}
