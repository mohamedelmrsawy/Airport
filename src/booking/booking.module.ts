import { forwardRef, Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingResolver } from './booking.resolver';
import { TypeOrmModule } from 'node_modules/@nestjs/typeorm/dist/typeorm.module';
import { Book } from './entities/booking.Entity';
import { AuthModule } from 'src/auth/auth.module';
import { StaffModule } from 'src/staff/staff.module';
import { BullModule } from '@nestjs/bullmq';

@Module({
  providers: [BookingResolver, BookingService],
  imports: [
    TypeOrmModule.forFeature([Book]),
    forwardRef(() => AuthModule),
    forwardRef(() => StaffModule),
  ],
})
export class BookingModule {}
