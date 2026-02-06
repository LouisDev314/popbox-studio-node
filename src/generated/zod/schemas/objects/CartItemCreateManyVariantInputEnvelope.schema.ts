import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartItemCreateManyVariantInputObjectSchema as CartItemCreateManyVariantInputObjectSchema } from './CartItemCreateManyVariantInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CartItemCreateManyVariantInputObjectSchema), z.lazy(() => CartItemCreateManyVariantInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CartItemCreateManyVariantInputEnvelopeObjectSchema: z.ZodType<Prisma.CartItemCreateManyVariantInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CartItemCreateManyVariantInputEnvelope>;
export const CartItemCreateManyVariantInputEnvelopeObjectZodSchema = makeSchema();
