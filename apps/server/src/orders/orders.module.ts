import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    BullModule.registerQueueAsync({
      useFactory: async () => ({
        name: 'orders',
      }),
    }),
  ],
  providers: [OrdersResolver, OrdersService],
})
export class OrdersModule {}
