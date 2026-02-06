import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OrderStatusHistorySelectObjectSchema as OrderStatusHistorySelectObjectSchema } from './objects/OrderStatusHistorySelect.schema';
import { OrderStatusHistoryUpdateManyMutationInputObjectSchema as OrderStatusHistoryUpdateManyMutationInputObjectSchema } from './objects/OrderStatusHistoryUpdateManyMutationInput.schema';
import { OrderStatusHistoryWhereInputObjectSchema as OrderStatusHistoryWhereInputObjectSchema } from './objects/OrderStatusHistoryWhereInput.schema';

export const OrderStatusHistoryUpdateManyAndReturnSchema: z.ZodType<Prisma.OrderStatusHistoryUpdateManyAndReturnArgs> = z.object({ select: OrderStatusHistorySelectObjectSchema.optional(), data: OrderStatusHistoryUpdateManyMutationInputObjectSchema, where: OrderStatusHistoryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.OrderStatusHistoryUpdateManyAndReturnArgs>;

export const OrderStatusHistoryUpdateManyAndReturnZodSchema = z.object({ select: OrderStatusHistorySelectObjectSchema.optional(), data: OrderStatusHistoryUpdateManyMutationInputObjectSchema, where: OrderStatusHistoryWhereInputObjectSchema.optional() }).strict();