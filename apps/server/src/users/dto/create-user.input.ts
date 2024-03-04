import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsStrongPassword, MaxLength, MinLength } from "class-validator";

@InputType()
export class CreateUserInput {
  
  @IsNotEmpty()
  @Field((type) => String)
  name?: string;

  @IsEmail()
  @IsNotEmpty()
  @Field((type) => String)
  email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  @Field((type) => String)
  password: string;

  @IsNotEmpty()
  @Field()
  isAdmin: boolean
}
