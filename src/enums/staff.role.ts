import { registerEnumType } from '@nestjs/graphql';

export enum StaffRole {
  ADMIN = 'ADMIN',
  PILOT = 'PILOT',
  COPILOT = 'COPILOT',
  FLIGHT_ATTENDANT = 'FLIGHT_ATTENDANT',
}

registerEnumType(StaffRole, {
  name: 'StaffRole',
});
