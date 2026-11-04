import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsBoolean } from 'class-validator';

@InputType()
export class AirlineDto {
  @Field()
  @IsString()
  airlineCode!: string;

  @Field()
  @IsString()
  name!: string;

  @Field()
  @IsString()
  country!: string;

  @Field()
  @IsString()
  city!: string;

  @Field()
  @IsBoolean()
  isActive!: boolean;
}
