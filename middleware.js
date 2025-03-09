import { NextResponse } from 'next/server';

export function middleware(request) {
    const authToken = request.cookies.get('auth_token')?.value;
    const pathname = request.nextUrl.pathname;

    const protectedPaths = ['/client', '/admin'];
    const isLoginPage = pathname.startsWith('/client/login') || pathname.startsWith('/admin/login');

    if (protectedPaths.some((path) => pathname.startsWith(path))) {
        if (!authToken && !isLoginPage) {
            return NextResponse.redirect(new URL('/client/login', request.url));
        } else if (authToken && isLoginPage) {
            return NextResponse.redirect(new URL('/client/dashboard', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/client/:path*', '/admin/:path*'],
};