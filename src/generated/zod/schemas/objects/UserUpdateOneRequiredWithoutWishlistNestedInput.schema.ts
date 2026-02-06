import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutWishlistInputObjectSchema as UserCreateWithoutWishlistInputObjectSchema } from './UserCreateWithoutWishlistInput.schema';
import { UserUncheckedCreateWithoutWishlistInputObjectSchema as UserUncheckedCreateWithoutWishlistInputObjectSchema } from './UserUncheckedCreateWithoutWishlistInput.schema';
import { UserCreateOrConnectWithoutWishlistInputObjectSchema as UserCreateOrConnectWithoutWishlistInputObjectSchema } from './UserCreateOrConnectWithoutWishlistInput.schema';
import { UserUpsertWithoutWishlistInputObjectSchema as UserUpsertWithoutWishlistInputObjectSchema } from './UserUpsertWithoutWishlistInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutWishlistInputObjectSchema as UserUpdateToOneWithWhereWithoutWishlistInputObjectSchema } from './UserUpdateToOneWithWhereWithoutWishlistInput.schema';
import { UserUpdateWithoutWishlistInputObjectSchema as UserUpdateWithoutWishlistInputObjectSchema } from './UserUpdateWithoutWishlistInput.schema';
import { UserUncheckedUpdateWithoutWishlistInputObjectSchema as UserUncheckedUpdateWithoutWishlistInputObjectSchema } from './UserUncheckedUpdateWithoutWishlistInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutWishlistInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutWishlistInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutWishlistInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutWishlistInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutWishlistInputObjectSchema), z.lazy(() => UserUpdateWithoutWishlistInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutWishlistInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutWishlistNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutWishlistNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutWishlistNestedInput>;
export const UserUpdateOneRequiredWithoutWishlistNestedInputObjectZodSchema = makeSchema();
