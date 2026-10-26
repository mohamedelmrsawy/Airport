import { Module, forwardRef } from '@nestjs/common';
import { AirportService } from './airport.service';
import { AirportResolver } from './airport.resolver';
import { AirportEntity } from './entities/airport.Entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { StaffModule } from 'src/staff/staff.module';

@Module({
  providers: [AirportResolver, AirportService],
  imports: [
    TypeOrmModule.forFeature([AirportEntity]),
    forwardRef(() => AuthModule),
    forwardRef(() => StaffModule),
  ],
  exports: [AirportService],
})
export class AirportModule {}
