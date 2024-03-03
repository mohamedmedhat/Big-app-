import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Order } from "../../orders/entities/order.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRoles } from "../../enums/userRole.enum";
import { Chat } from "../../chats/entities/chat.entity";
import { Exclude } from "class-transformer";

@Entity()
@ObjectType()
export class User {
  @Field(()=>ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  @Exclude()
  password: string;

  @Field(() => [UserRoles])
  @Column({type: 'enum', enum: UserRoles, array: true, default: []})
  roles: UserRoles[]

  @Field()
  @Column({default:false})
  isAdmin: boolean

  @Field(() => [Order])
  @OneToMany(()=>Order, order => order.user)
  orders: Order[]

  @Field(() => [Chat])
  @OneToMany(() => Chat, chat => chat.user)
  chats: Chat[]

  @Field()
  @CreateDateColumn({name: 'created_at'})
  createAt: Date

  constructor(partial: Partial<User>){
    Object.assign(this, partial);
  }
}