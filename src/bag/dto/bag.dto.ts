import { InputType, Field, Int } from '@nestjs/graphql';
import { BagStatus } from '../../enums/bag.status';

@InputType()
export class BagDto {
  @Field()
  color!: string;

  @Field()
  baggAgeTag!: string;

  @Field(() => Int)
  weight!: number;

  @Field(() => BagStatus)
  status!: BagStatus;
}
