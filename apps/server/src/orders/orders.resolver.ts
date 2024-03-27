import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Mutation(() => Order)
  async createOrder(
    @Args('createOrderInput', { type: () => CreateOrderInput })
    createOrderInput: CreateOrderInput,
  ) {
    return await this.ordersService.create(createOrderInput);
  }

  @Query(() => [Order], { name: 'orders' })
  async findAll(
    @Args('page', { type: () => Number }) page: number,
    @Args('pageSize', { type: () => Number }) pageSize: number,
  ): Promise<[Order[], number]> {
    return await this.ordersService.findAll(page, pageSize);
  }

  @Query(() => Order, { name: 'order' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.ordersService.findOne(id);
  }

  @Mutation(() => Order)
  async updateOrder(
    @Args('updateOrderInput', { type: () => UpdateOrderInput })
    updateOrderInput: UpdateOrderInput,
  ) {
    return await this.ordersService.update(
      updateOrderInput.id,
      updateOrderInput,
    );
  }

  @Mutation(() => Order)
  async removeOrder(@Args('id', { type: () => Int }) id: number) {
    return await this.ordersService.remove(id);
  }
}
