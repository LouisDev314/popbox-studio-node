import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActiveUserSelectObjectSchema as ActiveUserSelectObjectSchema } from './ActiveUserSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => ActiveUserSelectObjectSchema).optional()
}).strict();
export const ActiveUserArgsObjectSchema = makeSchema();
export const ActiveUserArgsObjectZodSchema = makeSchema();
