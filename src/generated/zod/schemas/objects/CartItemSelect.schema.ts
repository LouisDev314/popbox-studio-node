import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartArgsObjectSchema as CartArgsObjectSchema } from './CartArgs.schema';
import { ProductArgsObjectSchema as ProductArgsObjectSchema } from './ProductArgs.schema';
import { ProductVariantArgsObjectSchema as ProductVariantArgsObjectSchema } from './ProductVariantArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  cartId: z.boolean().optional(),
  productId: z.boolean().optional(),
  variantId: z.boolean().optional(),
  quantity: z.boolean().optional(),
  cart: z.union([z.boolean(), z.lazy(() => CartArgsObjectSchema)]).optional(),
  product: z.union([z.boolean(), z.lazy(() => ProductArgsObjectSchema)]).optional(),
  variant: z.union([z.boolean(), z.lazy(() => ProductVariantArgsObjectSchema)]).optional()
}).strict();
export const CartItemSelectObjectSchema: z.ZodType<Prisma.CartItemSelect> = makeSchema() as unknown as z.ZodType<Prisma.CartItemSelect>;
export const CartItemSelectObjectZodSchema = makeSchema();
