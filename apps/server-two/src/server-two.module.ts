import { Module } from '@nestjs/common';
import { ServerTwoController } from './server-two.controller';
import { ServerTwoService } from './server-two.service';
import { GrpcModule } from './grpc/grpc.module';
import { BullModule } from '@nestjs/bull';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    GrpcModule,
    BullModule.registerQueue({
      name: 'gRPC',
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 5,
      max: 10,
    }),
  ],
  controllers: [ServerTwoController],
  providers: [
    ServerTwoService,
  {
    provide: APP_INTERCEPTOR,
    useClass: CacheInterceptor,
  },
  ],
})
export class ServerTwoModule {}
