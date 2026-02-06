import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WishlistCountOutputTypeSelectObjectSchema as WishlistCountOutputTypeSelectObjectSchema } from './WishlistCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => WishlistCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const WishlistCountOutputTypeArgsObjectSchema = makeSchema();
export const WishlistCountOutputTypeArgsObjectZodSchema = makeSchema();
