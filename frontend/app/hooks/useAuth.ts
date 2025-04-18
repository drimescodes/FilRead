// useAuth.ts (custom hook using Wagmi and Zustand)
import { useAccount, useSignMessage } from 'wagmi';
import { useAuthStore } from '@/app/store/authStore';

export function useAuth() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { setAuthenticated, setLoading } = useAuthStore();

  const signMessage = async (message: string) => {
    setLoading(true);
    try {
      const signature = await signMessageAsync({ message });
      setAuthenticated(true);
      return signature;
    } finally {
      setLoading(false);
    }
  };

  return {
    address,
    isConnected,
    signMessage,
  };
}
