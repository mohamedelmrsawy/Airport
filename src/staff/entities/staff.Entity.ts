import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { StaffRole } from '../../enums/staff.role';
import { FlightEntity } from 'src/flight/entities/flight.Entity';

@Entity()
@ObjectType()
export class Staff {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  EmployeeId!: number;

  @Column()
  @Field()
  name!: string;

  @Column({ unique: true })
  @Field()
  email!: string;

  @Column()
  @Field()
  password!: string;

  @Column()
  @Field(() => Int)
  flightId!: number;

  @Column({ type: 'enum', enum: StaffRole })
  @Field(() => StaffRole)
  role!: StaffRole;

  @Column({ nullable: true })
  @Field()
  assignedFlight!: string;

  @ManyToOne(() => FlightEntity, (f) => f.staffs)
  @Field(() => FlightEntity)
  flight!: FlightEntity;
}
