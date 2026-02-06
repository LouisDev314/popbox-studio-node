import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WishlistWhereInputObjectSchema as WishlistWhereInputObjectSchema } from './WishlistWhereInput.schema';
import { WishlistUpdateWithoutUserInputObjectSchema as WishlistUpdateWithoutUserInputObjectSchema } from './WishlistUpdateWithoutUserInput.schema';
import { WishlistUncheckedUpdateWithoutUserInputObjectSchema as WishlistUncheckedUpdateWithoutUserInputObjectSchema } from './WishlistUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => WishlistWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => WishlistUpdateWithoutUserInputObjectSchema), z.lazy(() => WishlistUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const WishlistUpdateToOneWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.WishlistUpdateToOneWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistUpdateToOneWithWhereWithoutUserInput>;
export const WishlistUpdateToOneWithWhereWithoutUserInputObjectZodSchema = makeSchema();
