import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const siweAuth = request.cookies.get('siwe-auth')?.value;

  const protectedPaths = ['/create-post', '/profile', '/post'];

  if (protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
    if (!siweAuth) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/create-post', '/profile', '/post/:path*'],
};