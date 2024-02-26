import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Order } from "../../orders/entities/order.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRoles } from "src/enums/userRole.enum";

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
  password: string;

  @Field()
  @Column()
  roles: UserRoles[]

  @Field()
  @Column({default:false})
  isAdmin: boolean

  @Field()
  @OneToMany(()=>Order, order => order.user)
  orders: Order[]

  @Field()
  @CreateDateColumn({name: 'created_at'})
  createAt: Date
}