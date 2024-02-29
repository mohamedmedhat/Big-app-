import { Schema, Prop } from '@nest/mongoose'
import { User } from 'src/users/entities/user.entity';
@Schema()
export class Chat {

    @Prop({required: true, ref: User})
    sender: number;

    @Prop()
    content: string;
}
