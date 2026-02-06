import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartItemCreateWithoutVariantInputObjectSchema as CartItemCreateWithoutVariantInputObjectSchema } from './CartItemCreateWithoutVariantInput.schema';
import { CartItemUncheckedCreateWithoutVariantInputObjectSchema as CartItemUncheckedCreateWithoutVariantInputObjectSchema } from './CartItemUncheckedCreateWithoutVariantInput.schema';
import { CartItemCreateOrConnectWithoutVariantInputObjectSchema as CartItemCreateOrConnectWithoutVariantInputObjectSchema } from './CartItemCreateOrConnectWithoutVariantInput.schema';
import { CartItemCreateManyVariantInputEnvelopeObjectSchema as CartItemCreateManyVariantInputEnvelopeObjectSchema } from './CartItemCreateManyVariantInputEnvelope.schema';
import { CartItemWhereUniqueInputObjectSchema as CartItemWhereUniqueInputObjectSchema } from './CartItemWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CartItemCreateWithoutVariantInputObjectSchema), z.lazy(() => CartItemCreateWithoutVariantInputObjectSchema).array(), z.lazy(() => CartItemUncheckedCreateWithoutVariantInputObjectSchema), z.lazy(() => CartItemUncheckedCreateWithoutVariantInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CartItemCreateOrConnectWithoutVariantInputObjectSchema), z.lazy(() => CartItemCreateOrConnectWithoutVariantInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CartItemCreateManyVariantInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CartItemWhereUniqueInputObjectSchema), z.lazy(() => CartItemWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CartItemUncheckedCreateNestedManyWithoutVariantInputObjectSchema: z.ZodType<Prisma.CartItemUncheckedCreateNestedManyWithoutVariantInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemUncheckedCreateNestedManyWithoutVariantInput>;
export const CartItemUncheckedCreateNestedManyWithoutVariantInputObjectZodSchema = makeSchema();
