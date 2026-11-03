import { InputType, Field, Int } from '@nestjs/graphql';
import { StaffRole } from '../../enums/staff.role';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class StaffInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  password!: string;

  @Field(() => Int)
  @IsNotEmpty()
  flightId!: number;

  @Field(() => StaffRole)
  @IsEnum(StaffRole)
  role!: StaffRole;

  @Field()
  @IsString()
  @IsNotEmpty()
  assignedFlight!: string;
}
