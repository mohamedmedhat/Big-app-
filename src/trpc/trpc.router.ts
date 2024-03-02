import { INestApplication, Injectable } from "@nestjs/common";
import { TrpcService } from "./trpc.service";
import {z} from 'zod';
import * as trpcExpress from '@trpc/server/adapters/express';

//opt 1

@Injectable()
export class TrpcRouter {
    constructor(private readonly trpcService: TrpcService){}

    appRouter = this.trpcService.router({
        hello: this.trpcService.procedure
        .input(z.object({name: z.string().optional()}))
        .query(({input}) => {
            return `hello ${input.name? input.name: `Bilbo`}`; 
        }),
    });
    

   async applyMiddleware(app: INestApplication){
    app.use('/trpc',
    trpcExpress.createExpressMiddleware({router: this.appRouter}),
    )
   }
}

export type AppRouter = TrpcRouter['appRouter'];