import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutWishlistInputObjectSchema as UserCreateWithoutWishlistInputObjectSchema } from './UserCreateWithoutWishlistInput.schema';
import { UserUncheckedCreateWithoutWishlistInputObjectSchema as UserUncheckedCreateWithoutWishlistInputObjectSchema } from './UserUncheckedCreateWithoutWishlistInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutWishlistInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutWishlistInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutWishlistInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutWishlistInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutWishlistInput>;
export const UserCreateOrConnectWithoutWishlistInputObjectZodSchema = makeSchema();
