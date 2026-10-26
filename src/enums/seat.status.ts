import { registerEnumType } from '@nestjs/graphql';

export enum SeatStatus {
  AVAILABLE = 'AVAILABLE',
  RESERVED = 'RESERVED',
  MAINTENANCE = 'MAINTENANCE',
}

registerEnumType(SeatStatus, {
  name: 'SeatStatus',
});
