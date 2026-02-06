import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WishlistItemCreateManyWishlistInputObjectSchema as WishlistItemCreateManyWishlistInputObjectSchema } from './WishlistItemCreateManyWishlistInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => WishlistItemCreateManyWishlistInputObjectSchema), z.lazy(() => WishlistItemCreateManyWishlistInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const WishlistItemCreateManyWishlistInputEnvelopeObjectSchema: z.ZodType<Prisma.WishlistItemCreateManyWishlistInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.WishlistItemCreateManyWishlistInputEnvelope>;
export const WishlistItemCreateManyWishlistInputEnvelopeObjectZodSchema = makeSchema();
