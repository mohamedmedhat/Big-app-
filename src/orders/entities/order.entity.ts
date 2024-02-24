import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class Order {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @ManyToOne(() => User, user => user.orders)
  user: User;

  @Field()
  @ManyToOne(()=> Product, product => product.orders)
  product: Product;

  @Field()
  @Column()
  qauntity:number;
}
