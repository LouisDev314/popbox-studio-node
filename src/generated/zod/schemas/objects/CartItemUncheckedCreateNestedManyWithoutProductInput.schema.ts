import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartItemCreateWithoutProductInputObjectSchema as CartItemCreateWithoutProductInputObjectSchema } from './CartItemCreateWithoutProductInput.schema';
import { CartItemUncheckedCreateWithoutProductInputObjectSchema as CartItemUncheckedCreateWithoutProductInputObjectSchema } from './CartItemUncheckedCreateWithoutProductInput.schema';
import { CartItemCreateOrConnectWithoutProductInputObjectSchema as CartItemCreateOrConnectWithoutProductInputObjectSchema } from './CartItemCreateOrConnectWithoutProductInput.schema';
import { CartItemCreateManyProductInputEnvelopeObjectSchema as CartItemCreateManyProductInputEnvelopeObjectSchema } from './CartItemCreateManyProductInputEnvelope.schema';
import { CartItemWhereUniqueInputObjectSchema as CartItemWhereUniqueInputObjectSchema } from './CartItemWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CartItemCreateWithoutProductInputObjectSchema), z.lazy(() => CartItemCreateWithoutProductInputObjectSchema).array(), z.lazy(() => CartItemUncheckedCreateWithoutProductInputObjectSchema), z.lazy(() => CartItemUncheckedCreateWithoutProductInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CartItemCreateOrConnectWithoutProductInputObjectSchema), z.lazy(() => CartItemCreateOrConnectWithoutProductInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CartItemCreateManyProductInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CartItemWhereUniqueInputObjectSchema), z.lazy(() => CartItemWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CartItemUncheckedCreateNestedManyWithoutProductInputObjectSchema: z.ZodType<Prisma.CartItemUncheckedCreateNestedManyWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemUncheckedCreateNestedManyWithoutProductInput>;
export const CartItemUncheckedCreateNestedManyWithoutProductInputObjectZodSchema = makeSchema();
