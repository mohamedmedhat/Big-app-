// opt 2
import { z } from 'zod';

export const TRPCProcedures = {
  getAll: {
    input: z.object({}),
    resolver: async ({ ctx }) => {
      const trpcService = ctx.req.trpcService;
      return await trpcService.getAll();
    },
  },
  getById: {
    input: z.object({
      id: z.number(),
    }),
    resolver: async ({ input, ctx }) => {
      const trpcService = ctx.req.trpcService;
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
      const trpcService = ctx.req.trpcService;
      const { createTrpc } = input;
      return await trpcService.createOne(createTrpc);
    },
  },
};
