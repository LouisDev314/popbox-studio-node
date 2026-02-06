import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WishlistItemWhereUniqueInputObjectSchema as WishlistItemWhereUniqueInputObjectSchema } from './WishlistItemWhereUniqueInput.schema';
import { WishlistItemCreateWithoutProductInputObjectSchema as WishlistItemCreateWithoutProductInputObjectSchema } from './WishlistItemCreateWithoutProductInput.schema';
import { WishlistItemUncheckedCreateWithoutProductInputObjectSchema as WishlistItemUncheckedCreateWithoutProductInputObjectSchema } from './WishlistItemUncheckedCreateWithoutProductInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => WishlistItemWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => WishlistItemCreateWithoutProductInputObjectSchema), z.lazy(() => WishlistItemUncheckedCreateWithoutProductInputObjectSchema)])
}).strict();
export const WishlistItemCreateOrConnectWithoutProductInputObjectSchema: z.ZodType<Prisma.WishlistItemCreateOrConnectWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistItemCreateOrConnectWithoutProductInput>;
export const WishlistItemCreateOrConnectWithoutProductInputObjectZodSchema = makeSchema();
