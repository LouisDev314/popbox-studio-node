import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WishlistItemCreateWithoutProductInputObjectSchema as WishlistItemCreateWithoutProductInputObjectSchema } from './WishlistItemCreateWithoutProductInput.schema';
import { WishlistItemUncheckedCreateWithoutProductInputObjectSchema as WishlistItemUncheckedCreateWithoutProductInputObjectSchema } from './WishlistItemUncheckedCreateWithoutProductInput.schema';
import { WishlistItemCreateOrConnectWithoutProductInputObjectSchema as WishlistItemCreateOrConnectWithoutProductInputObjectSchema } from './WishlistItemCreateOrConnectWithoutProductInput.schema';
import { WishlistItemUpsertWithWhereUniqueWithoutProductInputObjectSchema as WishlistItemUpsertWithWhereUniqueWithoutProductInputObjectSchema } from './WishlistItemUpsertWithWhereUniqueWithoutProductInput.schema';
import { WishlistItemCreateManyProductInputEnvelopeObjectSchema as WishlistItemCreateManyProductInputEnvelopeObjectSchema } from './WishlistItemCreateManyProductInputEnvelope.schema';
import { WishlistItemWhereUniqueInputObjectSchema as WishlistItemWhereUniqueInputObjectSchema } from './WishlistItemWhereUniqueInput.schema';
import { WishlistItemUpdateWithWhereUniqueWithoutProductInputObjectSchema as WishlistItemUpdateWithWhereUniqueWithoutProductInputObjectSchema } from './WishlistItemUpdateWithWhereUniqueWithoutProductInput.schema';
import { WishlistItemUpdateManyWithWhereWithoutProductInputObjectSchema as WishlistItemUpdateManyWithWhereWithoutProductInputObjectSchema } from './WishlistItemUpdateManyWithWhereWithoutProductInput.schema';
import { WishlistItemScalarWhereInputObjectSchema as WishlistItemScalarWhereInputObjectSchema } from './WishlistItemScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => WishlistItemCreateWithoutProductInputObjectSchema), z.lazy(() => WishlistItemCreateWithoutProductInputObjectSchema).array(), z.lazy(() => WishlistItemUncheckedCreateWithoutProductInputObjectSchema), z.lazy(() => WishlistItemUncheckedCreateWithoutProductInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => WishlistItemCreateOrConnectWithoutProductInputObjectSchema), z.lazy(() => WishlistItemCreateOrConnectWithoutProductInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => WishlistItemUpsertWithWhereUniqueWithoutProductInputObjectSchema), z.lazy(() => WishlistItemUpsertWithWhereUniqueWithoutProductInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => WishlistItemCreateManyProductInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => WishlistItemWhereUniqueInputObjectSchema), z.lazy(() => WishlistItemWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => WishlistItemWhereUniqueInputObjectSchema), z.lazy(() => WishlistItemWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => WishlistItemWhereUniqueInputObjectSchema), z.lazy(() => WishlistItemWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => WishlistItemWhereUniqueInputObjectSchema), z.lazy(() => WishlistItemWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => WishlistItemUpdateWithWhereUniqueWithoutProductInputObjectSchema), z.lazy(() => WishlistItemUpdateWithWhereUniqueWithoutProductInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => WishlistItemUpdateManyWithWhereWithoutProductInputObjectSchema), z.lazy(() => WishlistItemUpdateManyWithWhereWithoutProductInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => WishlistItemScalarWhereInputObjectSchema), z.lazy(() => WishlistItemScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const WishlistItemUncheckedUpdateManyWithoutProductNestedInputObjectSchema: z.ZodType<Prisma.WishlistItemUncheckedUpdateManyWithoutProductNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistItemUncheckedUpdateManyWithoutProductNestedInput>;
export const WishlistItemUncheckedUpdateManyWithoutProductNestedInputObjectZodSchema = makeSchema();
