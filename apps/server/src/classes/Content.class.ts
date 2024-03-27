import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export abstract class Content {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  _id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Column()
  firstname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Column()
  lastname: string;
}
