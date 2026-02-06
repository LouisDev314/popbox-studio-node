import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WishlistCreateWithoutItemsInputObjectSchema as WishlistCreateWithoutItemsInputObjectSchema } from './WishlistCreateWithoutItemsInput.schema';
import { WishlistUncheckedCreateWithoutItemsInputObjectSchema as WishlistUncheckedCreateWithoutItemsInputObjectSchema } from './WishlistUncheckedCreateWithoutItemsInput.schema';
import { WishlistCreateOrConnectWithoutItemsInputObjectSchema as WishlistCreateOrConnectWithoutItemsInputObjectSchema } from './WishlistCreateOrConnectWithoutItemsInput.schema';
import { WishlistUpsertWithoutItemsInputObjectSchema as WishlistUpsertWithoutItemsInputObjectSchema } from './WishlistUpsertWithoutItemsInput.schema';
import { WishlistWhereUniqueInputObjectSchema as WishlistWhereUniqueInputObjectSchema } from './WishlistWhereUniqueInput.schema';
import { WishlistUpdateToOneWithWhereWithoutItemsInputObjectSchema as WishlistUpdateToOneWithWhereWithoutItemsInputObjectSchema } from './WishlistUpdateToOneWithWhereWithoutItemsInput.schema';
import { WishlistUpdateWithoutItemsInputObjectSchema as WishlistUpdateWithoutItemsInputObjectSchema } from './WishlistUpdateWithoutItemsInput.schema';
import { WishlistUncheckedUpdateWithoutItemsInputObjectSchema as WishlistUncheckedUpdateWithoutItemsInputObjectSchema } from './WishlistUncheckedUpdateWithoutItemsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => WishlistCreateWithoutItemsInputObjectSchema), z.lazy(() => WishlistUncheckedCreateWithoutItemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => WishlistCreateOrConnectWithoutItemsInputObjectSchema).optional(),
  upsert: z.lazy(() => WishlistUpsertWithoutItemsInputObjectSchema).optional(),
  connect: z.lazy(() => WishlistWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => WishlistUpdateToOneWithWhereWithoutItemsInputObjectSchema), z.lazy(() => WishlistUpdateWithoutItemsInputObjectSchema), z.lazy(() => WishlistUncheckedUpdateWithoutItemsInputObjectSchema)]).optional()
}).strict();
export const WishlistUpdateOneRequiredWithoutItemsNestedInputObjectSchema: z.ZodType<Prisma.WishlistUpdateOneRequiredWithoutItemsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistUpdateOneRequiredWithoutItemsNestedInput>;
export const WishlistUpdateOneRequiredWithoutItemsNestedInputObjectZodSchema = makeSchema();
