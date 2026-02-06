import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CollectionCreateWithoutProductsInputObjectSchema as CollectionCreateWithoutProductsInputObjectSchema } from './CollectionCreateWithoutProductsInput.schema';
import { CollectionUncheckedCreateWithoutProductsInputObjectSchema as CollectionUncheckedCreateWithoutProductsInputObjectSchema } from './CollectionUncheckedCreateWithoutProductsInput.schema';
import { CollectionCreateOrConnectWithoutProductsInputObjectSchema as CollectionCreateOrConnectWithoutProductsInputObjectSchema } from './CollectionCreateOrConnectWithoutProductsInput.schema';
import { CollectionWhereUniqueInputObjectSchema as CollectionWhereUniqueInputObjectSchema } from './CollectionWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CollectionCreateWithoutProductsInputObjectSchema), z.lazy(() => CollectionUncheckedCreateWithoutProductsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CollectionCreateOrConnectWithoutProductsInputObjectSchema).optional(),
  connect: z.lazy(() => CollectionWhereUniqueInputObjectSchema).optional()
}).strict();
export const CollectionCreateNestedOneWithoutProductsInputObjectSchema: z.ZodType<Prisma.CollectionCreateNestedOneWithoutProductsInput> = makeSchema() as unknown as z.ZodType<Prisma.CollectionCreateNestedOneWithoutProductsInput>;
export const CollectionCreateNestedOneWithoutProductsInputObjectZodSchema = makeSchema();
