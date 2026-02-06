import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WishlistUpdateWithoutUserInputObjectSchema as WishlistUpdateWithoutUserInputObjectSchema } from './WishlistUpdateWithoutUserInput.schema';
import { WishlistUncheckedUpdateWithoutUserInputObjectSchema as WishlistUncheckedUpdateWithoutUserInputObjectSchema } from './WishlistUncheckedUpdateWithoutUserInput.schema';
import { WishlistCreateWithoutUserInputObjectSchema as WishlistCreateWithoutUserInputObjectSchema } from './WishlistCreateWithoutUserInput.schema';
import { WishlistUncheckedCreateWithoutUserInputObjectSchema as WishlistUncheckedCreateWithoutUserInputObjectSchema } from './WishlistUncheckedCreateWithoutUserInput.schema';
import { WishlistWhereInputObjectSchema as WishlistWhereInputObjectSchema } from './WishlistWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => WishlistUpdateWithoutUserInputObjectSchema), z.lazy(() => WishlistUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => WishlistCreateWithoutUserInputObjectSchema), z.lazy(() => WishlistUncheckedCreateWithoutUserInputObjectSchema)]),
  where: z.lazy(() => WishlistWhereInputObjectSchema).optional()
}).strict();
export const WishlistUpsertWithoutUserInputObjectSchema: z.ZodType<Prisma.WishlistUpsertWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistUpsertWithoutUserInput>;
export const WishlistUpsertWithoutUserInputObjectZodSchema = makeSchema();
