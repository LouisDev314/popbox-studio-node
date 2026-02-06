import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutOrderStatusHistoriesInputObjectSchema as UserUpdateWithoutOrderStatusHistoriesInputObjectSchema } from './UserUpdateWithoutOrderStatusHistoriesInput.schema';
import { UserUncheckedUpdateWithoutOrderStatusHistoriesInputObjectSchema as UserUncheckedUpdateWithoutOrderStatusHistoriesInputObjectSchema } from './UserUncheckedUpdateWithoutOrderStatusHistoriesInput.schema';
import { UserCreateWithoutOrderStatusHistoriesInputObjectSchema as UserCreateWithoutOrderStatusHistoriesInputObjectSchema } from './UserCreateWithoutOrderStatusHistoriesInput.schema';
import { UserUncheckedCreateWithoutOrderStatusHistoriesInputObjectSchema as UserUncheckedCreateWithoutOrderStatusHistoriesInputObjectSchema } from './UserUncheckedCreateWithoutOrderStatusHistoriesInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutOrderStatusHistoriesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutOrderStatusHistoriesInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutOrderStatusHistoriesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutOrderStatusHistoriesInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutOrderStatusHistoriesInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutOrderStatusHistoriesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutOrderStatusHistoriesInput>;
export const UserUpsertWithoutOrderStatusHistoriesInputObjectZodSchema = makeSchema();
