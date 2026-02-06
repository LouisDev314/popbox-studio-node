import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartItemCreateWithoutVariantInputObjectSchema as CartItemCreateWithoutVariantInputObjectSchema } from './CartItemCreateWithoutVariantInput.schema';
import { CartItemUncheckedCreateWithoutVariantInputObjectSchema as CartItemUncheckedCreateWithoutVariantInputObjectSchema } from './CartItemUncheckedCreateWithoutVariantInput.schema';
import { CartItemCreateOrConnectWithoutVariantInputObjectSchema as CartItemCreateOrConnectWithoutVariantInputObjectSchema } from './CartItemCreateOrConnectWithoutVariantInput.schema';
import { CartItemUpsertWithWhereUniqueWithoutVariantInputObjectSchema as CartItemUpsertWithWhereUniqueWithoutVariantInputObjectSchema } from './CartItemUpsertWithWhereUniqueWithoutVariantInput.schema';
import { CartItemCreateManyVariantInputEnvelopeObjectSchema as CartItemCreateManyVariantInputEnvelopeObjectSchema } from './CartItemCreateManyVariantInputEnvelope.schema';
import { CartItemWhereUniqueInputObjectSchema as CartItemWhereUniqueInputObjectSchema } from './CartItemWhereUniqueInput.schema';
import { CartItemUpdateWithWhereUniqueWithoutVariantInputObjectSchema as CartItemUpdateWithWhereUniqueWithoutVariantInputObjectSchema } from './CartItemUpdateWithWhereUniqueWithoutVariantInput.schema';
import { CartItemUpdateManyWithWhereWithoutVariantInputObjectSchema as CartItemUpdateManyWithWhereWithoutVariantInputObjectSchema } from './CartItemUpdateManyWithWhereWithoutVariantInput.schema';
import { CartItemScalarWhereInputObjectSchema as CartItemScalarWhereInputObjectSchema } from './CartItemScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CartItemCreateWithoutVariantInputObjectSchema), z.lazy(() => CartItemCreateWithoutVariantInputObjectSchema).array(), z.lazy(() => CartItemUncheckedCreateWithoutVariantInputObjectSchema), z.lazy(() => CartItemUncheckedCreateWithoutVariantInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CartItemCreateOrConnectWithoutVariantInputObjectSchema), z.lazy(() => CartItemCreateOrConnectWithoutVariantInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CartItemUpsertWithWhereUniqueWithoutVariantInputObjectSchema), z.lazy(() => CartItemUpsertWithWhereUniqueWithoutVariantInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CartItemCreateManyVariantInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CartItemWhereUniqueInputObjectSchema), z.lazy(() => CartItemWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CartItemWhereUniqueInputObjectSchema), z.lazy(() => CartItemWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CartItemWhereUniqueInputObjectSchema), z.lazy(() => CartItemWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CartItemWhereUniqueInputObjectSchema), z.lazy(() => CartItemWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CartItemUpdateWithWhereUniqueWithoutVariantInputObjectSchema), z.lazy(() => CartItemUpdateWithWhereUniqueWithoutVariantInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CartItemUpdateManyWithWhereWithoutVariantInputObjectSchema), z.lazy(() => CartItemUpdateManyWithWhereWithoutVariantInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CartItemScalarWhereInputObjectSchema), z.lazy(() => CartItemScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CartItemUncheckedUpdateManyWithoutVariantNestedInputObjectSchema: z.ZodType<Prisma.CartItemUncheckedUpdateManyWithoutVariantNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemUncheckedUpdateManyWithoutVariantNestedInput>;
export const CartItemUncheckedUpdateManyWithoutVariantNestedInputObjectZodSchema = makeSchema();
