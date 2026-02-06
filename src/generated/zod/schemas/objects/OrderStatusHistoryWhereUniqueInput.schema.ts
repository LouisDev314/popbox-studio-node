import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const OrderStatusHistoryWhereUniqueInputObjectSchema: z.ZodType<Prisma.OrderStatusHistoryWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderStatusHistoryWhereUniqueInput>;
export const OrderStatusHistoryWhereUniqueInputObjectZodSchema = makeSchema();
