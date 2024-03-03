import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GRPC } from './entities/grpc.entity';
import { Repository } from 'typeorm';
import { CreategRPCDto } from './dto/create.dto';
import { UpdategRPCDto } from './dto/update.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class GrpcService {
    constructor(
        @InjectRepository(GRPC) private readonly gRPCRepo: Repository<GRPC>,
        @InjectQueue('gRPC') private readonly _gRPCQueue: Queue,
    ){}

    async create(createDto: CreategRPCDto): Promise<GRPC> {
       const newGRPC = this.gRPCRepo.create({
        ...createDto,
       });
        return await this.gRPCRepo.save(newGRPC);
      }
    
      async read(id: number): Promise<GRPC> {
        return await this.gRPCRepo.findOneBy({_id: id});
      }
    
      async update(id: number, updateDto: UpdategRPCDto): Promise<GRPC> {
        const findusr = this.gRPCRepo.findOneBy({_id: id});
        if(!findusr){
            throw new Error('Not found');
        }
        const updatedUsr = this.gRPCRepo.create({
            ...updateDto,
        });
        return await this.gRPCRepo.save(updatedUsr);
      }
    
      async delete(id: number): Promise<void> {
        await this.gRPCRepo.delete({_id: id});
      }

    }
