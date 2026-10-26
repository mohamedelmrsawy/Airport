import { InputType, Field, Int } from '@nestjs/graphql';
import { StaffRole } from '../../enums/staff.role';

@InputType()
export class StaffInput {
  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;

  @Field(() => Int)
  flightId!: number;

  @Field(() => StaffRole)
  role!: StaffRole;

  @Field()
  assignedFlight!: string;
}
