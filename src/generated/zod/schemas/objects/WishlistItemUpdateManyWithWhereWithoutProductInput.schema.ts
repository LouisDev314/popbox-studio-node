import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WishlistItemScalarWhereInputObjectSchema as WishlistItemScalarWhereInputObjectSchema } from './WishlistItemScalarWhereInput.schema';
import { WishlistItemUpdateManyMutationInputObjectSchema as WishlistItemUpdateManyMutationInputObjectSchema } from './WishlistItemUpdateManyMutationInput.schema';
import { WishlistItemUncheckedUpdateManyWithoutProductInputObjectSchema as WishlistItemUncheckedUpdateManyWithoutProductInputObjectSchema } from './WishlistItemUncheckedUpdateManyWithoutProductInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => WishlistItemScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => WishlistItemUpdateManyMutationInputObjectSchema), z.lazy(() => WishlistItemUncheckedUpdateManyWithoutProductInputObjectSchema)])
}).strict();
export const WishlistItemUpdateManyWithWhereWithoutProductInputObjectSchema: z.ZodType<Prisma.WishlistItemUpdateManyWithWhereWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistItemUpdateManyWithWhereWithoutProductInput>;
export const WishlistItemUpdateManyWithWhereWithoutProductInputObjectZodSchema = makeSchema();
