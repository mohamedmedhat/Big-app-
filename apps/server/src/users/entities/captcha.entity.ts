import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CAPTCHA {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  text: string;

  @Column('bytea')
  data: Buffer;
}
