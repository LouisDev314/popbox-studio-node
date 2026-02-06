import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WishlistWhereUniqueInputObjectSchema as WishlistWhereUniqueInputObjectSchema } from './WishlistWhereUniqueInput.schema';
import { WishlistCreateWithoutUserInputObjectSchema as WishlistCreateWithoutUserInputObjectSchema } from './WishlistCreateWithoutUserInput.schema';
import { WishlistUncheckedCreateWithoutUserInputObjectSchema as WishlistUncheckedCreateWithoutUserInputObjectSchema } from './WishlistUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => WishlistWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => WishlistCreateWithoutUserInputObjectSchema), z.lazy(() => WishlistUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const WishlistCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.WishlistCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistCreateOrConnectWithoutUserInput>;
export const WishlistCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
