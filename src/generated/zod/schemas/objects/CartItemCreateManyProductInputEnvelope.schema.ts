import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartItemCreateManyProductInputObjectSchema as CartItemCreateManyProductInputObjectSchema } from './CartItemCreateManyProductInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CartItemCreateManyProductInputObjectSchema), z.lazy(() => CartItemCreateManyProductInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CartItemCreateManyProductInputEnvelopeObjectSchema: z.ZodType<Prisma.CartItemCreateManyProductInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CartItemCreateManyProductInputEnvelope>;
export const CartItemCreateManyProductInputEnvelopeObjectZodSchema = makeSchema();
