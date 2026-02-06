import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OrderStatusHistorySelectObjectSchema as OrderStatusHistorySelectObjectSchema } from './objects/OrderStatusHistorySelect.schema';
import { OrderStatusHistoryCreateManyInputObjectSchema as OrderStatusHistoryCreateManyInputObjectSchema } from './objects/OrderStatusHistoryCreateManyInput.schema';

export const OrderStatusHistoryCreateManyAndReturnSchema: z.ZodType<Prisma.OrderStatusHistoryCreateManyAndReturnArgs> = z.object({ select: OrderStatusHistorySelectObjectSchema.optional(), data: z.union([ OrderStatusHistoryCreateManyInputObjectSchema, z.array(OrderStatusHistoryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.OrderStatusHistoryCreateManyAndReturnArgs>;

export const OrderStatusHistoryCreateManyAndReturnZodSchema = z.object({ select: OrderStatusHistorySelectObjectSchema.optional(), data: z.union([ OrderStatusHistoryCreateManyInputObjectSchema, z.array(OrderStatusHistoryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();