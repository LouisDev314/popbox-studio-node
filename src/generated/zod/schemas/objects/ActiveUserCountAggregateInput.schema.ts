import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  supabaseUserId: z.literal(true).optional(),
  email: z.literal(true).optional(),
  name: z.literal(true).optional(),
  role: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const ActiveUserCountAggregateInputObjectSchema: z.ZodType<Prisma.ActiveUserCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ActiveUserCountAggregateInputType>;
export const ActiveUserCountAggregateInputObjectZodSchema = makeSchema();
