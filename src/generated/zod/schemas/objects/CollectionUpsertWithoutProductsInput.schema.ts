import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CollectionUpdateWithoutProductsInputObjectSchema as CollectionUpdateWithoutProductsInputObjectSchema } from './CollectionUpdateWithoutProductsInput.schema';
import { CollectionUncheckedUpdateWithoutProductsInputObjectSchema as CollectionUncheckedUpdateWithoutProductsInputObjectSchema } from './CollectionUncheckedUpdateWithoutProductsInput.schema';
import { CollectionCreateWithoutProductsInputObjectSchema as CollectionCreateWithoutProductsInputObjectSchema } from './CollectionCreateWithoutProductsInput.schema';
import { CollectionUncheckedCreateWithoutProductsInputObjectSchema as CollectionUncheckedCreateWithoutProductsInputObjectSchema } from './CollectionUncheckedCreateWithoutProductsInput.schema';
import { CollectionWhereInputObjectSchema as CollectionWhereInputObjectSchema } from './CollectionWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => CollectionUpdateWithoutProductsInputObjectSchema), z.lazy(() => CollectionUncheckedUpdateWithoutProductsInputObjectSchema)]),
  create: z.union([z.lazy(() => CollectionCreateWithoutProductsInputObjectSchema), z.lazy(() => CollectionUncheckedCreateWithoutProductsInputObjectSchema)]),
  where: z.lazy(() => CollectionWhereInputObjectSchema).optional()
}).strict();
export const CollectionUpsertWithoutProductsInputObjectSchema: z.ZodType<Prisma.CollectionUpsertWithoutProductsInput> = makeSchema() as unknown as z.ZodType<Prisma.CollectionUpsertWithoutProductsInput>;
export const CollectionUpsertWithoutProductsInputObjectZodSchema = makeSchema();
