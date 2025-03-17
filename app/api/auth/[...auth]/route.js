import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    if (action === 'redirect') {
        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${baseUrl}/api/auth/google?action=callback&response_type=code&scope=email%20profile%20openid`;
        return NextResponse.redirect(googleAuthUrl);
    }

    if (action === 'callback') {
        const code = searchParams.get('code');
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                code,
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: `${baseUrl}/api/auth/google?action=callback`,
                grant_type: 'authorization_code',
            }),
        });

        const tokens = await tokenResponse.json();
        if (!tokens.id_token) {
            return NextResponse.redirect(`${baseUrl}/client/login?error=auth_failed`);
        }

        // Extract user information from the Google response
        const userResponse = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
            headers: {
                Authorization: `Bearer ${tokens.access_token}`
            }
        });

        const userInfo = await userResponse.json();

        const response = NextResponse.redirect(`${baseUrl}/client/dashboard`);
        response.cookies.set('auth_token', tokens.id_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: tokens.expires_in,
            path: '/',
        });

        // Store user information in cookies
        response.cookies.set('user_name', userInfo.name, {
            path: '/',
            maxAge: tokens.expires_in
        });

        response.cookies.set('user_picture', userInfo.picture, {
            path: '/',
            maxAge: tokens.expires_in
        });

        return response;
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}