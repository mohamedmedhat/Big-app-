import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from './user.entity';

@ObjectType()
export class UsersPagination {
  @Field(() => [User])
  users: User[];

  @Field(() => Int)
  totalusers: number;
}
