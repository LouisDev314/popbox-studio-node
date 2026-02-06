import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutOrderStatusHistoriesInputObjectSchema as UserCreateWithoutOrderStatusHistoriesInputObjectSchema } from './UserCreateWithoutOrderStatusHistoriesInput.schema';
import { UserUncheckedCreateWithoutOrderStatusHistoriesInputObjectSchema as UserUncheckedCreateWithoutOrderStatusHistoriesInputObjectSchema } from './UserUncheckedCreateWithoutOrderStatusHistoriesInput.schema';
import { UserCreateOrConnectWithoutOrderStatusHistoriesInputObjectSchema as UserCreateOrConnectWithoutOrderStatusHistoriesInputObjectSchema } from './UserCreateOrConnectWithoutOrderStatusHistoriesInput.schema';
import { UserUpsertWithoutOrderStatusHistoriesInputObjectSchema as UserUpsertWithoutOrderStatusHistoriesInputObjectSchema } from './UserUpsertWithoutOrderStatusHistoriesInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutOrderStatusHistoriesInputObjectSchema as UserUpdateToOneWithWhereWithoutOrderStatusHistoriesInputObjectSchema } from './UserUpdateToOneWithWhereWithoutOrderStatusHistoriesInput.schema';
import { UserUpdateWithoutOrderStatusHistoriesInputObjectSchema as UserUpdateWithoutOrderStatusHistoriesInputObjectSchema } from './UserUpdateWithoutOrderStatusHistoriesInput.schema';
import { UserUncheckedUpdateWithoutOrderStatusHistoriesInputObjectSchema as UserUncheckedUpdateWithoutOrderStatusHistoriesInputObjectSchema } from './UserUncheckedUpdateWithoutOrderStatusHistoriesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutOrderStatusHistoriesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutOrderStatusHistoriesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutOrderStatusHistoriesInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutOrderStatusHistoriesInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutOrderStatusHistoriesInputObjectSchema), z.lazy(() => UserUpdateWithoutOrderStatusHistoriesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutOrderStatusHistoriesInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneWithoutOrderStatusHistoriesNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneWithoutOrderStatusHistoriesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneWithoutOrderStatusHistoriesNestedInput>;
export const UserUpdateOneWithoutOrderStatusHistoriesNestedInputObjectZodSchema = makeSchema();
