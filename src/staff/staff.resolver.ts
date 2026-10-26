import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StaffService } from './staff.service';
import { Staff } from './entities/staff.Entity';
import { StaffInput } from './dto/staff.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guard/authGuard';
import { Roles } from '../decorator/staff.decorator';
import { StaffRole } from 'src/enums/staff.role';

@Resolver()
export class StaffResolver {
  constructor(private readonly staffService: StaffService) {}

  @Query(() => [Staff])
  @Roles(StaffRole.ADMIN)
  @UseGuards(AuthGuard)
  async getAllStaff() {
    return await this.staffService.getAllStaff();
  }

  @Query(() => Staff, { nullable: true })
  @Roles(
    StaffRole.ADMIN,
    StaffRole.FLIGHT_ATTENDANT,
    StaffRole.COPILOT,
    StaffRole.PILOT,
  )
  @UseGuards(AuthGuard)
  async getStaffById(staffId: number) {
    return await this.staffService.getStaffById(staffId);
  }

  @Mutation(() => Staff)
  @Roles(StaffRole.ADMIN, StaffRole.PILOT)
  @UseGuards(AuthGuard)
  async createStaff(
    @Args('staffdto', { type: () => StaffInput }) staffdto: Partial<StaffInput>,
    @Args('flightId') flightId: number,
  ) {
    return await this.staffService.createStaff(staffdto, flightId);
  }

  @Mutation(() => Staff)
  @Roles(StaffRole.ADMIN, StaffRole.FLIGHT_ATTENDANT, StaffRole.COPILOT)
  @UseGuards(AuthGuard)
  async updateStaff(staffId: number, staffdto: Partial<StaffInput>) {
    return await this.staffService.updateStaff(staffId, staffdto);
  }

  @Mutation(() => Boolean)
  @Roles(StaffRole.ADMIN)
  @UseGuards(AuthGuard)
  async deleteStaff(staffId: number) {
    return await this.staffService.deleteStaff(staffId);
  }
}
