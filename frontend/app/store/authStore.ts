import { create } from 'zustand';
import axios from 'axios';
import { getApiUrl } from '@/utils/api';

const API_BASE_URL = getApiUrl();

// Axios configuration
axios.defaults.withCredentials = true;
axios.defaults.baseURL = API_BASE_URL;

// Add this to ensure cookies are always sent
axios.interceptors.request.use(function (config) {
  config.withCredentials = true;
  return config;
});

interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
}

interface AuthState {
  address: string | null;
  isConnected: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  username: string | null;
  profilePicture: string | null;
  signMessage: (message: string) => Promise<string>;
  disconnect: () => void;
  fetchProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  address: null,
  isConnected: false,
  isAuthenticated: false,
  isLoading: false,
  username: null,
  profilePicture: null,
  signMessage: async (message: string) => {
    // implement signMessage logic here
    return '';
  },
  disconnect: () => {
    // implement disconnect logic here
  },
  fetchProfile: async () => {
    const { address } = useAccount();
    if (!address) return;
    const { data } = await supabase
      .from('users')
      .select('username, profile_picture')
      .eq('wallet_address', address)
      .single();
    if (data) {
      set({ username: data.username, profilePicture: data.profile_picture });
    }
  },
}));

