import { Field, InputType } from '@nestjs/graphql';
import { SeatStatus } from '../../enums/seat.status';

@InputType()
export class SeatDto {
  @Field()
  seatNumbber!: string;

  @Field(() => SeatStatus)
  status!: SeatStatus;
}
