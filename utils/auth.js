// utils/auth.js
export const setAuthTokenCookie = (res, token) => {
    res.setHeader('Set-Cookie', `auth_token=${token}; Path=/; Max-Age=3600; HttpOnly`);
};

export const getAuthTokenFromRequest = (req) => {
    return req.cookies.get('auth_token')?.value;
};

export const clearAuthTokenCookie = (res) => {
    res.setHeader('Set-Cookie', 'auth_token=; Path=/; Max-Age=0; HttpOnly');
};