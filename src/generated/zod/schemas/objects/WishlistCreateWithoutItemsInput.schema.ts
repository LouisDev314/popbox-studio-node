import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutWishlistInputObjectSchema as UserCreateNestedOneWithoutWishlistInputObjectSchema } from './UserCreateNestedOneWithoutWishlistInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutWishlistInputObjectSchema)
}).strict();
export const WishlistCreateWithoutItemsInputObjectSchema: z.ZodType<Prisma.WishlistCreateWithoutItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistCreateWithoutItemsInput>;
export const WishlistCreateWithoutItemsInputObjectZodSchema = makeSchema();
