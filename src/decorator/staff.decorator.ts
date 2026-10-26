import { SetMetadata } from '@nestjs/common';
import { StaffRole } from 'src/enums/staff.role';

export const Roles = (...role: StaffRole[]) => SetMetadata('Roles', role);
