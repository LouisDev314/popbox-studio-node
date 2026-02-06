import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCreateNestedOneWithoutVariantsInputObjectSchema as ProductCreateNestedOneWithoutVariantsInputObjectSchema } from './ProductCreateNestedOneWithoutVariantsInput.schema';
import { CartItemCreateNestedManyWithoutVariantInputObjectSchema as CartItemCreateNestedManyWithoutVariantInputObjectSchema } from './CartItemCreateNestedManyWithoutVariantInput.schema'

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
  product: z.lazy(() => ProductCreateNestedOneWithoutVariantsInputObjectSchema),
  cartItems: z.lazy(() => CartItemCreateNestedManyWithoutVariantInputObjectSchema).optional()
}).strict();
export const ProductVariantCreateWithoutOrderItemsInputObjectSchema: z.ZodType<Prisma.ProductVariantCreateWithoutOrderItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductVariantCreateWithoutOrderItemsInput>;
export const ProductVariantCreateWithoutOrderItemsInputObjectZodSchema = makeSchema();
