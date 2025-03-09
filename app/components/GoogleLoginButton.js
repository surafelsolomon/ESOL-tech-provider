'use client';

import Image from 'next/image';

export default function GoogleLoginButton() {
    return (
        <a
            href="/api/auth/google?action=redirect"
            className="social-button google"
        >
            <Image
                src="/images/google-logo.svg"
                alt="Google Login"
                width={20}
                height={20}
            />
            <span>Login with Google</span>
        </a>
    );
}