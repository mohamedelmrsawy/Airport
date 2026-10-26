import { forwardRef, Module } from '@nestjs/common';
import { BagService } from './bag.service';
import { BagResolver } from './bag.resolver';
import { Bag } from './entities/bag.Entity';
import { TypeOrmModule } from 'node_modules/@nestjs/typeorm/dist/typeorm.module';
import { PassengerModule } from 'src/passenger/passenger.module';
import { AuthModule } from 'src/auth/auth.module';
import { StaffModule } from 'src/staff/staff.module';

@Module({
  providers: [BagResolver, BagService],
  imports: [
    TypeOrmModule.forFeature([Bag]),
    PassengerModule,
    forwardRef(() => AuthModule),
    forwardRef(() => StaffModule),
  ],
})
export class BagModule {}
