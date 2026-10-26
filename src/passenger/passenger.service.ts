import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PassengerEntity } from './entities/passenger.Entity';
import { Repository } from 'typeorm/repository/Repository.js';
import { PassengerDto } from './dto/passenger.dto';

@Injectable()
export class PassengerService {
  constructor(
    @InjectRepository(PassengerEntity)
    private passengerRepository: Repository<PassengerEntity>,
  ) {}

  async getAllPassengers() {
    return await this.passengerRepository.find();
  }

  async getPassengerById(id: number) {
    return await this.passengerRepository.findOne({
      where: { Id: id },
    });
  }

  async createPassenger(passenger: PassengerDto) {
    if (!passenger) {
      throw new BadRequestException();
    }

    const existingPassenger = await this.passengerRepository.findOne({
      where: { passportNumber: passenger.passportNumber },
    });

    if (existingPassenger) {
      throw new Error('Passenger with this passport number already exists');
    }
    return await this.passengerRepository.save(passenger);
  }

  async updatePassenger(id: number, passenger: PassengerDto) {
    const existingPassenger = await this.passengerRepository.findOne({
      where: { Id: id },
    });

    if (!existingPassenger) {
      throw new BadRequestException('Passenger not found');
    }

    return await this.passengerRepository.save({
      ...existingPassenger,
      ...passenger,
    });
  }

  async deletePassenger(id: number) {
    const existingPassenger = await this.passengerRepository.findOne({
      where: { Id: id },
    });

    if (!existingPassenger) {
      throw new BadRequestException('Passenger not found');
    }

    const result = await this.passengerRepository.delete(existingPassenger);
    return result.affected !== 0;
  }
}
