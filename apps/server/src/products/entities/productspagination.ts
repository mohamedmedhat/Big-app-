import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from './product.entity';

@ObjectType()
export class ProductsPagination {
  @Field(() => [Product])
  products: Product[];

  @Field(() => Int)
  totalproducts: number;
}
