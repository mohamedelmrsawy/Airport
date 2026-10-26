import { InputType, Field } from '@nestjs/graphql';
import { FlightStatus } from '../../enums/flight.status';

@InputType()
export class FlightInput {
  @Field()
  flightNumber!: number;

  @Field()
  departureAirport!: string;

  @Field()
  destinationAirport!: string;

  @Field()
  departureTime!: Date;

  @Field()
  arrivalTime!: Date;

  @Field()
  airline!: string;

  @Field()
  availableSeats!: number;

  @Field(() => FlightStatus)
  status!: FlightStatus;
}
