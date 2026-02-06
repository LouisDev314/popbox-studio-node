import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartItemScalarWhereInputObjectSchema as CartItemScalarWhereInputObjectSchema } from './CartItemScalarWhereInput.schema';
import { CartItemUpdateManyMutationInputObjectSchema as CartItemUpdateManyMutationInputObjectSchema } from './CartItemUpdateManyMutationInput.schema';
import { CartItemUncheckedUpdateManyWithoutProductInputObjectSchema as CartItemUncheckedUpdateManyWithoutProductInputObjectSchema } from './CartItemUncheckedUpdateManyWithoutProductInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CartItemScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CartItemUpdateManyMutationInputObjectSchema), z.lazy(() => CartItemUncheckedUpdateManyWithoutProductInputObjectSchema)])
}).strict();
export const CartItemUpdateManyWithWhereWithoutProductInputObjectSchema: z.ZodType<Prisma.CartItemUpdateManyWithWhereWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemUpdateManyWithWhereWithoutProductInput>;
export const CartItemUpdateManyWithWhereWithoutProductInputObjectZodSchema = makeSchema();
