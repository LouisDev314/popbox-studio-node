import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OrderStatusHistoryWhereInputObjectSchema as OrderStatusHistoryWhereInputObjectSchema } from './objects/OrderStatusHistoryWhereInput.schema';

export const OrderStatusHistoryDeleteManySchema: z.ZodType<Prisma.OrderStatusHistoryDeleteManyArgs> = z.object({ where: OrderStatusHistoryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.OrderStatusHistoryDeleteManyArgs>;

export const OrderStatusHistoryDeleteManyZodSchema = z.object({ where: OrderStatusHistoryWhereInputObjectSchema.optional() }).strict();