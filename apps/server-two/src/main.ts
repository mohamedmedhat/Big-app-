import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ServerTwoModule } from './server-two.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(ServerTwoModule, {
    transport: Transport.GRPC,
    options: {
      package: 'myservice',
      protoPath: './src/protos/service.proto',
    },
  });
  await app.listen();
}
bootstrap();
