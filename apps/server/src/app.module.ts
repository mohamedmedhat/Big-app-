import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SwaggerModule } from './swagger/swagger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Product } from './products/entities/product.entity';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { OrdersModule } from './orders/orders.module';
import { ChatsModule } from './chats/chats.module';
import { Chat } from './chats/entities/chat.entity';
import { Order } from './orders/entities/order.entity';
import { ProductsModule } from './products/products.module';
import { AuthMiddleware } from './users/auth.middleware';
import { MulterModule } from '@nestjs/platform-express';
import { BullModule } from '@nestjs/bull';
import { GoogleModule } from './google/google.module';
import { WebScrabingModule } from './web-scrabing/web-scrabing.module';
import { TrpcModule } from './trpc/trpc.module';
import { TRPC } from './trpc/entities/trpc.entity';
import { TRPCMiddleware } from './middlewares/trpc.middleware';
import {
  GoogleRecaptchaModule,
  GoogleRecaptchaNetwork,
} from '@nestlab/google-recaptcha';
import { ScheduleModule } from '@nestjs/schedule';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        url: config.getOrThrow<string>('DATABASE_URL'),
        entities: [User, Product, Chat, Order, TRPC],
        synchronize: true,
      }),
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => [
        {
          name: 'short',
          ttl: config.getOrThrow<number>('THROTTLER_SHORT_TTL'),
          limit: config.getOrThrow<number>('THROTTLER_SHORT_LIMIT'),
        },
        {
          name: 'medium',
          ttl: config.getOrThrow<number>('THROTTLER_MEDIUM_TTL'),
          limit: config.getOrThrow<number>('THROTTLER_MEDIUM_LIMIT'),
        },
        {
          name: 'long',
          ttl: config.getOrThrow<number>('THROTTLER_LONG_TTL'),
          limit: config.getOrThrow<number>('THROTTLER_LONG_LIMIT'),
        },
      ],
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async () => ({
        autoSchemaFile: true,
        subscriptions: {
          'graphql-ws': true,
        },
      }),
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        ttl: config.getOrThrow<number>('CACHE_TTL'),
        max: config.getOrThrow<number>('CACHE_MAX'),
      }),
    }),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './upload',
      }),
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        redis: {
          host: config.getOrThrow<string>('REDIS_HOST'),
          port: config.getOrThrow<number>('REDIS_PORT'),
        },
      })
    }),
    GoogleRecaptchaModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secretKey: config.getOrThrow<string>('GOOGLE_REPATCHA_SECRET_KEY'),
        response: (req) => req.headers.authorization,
        network: GoogleRecaptchaNetwork.Recaptcha,
      }),
    }),
    PassportModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        defaultStrategy: config.getOrThrow<string>('JWT_STRATEGY'),
      }),
    }),
    ScheduleModule.forRoot(),
    UsersModule,
    SwaggerModule,
    JwtModule,
    OrdersModule,
    ChatsModule,
    ProductsModule,
    GoogleModule,
    WebScrabingModule,
    TrpcModule,
  ],
  controllers: [],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'admin', method: RequestMethod.ALL });
    consumer
      .apply(TRPCMiddleware) // opt 2
      .forRoutes({ path: 'api/trpc*', method: RequestMethod.ALL });
  }
}
