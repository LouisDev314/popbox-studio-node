import * as z from 'zod';

export const UserRoleSchema = z.enum(['CUSTOMER', 'ADMIN'])

export type UserRole = z.infer<typeof UserRoleSchema>;