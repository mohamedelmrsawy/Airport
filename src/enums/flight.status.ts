import { registerEnumType } from '@nestjs/graphql';

export enum FlightStatus {
  DELAYED = 'DELAYED',
  CANCELLED = 'CANCELLED',
  IN_FLIGHT = 'IN_FLIGHT',
  LANDED = 'LANDED',
}

registerEnumType(FlightStatus, {
  name: 'FlightStatus',
  description: 'The status of a flight',
});
