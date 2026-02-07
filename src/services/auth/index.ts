import supabase from '../../config/supabase';
import Exception from '../../utils/Exception';
import { HttpStatusCode } from 'axios';
import { prisma } from '../../db/prisma';

export type AuthSessionDTO = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number; // seconds
  tokenType: string;
  userId: string;
  email?: string;
};

export const registerWithEmailPassword = async (
  email: string,
  password: string,
  redirectUrl?: string,
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: redirectUrl ? { emailRedirectTo: redirectUrl } : undefined,
  });

  if (error) {
    throw new Exception(HttpStatusCode.InternalServerError, 'Registration failed:', error);
  }

  const user = data.user;

  return {
    userId: user?.id ?? null,
    email: user?.email ?? null,
  };
};

export const loginWithEmailPassword = async (
  email: string,
  password: string,
) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.session) throw new Exception(HttpStatusCode.InternalServerError, 'Login failed');

  const { session, user } = data;

  // Usually indicates email not confirmed, or auth settings
  if (!session) {
    throw new Exception(HttpStatusCode.BadRequest, 'Login failed: email confirmation required');
  }

  return {
    accessToken: session.access_token,
    refreshToken: session.refresh_token,
    expiresIn: session.expires_in,
    tokenType: session.token_type,
    userId: user.id,
    email: user.email ?? undefined,
  } satisfies AuthSessionDTO;
};

// Will perform const { data, error } = await supabase.auth.reauthenticate(); on frontend client
export const deleteOwnAccount = async (userId: string) => {
  await supabase.auth.signOut();

  const now = new Date();
  await prisma.$transaction(async (tx) => {
    // 1) soft-delete user profile row
    await tx.user.update({
      where: { supabaseUserId: userId, deletedAt: null },
      data: { deletedAt: now },
    });

    // 2) hard-delete cart (cart_items should cascade)
    await tx.cart.deleteMany({
      where: { userId },
    });

    // 3) hard-delete wishlist (wishlist_items should cascade)
    await tx.wishlist.deleteMany({
      where: { userId },
    });
  });

  // 4) Soft-delete auth user (disables sign-in).
  const { error } = await supabase.auth.admin.deleteUser(userId, true);
  if (error) throw new Exception(HttpStatusCode.InternalServerError, `Delete account failed: ${error.message}`);

  return { deletedUserId: userId };
};
