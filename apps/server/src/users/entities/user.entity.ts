import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Order } from '../../orders/entities/order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRoles } from '../../enums/userRole.enum';
import { Chat } from '../../chats/entities/chat.entity';
import { Exclude } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@Entity()
@ObjectType()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  @Column()
  name: string;

  @IsString()
  @IsEmail()
  @Field(() => String)
  @Column()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  @MinLength(6)
  @MaxLength(20)
  @Column()
  @Exclude()
  password: string;

  @IsBoolean()
  @Field(() => Boolean)
  @Column({ default: false })
  isAdmin: boolean;

  @IsDate()
  @Field(() => Date)
  @CreateDateColumn({ name: 'created_at' })
  createAt: Date;

  @IsDate()
  @Field(() => Date)
  @UpdateDateColumn()
  updated_at: Date;

  @Field(() => [Order])
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @Field(() => [Chat])
  @OneToMany(() => Chat, (chat) => chat.user)
  chats: Chat[];

  @Field(() => [UserRoles])
  @Column({ type: 'enum', enum: UserRoles, array: true, default: [] })
  roles: UserRoles[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
