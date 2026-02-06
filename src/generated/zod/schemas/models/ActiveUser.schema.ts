import * as z from 'zod';
import { UserRoleSchema } from '../enums/UserRole.schema';

export const ActiveUserSchema = z.object({
  id: z.string(),
  supabaseUserId: z.string(),
  email: z.string(),
  name: z.string().nullish(),
  role: UserRoleSchema,
  createdAt: z.date(),
  updatedAt: z.date().nullish(),
});

export type ActiveUserType = z.infer<typeof ActiveUserSchema>;
