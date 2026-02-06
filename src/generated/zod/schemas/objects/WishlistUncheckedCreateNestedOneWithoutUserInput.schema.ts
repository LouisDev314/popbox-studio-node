import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WishlistCreateWithoutUserInputObjectSchema as WishlistCreateWithoutUserInputObjectSchema } from './WishlistCreateWithoutUserInput.schema';
import { WishlistUncheckedCreateWithoutUserInputObjectSchema as WishlistUncheckedCreateWithoutUserInputObjectSchema } from './WishlistUncheckedCreateWithoutUserInput.schema';
import { WishlistCreateOrConnectWithoutUserInputObjectSchema as WishlistCreateOrConnectWithoutUserInputObjectSchema } from './WishlistCreateOrConnectWithoutUserInput.schema';
import { WishlistWhereUniqueInputObjectSchema as WishlistWhereUniqueInputObjectSchema } from './WishlistWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => WishlistCreateWithoutUserInputObjectSchema), z.lazy(() => WishlistUncheckedCreateWithoutUserInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => WishlistCreateOrConnectWithoutUserInputObjectSchema).optional(),
  connect: z.lazy(() => WishlistWhereUniqueInputObjectSchema).optional()
}).strict();
export const WishlistUncheckedCreateNestedOneWithoutUserInputObjectSchema: z.ZodType<Prisma.WishlistUncheckedCreateNestedOneWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistUncheckedCreateNestedOneWithoutUserInput>;
export const WishlistUncheckedCreateNestedOneWithoutUserInputObjectZodSchema = makeSchema();
