import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seat } from './entities/seat.Entity';
import { Repository } from 'typeorm';
import { SeatDto } from './dto/seat.dto';
import { FlightService } from 'src/flight/flight.service';

@Injectable()
export class SeatService {
  constructor(
    @InjectRepository(Seat) private readonly seatRepository: Repository<Seat>,
    private readonly flightService: FlightService,
  ) {}

  async getAllSeats() {
    return await this.seatRepository.find();
  }

  async getSeatById(seatId: number) {
    return await this.seatRepository.findOne({ where: { Id: seatId } });
  }

  async createSeat(
    seatId: number,
    seatDto: Partial<SeatDto>,
    flightId: number,
  ) {
    if (!seatDto) {
      throw new BadRequestException('seat data is required');
    }
    const existingSeat = await this.seatRepository.findOne({
      where: { Id: seatId },
    });
    if (existingSeat) {
      throw new BadRequestException(`Seat with Id ${seatId} already exists`);
    }

    const flight = await this.flightService.getFlightById(flightId);

    if (!flight) {
      throw new NotFoundException();
    }

    const newSeat = this.seatRepository.create(seatDto);
    return await this.seatRepository.save(newSeat);
  }

  async updateSeat(seatId: number, seatDto: Partial<SeatDto>) {
    if (!seatDto) {
      throw new BadRequestException('seat data is required');
    }
    const existingSeat = await this.seatRepository.findOne({
      where: { Id: seatId },
    });
    if (!existingSeat) {
      throw new BadRequestException(`Seat with Id ${seatId} does not exist`);
    }
    const seat = await this.seatRepository.findOne({ where: { Id: seatId } });
    return await this.seatRepository.save({ ...seat, ...seatDto });
  }

  async deleteSeat(seatId: number) {
    const result = await this.seatRepository.delete(seatId);
    return result.affected !== 0;
  }
}
