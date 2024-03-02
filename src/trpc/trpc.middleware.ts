// trpc.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { TrpcService } from './trpc.service';

@Injectable()
export class TRPCMiddleware implements NestMiddleware {
  constructor(private readonly trpcService: TrpcService) {}
  
  use(req: Request, res: Response, next: () => void) {
    req['ctx'] = { req, res, trpcService: this.trpcService }; // Inject trpcService into the context
    next();
  }
}
