import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartArgsObjectSchema as CartArgsObjectSchema } from './CartArgs.schema';
import { ProductArgsObjectSchema as ProductArgsObjectSchema } from './ProductArgs.schema';
import { ProductVariantArgsObjectSchema as ProductVariantArgsObjectSchema } from './ProductVariantArgs.schema'

const makeSchema = () => z.object({
  cart: z.union([z.boolean(), z.lazy(() => CartArgsObjectSchema)]).optional(),
  product: z.union([z.boolean(), z.lazy(() => ProductArgsObjectSchema)]).optional(),
  variant: z.union([z.boolean(), z.lazy(() => ProductVariantArgsObjectSchema)]).optional()
}).strict();
export const CartItemIncludeObjectSchema: z.ZodType<Prisma.CartItemInclude> = makeSchema() as unknown as z.ZodType<Prisma.CartItemInclude>;
export const CartItemIncludeObjectZodSchema = makeSchema();
