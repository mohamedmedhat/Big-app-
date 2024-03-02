import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TrpcRouter } from './trpc/trpc.router';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const trpc = app.get(TrpcRouter); // opt 1

  
  /**  middlewares  */
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.enableCors({
    origin: process.env.CLIENT_PORT,
    credentials: true,
  })
  app.use(helmet());
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  trpc.applyMiddleware(app); // opt 1 

  const config = new DocumentBuilder()
  .setTitle('Big App')
  .setDescription('several api REST , QraphQl , grpc ,Websockets')
  .setVersion('1.0')
  .addTag('Api')
  .build();

  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api',app,document);

  await app.listen(process.env.NEST_PORT || 4000);
}
bootstrap();
