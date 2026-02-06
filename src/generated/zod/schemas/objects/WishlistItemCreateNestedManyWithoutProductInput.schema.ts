import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WishlistItemCreateWithoutProductInputObjectSchema as WishlistItemCreateWithoutProductInputObjectSchema } from './WishlistItemCreateWithoutProductInput.schema';
import { WishlistItemUncheckedCreateWithoutProductInputObjectSchema as WishlistItemUncheckedCreateWithoutProductInputObjectSchema } from './WishlistItemUncheckedCreateWithoutProductInput.schema';
import { WishlistItemCreateOrConnectWithoutProductInputObjectSchema as WishlistItemCreateOrConnectWithoutProductInputObjectSchema } from './WishlistItemCreateOrConnectWithoutProductInput.schema';
import { WishlistItemCreateManyProductInputEnvelopeObjectSchema as WishlistItemCreateManyProductInputEnvelopeObjectSchema } from './WishlistItemCreateManyProductInputEnvelope.schema';
import { WishlistItemWhereUniqueInputObjectSchema as WishlistItemWhereUniqueInputObjectSchema } from './WishlistItemWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => WishlistItemCreateWithoutProductInputObjectSchema), z.lazy(() => WishlistItemCreateWithoutProductInputObjectSchema).array(), z.lazy(() => WishlistItemUncheckedCreateWithoutProductInputObjectSchema), z.lazy(() => WishlistItemUncheckedCreateWithoutProductInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => WishlistItemCreateOrConnectWithoutProductInputObjectSchema), z.lazy(() => WishlistItemCreateOrConnectWithoutProductInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => WishlistItemCreateManyProductInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => WishlistItemWhereUniqueInputObjectSchema), z.lazy(() => WishlistItemWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const WishlistItemCreateNestedManyWithoutProductInputObjectSchema: z.ZodType<Prisma.WishlistItemCreateNestedManyWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistItemCreateNestedManyWithoutProductInput>;
export const WishlistItemCreateNestedManyWithoutProductInputObjectZodSchema = makeSchema();
