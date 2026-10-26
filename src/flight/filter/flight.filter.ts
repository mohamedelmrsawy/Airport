import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FlightFilter {
  @Field(() => Date, { nullable: true })
  departureTime?: Date;

  @Field({ nullable: true })
  destinationAirport?: string;

  @Field({ nullable: true })
  airline?: string;
}
