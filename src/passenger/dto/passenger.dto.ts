import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PassengerDto {
  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field()
  passportNumber!: string;

  @Field()
  nationality!: string;
}
