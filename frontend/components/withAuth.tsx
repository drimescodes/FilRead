'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/app/store/authStore';
import Spinner from '@/components/Spinner';

export function withAuth<T extends object>(
  WrappedComponent: React.ComponentType<T>
) {
  return function WithAuthComponent(props: T) {
    const router = useRouter();
    const { isAuthenticated, isLoading, checkAuth } = useAuthStore();

    useEffect(() => {
      const initAuth = async () => {
        const isAuthed = await checkAuth();
        if (!isAuthed) {
          router.replace('/auth/register');
        }
      };

      initAuth();
    }, [checkAuth, router]);

    if (isLoading) {
      return <Spinner className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-8 h-8 " />;
    }

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}