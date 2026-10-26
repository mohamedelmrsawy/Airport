import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { StaffModule } from 'src/staff/staff.module';

@Module({
  exports: [JwtModule],
  providers: [AuthResolver, AuthService],
  imports: [
    forwardRef(() => StaffModule),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          global: true,
          secret: config.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: config.get<number>('JWT_EXPIRES_IN') },
        };
      },
    }),
  ],
})
export class AuthModule {}
