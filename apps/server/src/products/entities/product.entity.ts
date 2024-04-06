import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Order } from '../../orders/entities/order.entity';
import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsDecimal, IsString } from 'class-validator';

@ObjectType()
export class Product {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Field(() => String)
  @Column()
  image: string;

  @IsString()
  @Field(() => String)
  @Column()
  name: string;

  @IsDecimal()
  @Field(() => Float, { defaultValue: 0 })
  @Column('decimal', { default: 0 })
  price: number;

  @OneToMany(() => Order, (order) => order.product)
  orders: Order[];
}
