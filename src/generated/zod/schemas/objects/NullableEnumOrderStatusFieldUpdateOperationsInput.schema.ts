import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderStatusSchema } from '../enums/OrderStatus.schema'

const makeSchema = () => z.object({
  set: OrderStatusSchema.optional()
}).strict();
export const NullableEnumOrderStatusFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.NullableEnumOrderStatusFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.NullableEnumOrderStatusFieldUpdateOperationsInput>;
export const NullableEnumOrderStatusFieldUpdateOperationsInputObjectZodSchema = makeSchema();
