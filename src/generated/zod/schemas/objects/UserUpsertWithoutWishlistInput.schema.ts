import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutWishlistInputObjectSchema as UserUpdateWithoutWishlistInputObjectSchema } from './UserUpdateWithoutWishlistInput.schema';
import { UserUncheckedUpdateWithoutWishlistInputObjectSchema as UserUncheckedUpdateWithoutWishlistInputObjectSchema } from './UserUncheckedUpdateWithoutWishlistInput.schema';
import { UserCreateWithoutWishlistInputObjectSchema as UserCreateWithoutWishlistInputObjectSchema } from './UserCreateWithoutWishlistInput.schema';
import { UserUncheckedCreateWithoutWishlistInputObjectSchema as UserUncheckedCreateWithoutWishlistInputObjectSchema } from './UserUncheckedCreateWithoutWishlistInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutWishlistInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutWishlistInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutWishlistInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutWishlistInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutWishlistInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutWishlistInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutWishlistInput>;
export const UserUpsertWithoutWishlistInputObjectZodSchema = makeSchema();
