import { User } from '../../users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Chat {

    @Column()
    sender: number;

    @Column()
    content: string;

    @ManyToOne(() => User, user => user.chats)
    user:User
}

