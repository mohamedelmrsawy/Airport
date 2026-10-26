import { Module } from '@nestjs/common';
import { AirlineService } from './airline.service';
import { AirlineResolver } from './airline.resolver';

@Module({
  providers: [AirlineResolver, AirlineService],
})
export class AirlineModule {}
