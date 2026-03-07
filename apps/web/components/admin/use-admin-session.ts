'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseBrowserClient } from '@/lib/supabase-browser';

type SessionState = {
  token: string;
  loading: boolean;
};

export const useAdminSession = (): SessionState => {
  const router = useRouter();
  const [state, setState] = useState<SessionState>({
    token: '',
    loading: true,
  });

  useEffect(() => {
    const client = getSupabaseBrowserClient();

    const run = async () => {
      const { data } = await client.auth.getSession();
      const token = data.session?.access_token ?? '';

      if (!token) {
        router.replace('/admin/login');
        setState({ token: '', loading: false });
        return;
      }

      setState({
        token,
        loading: false,
      });
    };

    void run();
  }, [router]);

  return state;
};
