import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WishlistSelectObjectSchema as WishlistSelectObjectSchema } from './WishlistSelect.schema';
import { WishlistIncludeObjectSchema as WishlistIncludeObjectSchema } from './WishlistInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => WishlistSelectObjectSchema).optional(),
  include: z.lazy(() => WishlistIncludeObjectSchema).optional()
}).strict();
export const WishlistArgsObjectSchema = makeSchema();
export const WishlistArgsObjectZodSchema = makeSchema();
