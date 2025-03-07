// app/admin/login/page.js
'use client';

import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
    const router = useRouter();

    const handleLogin = () => {
        document.cookie = 'auth_token=; path=/; max-age=0'; // Clear existing cookie
        document.cookie = 'auth_token=admin; path=/';
        router.push('/admin/dashboard');
    };

    return (
        <div>
            <h1>Admin Login</h1>
            <button onClick={handleLogin}>Login as Admin</button>
        </div>
    );
}