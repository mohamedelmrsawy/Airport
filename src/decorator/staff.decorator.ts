import { SetMetadata } from '@nestjs/common';
import { StaffRole } from '../enums/staff.role';

export const Roles = (...role: StaffRole[]) => SetMetadata('Roles', role);
