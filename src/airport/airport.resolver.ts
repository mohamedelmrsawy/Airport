import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AirportService } from './airport.service';
import { AirportEntity } from './entities/airport.Entity';
import { AirportDto } from './dto/airport.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guard/authGuard';
import { Roles } from 'src/decorator/staff.decorator';
import { StaffRole } from 'src/enums/staff.role';

@Resolver()
export class AirportResolver {
  constructor(private readonly airportService: AirportService) {}

  @Query(() => [AirportEntity])
  @Roles(StaffRole.ADMIN)
  @UseGuards(AuthGuard)
  async getAllAirports() {
    return await this.airportService.getAllAirports();
  }

  @Query(() => AirportEntity, { nullable: true })
  @Roles(
    StaffRole.ADMIN,
    StaffRole.FLIGHT_ATTENDANT,
    StaffRole.COPILOT,
    StaffRole.PILOT,
  )
  @UseGuards(AuthGuard)
  async getAirportById(@Args('id') id: number) {
    return await this.airportService.getAirportById(id);
  }

  @Mutation(() => AirportEntity)
  @Roles(StaffRole.ADMIN, StaffRole.PILOT)
  @UseGuards(AuthGuard)
  async createAirport(
    @Args('airportData', { type: () => AirportDto })
    airportData: Partial<AirportDto>,
  ) {
    return await this.airportService.createAirport(airportData);
  }

  @Mutation(() => AirportEntity)
  @Roles(StaffRole.ADMIN, StaffRole.COPILOT)
  @UseGuards(AuthGuard)
  async updateAirport(
    @Args('id') id: number,
    @Args('airportData', { type: () => AirportDto })
    airportData: Partial<AirportDto>,
  ) {
    return await this.airportService.updateAirport(id, airportData);
  }

  @Mutation(() => Boolean)
  @Roles(StaffRole.ADMIN)
  @UseGuards(AuthGuard)
  async deleteAirport(@Args('id') id: number) {
    await this.airportService.deleteAirport(id);
    return true;
  }
}
