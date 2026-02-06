import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutOrdersInputObjectSchema as UserUpdateWithoutOrdersInputObjectSchema } from './UserUpdateWithoutOrdersInput.schema';
import { UserUncheckedUpdateWithoutOrdersInputObjectSchema as UserUncheckedUpdateWithoutOrdersInputObjectSchema } from './UserUncheckedUpdateWithoutOrdersInput.schema';
import { UserCreateWithoutOrdersInputObjectSchema as UserCreateWithoutOrdersInputObjectSchema } from './UserCreateWithoutOrdersInput.schema';
import { UserUncheckedCreateWithoutOrdersInputObjectSchema as UserUncheckedCreateWithoutOrdersInputObjectSchema } from './UserUncheckedCreateWithoutOrdersInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutOrdersInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutOrdersInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutOrdersInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutOrdersInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutOrdersInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutOrdersInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutOrdersInput>;
export const UserUpsertWithoutOrdersInputObjectZodSchema = makeSchema();
