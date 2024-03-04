import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppService } from './app.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
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
import { GoogleRecaptchaModule, GoogleRecaptchaNetwork } from '@nestlab/google-recaptcha';
import { ScheduleModule } from '@nestjs/schedule';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASS,
      database: process.env.TYPEORM_DB,
      entities:[User,Product,Chat,Order,TRPC],
      synchronize:true,
    }),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 10000,
        limit: 30,
      },
      {
        name: 'medium',
        ttl: 30000,
        limit: 50,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile:true,
    }),
    CacheModule.register({
      ttl: 5,
      max: 10,
      isGlobal: true,
    }),
    MulterModule.registerAsync({
      useFactory: ()=>({
        dest: './upload',
      }),
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      }
    }),
    GoogleRecaptchaModule.forRoot({
      secretKey: process.env.GOOGLE_REPATCHA_SECRET_KEY,
      response: (req) => req.headers.authorization,
      network: GoogleRecaptchaNetwork.Recaptcha,
    }),
    UsersModule,
    SwaggerModule,
    JwtModule,
    PassportModule.register({defaultStrategy:'jwt'}),
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
    consumer.apply(AuthMiddleware).forRoutes(
      {path: 'admin',method:RequestMethod.ALL},
    );
    consumer.apply(TRPCMiddleware) // opt 2
    .forRoutes({path: 'api/trpc*' , method: RequestMethod.ALL});
  }
}
