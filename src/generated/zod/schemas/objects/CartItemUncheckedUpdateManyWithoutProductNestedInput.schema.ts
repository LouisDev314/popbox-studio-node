import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartItemCreateWithoutProductInputObjectSchema as CartItemCreateWithoutProductInputObjectSchema } from './CartItemCreateWithoutProductInput.schema';
import { CartItemUncheckedCreateWithoutProductInputObjectSchema as CartItemUncheckedCreateWithoutProductInputObjectSchema } from './CartItemUncheckedCreateWithoutProductInput.schema';
import { CartItemCreateOrConnectWithoutProductInputObjectSchema as CartItemCreateOrConnectWithoutProductInputObjectSchema } from './CartItemCreateOrConnectWithoutProductInput.schema';
import { CartItemUpsertWithWhereUniqueWithoutProductInputObjectSchema as CartItemUpsertWithWhereUniqueWithoutProductInputObjectSchema } from './CartItemUpsertWithWhereUniqueWithoutProductInput.schema';
import { CartItemCreateManyProductInputEnvelopeObjectSchema as CartItemCreateManyProductInputEnvelopeObjectSchema } from './CartItemCreateManyProductInputEnvelope.schema';
import { CartItemWhereUniqueInputObjectSchema as CartItemWhereUniqueInputObjectSchema } from './CartItemWhereUniqueInput.schema';
import { CartItemUpdateWithWhereUniqueWithoutProductInputObjectSchema as CartItemUpdateWithWhereUniqueWithoutProductInputObjectSchema } from './CartItemUpdateWithWhereUniqueWithoutProductInput.schema';
import { CartItemUpdateManyWithWhereWithoutProductInputObjectSchema as CartItemUpdateManyWithWhereWithoutProductInputObjectSchema } from './CartItemUpdateManyWithWhereWithoutProductInput.schema';
import { CartItemScalarWhereInputObjectSchema as CartItemScalarWhereInputObjectSchema } from './CartItemScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CartItemCreateWithoutProductInputObjectSchema), z.lazy(() => CartItemCreateWithoutProductInputObjectSchema).array(), z.lazy(() => CartItemUncheckedCreateWithoutProductInputObjectSchema), z.lazy(() => CartItemUncheckedCreateWithoutProductInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CartItemCreateOrConnectWithoutProductInputObjectSchema), z.lazy(() => CartItemCreateOrConnectWithoutProductInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CartItemUpsertWithWhereUniqueWithoutProductInputObjectSchema), z.lazy(() => CartItemUpsertWithWhereUniqueWithoutProductInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CartItemCreateManyProductInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CartItemWhereUniqueInputObjectSchema), z.lazy(() => CartItemWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CartItemWhereUniqueInputObjectSchema), z.lazy(() => CartItemWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CartItemWhereUniqueInputObjectSchema), z.lazy(() => CartItemWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CartItemWhereUniqueInputObjectSchema), z.lazy(() => CartItemWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CartItemUpdateWithWhereUniqueWithoutProductInputObjectSchema), z.lazy(() => CartItemUpdateWithWhereUniqueWithoutProductInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CartItemUpdateManyWithWhereWithoutProductInputObjectSchema), z.lazy(() => CartItemUpdateManyWithWhereWithoutProductInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CartItemScalarWhereInputObjectSchema), z.lazy(() => CartItemScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CartItemUncheckedUpdateManyWithoutProductNestedInputObjectSchema: z.ZodType<Prisma.CartItemUncheckedUpdateManyWithoutProductNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemUncheckedUpdateManyWithoutProductNestedInput>;
export const CartItemUncheckedUpdateManyWithoutProductNestedInputObjectZodSchema = makeSchema();
