import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutOrdersInputObjectSchema as UserCreateWithoutOrdersInputObjectSchema } from './UserCreateWithoutOrdersInput.schema';
import { UserUncheckedCreateWithoutOrdersInputObjectSchema as UserUncheckedCreateWithoutOrdersInputObjectSchema } from './UserUncheckedCreateWithoutOrdersInput.schema';
import { UserCreateOrConnectWithoutOrdersInputObjectSchema as UserCreateOrConnectWithoutOrdersInputObjectSchema } from './UserCreateOrConnectWithoutOrdersInput.schema';
import { UserUpsertWithoutOrdersInputObjectSchema as UserUpsertWithoutOrdersInputObjectSchema } from './UserUpsertWithoutOrdersInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutOrdersInputObjectSchema as UserUpdateToOneWithWhereWithoutOrdersInputObjectSchema } from './UserUpdateToOneWithWhereWithoutOrdersInput.schema';
import { UserUpdateWithoutOrdersInputObjectSchema as UserUpdateWithoutOrdersInputObjectSchema } from './UserUpdateWithoutOrdersInput.schema';
import { UserUncheckedUpdateWithoutOrdersInputObjectSchema as UserUncheckedUpdateWithoutOrdersInputObjectSchema } from './UserUncheckedUpdateWithoutOrdersInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutOrdersInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutOrdersInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutOrdersInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutOrdersInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutOrdersInputObjectSchema), z.lazy(() => UserUpdateWithoutOrdersInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutOrdersInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutOrdersNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutOrdersNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutOrdersNestedInput>;
export const UserUpdateOneRequiredWithoutOrdersNestedInputObjectZodSchema = makeSchema();
