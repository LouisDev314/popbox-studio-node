import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  wishlistId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();
export const WishlistItemCreateManyProductInputObjectSchema: z.ZodType<Prisma.WishlistItemCreateManyProductInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistItemCreateManyProductInput>;
export const WishlistItemCreateManyProductInputObjectZodSchema = makeSchema();
