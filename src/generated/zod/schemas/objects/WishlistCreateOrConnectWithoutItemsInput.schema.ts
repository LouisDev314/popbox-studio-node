import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WishlistWhereUniqueInputObjectSchema as WishlistWhereUniqueInputObjectSchema } from './WishlistWhereUniqueInput.schema';
import { WishlistCreateWithoutItemsInputObjectSchema as WishlistCreateWithoutItemsInputObjectSchema } from './WishlistCreateWithoutItemsInput.schema';
import { WishlistUncheckedCreateWithoutItemsInputObjectSchema as WishlistUncheckedCreateWithoutItemsInputObjectSchema } from './WishlistUncheckedCreateWithoutItemsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => WishlistWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => WishlistCreateWithoutItemsInputObjectSchema), z.lazy(() => WishlistUncheckedCreateWithoutItemsInputObjectSchema)])
}).strict();
export const WishlistCreateOrConnectWithoutItemsInputObjectSchema: z.ZodType<Prisma.WishlistCreateOrConnectWithoutItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistCreateOrConnectWithoutItemsInput>;
export const WishlistCreateOrConnectWithoutItemsInputObjectZodSchema = makeSchema();
