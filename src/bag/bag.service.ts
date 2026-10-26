import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bag } from './entities/bag.Entity';
import { Repository } from 'typeorm';
import { BagDto } from './dto/bag.dto';
import { PassengerService } from 'src/passenger/passenger.service';

@Injectable()
export class BagService {
  constructor(
    @InjectRepository(Bag) private readonly bagRepository: Repository<Bag>,
    private readonly passengerService: PassengerService,
  ) {}

  async getAllBags() {
    return await this.bagRepository.find();
  }

  async getBagById(id: number) {
    return await this.bagRepository.findOne({ where: { Id: id } });
  }

  async createBag(bag: Partial<BagDto>, passengerId: number) {
    if (!bag) {
      throw new BadRequestException('Bag data is required');
    }
    const existingBag = await this.bagRepository.findOne({
      where: { baggAgeTag: bag.baggAgeTag },
    });
    if (existingBag) {
      throw new ConflictException(
        `Bag with tag ${bag.baggAgeTag} already exists`,
      );
    }

    const passenger = await this.passengerService.getPassengerById(passengerId);

    if (!passenger) {
      throw new NotFoundException();
    }

    const newBag = this.bagRepository.create({
      ...bag,
      passengerId: passenger,
    });
    return await this.bagRepository.save(newBag);
  }

  async updateBag(id: number, bag: Partial<BagDto>) {
    if (!bag) {
      throw new BadRequestException('Bag data is required');
    }
    const existingBag = await this.bagRepository.findOne({ where: { Id: id } });
    if (!existingBag) {
      throw new NotFoundException(`Bag with ID ${id} not found`);
    }
    Object.assign(existingBag, bag);
    return await this.bagRepository.save(existingBag);
  }

  async deleteBag(id: number) {
    const result = await this.bagRepository.delete(id);
    return result.affected !== 0;
  }
}
