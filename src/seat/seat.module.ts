import { forwardRef, Module } from '@nestjs/common';
import { SeatService } from './seat.service';
import { SeatResolver } from './seat.resolver';
import { Seat } from './entities/seat.Entity';
import { TypeOrmModule } from 'node_modules/@nestjs/typeorm/dist/typeorm.module';
import { FlightModule } from 'src/flight/flight.module';
import { AuthModule } from 'src/auth/auth.module';
import { StaffModule } from 'src/staff/staff.module';

@Module({
  providers: [SeatResolver, SeatService],
  imports: [
    TypeOrmModule.forFeature([Seat]),
    forwardRef(() => FlightModule),
    forwardRef(() => AuthModule),
    forwardRef(() => StaffModule),
  ],
  exports: [SeatService],
})
export class SeatModule {}
