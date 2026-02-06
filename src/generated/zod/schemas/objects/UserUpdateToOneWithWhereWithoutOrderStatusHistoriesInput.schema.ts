import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutOrderStatusHistoriesInputObjectSchema as UserUpdateWithoutOrderStatusHistoriesInputObjectSchema } from './UserUpdateWithoutOrderStatusHistoriesInput.schema';
import { UserUncheckedUpdateWithoutOrderStatusHistoriesInputObjectSchema as UserUncheckedUpdateWithoutOrderStatusHistoriesInputObjectSchema } from './UserUncheckedUpdateWithoutOrderStatusHistoriesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutOrderStatusHistoriesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutOrderStatusHistoriesInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutOrderStatusHistoriesInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutOrderStatusHistoriesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutOrderStatusHistoriesInput>;
export const UserUpdateToOneWithWhereWithoutOrderStatusHistoriesInputObjectZodSchema = makeSchema();
