import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WishlistWhereInputObjectSchema as WishlistWhereInputObjectSchema } from './WishlistWhereInput.schema';
import { WishlistUpdateWithoutItemsInputObjectSchema as WishlistUpdateWithoutItemsInputObjectSchema } from './WishlistUpdateWithoutItemsInput.schema';
import { WishlistUncheckedUpdateWithoutItemsInputObjectSchema as WishlistUncheckedUpdateWithoutItemsInputObjectSchema } from './WishlistUncheckedUpdateWithoutItemsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => WishlistWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => WishlistUpdateWithoutItemsInputObjectSchema), z.lazy(() => WishlistUncheckedUpdateWithoutItemsInputObjectSchema)])
}).strict();
export const WishlistUpdateToOneWithWhereWithoutItemsInputObjectSchema: z.ZodType<Prisma.WishlistUpdateToOneWithWhereWithoutItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistUpdateToOneWithWhereWithoutItemsInput>;
export const WishlistUpdateToOneWithWhereWithoutItemsInputObjectZodSchema = makeSchema();
