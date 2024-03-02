import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TRPC {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  page: number;

  @Column()
  pageSize: number;
}
