import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Chat {
  @IsNumber()
  @IsNotEmpty()
  @Column()
  sender: number;

  @IsString()
  @IsNotEmpty()
  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.chats)
  user?: User;
}
