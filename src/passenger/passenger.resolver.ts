import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { PassengerService } from './passenger.service';
import { PassengerEntity } from './entities/passenger.Entity';
import { PassengerDto } from './dto/passenger.dto';
import { Roles } from 'src/decorator/staff.decorator';
import { StaffRole } from 'src/enums/staff.role';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guard/authGuard';

@Resolver()
export class PassengerResolver {
  constructor(private readonly passengerService: PassengerService) {}

  @Query(() => [PassengerEntity])
  @Roles(
    StaffRole.ADMIN,
    StaffRole.FLIGHT_ATTENDANT,
    StaffRole.COPILOT,
    StaffRole.PILOT,
  )
  @UseGuards(AuthGuard)
  async getAllPassengers() {
    return await this.passengerService.getAllPassengers();
  }

  @Query(() => PassengerEntity)
  @Roles(
    StaffRole.ADMIN,
    StaffRole.FLIGHT_ATTENDANT,
    StaffRole.COPILOT,
    StaffRole.PILOT,
  )
  @UseGuards(AuthGuard)
  async getPassengerById(@Args('id') id: number) {
    return await this.passengerService.getPassengerById(id);
  }

  @Mutation(() => PassengerEntity)
  @Roles(StaffRole.ADMIN)
  @UseGuards(AuthGuard)
  async createPassenger(@Args('passenger') passenger: PassengerDto) {
    return await this.passengerService.createPassenger(passenger);
  }

  @Mutation(() => PassengerEntity)
  @Roles(StaffRole.ADMIN, StaffRole.PILOT)
  @UseGuards(AuthGuard)
  async updatePassenger(
    @Args('id') id: number,
    @Args('passenger') passenger: PassengerDto,
  ) {
    return await this.passengerService.updatePassenger(id, passenger);
  }

  @Mutation(() => Boolean)
  @Roles(StaffRole.ADMIN)
  @UseGuards(AuthGuard)
  async deletePassenger(@Args('id') id: number) {
    return await this.passengerService.deletePassenger(id);
  }
}
