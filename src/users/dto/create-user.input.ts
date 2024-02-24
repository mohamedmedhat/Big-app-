import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

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
  @Field((type) => String)
  password: string;

  @IsNotEmpty()
  @Field()
  isAdmin: boolean
}
