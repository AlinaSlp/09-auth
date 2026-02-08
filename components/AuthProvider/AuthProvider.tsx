'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { checkSession, logout } from '@/lib/api/clientApi';
import { usePathname, useRouter } from 'next/navigation';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser, clearIsAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      try {
        const user = await checkSession();
        if (user) {
          setUser(user);
        } else if (
          pathname.startsWith('/profile') ||
          pathname.startsWith('/notes')
        ) {
          await logout();
          clearIsAuthenticated();
          router.replace('/sign-in');
        }
      } catch {
        clearIsAuthenticated();
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [pathname, router, setUser, clearIsAuthenticated]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
}
