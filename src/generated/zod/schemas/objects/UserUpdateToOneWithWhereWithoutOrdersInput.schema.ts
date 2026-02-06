import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutOrdersInputObjectSchema as UserUpdateWithoutOrdersInputObjectSchema } from './UserUpdateWithoutOrdersInput.schema';
import { UserUncheckedUpdateWithoutOrdersInputObjectSchema as UserUncheckedUpdateWithoutOrdersInputObjectSchema } from './UserUncheckedUpdateWithoutOrdersInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutOrdersInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutOrdersInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutOrdersInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutOrdersInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutOrdersInput>;
export const UserUpdateToOneWithWhereWithoutOrdersInputObjectZodSchema = makeSchema();
