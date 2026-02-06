import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutOrderStatusHistoriesInputObjectSchema as UserCreateWithoutOrderStatusHistoriesInputObjectSchema } from './UserCreateWithoutOrderStatusHistoriesInput.schema';
import { UserUncheckedCreateWithoutOrderStatusHistoriesInputObjectSchema as UserUncheckedCreateWithoutOrderStatusHistoriesInputObjectSchema } from './UserUncheckedCreateWithoutOrderStatusHistoriesInput.schema';
import { UserCreateOrConnectWithoutOrderStatusHistoriesInputObjectSchema as UserCreateOrConnectWithoutOrderStatusHistoriesInputObjectSchema } from './UserCreateOrConnectWithoutOrderStatusHistoriesInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutOrderStatusHistoriesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutOrderStatusHistoriesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutOrderStatusHistoriesInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutOrderStatusHistoriesInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutOrderStatusHistoriesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutOrderStatusHistoriesInput>;
export const UserCreateNestedOneWithoutOrderStatusHistoriesInputObjectZodSchema = makeSchema();
