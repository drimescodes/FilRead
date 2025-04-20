// export const useAuthStore = create<AuthState>((set) => ({
//   address: null,
//   isConnected: false,
//   isAuthenticated: false,
//   isLoading: false,
//   username: null,
//   profilePicture: null,
//   signMessage: async (message: string) => {
//     // implement signMessage logic here
//     return '';
//   },
//   disconnect: () => {
//     // implement disconnect logic here
//   },
//   fetchProfile: async (address?: string) => {
//     // Accept address as a parameter instead of using useAccount()
//     if (!address) return;
//     const { data } = await supabase
//       .from('users')
//       .select('username, profile_picture')
//       .eq('wallet_address', address)
//       .single();
//     if (data) {
//       set({ username: data.username, profilePicture: data.profile_picture });
//     }
//   },
// }));