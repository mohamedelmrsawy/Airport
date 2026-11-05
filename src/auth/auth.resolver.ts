import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginDto } from '../helper/login.dto';
import { StaffInput } from '../staff/dto/staff.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  async login(@Args('logindto') logindto: LoginDto) {
    return await this.authService.login(logindto);
  }

  @Mutation(() => String)
  async register(@Args('register') register: StaffInput) {
    return await this.authService.register(register);
  }
}
