import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Content } from '../../classes/Content.class';

@Entity()
export class TRPC extends Content {
  @Column()
  email: string;

  @Column()
  page: number;

  @Column()
  pageSize: number;
}
