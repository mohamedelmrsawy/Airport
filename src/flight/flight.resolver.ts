import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { FlightService } from './flight.service';
import { FlightEntity } from './entities/flight.Entity';
import { FlightInput } from './dto/flight.dto';
import { FlightFilter } from './filter/flight.filter';
import { Roles } from 'src/decorator/staff.decorator';
import { StaffRole } from 'src/enums/staff.role';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guard/authGuard';
import { Staff } from '../staff/entities/staff.Entity';
import DataLoader from 'dataloader';
import { PubSub } from 'graphql-subscriptions';

@Resolver(() => FlightEntity)
export class FlightResolver {
  constructor(private readonly flightService: FlightService) {}

  pubSub = new PubSub();

  @Query(() => [FlightEntity])
  @Roles(
    StaffRole.ADMIN,
    StaffRole.FLIGHT_ATTENDANT,
    StaffRole.COPILOT,
    StaffRole.PILOT,
  )
  @UseGuards(AuthGuard)
  async getAllFlights(
    @Args('filter', { nullable: true }) filter?: FlightFilter,
    @Args('page', { nullable: true }) page?: number,
    @Args('take', { nullable: true }) take?: number,
  ) {
    return await this.flightService.getAllFlights(filter, page, take);
  }

  @ResolveField(() => [Staff])
  staff(
    @Parent() flight: FlightEntity,
    @Context() context: { staffLoader: DataLoader<number, Staff[]> },
  ) {
    return context.staffLoader.load(flight.Id);
  }

  @Query(() => FlightEntity, { nullable: true })
  @Roles(
    StaffRole.ADMIN,
    StaffRole.FLIGHT_ATTENDANT,
    StaffRole.COPILOT,
    StaffRole.PILOT,
  )
  @UseGuards(AuthGuard)
  async getFlightById(@Args('Id') Id: number) {
    return await this.flightService.getFlightById(Id);
  }

  @Mutation(() => FlightEntity)
  @Roles(StaffRole.ADMIN, StaffRole.PILOT)
  @UseGuards(AuthGuard)
  async createFlight(
    @Args('flightData') flightData: FlightInput,
    @Args('airportId') airportId: number,
  ) {
    return await this.flightService.createFlight(flightData, airportId);
  }

  @Mutation(() => FlightEntity)
  @Roles(StaffRole.ADMIN)
  @UseGuards(AuthGuard)
  async updateFlight(
    @Args('Id') Id: number,
    @Args('flightData') flightData: FlightInput,
  ) {
    const newFlight = await this.flightService.updateFlight(Id, flightData);
    await this.pubSub.publish('changFlightStatus', {
      changFlightStatus: newFlight,
    });
    return newFlight;
  }

  @Mutation(() => Boolean)
  @Roles(StaffRole.ADMIN)
  @UseGuards(AuthGuard)
  async deleteFlight(@Args('Id') Id: number) {
    await this.flightService.deleteFlight(Id);
    return true;
  }

  @Subscription(() => FlightEntity)
  @Roles(StaffRole.ADMIN)
  @UseGuards(AuthGuard)
  changFlightStatus() {
    return this.pubSub.asyncIterableIterator('changFlightStatus');
  }
}
