import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AddressTypeSchema } from '../enums/AddressType.schema'

const makeSchema = () => z.object({
  set: AddressTypeSchema.optional()
}).strict();
export const EnumAddressTypeFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumAddressTypeFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumAddressTypeFieldUpdateOperationsInput>;
export const EnumAddressTypeFieldUpdateOperationsInputObjectZodSchema = makeSchema();
