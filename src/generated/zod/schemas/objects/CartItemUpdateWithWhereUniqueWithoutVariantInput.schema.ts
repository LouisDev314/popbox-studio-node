import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartItemWhereUniqueInputObjectSchema as CartItemWhereUniqueInputObjectSchema } from './CartItemWhereUniqueInput.schema';
import { CartItemUpdateWithoutVariantInputObjectSchema as CartItemUpdateWithoutVariantInputObjectSchema } from './CartItemUpdateWithoutVariantInput.schema';
import { CartItemUncheckedUpdateWithoutVariantInputObjectSchema as CartItemUncheckedUpdateWithoutVariantInputObjectSchema } from './CartItemUncheckedUpdateWithoutVariantInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CartItemWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CartItemUpdateWithoutVariantInputObjectSchema), z.lazy(() => CartItemUncheckedUpdateWithoutVariantInputObjectSchema)])
}).strict();
export const CartItemUpdateWithWhereUniqueWithoutVariantInputObjectSchema: z.ZodType<Prisma.CartItemUpdateWithWhereUniqueWithoutVariantInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemUpdateWithWhereUniqueWithoutVariantInput>;
export const CartItemUpdateWithWhereUniqueWithoutVariantInputObjectZodSchema = makeSchema();
