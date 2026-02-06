import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OrderStatusHistoryCreateManyInputObjectSchema as OrderStatusHistoryCreateManyInputObjectSchema } from './objects/OrderStatusHistoryCreateManyInput.schema';

export const OrderStatusHistoryCreateManySchema: z.ZodType<Prisma.OrderStatusHistoryCreateManyArgs> = z.object({ data: z.union([ OrderStatusHistoryCreateManyInputObjectSchema, z.array(OrderStatusHistoryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.OrderStatusHistoryCreateManyArgs>;

export const OrderStatusHistoryCreateManyZodSchema = z.object({ data: z.union([ OrderStatusHistoryCreateManyInputObjectSchema, z.array(OrderStatusHistoryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();