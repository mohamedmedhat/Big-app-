// opt 2
import { z } from 'zod';
import { TrpcService } from './trpc.service';

export const TRPCProcedures = {
  getAll: {
    input: z.object({}),
    resolver: async ({ ctx }) => {
      const trpcService: TrpcService = ctx.req.trpcService;
      return await trpcService.getAll();
    },
  },
  getById: {
    input: z.object({
      id: z.number(),
    }),
    resolver: async ({ input, ctx }) => {
      const trpcService: TrpcService = ctx.req.trpcService;
      const { id } = input;
      return await trpcService.getById(id);
    },
  },
  createOne: {
    input: z.object({
     id: z.number(),
     name: z.string(),
     email: z.string().optional(),
    }),
    resolver: async ({ input, ctx }) => {
      const trpcService: TrpcService = ctx.req.trpcService;
      const { createTrpc } = input;
      return await trpcService.createOne(createTrpc);
    },
  },
  getByPagination : {
    input: z.object({
      page: z.number().optional(),
      pageSize: z.number().optional(),
    }),
    resolver: async({ input, ctx}) => {
      const {page = 1, pageSize= 10} = input;
      const trpcService: TrpcService = ctx.req.trpcService;

      const skip = (page - 1) * pageSize;
      return await trpcService.getByPagination(skip, pageSize);
    },
  },
};
