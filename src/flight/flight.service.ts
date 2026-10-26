import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FlightEntity } from './entities/flight.Entity';
import { Repository } from 'typeorm';
import { FlightInput } from './dto/flight.dto';
import { FlightFilter } from './filter/flight.filter';
import { AirportService } from 'src/airport/airport.service';

@Injectable()
export class FlightService {
  constructor(
    @InjectRepository(FlightEntity)
    private readonly flightRepository: Repository<FlightEntity>,
    private readonly airportService: AirportService,
  ) {}

  async getAllFlights(filter?: FlightFilter, page = 1, take = 10) {
    const query = this.flightRepository.createQueryBuilder('flight');

    if (filter) {
      if (filter.airline !== undefined) {
        query.where('flight.airline = :airline', { airline: filter.airline });
      }

      if (filter.departureTime !== undefined) {
        query.andWhere('flight.departureTime = :departureTime', {
          departureTime: filter.departureTime,
        });
      }

      if (filter.destinationAirport !== undefined) {
        query.andWhere('flight.destinationAirport = :destinationAirport', {
          destinationAirport: filter.destinationAirport,
        });
      }
    }

    const skip = (page - 1) * take;
    query.skip(skip).take(take);

    const flights = await query.getMany();

    return flights;
  }

  async getFlightById(Id: number) {
    return await this.flightRepository.findOne({ where: { Id } });
  }

  async createFlight(flightData: FlightInput, airportId: number) {
    if (!flightData) {
      throw new BadRequestException();
    }
    const existingFlight = await this.flightRepository.findOne({
      where: { flightNumber: flightData.flightNumber },
    });
    if (existingFlight) {
      throw new BadRequestException(
        'Flight with this flight number already exists',
      );
    }

    const airport = await this.airportService.getAirportById(airportId);

    if (!airport) {
      throw new NotFoundException();
    }

    const flight = this.flightRepository.create({
      ...flightData,
      airport,
    });
    return await this.flightRepository.save(flight);
  }

  async updateFlight(Id: number, flightData: FlightInput) {
    const flight = await this.flightRepository.findOne({ where: { Id } });
    if (!flight) {
      throw new BadRequestException('Flight not found');
    }
    return await this.flightRepository.save({ ...flight, ...flightData });
  }

  async deleteFlight(Id: number) {
    const flight = await this.flightRepository.findOne({ where: { Id } });
    if (!flight) {
      throw new BadRequestException('Flight not found');
    }
    const result = await this.flightRepository.delete(flight);
    return result.affected !== 0;
  }
}
