import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutWishlistInputObjectSchema as UserUpdateWithoutWishlistInputObjectSchema } from './UserUpdateWithoutWishlistInput.schema';
import { UserUncheckedUpdateWithoutWishlistInputObjectSchema as UserUncheckedUpdateWithoutWishlistInputObjectSchema } from './UserUncheckedUpdateWithoutWishlistInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutWishlistInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutWishlistInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutWishlistInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutWishlistInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutWishlistInput>;
export const UserUpdateToOneWithWhereWithoutWishlistInputObjectZodSchema = makeSchema();
