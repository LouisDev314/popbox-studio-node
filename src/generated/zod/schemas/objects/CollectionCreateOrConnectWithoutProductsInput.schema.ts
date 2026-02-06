import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CollectionWhereUniqueInputObjectSchema as CollectionWhereUniqueInputObjectSchema } from './CollectionWhereUniqueInput.schema';
import { CollectionCreateWithoutProductsInputObjectSchema as CollectionCreateWithoutProductsInputObjectSchema } from './CollectionCreateWithoutProductsInput.schema';
import { CollectionUncheckedCreateWithoutProductsInputObjectSchema as CollectionUncheckedCreateWithoutProductsInputObjectSchema } from './CollectionUncheckedCreateWithoutProductsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CollectionWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CollectionCreateWithoutProductsInputObjectSchema), z.lazy(() => CollectionUncheckedCreateWithoutProductsInputObjectSchema)])
}).strict();
export const CollectionCreateOrConnectWithoutProductsInputObjectSchema: z.ZodType<Prisma.CollectionCreateOrConnectWithoutProductsInput> = makeSchema() as unknown as z.ZodType<Prisma.CollectionCreateOrConnectWithoutProductsInput>;
export const CollectionCreateOrConnectWithoutProductsInputObjectZodSchema = makeSchema();
