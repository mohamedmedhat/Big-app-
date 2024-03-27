import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TrpcRouter } from './trpc/trpc.router';
import * as compression from 'compression';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';

const httpsOptions = {
  key: fs.readFileSync('../../../secret/cert.key'),
  cert: fs.readFileSync('../../../secret/cert.crt'),
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    httpsOptions,
  });
  const _config = new ConfigService();

  app.setGlobalPrefix('v1');
  const trpc = app.get(TrpcRouter); // opt 1

  
  /**  middlewares  */
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.enableCors({
    origin: _config.getOrThrow<string>('CLIENT_PORT'),
    credentials: true,
  })
  app.use(helmet());
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.use(compression());
  trpc.applyMiddleware(app); // opt 1 

  const config = new DocumentBuilder()
  .setTitle('Big App')
  .setDescription('several api REST , QraphQl , grpc ,Websockets')
  .setVersion('1.0')
  .addTag('Api')
  .build();

  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api',app,document);

  await app.listen(_config.getOrThrow<number>('NEST_PORT') || 4000);
}
bootstrap();
