// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
    const isAuthenticated = request.cookies.get('auth_token');
    const pathname = request.nextUrl.pathname;

    const protectedPaths = ['/client', '/admin'];
    const isLoginPage = pathname.startsWith('/client/login') || pathname.startsWith('/admin/login');

    if (protectedPaths.some((path) => pathname.startsWith(path))) {
        if (!isAuthenticated && !isLoginPage) {
            if (pathname.startsWith('/client')) {
                return NextResponse.redirect(new URL('/client/login', request.url));
            } else if (pathname.startsWith('/admin')) {
                return NextResponse.redirect(new URL('/admin/login', request.url));
            }
        } else if (isAuthenticated && isLoginPage) {
            if (isAuthenticated.value === "client") {
                return NextResponse.redirect(new URL('/client/dashboard', request.url))
            } else if (isAuthenticated.value === "admin") {
                return NextResponse.redirect(new URL('/admin/dashboard', request.url))
            }
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/client/:path*', '/admin/:path*'],
};