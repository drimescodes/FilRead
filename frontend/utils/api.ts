export function getApiUrl() {
    if (process.env.NEXT_PUBLIC_API_URL) {
      return process.env.NEXT_PUBLIC_API_URL;
    }
    
    if (process.env.NODE_ENV === 'production') {
      return 'https://readre-backend.vercel.app';
      // return 'https://readre-backend.onrender.com/'
    }
    
    return 'http://localhost:8000';
  }