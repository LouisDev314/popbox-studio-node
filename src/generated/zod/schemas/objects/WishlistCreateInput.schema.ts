import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutWishlistInputObjectSchema as UserCreateNestedOneWithoutWishlistInputObjectSchema } from './UserCreateNestedOneWithoutWishlistInput.schema';
import { WishlistItemCreateNestedManyWithoutWishlistInputObjectSchema as WishlistItemCreateNestedManyWithoutWishlistInputObjectSchema } from './WishlistItemCreateNestedManyWithoutWishlistInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutWishlistInputObjectSchema),
  items: z.lazy(() => WishlistItemCreateNestedManyWithoutWishlistInputObjectSchema).optional()
}).strict();
export const WishlistCreateInputObjectSchema: z.ZodType<Prisma.WishlistCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistCreateInput>;
export const WishlistCreateInputObjectZodSchema = makeSchema();
