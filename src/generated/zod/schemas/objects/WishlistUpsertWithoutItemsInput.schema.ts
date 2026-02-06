import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WishlistUpdateWithoutItemsInputObjectSchema as WishlistUpdateWithoutItemsInputObjectSchema } from './WishlistUpdateWithoutItemsInput.schema';
import { WishlistUncheckedUpdateWithoutItemsInputObjectSchema as WishlistUncheckedUpdateWithoutItemsInputObjectSchema } from './WishlistUncheckedUpdateWithoutItemsInput.schema';
import { WishlistCreateWithoutItemsInputObjectSchema as WishlistCreateWithoutItemsInputObjectSchema } from './WishlistCreateWithoutItemsInput.schema';
import { WishlistUncheckedCreateWithoutItemsInputObjectSchema as WishlistUncheckedCreateWithoutItemsInputObjectSchema } from './WishlistUncheckedCreateWithoutItemsInput.schema';
import { WishlistWhereInputObjectSchema as WishlistWhereInputObjectSchema } from './WishlistWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => WishlistUpdateWithoutItemsInputObjectSchema), z.lazy(() => WishlistUncheckedUpdateWithoutItemsInputObjectSchema)]),
  create: z.union([z.lazy(() => WishlistCreateWithoutItemsInputObjectSchema), z.lazy(() => WishlistUncheckedCreateWithoutItemsInputObjectSchema)]),
  where: z.lazy(() => WishlistWhereInputObjectSchema).optional()
}).strict();
export const WishlistUpsertWithoutItemsInputObjectSchema: z.ZodType<Prisma.WishlistUpsertWithoutItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistUpsertWithoutItemsInput>;
export const WishlistUpsertWithoutItemsInputObjectZodSchema = makeSchema();
