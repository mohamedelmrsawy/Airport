import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class RegisterDto {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  password!: string;

  @Field({ nullable: true })
  @IsString()
  name!: string;
}
