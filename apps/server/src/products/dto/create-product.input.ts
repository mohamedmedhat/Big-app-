import { Field, InputType} from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateProductInput {
  @IsString()
  @Field(() => String)
  image:string

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  name:string;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Number)
  price:number;
}
