import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartItemWhereUniqueInputObjectSchema as CartItemWhereUniqueInputObjectSchema } from './CartItemWhereUniqueInput.schema';
import { CartItemUpdateWithoutProductInputObjectSchema as CartItemUpdateWithoutProductInputObjectSchema } from './CartItemUpdateWithoutProductInput.schema';
import { CartItemUncheckedUpdateWithoutProductInputObjectSchema as CartItemUncheckedUpdateWithoutProductInputObjectSchema } from './CartItemUncheckedUpdateWithoutProductInput.schema';
import { CartItemCreateWithoutProductInputObjectSchema as CartItemCreateWithoutProductInputObjectSchema } from './CartItemCreateWithoutProductInput.schema';
import { CartItemUncheckedCreateWithoutProductInputObjectSchema as CartItemUncheckedCreateWithoutProductInputObjectSchema } from './CartItemUncheckedCreateWithoutProductInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CartItemWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CartItemUpdateWithoutProductInputObjectSchema), z.lazy(() => CartItemUncheckedUpdateWithoutProductInputObjectSchema)]),
  create: z.union([z.lazy(() => CartItemCreateWithoutProductInputObjectSchema), z.lazy(() => CartItemUncheckedCreateWithoutProductInputObjectSchema)])
}).strict();
export const CartItemUpsertWithWhereUniqueWithoutProductInputObjectSchema: z.ZodType<Prisma.CartItemUpsertWithWhereUniqueWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemUpsertWithWhereUniqueWithoutProductInput>;
export const CartItemUpsertWithWhereUniqueWithoutProductInputObjectZodSchema = makeSchema();
