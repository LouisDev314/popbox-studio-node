import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WishlistItemCreateWithoutWishlistInputObjectSchema as WishlistItemCreateWithoutWishlistInputObjectSchema } from './WishlistItemCreateWithoutWishlistInput.schema';
import { WishlistItemUncheckedCreateWithoutWishlistInputObjectSchema as WishlistItemUncheckedCreateWithoutWishlistInputObjectSchema } from './WishlistItemUncheckedCreateWithoutWishlistInput.schema';
import { WishlistItemCreateOrConnectWithoutWishlistInputObjectSchema as WishlistItemCreateOrConnectWithoutWishlistInputObjectSchema } from './WishlistItemCreateOrConnectWithoutWishlistInput.schema';
import { WishlistItemUpsertWithWhereUniqueWithoutWishlistInputObjectSchema as WishlistItemUpsertWithWhereUniqueWithoutWishlistInputObjectSchema } from './WishlistItemUpsertWithWhereUniqueWithoutWishlistInput.schema';
import { WishlistItemCreateManyWishlistInputEnvelopeObjectSchema as WishlistItemCreateManyWishlistInputEnvelopeObjectSchema } from './WishlistItemCreateManyWishlistInputEnvelope.schema';
import { WishlistItemWhereUniqueInputObjectSchema as WishlistItemWhereUniqueInputObjectSchema } from './WishlistItemWhereUniqueInput.schema';
import { WishlistItemUpdateWithWhereUniqueWithoutWishlistInputObjectSchema as WishlistItemUpdateWithWhereUniqueWithoutWishlistInputObjectSchema } from './WishlistItemUpdateWithWhereUniqueWithoutWishlistInput.schema';
import { WishlistItemUpdateManyWithWhereWithoutWishlistInputObjectSchema as WishlistItemUpdateManyWithWhereWithoutWishlistInputObjectSchema } from './WishlistItemUpdateManyWithWhereWithoutWishlistInput.schema';
import { WishlistItemScalarWhereInputObjectSchema as WishlistItemScalarWhereInputObjectSchema } from './WishlistItemScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => WishlistItemCreateWithoutWishlistInputObjectSchema), z.lazy(() => WishlistItemCreateWithoutWishlistInputObjectSchema).array(), z.lazy(() => WishlistItemUncheckedCreateWithoutWishlistInputObjectSchema), z.lazy(() => WishlistItemUncheckedCreateWithoutWishlistInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => WishlistItemCreateOrConnectWithoutWishlistInputObjectSchema), z.lazy(() => WishlistItemCreateOrConnectWithoutWishlistInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => WishlistItemUpsertWithWhereUniqueWithoutWishlistInputObjectSchema), z.lazy(() => WishlistItemUpsertWithWhereUniqueWithoutWishlistInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => WishlistItemCreateManyWishlistInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => WishlistItemWhereUniqueInputObjectSchema), z.lazy(() => WishlistItemWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => WishlistItemWhereUniqueInputObjectSchema), z.lazy(() => WishlistItemWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => WishlistItemWhereUniqueInputObjectSchema), z.lazy(() => WishlistItemWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => WishlistItemWhereUniqueInputObjectSchema), z.lazy(() => WishlistItemWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => WishlistItemUpdateWithWhereUniqueWithoutWishlistInputObjectSchema), z.lazy(() => WishlistItemUpdateWithWhereUniqueWithoutWishlistInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => WishlistItemUpdateManyWithWhereWithoutWishlistInputObjectSchema), z.lazy(() => WishlistItemUpdateManyWithWhereWithoutWishlistInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => WishlistItemScalarWhereInputObjectSchema), z.lazy(() => WishlistItemScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const WishlistItemUncheckedUpdateManyWithoutWishlistNestedInputObjectSchema: z.ZodType<Prisma.WishlistItemUncheckedUpdateManyWithoutWishlistNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistItemUncheckedUpdateManyWithoutWishlistNestedInput>;
export const WishlistItemUncheckedUpdateManyWithoutWishlistNestedInputObjectZodSchema = makeSchema();
