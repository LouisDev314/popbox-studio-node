import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartItemCreateNestedManyWithoutVariantInputObjectSchema as CartItemCreateNestedManyWithoutVariantInputObjectSchema } from './CartItemCreateNestedManyWithoutVariantInput.schema';
import { OrderItemCreateNestedManyWithoutVariantInputObjectSchema as OrderItemCreateNestedManyWithoutVariantInputObjectSchema } from './OrderItemCreateNestedManyWithoutVariantInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string().max(100),
  price: z.bigint(),
  currency: z.string().max(3).optional(),
  stock: z.number().int(),
  reservedStock: z.number().int().optional(),
  imageObjectKey: z.string().max(512).optional().nullable(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  cartItems: z.lazy(() => CartItemCreateNestedManyWithoutVariantInputObjectSchema).optional(),
  orderItems: z.lazy(() => OrderItemCreateNestedManyWithoutVariantInputObjectSchema).optional()
}).strict();
export const ProductVariantCreateWithoutProductInputObjectSchema: z.ZodType<Prisma.ProductVariantCreateWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductVariantCreateWithoutProductInput>;
export const ProductVariantCreateWithoutProductInputObjectZodSchema = makeSchema();
