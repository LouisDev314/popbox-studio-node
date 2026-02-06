import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCollectionCreateManyCollectionInputObjectSchema as ProductCollectionCreateManyCollectionInputObjectSchema } from './ProductCollectionCreateManyCollectionInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => ProductCollectionCreateManyCollectionInputObjectSchema), z.lazy(() => ProductCollectionCreateManyCollectionInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const ProductCollectionCreateManyCollectionInputEnvelopeObjectSchema: z.ZodType<Prisma.ProductCollectionCreateManyCollectionInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.ProductCollectionCreateManyCollectionInputEnvelope>;
export const ProductCollectionCreateManyCollectionInputEnvelopeObjectZodSchema = makeSchema();
