import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OrderStatusHistoryUpdateManyMutationInputObjectSchema as OrderStatusHistoryUpdateManyMutationInputObjectSchema } from './objects/OrderStatusHistoryUpdateManyMutationInput.schema';
import { OrderStatusHistoryWhereInputObjectSchema as OrderStatusHistoryWhereInputObjectSchema } from './objects/OrderStatusHistoryWhereInput.schema';

export const OrderStatusHistoryUpdateManySchema: z.ZodType<Prisma.OrderStatusHistoryUpdateManyArgs> = z.object({ data: OrderStatusHistoryUpdateManyMutationInputObjectSchema, where: OrderStatusHistoryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.OrderStatusHistoryUpdateManyArgs>;

export const OrderStatusHistoryUpdateManyZodSchema = z.object({ data: OrderStatusHistoryUpdateManyMutationInputObjectSchema, where: OrderStatusHistoryWhereInputObjectSchema.optional() }).strict();