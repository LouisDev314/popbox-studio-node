import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutOrdersInputObjectSchema as UserCreateWithoutOrdersInputObjectSchema } from './UserCreateWithoutOrdersInput.schema';
import { UserUncheckedCreateWithoutOrdersInputObjectSchema as UserUncheckedCreateWithoutOrdersInputObjectSchema } from './UserUncheckedCreateWithoutOrdersInput.schema';
import { UserCreateOrConnectWithoutOrdersInputObjectSchema as UserCreateOrConnectWithoutOrdersInputObjectSchema } from './UserCreateOrConnectWithoutOrdersInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutOrdersInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutOrdersInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutOrdersInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutOrdersInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutOrdersInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutOrdersInput>;
export const UserCreateNestedOneWithoutOrdersInputObjectZodSchema = makeSchema();
