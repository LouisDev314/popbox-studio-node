import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutOrdersInputObjectSchema as UserCreateWithoutOrdersInputObjectSchema } from './UserCreateWithoutOrdersInput.schema';
import { UserUncheckedCreateWithoutOrdersInputObjectSchema as UserUncheckedCreateWithoutOrdersInputObjectSchema } from './UserUncheckedCreateWithoutOrdersInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutOrdersInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutOrdersInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutOrdersInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutOrdersInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutOrdersInput>;
export const UserCreateOrConnectWithoutOrdersInputObjectZodSchema = makeSchema();
