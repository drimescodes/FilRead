'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount, useSignMessage } from 'wagmi';
import { SiweMessage } from 'siwe';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import Spinner from '@/components/Spinner';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function withAuth<T extends object>(WrappedComponent: React.ComponentType<T>) {
  return function WithAuthComponent(props: T) {
    const router = useRouter();
    const { address, isConnected, isConnecting } = useAccount();
    const { signMessageAsync } = useSignMessage();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      // Check localStorage for existing authentication
      const storedAuth = localStorage.getItem('siwe-auth');
      if (storedAuth && isConnected && address) {
        const { authAddress } = JSON.parse(storedAuth);
        if (authAddress === address) {
          setIsAuthenticated(true);
          return;
        }
      }

      // Clear auth on disconnect
      if (!isConnected && isAuthenticated) {
        localStorage.removeItem('siwe-auth');
        setIsAuthenticated(false);
        toast.info('Wallet disconnected.', {
          position: 'top-right',
          autoClose: 3000,
        });
      }

      const authenticate = async () => {
        if (!isConnected || !address) return;

        try {
          const message = new SiweMessage({
            domain: window.location.host,
            address,
            statement: 'Sign in to Web3 Blog',
            uri: window.location.origin,
            version: '1',
            chainId: 314159, // Filecoin Calibration Testnet
            nonce: Math.random().toString(36).slice(2),
          });

          const signature = await signMessageAsync({ message: message.prepareMessage() });

          // Client-side verification (no backend)
          const siweMessage = new SiweMessage(message);
          await siweMessage.verify({ signature });

          // Store authentication in localStorage
          localStorage.setItem('siwe-auth', JSON.stringify({ authAddress: address }));
          setIsAuthenticated(true);

          // Show toast message
          toast.success('Successfully logged in!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } catch (error) {
          console.error('SIWE authentication failed:', error);
          toast.error('Login failed. Please try again.', {
            position: 'top-right',
            autoClose: 3000,
          });
          router.push('/');
        }
      };

      if (isConnected && !isAuthenticated) {
        authenticate();
      }
    }, [isConnected, address, isAuthenticated, router, signMessageAsync]);

    if (!isConnected) {
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="mb-4 text-lg">Please connect your wallet to access this page.</p>
          <ConnectButton />
          <ToastContainer />
        </div>
      );
    }

    if (isConnecting) {
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <Spinner className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8" />
          <ToastContainer />
        </div>
      );
    }

    if (!isAuthenticated) {
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <Spinner className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8" />
          <ToastContainer />
        </div>
      );
    }

    return (
      <>
        <WrappedComponent {...props} />
        <ToastContainer />
      </>
    );
  };
}