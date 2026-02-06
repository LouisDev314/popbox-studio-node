import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCollectionUncheckedCreateNestedManyWithoutCollectionInputObjectSchema as ProductCollectionUncheckedCreateNestedManyWithoutCollectionInputObjectSchema } from './ProductCollectionUncheckedCreateNestedManyWithoutCollectionInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string().max(150),
  description: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  products: z.lazy(() => ProductCollectionUncheckedCreateNestedManyWithoutCollectionInputObjectSchema).optional()
}).strict();
export const CollectionUncheckedCreateInputObjectSchema: z.ZodType<Prisma.CollectionUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CollectionUncheckedCreateInput>;
export const CollectionUncheckedCreateInputObjectZodSchema = makeSchema();
