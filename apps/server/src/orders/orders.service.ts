import { Injectable } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectQueue('orders') private readonly _ordersQueue: Queue,
    @InjectRepository(Order) private readonly _orderRepo: Repository<Order>,
  ) {}

  async create(createOrderInput: CreateOrderInput) {
    return await 'This action adds a new order';
  }

  async findAll(
    page: number = 1,
    pageSize: number = 20,
  ): Promise<[Order[], number]> {
    return await this._orderRepo.findAndCount({
      take: pageSize,
      skip: (page - 1) * pageSize,
    });
  }

  async findOne(id: number) {
    return await  `This action returns a #${id} order`;
  }

  async update(id: number, updateOrderInput: UpdateOrderInput) {
    return await`This action updates a #${id} order`;
  }

  async remove(id: number) {
    return await `This action removes a #${id} order`;
  }
}
