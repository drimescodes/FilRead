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
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  accessToken: string | null;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  accessToken: null,

  checkAuth: async () => {
    try {
      const response = await axios.get('/auth/me');
      set({ 
        user: response.data, 
        isAuthenticated: true,
        isLoading: false
      });
      return true;
    } catch (error) {
      set({ 
        user: null, 
        isAuthenticated: false,
        isLoading: false 
      });
      return false;
    }
  },

 // Modify your login function to include a call to checkAuth
 login: async (token: string) => {
  try {
    const response = await axios.post('/auth/google', { token });
    const { access_token, user } = response.data;
    console.log('Received access token:', access_token);
    set({ 
      user,
      accessToken: access_token, // Save the access token
      isAuthenticated: true,
      isLoading: false
    });
    // Check if the user is authenticated
    await useAuthStore.getState().checkAuth();
  } catch (error) {
    set({ 
      user: null, 
      isAuthenticated: false,
      isLoading: false 
    });
    throw error;
  }
},

  logout: async () => {
    try {
      await axios.post('/auth/logout');
      set({ 
        user: null, 
        isAuthenticated: false,
        isLoading: false 
      });
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  },
}));

// Add axios interceptor for 401 responses
axios.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      const authStore = useAuthStore.getState();
      authStore.checkAuth().catch(() => {
        // If checkAuth fails, we're truly unauthorized
        useAuthStore.setState({ 
          user: null, 
          isAuthenticated: false,
          isLoading: false
        });
      });
    }
    return Promise.reject(error);
  }
);
