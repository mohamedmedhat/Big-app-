import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class ChatsService {
  constructor(
    @InjectQueue('chats') private readonly _chatsQueue: Queue,
  ){}
}
