import { Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CAPTCHA {
  @PrimaryGeneratedColumn()
  _id: number;

  @IsString()
  @Column()
  @Field(() => String)
  text: string;

  @Column('bytea')
  @Field(() => Buffer)
  data: Buffer;
}
