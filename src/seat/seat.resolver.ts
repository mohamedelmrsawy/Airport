import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SeatService } from './seat.service';
import { Seat } from './entities/seat.Entity';
import { SeatDto } from './dto/seat.dto';
import { Roles } from 'src/decorator/staff.decorator';
import { StaffRole } from 'src/enums/staff.role';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guard/authGuard';

@Resolver()
export class SeatResolver {
  constructor(private readonly seatService: SeatService) {}

  @Query(() => [Seat])
  @Roles(
    StaffRole.ADMIN,
    StaffRole.FLIGHT_ATTENDANT,
    StaffRole.COPILOT,
    StaffRole.PILOT,
  )
  @UseGuards(AuthGuard)
  async getAllSeats() {
    return await this.seatService.getAllSeats();
  }

  @Query(() => Seat, { nullable: true })
  @Roles(
    StaffRole.ADMIN,
    StaffRole.FLIGHT_ATTENDANT,
    StaffRole.COPILOT,
    StaffRole.PILOT,
  )
  @UseGuards(AuthGuard)
  async getSeatById(seatId: number) {
    return await this.seatService.getSeatById(seatId);
  }

  @Mutation(() => Seat)
  @Roles(StaffRole.ADMIN, StaffRole.PILOT)
  @UseGuards(AuthGuard)
  async createSeat(
    @Args('seatId') seatId: number,
    @Args('seatDto', { type: () => SeatDto }) seatDto: Partial<Seat>,
    @Args('flightId') flightId: number,
  ) {
    return await this.seatService.createSeat(seatId, seatDto, flightId);
  }

  @Mutation(() => Seat)
  @Roles(StaffRole.ADMIN, StaffRole.PILOT)
  @UseGuards(AuthGuard)
  async updateSeat(seatId: number, seatDto: Partial<Seat>) {
    return await this.seatService.updateSeat(seatId, seatDto);
  }

  @Mutation(() => Boolean)
  @Roles(StaffRole.ADMIN)
  @UseGuards(AuthGuard)
  async removeSeat(@Args('id') id: number) {
    return await this.seatService.deleteSeat(id);
  }
}
