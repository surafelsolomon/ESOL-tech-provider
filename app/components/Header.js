// app/components/Header.js
'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Header() {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        setIsAuthenticated(document.cookie.includes('auth_token'));
    }, [pathname]);

    const handleLogout = () => {
        document.cookie = 'auth_token=; path=/; max-age=0';
        setIsAuthenticated(false);
        router.push('/');
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="header">
            <div className="mobile-header">
                <Link href="/" className="logo-link">
                    <Image
                        src="/images/logo.png"
                        alt="Esol Tech Logo"
                        className="logo"
                        width={120}
                        height={40}
                    />
                </Link>

                <button
                    className="menu-toggle"
                    onClick={toggleMenu}
                    aria-label="Toggle navigation menu"
                >
                    {isMenuOpen ? '×' : '☰'}
                </button>
            </div>

            <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                <div className="nav-main-links">
                    <Link href="/" className="desktop-logo">
                        <Image
                            src="/images/logo.png"
                            alt="Esol Tech Logo"
                            className="logo"
                            width={120}
                            height={40}
                        />
                    </Link>

                    <Link href="/about-us" onClick={() => setIsMenuOpen(false)}>About Us</Link>
                    <Link href="/services" onClick={() => setIsMenuOpen(false)}>Services</Link>
                    <Link href="/industries" onClick={() => setIsMenuOpen(false)}>Industries</Link>
                    <Link href="/resources" onClick={() => setIsMenuOpen(false)}>Resources</Link>
                    <Link href="/contact-us" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
                </div>

                <div className="auth-links">
                    {isAuthenticated ? (
                        <button onClick={handleLogout} className="logout-button">
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link
                                href="/client/login"
                                className="client-login"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Client Login
                            </Link>
                            <Link
                                href="/admin/login"
                                className="admin-login"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Admin Login
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}