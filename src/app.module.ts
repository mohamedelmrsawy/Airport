import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver } from 'node_modules/@nestjs/apollo/dist/drivers/apollo.driver';
import { ApolloDriverConfig } from 'node_modules/@nestjs/apollo/dist/interfaces/apollo-driver-config.interface';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path/win32';
import { PassengerModule } from './passenger/passenger.module';
import { FlightModule } from './flight/flight.module';
import { AirportModule } from './airport/airport.module';
import { SeatModule } from './seat/seat.module';
import { BookingModule } from './booking/booking.module';
import { BagModule } from './bag/bag.module';
import { AirlineModule } from './airline/airline.module';
import { AuthModule } from './auth/auth.module';
import { StaffModule } from './staff/staff.module';
import { StaffService } from './staff/staff.service';
import { Context } from 'graphql-ws';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtPayload } from './helper/jwtPayload';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule, StaffModule, JwtModule],
      inject: [ConfigService, StaffService, JwtService],
      useFactory: (
        configService: ConfigService,
        staffService: StaffService,
        jwtService: JwtService,
      ) => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        graphiql: true,
        context: ({ req, res }: { req: Request; res: Response }) => ({
          req,
          res,
          staffLoader: staffService.staffDataLoader(),
        }),
        subscriptions: {
          'graphql-ws': {
            onConnect: async (context: Context) => {
              const { connectionParams } = context;

              const token = connectionParams?.Bearer as string;

              if (typeof token !== 'string' || !token) {
                throw new Error('token in subscrip not valid');
              }

              try {
                const payload: JwtPayload = await jwtService.verifyAsync(
                  token,
                  { secret: configService.get<string>('JWT_SECRET') },
                );

                return { extra: payload };
              } catch (err) {
                console.log(err);
                throw new Error('Invalid or expired token');
              }
            },
          },
        },
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('HOST'),
        port: config.get('PORT'),
        username: 'postgres',
        password: config.get('PASSWORD'),
        database: config.get('NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    BullModule.forRoot({
      connection: { host: 'localhost', port: 6379 },
      defaultJobOptions: { attempts: 2, delay: 2000 },
    }),
    BullModule.registerQueue({ name: 'sendEmail' }),
    PassengerModule,
    FlightModule,
    AirportModule,
    SeatModule,
    BookingModule,
    BagModule,
    AirlineModule,
    AuthModule,
    StaffModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
