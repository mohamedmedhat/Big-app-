import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsGateway } from './chats.gateway';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'chats',
    }),
  ],
  providers: [ChatsGateway, ChatsService],
})
export class ChatsModule {}
