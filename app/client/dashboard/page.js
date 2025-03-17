'use client';
import { motion } from 'framer-motion';
import { useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check authentication status
        if (!document.cookie.includes('auth_token')) {
            router.push('/client/login');
        }

        // Retrieve user information from cookies
        const cookies = document.cookie.split('; ');
        const userCookie = cookies.find(cookie => cookie.startsWith('user_name='));
        if (userCookie) {
            const userName = userCookie.split('=')[1];
            setUser({ name: decodeURIComponent(userName) });
        }
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto"
            >
                <div className="flex flex-col items-center justify-center h-full">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Hi {user?.name}, welcome to your dashboard!
                    </h1>
                </div>
            </motion.div>
        </div>
    );
} 