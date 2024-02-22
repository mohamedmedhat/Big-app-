import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as compression from 'compression';
import cookieParser from 'cookie-parser';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**  middlewares  */
  app.enableCors({
    origin: [],
    credentials: true,
  })
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.use(helmet());
  // app.use(compression());
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
