import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductArgsObjectSchema as ProductArgsObjectSchema } from './ProductArgs.schema';
import { CartItemFindManySchema as CartItemFindManySchema } from '../findManyCartItem.schema';
import { OrderItemFindManySchema as OrderItemFindManySchema } from '../findManyOrderItem.schema';
import { ProductVariantCountOutputTypeArgsObjectSchema as ProductVariantCountOutputTypeArgsObjectSchema } from './ProductVariantCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  productId: z.boolean().optional(),
  name: z.boolean().optional(),
  price: z.boolean().optional(),
  currency: z.boolean().optional(),
  stock: z.boolean().optional(),
  reservedStock: z.boolean().optional(),
  imageObjectKey: z.boolean().optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  product: z.union([z.boolean(), z.lazy(() => ProductArgsObjectSchema)]).optional(),
  cartItems: z.union([z.boolean(), z.lazy(() => CartItemFindManySchema)]).optional(),
  orderItems: z.union([z.boolean(), z.lazy(() => OrderItemFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => ProductVariantCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const ProductVariantSelectObjectSchema: z.ZodType<Prisma.ProductVariantSelect> = makeSchema() as unknown as z.ZodType<Prisma.ProductVariantSelect>;
export const ProductVariantSelectObjectZodSchema = makeSchema();
