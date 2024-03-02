import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { TRPCProcedures } from './trpc.procedure';
import { CreateTrpcDto } from './dto/createtrpc.dto';
import { Request } from 'express';
import { TRPC } from './entities/trpc.entity';

// opt 2

@Controller('api')
export class TrpcController {
  constructor(private readonly trpcService: TrpcService) {}

  @Get('trpc')
  async getAllTRPC(@Req() req: Request): Promise<TRPC[]>{
    return await TRPCProcedures.getAll.resolver({ctx: {req}});
  }

  @Get('trpc/:id')
  async getById(@Param('id') id: number,@Req() req: Request): Promise<TRPC>{
    return await TRPCProcedures.getById.resolver({input: {id}, ctx: {req}});
  }

  @Post('trpc/create')
  async Create(@Body() createtRPC: CreateTrpcDto,@Req() req: Request): Promise<TRPC>{
    return await TRPCProcedures.createOne.resolver({input: {createtRPC: createtRPC}, ctx: {req}});
  } 
}
