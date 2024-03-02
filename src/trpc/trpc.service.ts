import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { initTRPC } from '@trpc/server';
import { TRPC } from './entities/trpc.entity';
import { Repository } from 'typeorm';
import { CreateChatDto } from 'src/chats/dto/create-chat.dto';

@Injectable()
export class TrpcService {
  constructor(
    @InjectRepository(TRPC) private readonly trpcRepo: Repository<TRPC>,
  ) {}

  // opt 1
  trpc = initTRPC.create();
  procedure = this.trpc.procedure;
  router = this.trpc.router;
  mergeRouters = this.trpc.mergeRouters;


  // opt 2
  async getAll(): Promise<TRPC[]>{
    return await this.trpcRepo.find();
  }

  async getById(id: number): Promise<TRPC | undefined>{
    return await this.trpcRepo.findOneBy({_id: id});
  }

  async createOne(createTrpc: CreateChatDto): Promise<TRPC>{
    const newTrpc = this.trpcRepo.create({
        ...createTrpc,
    });
    return await this.trpcRepo.save(newTrpc);
  }
}
