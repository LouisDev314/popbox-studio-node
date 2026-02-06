import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCollectionCreateManyProductInputObjectSchema as ProductCollectionCreateManyProductInputObjectSchema } from './ProductCollectionCreateManyProductInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => ProductCollectionCreateManyProductInputObjectSchema), z.lazy(() => ProductCollectionCreateManyProductInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const ProductCollectionCreateManyProductInputEnvelopeObjectSchema: z.ZodType<Prisma.ProductCollectionCreateManyProductInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.ProductCollectionCreateManyProductInputEnvelope>;
export const ProductCollectionCreateManyProductInputEnvelopeObjectZodSchema = makeSchema();
