import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCollectionCreateNestedManyWithoutCollectionInputObjectSchema as ProductCollectionCreateNestedManyWithoutCollectionInputObjectSchema } from './ProductCollectionCreateNestedManyWithoutCollectionInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string().max(150),
  description: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  products: z.lazy(() => ProductCollectionCreateNestedManyWithoutCollectionInputObjectSchema).optional()
}).strict();
export const CollectionCreateInputObjectSchema: z.ZodType<Prisma.CollectionCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CollectionCreateInput>;
export const CollectionCreateInputObjectZodSchema = makeSchema();
