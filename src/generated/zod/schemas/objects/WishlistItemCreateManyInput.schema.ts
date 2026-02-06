import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  wishlistId: z.string(),
  productId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();
export const WishlistItemCreateManyInputObjectSchema: z.ZodType<Prisma.WishlistItemCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistItemCreateManyInput>;
export const WishlistItemCreateManyInputObjectZodSchema = makeSchema();
