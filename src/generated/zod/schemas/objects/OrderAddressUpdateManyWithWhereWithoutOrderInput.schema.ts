import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderAddressScalarWhereInputObjectSchema as OrderAddressScalarWhereInputObjectSchema } from './OrderAddressScalarWhereInput.schema';
import { OrderAddressUpdateManyMutationInputObjectSchema as OrderAddressUpdateManyMutationInputObjectSchema } from './OrderAddressUpdateManyMutationInput.schema';
import { OrderAddressUncheckedUpdateManyWithoutOrderInputObjectSchema as OrderAddressUncheckedUpdateManyWithoutOrderInputObjectSchema } from './OrderAddressUncheckedUpdateManyWithoutOrderInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrderAddressScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => OrderAddressUpdateManyMutationInputObjectSchema), z.lazy(() => OrderAddressUncheckedUpdateManyWithoutOrderInputObjectSchema)])
}).strict();
export const OrderAddressUpdateManyWithWhereWithoutOrderInputObjectSchema: z.ZodType<Prisma.OrderAddressUpdateManyWithWhereWithoutOrderInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderAddressUpdateManyWithWhereWithoutOrderInput>;
export const OrderAddressUpdateManyWithWhereWithoutOrderInputObjectZodSchema = makeSchema();
