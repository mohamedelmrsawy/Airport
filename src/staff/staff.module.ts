import { Module, forwardRef } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffResolver } from './staff.resolver';
import { Staff } from './entities/staff.Entity';
import { TypeOrmModule } from 'node_modules/@nestjs/typeorm/dist/typeorm.module';
import { AuthModule } from 'src/auth/auth.module';
import { FlightModule } from 'src/flight/flight.module';
@Module({
  providers: [StaffResolver, StaffService],
  imports: [
    TypeOrmModule.forFeature([Staff]),
    forwardRef(() => AuthModule),
    forwardRef(() => FlightModule),
  ],
  exports: [StaffService],
})
export class StaffModule {}
