import {
  CanActivate,
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtPayload } from '../helper/jwtPayload';
import { ConfigService } from '@nestjs/config';
import { StaffService } from 'src/staff/staff.service';
import { Reflector } from '@nestjs/core';
import { StaffRole } from 'src/enums/staff.role';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly staffService: StaffService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const GqlContext = GqlExecutionContext.create(context);
    const requst = GqlContext.getContext<{ req: Request }>().req;

    const [type, token] = requst.headers.authorization?.split(' ') ?? [];

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid or missing token');
    }

    const jwtPayload: JwtPayload = await this.jwtService.verifyAsync(token, {
      secret: this.config.get<string>('JWT_SECRET'),
    });

    if (!jwtPayload) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    const staff = await this.staffService.getStaffByName(jwtPayload.name);

    if (!staff) {
      throw new UnauthorizedException('Staff not found');
    }

    const Role = this.reflector.getAllAndOverride<StaffRole[]>('Roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!Role || Role.length == 0) {
      return false;
    }

    if (!Role.includes(staff.role)) {
      return false;
    }

    //requst['auth'] = staff;
    return true;
  }
}
