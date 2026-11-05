import { forwardRef, Module } from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightResolver } from './flight.resolver';
import { FlightEntity } from './entities/flight.Entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirportModule } from '../airport/airport.module';
import { AuthModule } from '../auth/auth.module';
import { StaffModule } from '../staff/staff.module';

@Module({
  providers: [FlightResolver, FlightService],
  imports: [
    TypeOrmModule.forFeature([FlightEntity]),
    AirportModule,
    forwardRef(() => AuthModule),
    forwardRef(() => StaffModule),
  ],
  exports: [FlightService],
})
export class FlightModule {}
