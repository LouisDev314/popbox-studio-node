import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WishlistItemCreateManyProductInputObjectSchema as WishlistItemCreateManyProductInputObjectSchema } from './WishlistItemCreateManyProductInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => WishlistItemCreateManyProductInputObjectSchema), z.lazy(() => WishlistItemCreateManyProductInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const WishlistItemCreateManyProductInputEnvelopeObjectSchema: z.ZodType<Prisma.WishlistItemCreateManyProductInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.WishlistItemCreateManyProductInputEnvelope>;
export const WishlistItemCreateManyProductInputEnvelopeObjectZodSchema = makeSchema();
