import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BagService } from './bag.service';
import { Bag } from './entities/bag.Entity';
import { BagDto } from './dto/bag.dto';
import { Roles } from 'src/decorator/staff.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guard/authGuard';
import { StaffRole } from 'src/enums/staff.role';

@Resolver()
export class BagResolver {
  constructor(private readonly bagService: BagService) {}

  @Query(() => [Bag])
  @Roles(
    StaffRole.ADMIN,
    StaffRole.FLIGHT_ATTENDANT,
    StaffRole.COPILOT,
    StaffRole.PILOT,
  )
  @UseGuards(AuthGuard)
  async getAllBags() {
    return await this.bagService.getAllBags();
  }

  @Query(() => Bag, { nullable: true })
  @Roles(
    StaffRole.ADMIN,
    StaffRole.FLIGHT_ATTENDANT,
    StaffRole.COPILOT,
    StaffRole.PILOT,
  )
  @UseGuards(AuthGuard)
  async getBagById(@Args('id') id: number) {
    return await this.bagService.getBagById(id);
  }

  @Mutation(() => Bag)
  @Roles(StaffRole.ADMIN, StaffRole.PILOT)
  @UseGuards(AuthGuard)
  async createBag(
    @Args('bag', { type: () => BagDto }) bag: Partial<BagDto>,
    @Args('passengerId') passengerId: number,
  ) {
    return await this.bagService.createBag(bag, passengerId);
  }

  @Mutation(() => Bag)
  @Roles(StaffRole.ADMIN, StaffRole.PILOT)
  @UseGuards(AuthGuard)
  async updateBag(
    @Args('id') id: number,
    @Args('bag', { type: () => BagDto }) bag: Partial<BagDto>,
  ) {
    return await this.bagService.updateBag(id, bag);
  }

  @Mutation(() => Boolean)
  @Roles(StaffRole.ADMIN)
  @UseGuards(AuthGuard)
  async deleteBag(@Args('id') id: number) {
    return await this.bagService.deleteBag(id);
  }
}
