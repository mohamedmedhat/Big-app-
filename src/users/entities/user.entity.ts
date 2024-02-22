import { Field, ObjectType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Field()
  @Column()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Field()
  @Column()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @Field()
  @Column()
  password: string;

  @Field()
  @CreateDateColumn({name: 'created_at'})
  createAt: Date
}