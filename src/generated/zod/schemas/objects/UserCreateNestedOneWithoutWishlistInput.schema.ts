import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutWishlistInputObjectSchema as UserCreateWithoutWishlistInputObjectSchema } from './UserCreateWithoutWishlistInput.schema';
import { UserUncheckedCreateWithoutWishlistInputObjectSchema as UserUncheckedCreateWithoutWishlistInputObjectSchema } from './UserUncheckedCreateWithoutWishlistInput.schema';
import { UserCreateOrConnectWithoutWishlistInputObjectSchema as UserCreateOrConnectWithoutWishlistInputObjectSchema } from './UserCreateOrConnectWithoutWishlistInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutWishlistInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutWishlistInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutWishlistInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutWishlistInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutWishlistInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutWishlistInput>;
export const UserCreateNestedOneWithoutWishlistInputObjectZodSchema = makeSchema();
