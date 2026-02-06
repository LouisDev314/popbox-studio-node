import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartItemUncheckedCreateNestedManyWithoutVariantInputObjectSchema as CartItemUncheckedCreateNestedManyWithoutVariantInputObjectSchema } from './CartItemUncheckedCreateNestedManyWithoutVariantInput.schema';
import { OrderItemUncheckedCreateNestedManyWithoutVariantInputObjectSchema as OrderItemUncheckedCreateNestedManyWithoutVariantInputObjectSchema } from './OrderItemUncheckedCreateNestedManyWithoutVariantInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
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
  cartItems: z.lazy(() => CartItemUncheckedCreateNestedManyWithoutVariantInputObjectSchema).optional(),
  orderItems: z.lazy(() => OrderItemUncheckedCreateNestedManyWithoutVariantInputObjectSchema).optional()
}).strict();
export const ProductVariantUncheckedCreateWithoutProductInputObjectSchema: z.ZodType<Prisma.ProductVariantUncheckedCreateWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductVariantUncheckedCreateWithoutProductInput>;
export const ProductVariantUncheckedCreateWithoutProductInputObjectZodSchema = makeSchema();
