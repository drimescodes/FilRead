import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Define your protected routes
  const protectedRoutes = ['/welcome', '/admin'];
  
  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  );
  
  if (isProtectedRoute) {
    // Check for auth cookies
    const accessToken = request.cookies.get('access_token');
    const refreshToken = request.cookies.get('refresh_token');
    
    // If no auth cookies exist, redirect to login
    if (!accessToken && !refreshToken) {
      return NextResponse.redirect(new URL('/auth/register', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/welcome', '/admin/:path*']
};