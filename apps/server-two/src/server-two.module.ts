import { Module } from '@nestjs/common';
import { ServerTwoController } from './server-two.controller';
import { ServerTwoService } from './server-two.service';
import { GrpcModule } from './grpc/grpc.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    GrpcModule,
    BullModule.registerQueue({
      name: 'gRPC',
    }),
  ],
  controllers: [ServerTwoController],
  providers: [ServerTwoService],
})
export class ServerTwoModule {}
