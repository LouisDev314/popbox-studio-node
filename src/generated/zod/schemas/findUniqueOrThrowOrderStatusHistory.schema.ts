import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OrderStatusHistorySelectObjectSchema as OrderStatusHistorySelectObjectSchema } from './objects/OrderStatusHistorySelect.schema';
import { OrderStatusHistoryIncludeObjectSchema as OrderStatusHistoryIncludeObjectSchema } from './objects/OrderStatusHistoryInclude.schema';
import { OrderStatusHistoryWhereUniqueInputObjectSchema as OrderStatusHistoryWhereUniqueInputObjectSchema } from './objects/OrderStatusHistoryWhereUniqueInput.schema';

export const OrderStatusHistoryFindUniqueOrThrowSchema: z.ZodType<Prisma.OrderStatusHistoryFindUniqueOrThrowArgs> = z.object({ select: OrderStatusHistorySelectObjectSchema.optional(), include: OrderStatusHistoryIncludeObjectSchema.optional(), where: OrderStatusHistoryWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.OrderStatusHistoryFindUniqueOrThrowArgs>;

export const OrderStatusHistoryFindUniqueOrThrowZodSchema = z.object({ select: OrderStatusHistorySelectObjectSchema.optional(), include: OrderStatusHistoryIncludeObjectSchema.optional(), where: OrderStatusHistoryWhereUniqueInputObjectSchema }).strict();