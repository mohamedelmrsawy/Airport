import { Resolver } from '@nestjs/graphql';
import { AirlineService } from './airline.service';

@Resolver()
export class AirlineResolver {
  constructor(private readonly airlineService: AirlineService) {}
}
