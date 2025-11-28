import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Bloquer l'accès à /design-system en production
  if (
    request.nextUrl.pathname.startsWith('/design-system') &&
    process.env.NODE_ENV === 'production'
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/design-system/:path*',
};

