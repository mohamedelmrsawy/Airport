import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AirportEntity } from './entities/airport.Entity';
import { Repository } from 'typeorm';
import { AirportDto } from './dto/airport.dto';

@Injectable()
export class AirportService {
  constructor(
    @InjectRepository(AirportEntity)
    private readonly airportRepository: Repository<AirportEntity>,
  ) {}

  async getAllAirports() {
    return await this.airportRepository.find();
  }

  async getAirportById(id: number) {
    return await this.airportRepository.findOne({ where: { id } });
  }

  async createAirport(airportData: Partial<AirportDto>) {
    if (!airportData) {
      throw new BadRequestException(
        'Missing required fields: name, location, or country',
      );
    }
    const existingAirport = await this.airportRepository.findOne({
      where: { name: airportData.name },
    });
    if (existingAirport) {
      throw new BadRequestException(
        `Airport with name ${airportData.name} already exists`,
      );
    }
    const airport = this.airportRepository.create(airportData);
    return await this.airportRepository.save(airport);
  }

  async updateAirport(id: number, airportData: Partial<AirportDto>) {
    if (!airportData) {
      throw new BadRequestException(
        'Missing required fields: name, location, or country',
      );
    }
    const existingAirport = await this.airportRepository.findOne({
      where: { id },
    });
    if (!existingAirport) {
      throw new BadRequestException(`Airport with id ${id} does not exist`);
    }
    return await this.airportRepository.save({
      ...existingAirport,
      ...airportData,
    });
  }

  async deleteAirport(id: number) {
    const result = await this.airportRepository.delete(id);
    return result.affected !== 0;
  }
}
