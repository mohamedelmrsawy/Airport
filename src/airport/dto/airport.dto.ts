import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AirportDto {
  @Field()
  name!: string;

  @Field()
  location!: string;

  @Field()
  country!: string;
}
