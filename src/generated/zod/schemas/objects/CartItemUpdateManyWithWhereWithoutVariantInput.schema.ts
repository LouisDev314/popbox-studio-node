import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartItemScalarWhereInputObjectSchema as CartItemScalarWhereInputObjectSchema } from './CartItemScalarWhereInput.schema';
import { CartItemUpdateManyMutationInputObjectSchema as CartItemUpdateManyMutationInputObjectSchema } from './CartItemUpdateManyMutationInput.schema';
import { CartItemUncheckedUpdateManyWithoutVariantInputObjectSchema as CartItemUncheckedUpdateManyWithoutVariantInputObjectSchema } from './CartItemUncheckedUpdateManyWithoutVariantInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CartItemScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CartItemUpdateManyMutationInputObjectSchema), z.lazy(() => CartItemUncheckedUpdateManyWithoutVariantInputObjectSchema)])
}).strict();
export const CartItemUpdateManyWithWhereWithoutVariantInputObjectSchema: z.ZodType<Prisma.CartItemUpdateManyWithWhereWithoutVariantInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemUpdateManyWithWhereWithoutVariantInput>;
export const CartItemUpdateManyWithWhereWithoutVariantInputObjectZodSchema = makeSchema();
