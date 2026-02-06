import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WishlistCountOutputTypeCountItemsArgsObjectSchema as WishlistCountOutputTypeCountItemsArgsObjectSchema } from './WishlistCountOutputTypeCountItemsArgs.schema'

const makeSchema = () => z.object({
  items: z.union([z.boolean(), z.lazy(() => WishlistCountOutputTypeCountItemsArgsObjectSchema)]).optional()
}).strict();
export const WishlistCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.WishlistCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.WishlistCountOutputTypeSelect>;
export const WishlistCountOutputTypeSelectObjectZodSchema = makeSchema();
