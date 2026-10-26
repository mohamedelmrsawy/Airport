import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from './entities/staff.Entity';
import { Repository } from 'typeorm';
import { StaffInput } from './dto/staff.dto';
import * as bcrypt from 'bcryptjs';
import { FlightService } from 'src/flight/flight.service';
import DataLoader from 'dataloader';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
    private readonly flightService: FlightService,
  ) {}

  async getAllStaff() {
    return await this.staffRepository.find();
  }

  async getStaffById(EmployeeId: number) {
    return await this.staffRepository.findOne({ where: { EmployeeId } });
  }

  async getStaffByName(staffName: string) {
    return await this.staffRepository.findOne({ where: { name: staffName } });
  }

  async createStaff(staffdto: Partial<StaffInput>, flightId: number) {
    if (!staffdto) {
      throw new BadRequestException('Staff data is required');
    }

    if (!staffdto.password) {
      throw new BadRequestException('Password is required');
    }

    const hashPassword = await bcrypt.hash(staffdto.password, 10);

    const flight = await this.flightService.getFlightById(flightId);

    if (!flight) {
      throw new NotFoundException();
    }

    const staff = this.staffRepository.create({
      ...staffdto,
      password: hashPassword,
      flight,
    });
    return await this.staffRepository.save(staff);
  }

  async updateStaff(staffId: number, staffdto: Partial<StaffInput>) {
    if (!staffdto) {
      throw new BadRequestException('Staff data is required');
    }
    const existingStaff = await this.staffRepository.findOne({
      where: { EmployeeId: staffId },
    });
    if (!existingStaff) {
      throw new BadRequestException(
        `Staff with EmployeeId ${staffId} does not exist`,
      );
    }
    return await this.staffRepository.save({
      ...existingStaff,
      ...staffdto,
    });
  }

  async deleteStaff(staffId: number) {
    const result = await this.staffRepository.delete(staffId);
    return result.affected !== 0;
  }

  async getStaffByEmail(email: string) {
    return await this.staffRepository.findOne({ where: { email } });
  }

  staffDataLoader() {
    return new DataLoader<number, Staff[]>(async (flightId) => {
      const allStaff = await this.staffRepository
        .createQueryBuilder('staff')
        .where('staff.flight IN (:...flightId)', { flightId })
        .getMany();

      const grouped = new Map<number, Staff[]>();

      for (const staff of allStaff) {
        if (!grouped.has(staff.flightId)) {
          grouped.set(staff.flightId, []);
        }
        grouped.get(staff.flightId)?.push(staff);
      }

      return flightId.map((Ids) => grouped.get(Ids) ?? []);
    });
  }
}
