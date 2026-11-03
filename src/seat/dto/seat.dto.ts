import { Field, InputType } from '@nestjs/graphql';
import { SeatStatus } from '../../enums/seat.status';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class SeatDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  seatNumber!: string;

  @Field(() => SeatStatus)
  @IsEnum(SeatStatus)
  status!: SeatStatus;
}
