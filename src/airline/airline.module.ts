import { Module, forwardRef } from '@nestjs/common';
import { AirlineService } from './airline.service';
import { AirlineResolver } from './airline.resolver';
import { Airline } from './entities/airline.Entity';
import { TypeOrmModule } from 'node_modules/@nestjs/typeorm/dist/typeorm.module';
import { AuthModule } from 'src/auth/auth.module';
import { StaffModule } from 'src/staff/staff.module';

@Module({
  providers: [AirlineResolver, AirlineService],
  imports: [
    TypeOrmModule.forFeature([Airline]),
    forwardRef(() => AuthModule),
    forwardRef(() => StaffModule),
  ],
})
export class AirlineModule {}
