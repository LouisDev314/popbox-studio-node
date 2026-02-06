import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartItemWhereUniqueInputObjectSchema as CartItemWhereUniqueInputObjectSchema } from './CartItemWhereUniqueInput.schema';
import { CartItemCreateWithoutProductInputObjectSchema as CartItemCreateWithoutProductInputObjectSchema } from './CartItemCreateWithoutProductInput.schema';
import { CartItemUncheckedCreateWithoutProductInputObjectSchema as CartItemUncheckedCreateWithoutProductInputObjectSchema } from './CartItemUncheckedCreateWithoutProductInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CartItemWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CartItemCreateWithoutProductInputObjectSchema), z.lazy(() => CartItemUncheckedCreateWithoutProductInputObjectSchema)])
}).strict();
export const CartItemCreateOrConnectWithoutProductInputObjectSchema: z.ZodType<Prisma.CartItemCreateOrConnectWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemCreateOrConnectWithoutProductInput>;
export const CartItemCreateOrConnectWithoutProductInputObjectZodSchema = makeSchema();
