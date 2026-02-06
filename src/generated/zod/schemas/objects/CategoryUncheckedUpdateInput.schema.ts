import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { ProductUncheckedUpdateManyWithoutCategoryNestedInputObjectSchema as ProductUncheckedUpdateManyWithoutCategoryNestedInputObjectSchema } from './ProductUncheckedUpdateManyWithoutCategoryNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string().max(100), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutCategoryNestedInputObjectSchema).optional()
}).strict();
export const CategoryUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.CategoryUncheckedUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryUncheckedUpdateInput>;
export const CategoryUncheckedUpdateInputObjectZodSchema = makeSchema();
