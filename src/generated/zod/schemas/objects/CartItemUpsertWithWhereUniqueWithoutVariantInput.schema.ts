import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartItemWhereUniqueInputObjectSchema as CartItemWhereUniqueInputObjectSchema } from './CartItemWhereUniqueInput.schema';
import { CartItemUpdateWithoutVariantInputObjectSchema as CartItemUpdateWithoutVariantInputObjectSchema } from './CartItemUpdateWithoutVariantInput.schema';
import { CartItemUncheckedUpdateWithoutVariantInputObjectSchema as CartItemUncheckedUpdateWithoutVariantInputObjectSchema } from './CartItemUncheckedUpdateWithoutVariantInput.schema';
import { CartItemCreateWithoutVariantInputObjectSchema as CartItemCreateWithoutVariantInputObjectSchema } from './CartItemCreateWithoutVariantInput.schema';
import { CartItemUncheckedCreateWithoutVariantInputObjectSchema as CartItemUncheckedCreateWithoutVariantInputObjectSchema } from './CartItemUncheckedCreateWithoutVariantInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CartItemWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CartItemUpdateWithoutVariantInputObjectSchema), z.lazy(() => CartItemUncheckedUpdateWithoutVariantInputObjectSchema)]),
  create: z.union([z.lazy(() => CartItemCreateWithoutVariantInputObjectSchema), z.lazy(() => CartItemUncheckedCreateWithoutVariantInputObjectSchema)])
}).strict();
export const CartItemUpsertWithWhereUniqueWithoutVariantInputObjectSchema: z.ZodType<Prisma.CartItemUpsertWithWhereUniqueWithoutVariantInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemUpsertWithWhereUniqueWithoutVariantInput>;
export const CartItemUpsertWithWhereUniqueWithoutVariantInputObjectZodSchema = makeSchema();
