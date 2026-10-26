import { forwardRef, Module } from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { PassengerResolver } from './passenger.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassengerEntity } from './entities/passenger.Entity';
import { AuthModule } from 'src/auth/auth.module';
import { StaffModule } from 'src/staff/staff.module';

@Module({
  providers: [PassengerResolver, PassengerService],
  imports: [
    TypeOrmModule.forFeature([PassengerEntity]),
    forwardRef(() => AuthModule),
    forwardRef(() => StaffModule),
  ],
  exports: [PassengerService],
})
export class PassengerModule {}
