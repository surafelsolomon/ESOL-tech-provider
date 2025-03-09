// app/client/login/page.js
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import GoogleLoginButton from '../../components/GoogleLoginButton';

export default function ClientLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleEmailLogin = () => {
        // Add your email login logic here
        console.log('Email login:', email, password);
        router.push('/client/dashboard');
    };

    const handleGoogleLogin = async () => {
        try {
            const response = await fetch('/api/auth/google', {
                method: 'GET',
                redirect: 'follow'
            });

            if (!response.ok) {
                throw new Error('Google login failed');
            }

            // The API route should handle the redirect to Google
            window.location.href = response.url;
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSignup = () => {
        router.push('/client/signup');
    };

    return (
        <div className="login-container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="login-card"
            >
                <div className="login-header">
                    <h2>Welcome Back</h2>
                    <p>Please login to your account</p>
                </div>

                <div className="login-body">
                    <form className="login-form">
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="input-field"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="input-field"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={handleEmailLogin}
                            className="primary-button"
                        >
                            Login with Email
                        </button>

                        <div className="social-login">
                            <div className="separator">
                                <span>or</span>
                            </div>

                            <GoogleLoginButton onClick={handleGoogleLogin} />

                            {/* <button
                                onClick={handleAppleLogin}
                                className="social-button apple"
                            >
                                <Image
                                    src="/images/apple-logo.svg"
                                    alt="Apple Login"
                                    width={20}
                                    height={20}
                                />
                                <span>Login with Apple</span>
                            </button> */}
                        </div>

                        <div className="additional-options">
                            <span className="forgot-password">
                                Forgot Password?
                            </span>
                            <button
                                type="button"
                                onClick={handleSignup}
                                className="signup-link"
                            >
                                Don't have an account? Sign Up
                            </button>
                        </div>
                    </form>
                    {error && <div className="error-message">{error}</div>}
                </div>
            </motion.div>
        </div>
    );
}