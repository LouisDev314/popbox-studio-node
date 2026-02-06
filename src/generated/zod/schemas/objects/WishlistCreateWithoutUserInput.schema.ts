import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WishlistItemCreateNestedManyWithoutWishlistInputObjectSchema as WishlistItemCreateNestedManyWithoutWishlistInputObjectSchema } from './WishlistItemCreateNestedManyWithoutWishlistInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  items: z.lazy(() => WishlistItemCreateNestedManyWithoutWishlistInputObjectSchema).optional()
}).strict();
export const WishlistCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.WishlistCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistCreateWithoutUserInput>;
export const WishlistCreateWithoutUserInputObjectZodSchema = makeSchema();
