import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Airline } from './entities/airline.Entity';
import { AirlineDto } from './dto/airline.dto';

@Injectable()
export class AirlineService {
  constructor(
    @InjectRepository(Airline)
    private readonly airlineRepository: Repository<Airline>,
  ) {}

  async getAllAirlines() {
    return await this.airlineRepository.find();
  }

  async getAirlineById(id: number) {
    return await this.airlineRepository.findOne({ where: { id } });
  }

  async createAirline(airlineData: AirlineDto) {
    const existingAirline = await this.airlineRepository.findOne({
      where: { airlineCode: airlineData.airlineCode },
    });
    if (existingAirline) {
      throw new BadRequestException('Airline with this code already exists');
    }
    const newAirline = this.airlineRepository.create(airlineData);
    return await this.airlineRepository.save(newAirline);
  }

  async updateAirline(id: number, airlineData: AirlineDto) {
    const airline = await this.airlineRepository.findOne({ where: { id } });
    if (!airline) {
      throw new BadRequestException('Airline not found');
    }

    return await this.airlineRepository.save({
      ...airline,
      ...airlineData,
    });
  }

  async deleteAirline(id: number) {
    const airline = await this.airlineRepository.findOne({ where: { id } });
    if (!airline) {
      throw new NotFoundException('Airline not found');
    }
    return await this.airlineRepository.remove(airline);
  }
}
