import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OrderStatusHistorySelectObjectSchema as OrderStatusHistorySelectObjectSchema } from './objects/OrderStatusHistorySelect.schema';
import { OrderStatusHistoryIncludeObjectSchema as OrderStatusHistoryIncludeObjectSchema } from './objects/OrderStatusHistoryInclude.schema';
import { OrderStatusHistoryUpdateInputObjectSchema as OrderStatusHistoryUpdateInputObjectSchema } from './objects/OrderStatusHistoryUpdateInput.schema';
import { OrderStatusHistoryUncheckedUpdateInputObjectSchema as OrderStatusHistoryUncheckedUpdateInputObjectSchema } from './objects/OrderStatusHistoryUncheckedUpdateInput.schema';
import { OrderStatusHistoryWhereUniqueInputObjectSchema as OrderStatusHistoryWhereUniqueInputObjectSchema } from './objects/OrderStatusHistoryWhereUniqueInput.schema';

export const OrderStatusHistoryUpdateOneSchema: z.ZodType<Prisma.OrderStatusHistoryUpdateArgs> = z.object({ select: OrderStatusHistorySelectObjectSchema.optional(), include: OrderStatusHistoryIncludeObjectSchema.optional(), data: z.union([OrderStatusHistoryUpdateInputObjectSchema, OrderStatusHistoryUncheckedUpdateInputObjectSchema]), where: OrderStatusHistoryWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.OrderStatusHistoryUpdateArgs>;

export const OrderStatusHistoryUpdateOneZodSchema = z.object({ select: OrderStatusHistorySelectObjectSchema.optional(), include: OrderStatusHistoryIncludeObjectSchema.optional(), data: z.union([OrderStatusHistoryUpdateInputObjectSchema, OrderStatusHistoryUncheckedUpdateInputObjectSchema]), where: OrderStatusHistoryWhereUniqueInputObjectSchema }).strict();