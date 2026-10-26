import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Book } from './entities/booking.Entity';
import { BookingDto } from './dto/booking.dto';
import { PassengerEntity } from 'src/passenger/entities/passenger.Entity';
import { FlightEntity } from 'src/flight/entities/flight.Entity';
import { Seat } from 'src/seat/entities/seat.Entity';
import { FlightStatus } from '../enums/flight.status';
import { SeatStatus } from 'src/enums/seat.status';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';

@Injectable()
export class BookingService {
  constructor(
    @InjectQueue('sendEmail') private readonly emailQueue: Queue,
    @InjectRepository(Book)
    private readonly bookingRepository: Repository<Book>,
    private readonly dataSource: DataSource,
  ) {}

  async getAllBookings() {
    return await this.bookingRepository.find();
  }

  async getBookingById(id: number) {
    return await this.bookingRepository.findOne({ where: { Id: id } });
  }

  async createBooking(booking: BookingDto) {
    const query = this.dataSource.createQueryRunner();
    try {
      await query.connect();
      await query.startTransaction();

      const passenger = await query.manager.findOne(PassengerEntity, {
        where: { passportNumber: booking.passportNumber },
      });

      const flight = await query.manager
        .createQueryBuilder(FlightEntity, 'flight')
        .where('flight.flightNumber = :flightNumber', {
          flightNumber: booking.flightNumber,
        })
        .setLock('pessimistic_write')
        .getOne();

      const seat = await query.manager
        .createQueryBuilder(Seat, 'seat')
        .where('seat.seatNumber = :seatNumber', {
          seatNumber: booking.seatNumber,
        })
        .setLock('pessimistic_write')
        .getOne();

      if (!passenger || !flight || !seat) {
        throw new NotFoundException('xxxxxxxx');
      }

      if (seat?.status !== SeatStatus.AVAILABLE) {
        throw new BadRequestException();
      }

      if (
        flight.status == FlightStatus.CANCELLED ||
        flight.status == FlightStatus.DELAYED ||
        flight.availableSeats <= 0
      ) {
        throw new BadRequestException('Flight is not availablexx');
      }

      const newBooking = new Book();
      newBooking.flight = flight;
      newBooking.passenger = passenger;
      newBooking.seat = seat;
      newBooking.flightId = flight.Id;
      newBooking.seatNumber = booking.seatNumber;
      newBooking.passengerId = passenger.Id;
      newBooking.name = booking.name;
      newBooking.email = booking.email;
      newBooking.age = booking.age;
      newBooking.seatId = seat.Id;
      newBooking.passportNumber = booking.passportNumber;

      flight.availableSeats -= 1;
      seat.status = SeatStatus.RESERVED;

      await query.manager.save(flight);
      await query.manager.save(seat);
      await query.manager.save(newBooking);

      await query.commitTransaction();

      await this.emailQueue.add('email', {
        seatNumber: newBooking.seatNumber,
        passenger: newBooking.passenger,
      });

      return newBooking;
    } catch (err) {
      console.log(err);
      await query.rollbackTransaction();
      throw err;
    } finally {
      await query.release();
    }
  }

  async updateBooking(id: number, updatedBooking: Partial<BookingDto>) {
    if (!updatedBooking) {
      return new BadRequestException('Booking data is required');
    }
    const existingBooking = await this.bookingRepository.findOne({
      where: { Id: id },
    });
    if (!existingBooking) {
      return new NotFoundException('Booking not found');
    }

    return await this.bookingRepository.save({
      ...existingBooking,
      ...updatedBooking,
    });
  }

  async deleteBooking(id: number): Promise<boolean> {
    const existingBooking = await this.bookingRepository.findOne({
      where: { Id: id },
    });
    if (!existingBooking) {
      throw new NotFoundException('Booking not found');
    }
    const result = await this.bookingRepository.delete(existingBooking);
    return result.affected !== 0;
  }
}
