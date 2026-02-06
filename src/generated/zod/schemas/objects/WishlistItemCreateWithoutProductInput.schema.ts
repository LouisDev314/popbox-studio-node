import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WishlistCreateNestedOneWithoutItemsInputObjectSchema as WishlistCreateNestedOneWithoutItemsInputObjectSchema } from './WishlistCreateNestedOneWithoutItemsInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  wishlist: z.lazy(() => WishlistCreateNestedOneWithoutItemsInputObjectSchema)
}).strict();
export const WishlistItemCreateWithoutProductInputObjectSchema: z.ZodType<Prisma.WishlistItemCreateWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistItemCreateWithoutProductInput>;
export const WishlistItemCreateWithoutProductInputObjectZodSchema = makeSchema();
