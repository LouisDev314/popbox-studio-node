import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderItemUncheckedCreateNestedManyWithoutVariantInputObjectSchema as OrderItemUncheckedCreateNestedManyWithoutVariantInputObjectSchema } from './OrderItemUncheckedCreateNestedManyWithoutVariantInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  productId: z.string(),
  name: z.string(),
  price: z.bigint(),
  currency: z.string().optional(),
  stock: z.number().int(),
  reservedStock: z.number().int().optional(),
  imageObjectKey: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  orderItems: z.lazy(() => OrderItemUncheckedCreateNestedManyWithoutVariantInputObjectSchema).optional()
}).strict();
export const ProductVariantUncheckedCreateWithoutCartItemsInputObjectSchema: z.ZodType<Prisma.ProductVariantUncheckedCreateWithoutCartItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductVariantUncheckedCreateWithoutCartItemsInput>;
export const ProductVariantUncheckedCreateWithoutCartItemsInputObjectZodSchema = makeSchema();
