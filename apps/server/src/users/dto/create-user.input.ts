import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @Field(() => String)
  name?: string;

  @IsEmail()
  @IsNotEmpty()
  @Field(() => String)
  email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  @Field(() => String)
  password: string;

  @IsNotEmpty()
  @Field(() => Boolean)
  isAdmin: boolean;
}
