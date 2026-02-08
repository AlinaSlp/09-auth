'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { checkSession } from '@/lib/api/clientApi';
import Loader from '@/components/Loader/Loader';

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { setUser, clearUser, isLoading, setLoading } = useAuthStore();

  useEffect(() => {
    const init = async () => {
      try {
        const user = await checkSession();
        if (user) setUser(user);
        else clearUser();
      } catch {
        clearUser();
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [setUser, clearUser, setLoading]);

  if (isLoading) return <Loader />;

  return <>{children}</>;
}
