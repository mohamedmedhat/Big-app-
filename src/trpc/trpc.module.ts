import { Module } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { TrpcController } from './trpc.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TRPC } from './entities/trpc.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TRPC]),
  ],
  controllers: [TrpcController],
  providers: [TrpcService],
})
export class TrpcModule {}
