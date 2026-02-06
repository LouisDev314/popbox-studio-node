import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CollectionWhereInputObjectSchema as CollectionWhereInputObjectSchema } from './CollectionWhereInput.schema';
import { CollectionUpdateWithoutProductsInputObjectSchema as CollectionUpdateWithoutProductsInputObjectSchema } from './CollectionUpdateWithoutProductsInput.schema';
import { CollectionUncheckedUpdateWithoutProductsInputObjectSchema as CollectionUncheckedUpdateWithoutProductsInputObjectSchema } from './CollectionUncheckedUpdateWithoutProductsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CollectionWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => CollectionUpdateWithoutProductsInputObjectSchema), z.lazy(() => CollectionUncheckedUpdateWithoutProductsInputObjectSchema)])
}).strict();
export const CollectionUpdateToOneWithWhereWithoutProductsInputObjectSchema: z.ZodType<Prisma.CollectionUpdateToOneWithWhereWithoutProductsInput> = makeSchema() as unknown as z.ZodType<Prisma.CollectionUpdateToOneWithWhereWithoutProductsInput>;
export const CollectionUpdateToOneWithWhereWithoutProductsInputObjectZodSchema = makeSchema();
