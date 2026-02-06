import * as z from 'zod';
import { UserRoleSchema } from '../enums/UserRole.schema';

export const UserSchema = z.object({
  id: z.string(),
  supabaseUserId: z.string(),
  email: z.string(),
  name: z.string().nullish(),
  role: UserRoleSchema.default("CUSTOMER"),
  createdAt: z.date(),
  updatedAt: z.date().nullish(),
  deletedAt: z.date().nullish(),
});

export type UserType = z.infer<typeof UserSchema>;
