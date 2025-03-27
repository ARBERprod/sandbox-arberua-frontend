import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { LANG_COOKIE_KEY } from '@/shared/config/lang';

export function middleware(request: NextRequest) {
  const isDev = process.env.NODE_ENV === 'development';
  if (request.url.startsWith('/_next') || request.url.startsWith('/favicon.ico')) {
    return NextResponse.next();
  }
  const langCookie = request.cookies.get(LANG_COOKIE_KEY);
  const url = request.nextUrl.clone();
  if (!langCookie) {
    const response = NextResponse.next();
    if (isDev) {
      response.cookies.set(LANG_COOKIE_KEY, url.locale);
    } else {
      response.cookies.set(LANG_COOKIE_KEY, url.locale, { domain: '.arber.ua' });
    }
    return response;
  }
  if (request.nextUrl.locale !== langCookie.value) {
    url.locale = langCookie.value;
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/((?!api|static|.*\\..*|_next).*)'],
};
