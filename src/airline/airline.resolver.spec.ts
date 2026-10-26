import { Test, TestingModule } from '@nestjs/testing';
import { AirlineResolver } from './airline.resolver';
import { AirlineService } from './airline.service';

describe('AirlineResolver', () => {
  let resolver: AirlineResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AirlineResolver, AirlineService],
    }).compile();

    resolver = module.get<AirlineResolver>(AirlineResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
