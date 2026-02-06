import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WishlistArgsObjectSchema as WishlistArgsObjectSchema } from './WishlistArgs.schema';
import { ProductArgsObjectSchema as ProductArgsObjectSchema } from './ProductArgs.schema'

const makeSchema = () => z.object({
  wishlist: z.union([z.boolean(), z.lazy(() => WishlistArgsObjectSchema)]).optional(),
  product: z.union([z.boolean(), z.lazy(() => ProductArgsObjectSchema)]).optional()
}).strict();
export const WishlistItemIncludeObjectSchema: z.ZodType<Prisma.WishlistItemInclude> = makeSchema() as unknown as z.ZodType<Prisma.WishlistItemInclude>;
export const WishlistItemIncludeObjectZodSchema = makeSchema();
