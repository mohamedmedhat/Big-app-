import { Field, InputType} from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class CreateProductInput {
  
  @Field()
  image:string

  @IsNotEmpty()
  @Field()
  name:string;

  @IsNotEmpty()
  @IsNumber()
  @Field()
  price:number;
}
