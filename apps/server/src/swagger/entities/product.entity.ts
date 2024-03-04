import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
} from 'typeorm';
import { Content } from '../../classes/Content.class';

@Entity()
export class Swagger extends Content {
  @ApiProperty()
  @Column()
  price: number;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
