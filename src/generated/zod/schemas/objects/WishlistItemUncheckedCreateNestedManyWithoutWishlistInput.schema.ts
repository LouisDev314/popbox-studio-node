import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WishlistItemCreateWithoutWishlistInputObjectSchema as WishlistItemCreateWithoutWishlistInputObjectSchema } from './WishlistItemCreateWithoutWishlistInput.schema';
import { WishlistItemUncheckedCreateWithoutWishlistInputObjectSchema as WishlistItemUncheckedCreateWithoutWishlistInputObjectSchema } from './WishlistItemUncheckedCreateWithoutWishlistInput.schema';
import { WishlistItemCreateOrConnectWithoutWishlistInputObjectSchema as WishlistItemCreateOrConnectWithoutWishlistInputObjectSchema } from './WishlistItemCreateOrConnectWithoutWishlistInput.schema';
import { WishlistItemCreateManyWishlistInputEnvelopeObjectSchema as WishlistItemCreateManyWishlistInputEnvelopeObjectSchema } from './WishlistItemCreateManyWishlistInputEnvelope.schema';
import { WishlistItemWhereUniqueInputObjectSchema as WishlistItemWhereUniqueInputObjectSchema } from './WishlistItemWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => WishlistItemCreateWithoutWishlistInputObjectSchema), z.lazy(() => WishlistItemCreateWithoutWishlistInputObjectSchema).array(), z.lazy(() => WishlistItemUncheckedCreateWithoutWishlistInputObjectSchema), z.lazy(() => WishlistItemUncheckedCreateWithoutWishlistInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => WishlistItemCreateOrConnectWithoutWishlistInputObjectSchema), z.lazy(() => WishlistItemCreateOrConnectWithoutWishlistInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => WishlistItemCreateManyWishlistInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => WishlistItemWhereUniqueInputObjectSchema), z.lazy(() => WishlistItemWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const WishlistItemUncheckedCreateNestedManyWithoutWishlistInputObjectSchema: z.ZodType<Prisma.WishlistItemUncheckedCreateNestedManyWithoutWishlistInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistItemUncheckedCreateNestedManyWithoutWishlistInput>;
export const WishlistItemUncheckedCreateNestedManyWithoutWishlistInputObjectZodSchema = makeSchema();
