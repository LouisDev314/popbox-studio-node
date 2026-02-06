import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CollectionCreateWithoutProductsInputObjectSchema as CollectionCreateWithoutProductsInputObjectSchema } from './CollectionCreateWithoutProductsInput.schema';
import { CollectionUncheckedCreateWithoutProductsInputObjectSchema as CollectionUncheckedCreateWithoutProductsInputObjectSchema } from './CollectionUncheckedCreateWithoutProductsInput.schema';
import { CollectionCreateOrConnectWithoutProductsInputObjectSchema as CollectionCreateOrConnectWithoutProductsInputObjectSchema } from './CollectionCreateOrConnectWithoutProductsInput.schema';
import { CollectionUpsertWithoutProductsInputObjectSchema as CollectionUpsertWithoutProductsInputObjectSchema } from './CollectionUpsertWithoutProductsInput.schema';
import { CollectionWhereUniqueInputObjectSchema as CollectionWhereUniqueInputObjectSchema } from './CollectionWhereUniqueInput.schema';
import { CollectionUpdateToOneWithWhereWithoutProductsInputObjectSchema as CollectionUpdateToOneWithWhereWithoutProductsInputObjectSchema } from './CollectionUpdateToOneWithWhereWithoutProductsInput.schema';
import { CollectionUpdateWithoutProductsInputObjectSchema as CollectionUpdateWithoutProductsInputObjectSchema } from './CollectionUpdateWithoutProductsInput.schema';
import { CollectionUncheckedUpdateWithoutProductsInputObjectSchema as CollectionUncheckedUpdateWithoutProductsInputObjectSchema } from './CollectionUncheckedUpdateWithoutProductsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CollectionCreateWithoutProductsInputObjectSchema), z.lazy(() => CollectionUncheckedCreateWithoutProductsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CollectionCreateOrConnectWithoutProductsInputObjectSchema).optional(),
  upsert: z.lazy(() => CollectionUpsertWithoutProductsInputObjectSchema).optional(),
  connect: z.lazy(() => CollectionWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => CollectionUpdateToOneWithWhereWithoutProductsInputObjectSchema), z.lazy(() => CollectionUpdateWithoutProductsInputObjectSchema), z.lazy(() => CollectionUncheckedUpdateWithoutProductsInputObjectSchema)]).optional()
}).strict();
export const CollectionUpdateOneRequiredWithoutProductsNestedInputObjectSchema: z.ZodType<Prisma.CollectionUpdateOneRequiredWithoutProductsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CollectionUpdateOneRequiredWithoutProductsNestedInput>;
export const CollectionUpdateOneRequiredWithoutProductsNestedInputObjectZodSchema = makeSchema();
