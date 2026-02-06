import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductArgsObjectSchema as ProductArgsObjectSchema } from './ProductArgs.schema';
import { CartItemFindManySchema as CartItemFindManySchema } from '../findManyCartItem.schema';
import { OrderItemFindManySchema as OrderItemFindManySchema } from '../findManyOrderItem.schema';
import { ProductVariantCountOutputTypeArgsObjectSchema as ProductVariantCountOutputTypeArgsObjectSchema } from './ProductVariantCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  product: z.union([z.boolean(), z.lazy(() => ProductArgsObjectSchema)]).optional(),
  cartItems: z.union([z.boolean(), z.lazy(() => CartItemFindManySchema)]).optional(),
  orderItems: z.union([z.boolean(), z.lazy(() => OrderItemFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => ProductVariantCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const ProductVariantIncludeObjectSchema: z.ZodType<Prisma.ProductVariantInclude> = makeSchema() as unknown as z.ZodType<Prisma.ProductVariantInclude>;
export const ProductVariantIncludeObjectZodSchema = makeSchema();
