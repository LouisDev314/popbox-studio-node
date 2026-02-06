import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OrderStatusHistorySelectObjectSchema as OrderStatusHistorySelectObjectSchema } from './objects/OrderStatusHistorySelect.schema';
import { OrderStatusHistoryIncludeObjectSchema as OrderStatusHistoryIncludeObjectSchema } from './objects/OrderStatusHistoryInclude.schema';
import { OrderStatusHistoryCreateInputObjectSchema as OrderStatusHistoryCreateInputObjectSchema } from './objects/OrderStatusHistoryCreateInput.schema';
import { OrderStatusHistoryUncheckedCreateInputObjectSchema as OrderStatusHistoryUncheckedCreateInputObjectSchema } from './objects/OrderStatusHistoryUncheckedCreateInput.schema';

export const OrderStatusHistoryCreateOneSchema: z.ZodType<Prisma.OrderStatusHistoryCreateArgs> = z.object({ select: OrderStatusHistorySelectObjectSchema.optional(), include: OrderStatusHistoryIncludeObjectSchema.optional(), data: z.union([OrderStatusHistoryCreateInputObjectSchema, OrderStatusHistoryUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.OrderStatusHistoryCreateArgs>;

export const OrderStatusHistoryCreateOneZodSchema = z.object({ select: OrderStatusHistorySelectObjectSchema.optional(), include: OrderStatusHistoryIncludeObjectSchema.optional(), data: z.union([OrderStatusHistoryCreateInputObjectSchema, OrderStatusHistoryUncheckedCreateInputObjectSchema]) }).strict();