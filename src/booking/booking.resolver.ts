import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BookingService } from './booking.service';
import { Book } from './entities/booking.Entity';
import { BookingDto } from './dto/booking.dto';
import { Roles } from 'src/decorator/staff.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guard/authGuard';
import { StaffRole } from 'src/enums/staff.role';

@Resolver()
export class BookingResolver {
  constructor(private readonly bookingService: BookingService) {}

  @Query(() => [Book])
  @Roles(
    StaffRole.ADMIN,
    StaffRole.FLIGHT_ATTENDANT,
    StaffRole.COPILOT,
    StaffRole.PILOT,
  )
  @UseGuards(AuthGuard)
  async getAllBookings() {
    return await this.bookingService.getAllBookings();
  }

  @Query(() => Book, { nullable: true })
  @Roles(
    StaffRole.ADMIN,
    StaffRole.FLIGHT_ATTENDANT,
    StaffRole.COPILOT,
    StaffRole.PILOT,
  )
  @UseGuards(AuthGuard)
  async getBookingById(@Args('id') id: number) {
    return await this.bookingService.getBookingById(id);
  }

  @Mutation(() => Book)
  @Roles(StaffRole.ADMIN, StaffRole.PILOT)
  @UseGuards(AuthGuard)
  async createBooking(@Args('booking') booking: BookingDto) {
    return await this.bookingService.createBooking(booking);
  }

  @Mutation(() => Book)
  @Roles(StaffRole.ADMIN, StaffRole.PILOT)
  @UseGuards(AuthGuard)
  async updateBooking(
    @Args('id') id: number,
    @Args('updatedBooking', { type: () => BookingDto })
    updatedBooking: Partial<BookingDto>,
  ) {
    return await this.bookingService.updateBooking(id, updatedBooking);
  }

  @Mutation(() => Boolean)
  @Roles(StaffRole.ADMIN)
  @UseGuards(AuthGuard)
  async deleteBooking(@Args('id') id: number) {
    return await this.bookingService.deleteBooking(id);
  }
}
