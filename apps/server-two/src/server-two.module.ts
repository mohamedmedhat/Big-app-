import { Module } from '@nestjs/common';
import { ServerTwoController } from './server-two.controller';
import { ServerTwoService } from './server-two.service';
import { GrpcModule } from './grpc/grpc.module';

@Module({
  imports: [
    GrpcModule
  ],
  controllers: [ServerTwoController],
  providers: [ServerTwoService],
})
export class ServerTwoModule {}
