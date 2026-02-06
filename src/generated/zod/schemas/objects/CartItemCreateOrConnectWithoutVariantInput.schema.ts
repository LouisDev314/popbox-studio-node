import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartItemWhereUniqueInputObjectSchema as CartItemWhereUniqueInputObjectSchema } from './CartItemWhereUniqueInput.schema';
import { CartItemCreateWithoutVariantInputObjectSchema as CartItemCreateWithoutVariantInputObjectSchema } from './CartItemCreateWithoutVariantInput.schema';
import { CartItemUncheckedCreateWithoutVariantInputObjectSchema as CartItemUncheckedCreateWithoutVariantInputObjectSchema } from './CartItemUncheckedCreateWithoutVariantInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CartItemWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CartItemCreateWithoutVariantInputObjectSchema), z.lazy(() => CartItemUncheckedCreateWithoutVariantInputObjectSchema)])
}).strict();
export const CartItemCreateOrConnectWithoutVariantInputObjectSchema: z.ZodType<Prisma.CartItemCreateOrConnectWithoutVariantInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemCreateOrConnectWithoutVariantInput>;
export const CartItemCreateOrConnectWithoutVariantInputObjectZodSchema = makeSchema();
