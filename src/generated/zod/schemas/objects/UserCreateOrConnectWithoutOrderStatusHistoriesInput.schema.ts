import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutOrderStatusHistoriesInputObjectSchema as UserCreateWithoutOrderStatusHistoriesInputObjectSchema } from './UserCreateWithoutOrderStatusHistoriesInput.schema';
import { UserUncheckedCreateWithoutOrderStatusHistoriesInputObjectSchema as UserUncheckedCreateWithoutOrderStatusHistoriesInputObjectSchema } from './UserUncheckedCreateWithoutOrderStatusHistoriesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutOrderStatusHistoriesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutOrderStatusHistoriesInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutOrderStatusHistoriesInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutOrderStatusHistoriesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutOrderStatusHistoriesInput>;
export const UserCreateOrConnectWithoutOrderStatusHistoriesInputObjectZodSchema = makeSchema();
