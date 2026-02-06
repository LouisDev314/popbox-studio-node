import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartItemUncheckedCreateNestedManyWithoutVariantInputObjectSchema as CartItemUncheckedCreateNestedManyWithoutVariantInputObjectSchema } from './CartItemUncheckedCreateNestedManyWithoutVariantInput.schema';
import { OrderItemUncheckedCreateNestedManyWithoutVariantInputObjectSchema as OrderItemUncheckedCreateNestedManyWithoutVariantInputObjectSchema } from './OrderItemUncheckedCreateNestedManyWithoutVariantInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  productId: z.string(),
  name: z.string().max(100),
  price: z.bigint(),
  currency: z.string().max(3).optional(),
  stock: z.number().int(),
  reservedStock: z.number().int().optional(),
  imageObjectKey: z.string().max(512).optional().nullable(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  cartItems: z.lazy(() => CartItemUncheckedCreateNestedManyWithoutVariantInputObjectSchema).optional(),
  orderItems: z.lazy(() => OrderItemUncheckedCreateNestedManyWithoutVariantInputObjectSchema).optional()
}).strict();
export const ProductVariantUncheckedCreateInputObjectSchema: z.ZodType<Prisma.ProductVariantUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductVariantUncheckedCreateInput>;
export const ProductVariantUncheckedCreateInputObjectZodSchema = makeSchema();
