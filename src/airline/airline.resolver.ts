import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AirlineService } from './airline.service';
import { Airline } from './entities/airline.Entity';
import { AirlineDto } from './dto/airline.dto';
import { AuthGuard } from '../guard/authGuard';
import { Roles } from '../decorator/staff.decorator';
import { StaffRole } from '../enums/staff.role';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class AirlineResolver {
  constructor(private readonly airlineService: AirlineService) {}

  @Query(() => [Airline])
  @Roles(StaffRole.ADMIN)
  @UseGuards(AuthGuard)
  async getAllAirlines() {
    return await this.airlineService.getAllAirlines();
  }

  @Query(() => Airline, { nullable: true })
  @Roles(
    StaffRole.ADMIN,
    StaffRole.FLIGHT_ATTENDANT,
    StaffRole.COPILOT,
    StaffRole.PILOT,
  )
  @UseGuards(AuthGuard)
  async getAirlineById(@Args('id') id: number) {
    return await this.airlineService.getAirlineById(id);
  }

  @Mutation(() => Airline)
  @Roles(StaffRole.ADMIN, StaffRole.PILOT)
  @UseGuards(AuthGuard)
  async createAirline(
    @Args('airlineData', { type: () => AirlineDto })
    airlineData: AirlineDto,
  ) {
    return await this.airlineService.createAirline(airlineData);
  }

  @Mutation(() => Airline)
  @Roles(StaffRole.ADMIN, StaffRole.COPILOT)
  @UseGuards(AuthGuard)
  async updateAirline(
    @Args('id') id: number,
    @Args('airlineData', { type: () => AirlineDto })
    airlineData: AirlineDto,
  ) {
    return await this.airlineService.updateAirline(id, airlineData);
  }

  @Mutation(() => Airline)
  @Roles(StaffRole.ADMIN)
  @UseGuards(AuthGuard)
  async deleteAirline(@Args('id') id: number) {
    return await this.airlineService.deleteAirline(id);
  }
}
