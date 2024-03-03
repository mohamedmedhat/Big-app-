import { Module } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { TrpcController } from './trpc.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TRPC } from './entities/trpc.entity';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    TypeOrmModule.forFeature([TRPC]),
    BullModule.registerQueue({
      name: 'tRPC',
    }),
  ],
  controllers: [TrpcController],
  providers: [TrpcService],
})
export class TrpcModule {}
