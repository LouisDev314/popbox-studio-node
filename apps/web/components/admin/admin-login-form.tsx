'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSupabaseBrowserClient } from '@/lib/supabase-browser';

const AdminLoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');

    const client = getSupabaseBrowserClient();
    const { error: signInError } = await client.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setSubmitting(false);
      return;
    }

    router.push('/admin/products');
  };

  return (
    <div className="mx-auto max-w-md rounded-[2rem] border border-ink/10 bg-white p-8 shadow-card">
      <p className="text-xs uppercase tracking-[0.25em] text-ember">Admin access</p>
      <h1 className="mt-3 font-heading text-4xl uppercase text-ink">Sign in</h1>
      <div className="mt-6 space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-ink">Email</span>
          <input value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-full border border-ink/15 bg-paper px-4 py-3 outline-none" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-ink">Password</span>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-full border border-ink/15 bg-paper px-4 py-3 outline-none" />
        </label>
        {error ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}
        <button
          type="button"
          onClick={() => void handleSubmit()}
          disabled={submitting}
          className="w-full rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-paper disabled:opacity-60"
        >
          {submitting ? 'Signing in...' : 'Sign in'}
        </button>
      </div>
    </div>
  );
};

export default AdminLoginForm;
