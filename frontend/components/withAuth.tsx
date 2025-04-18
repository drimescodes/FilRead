'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import Spinner from '@/components/Spinner';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function withAuth<T extends object>(
  WrappedComponent: React.ComponentType<T>
) {
  return function WithAuthComponent(props: T) {
    const router = useRouter();
    const { isConnected, isConnecting } = useAccount();

    // Optional: Redirect or handle disconnection (uncomment if needed)
    /*
    useEffect(() => {
      if (!isConnected && !isConnecting) {
        router.replace('/'); // Redirect to homepage or a connect page
      }
    }, [isConnected, isConnecting, router]);
    */

    if (isConnecting) {
      return <Spinner className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8" />;
    }

    if (!isConnected) {
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="mb-4 text-lg">Please connect your wallet to access this page.</p>
          <ConnectButton />
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
}