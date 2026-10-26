import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../helper/jwtPayload';
import { LoginDto } from '../helper/login.dto';
import { StaffService } from 'src/staff/staff.service';
import * as bcrypt from 'bcryptjs';
import { StaffInput } from 'src/staff/dto/staff.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly staffService: StaffService,
  ) {}

  async login(logindto: LoginDto) {
    if (!logindto.email || !logindto.password) {
      throw new BadRequestException();
    }

    const existingStaff = await this.staffService.getStaffByEmail(
      logindto.email,
    );

    if (!existingStaff) {
      throw new NotFoundException();
    }

    const PasswordValid = await bcrypt.compare(
      logindto.password,
      existingStaff.password,
    );

    if (!PasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload: JwtPayload = {
      name: existingStaff.name,
      role: existingStaff.role,
    };

    if (!payload.name && !payload.role) {
      throw new BadRequestException();
    }
    const jwt = await this.jwtService.signAsync(payload);
    return jwt;
  }

  async register(register: StaffInput) {
    if (!register) {
      throw new BadRequestException();
    }

    const existingStaff = await this.staffService.getStaffByEmail(
      register.email,
    );

    if (existingStaff) {
      throw new BadRequestException('Staff with EmployeeId already exists');
    }

    const staff = await this.staffService.createStaff(
      register,
      register.flightId,
    );

    const payload: JwtPayload = {
      name: staff.name,
      role: staff.role,
    };

    const jwt = await this.jwtService.signAsync(payload);
    return jwt;
  }
}
