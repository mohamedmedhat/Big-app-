import { Module } from '@nestjs/common';
import { GrpcService } from './grpc.service';
import { GrpcController } from './grpc.controller';

@Module({
  controllers: [GrpcController],
  providers: [GrpcService],
})
export class GrpcModule {}
