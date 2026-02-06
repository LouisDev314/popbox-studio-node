import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OrderStatusHistorySelectObjectSchema as OrderStatusHistorySelectObjectSchema } from './objects/OrderStatusHistorySelect.schema';
import { OrderStatusHistoryIncludeObjectSchema as OrderStatusHistoryIncludeObjectSchema } from './objects/OrderStatusHistoryInclude.schema';
import { OrderStatusHistoryWhereUniqueInputObjectSchema as OrderStatusHistoryWhereUniqueInputObjectSchema } from './objects/OrderStatusHistoryWhereUniqueInput.schema';
import { OrderStatusHistoryCreateInputObjectSchema as OrderStatusHistoryCreateInputObjectSchema } from './objects/OrderStatusHistoryCreateInput.schema';
import { OrderStatusHistoryUncheckedCreateInputObjectSchema as OrderStatusHistoryUncheckedCreateInputObjectSchema } from './objects/OrderStatusHistoryUncheckedCreateInput.schema';
import { OrderStatusHistoryUpdateInputObjectSchema as OrderStatusHistoryUpdateInputObjectSchema } from './objects/OrderStatusHistoryUpdateInput.schema';
import { OrderStatusHistoryUncheckedUpdateInputObjectSchema as OrderStatusHistoryUncheckedUpdateInputObjectSchema } from './objects/OrderStatusHistoryUncheckedUpdateInput.schema';

export const OrderStatusHistoryUpsertOneSchema: z.ZodType<Prisma.OrderStatusHistoryUpsertArgs> = z.object({ select: OrderStatusHistorySelectObjectSchema.optional(), include: OrderStatusHistoryIncludeObjectSchema.optional(), where: OrderStatusHistoryWhereUniqueInputObjectSchema, create: z.union([ OrderStatusHistoryCreateInputObjectSchema, OrderStatusHistoryUncheckedCreateInputObjectSchema ]), update: z.union([ OrderStatusHistoryUpdateInputObjectSchema, OrderStatusHistoryUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.OrderStatusHistoryUpsertArgs>;

export const OrderStatusHistoryUpsertOneZodSchema = z.object({ select: OrderStatusHistorySelectObjectSchema.optional(), include: OrderStatusHistoryIncludeObjectSchema.optional(), where: OrderStatusHistoryWhereUniqueInputObjectSchema, create: z.union([ OrderStatusHistoryCreateInputObjectSchema, OrderStatusHistoryUncheckedCreateInputObjectSchema ]), update: z.union([ OrderStatusHistoryUpdateInputObjectSchema, OrderStatusHistoryUncheckedUpdateInputObjectSchema ]) }).strict();