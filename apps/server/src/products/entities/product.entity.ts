import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Order } from '../../orders/entities/order.entity';
import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class Product {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  image:string;

  @Field()
  @Column()
  name:string;

  @Field()
  @Column()
  price: number

  @OneToMany(()=>Order, order => order.product)
  orders: Order[];
}
