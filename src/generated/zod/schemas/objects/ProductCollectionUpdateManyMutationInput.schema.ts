import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema'

const makeSchema = () => z.object({
  sortOrder: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const ProductCollectionUpdateManyMutationInputObjectSchema: z.ZodType<Prisma.ProductCollectionUpdateManyMutationInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCollectionUpdateManyMutationInput>;
export const ProductCollectionUpdateManyMutationInputObjectZodSchema = makeSchema();
