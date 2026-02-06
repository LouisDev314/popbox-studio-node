import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { WishlistItemFindManySchema as WishlistItemFindManySchema } from '../findManyWishlistItem.schema';
import { WishlistCountOutputTypeArgsObjectSchema as WishlistCountOutputTypeArgsObjectSchema } from './WishlistCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  items: z.union([z.boolean(), z.lazy(() => WishlistItemFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => WishlistCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const WishlistSelectObjectSchema: z.ZodType<Prisma.WishlistSelect> = makeSchema() as unknown as z.ZodType<Prisma.WishlistSelect>;
export const WishlistSelectObjectZodSchema = makeSchema();
