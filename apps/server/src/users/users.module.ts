import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { BullModule } from '@nestjs/bull';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {expiresIn: '1h'},
    }),
    BullModule.registerQueue({
      name: 'users',
    }),
  ],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
