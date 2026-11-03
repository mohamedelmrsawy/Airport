import { InputType, Field, Int } from '@nestjs/graphql';
import { BagStatus } from '../../enums/bag.status';
import { IsEnum, IsNumber, IsString } from 'class-validator';

@InputType()
export class BagDto {
  @Field()
  @IsString()
  color!: string;

  @Field()
  @IsString()
  baggAgeTag!: string;

  @Field(() => Int)
  @IsNumber()
  weight!: number;

  @Field(() => BagStatus)
  @IsEnum(BagStatus)
  status!: BagStatus;
}
