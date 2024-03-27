import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsGateway } from './chats.gateway';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat]),
    BullModule.registerQueueAsync({
      useFactory: () => ({
        name: 'chats',
      }),
    }),
  ],
  providers: [ChatsGateway, ChatsService],
})
export class ChatsModule {}
