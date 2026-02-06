import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WishlistCreateWithoutUserInputObjectSchema as WishlistCreateWithoutUserInputObjectSchema } from './WishlistCreateWithoutUserInput.schema';
import { WishlistUncheckedCreateWithoutUserInputObjectSchema as WishlistUncheckedCreateWithoutUserInputObjectSchema } from './WishlistUncheckedCreateWithoutUserInput.schema';
import { WishlistCreateOrConnectWithoutUserInputObjectSchema as WishlistCreateOrConnectWithoutUserInputObjectSchema } from './WishlistCreateOrConnectWithoutUserInput.schema';
import { WishlistUpsertWithoutUserInputObjectSchema as WishlistUpsertWithoutUserInputObjectSchema } from './WishlistUpsertWithoutUserInput.schema';
import { WishlistWhereInputObjectSchema as WishlistWhereInputObjectSchema } from './WishlistWhereInput.schema';
import { WishlistWhereUniqueInputObjectSchema as WishlistWhereUniqueInputObjectSchema } from './WishlistWhereUniqueInput.schema';
import { WishlistUpdateToOneWithWhereWithoutUserInputObjectSchema as WishlistUpdateToOneWithWhereWithoutUserInputObjectSchema } from './WishlistUpdateToOneWithWhereWithoutUserInput.schema';
import { WishlistUpdateWithoutUserInputObjectSchema as WishlistUpdateWithoutUserInputObjectSchema } from './WishlistUpdateWithoutUserInput.schema';
import { WishlistUncheckedUpdateWithoutUserInputObjectSchema as WishlistUncheckedUpdateWithoutUserInputObjectSchema } from './WishlistUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => WishlistCreateWithoutUserInputObjectSchema), z.lazy(() => WishlistUncheckedCreateWithoutUserInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => WishlistCreateOrConnectWithoutUserInputObjectSchema).optional(),
  upsert: z.lazy(() => WishlistUpsertWithoutUserInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => WishlistWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => WishlistWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => WishlistWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => WishlistUpdateToOneWithWhereWithoutUserInputObjectSchema), z.lazy(() => WishlistUpdateWithoutUserInputObjectSchema), z.lazy(() => WishlistUncheckedUpdateWithoutUserInputObjectSchema)]).optional()
}).strict();
export const WishlistUncheckedUpdateOneWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.WishlistUncheckedUpdateOneWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistUncheckedUpdateOneWithoutUserNestedInput>;
export const WishlistUncheckedUpdateOneWithoutUserNestedInputObjectZodSchema = makeSchema();
