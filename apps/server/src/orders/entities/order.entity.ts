import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Product } from '../../products/entities/product.entity';
import { User } from '../../users/entities/user.entity';
import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsNumber } from 'class-validator';

@ObjectType()
export class Order {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int)
  @Column()
  qauntity:number;

  @Field(() => Product)
  @ManyToOne(()=> Product, product => product.orders)
  product: Product;

  @Field(() => User)
  @ManyToOne(() => User, user => user.orders)
  user?: User;
}
