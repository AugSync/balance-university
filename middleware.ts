import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.has('session');
  const isAuthPage = request.nextUrl.pathname === '/';
  const isAuthRoute = request.nextUrl.pathname.startsWith('/api/auth');
  const isApiRoute = request.nextUrl.pathname.startsWith('/api');

  // Allow auth routes without authentication
  if (isAuthRoute) {
    return NextResponse.next();
  }

  // Protect API routes
  if (isApiRoute && !isAuthenticated) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // Redirect to dashboard if authenticated and trying to access auth page
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Redirect to login if not authenticated and trying to access protected routes
  if (!isAuthenticated && !isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/students/:path*',
    '/api/:path*'
  ]
}; 