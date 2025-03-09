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
        const authToken = document.cookie.split('; ').find(row => row.startsWith('auth_token='));
        setIsAuthenticated(!!authToken);
    }, [pathname]);

    const handleLogout = () => {
        document.cookie = 'auth_token=; path=/; max-age=0';
        setIsAuthenticated(false);
        router.push('/client/login');
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
                        src="/images/logo.svg"
                        alt="Esol Tech Logo"
                        className="logo"
                        width={32}
                        height={32}
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
                            src="/images/logo.svg"
                            alt="Esol Tech Logo"
                            className="logo"
                            width={32}
                            height={32}
                        />
                    </Link>
                    <Link href="/services" onClick={() => setIsMenuOpen(false)}>Services</Link>
                    <Link href="/industries" onClick={() => setIsMenuOpen(false)}>Industries</Link>
                    <Link href="/resources" onClick={() => setIsMenuOpen(false)}>Resources</Link>
                    <Link href="/contact-us" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
                    <Link href="/about-us" onClick={() => setIsMenuOpen(false)}>About Us</Link>
                </div>

                <div className="auth-links">
                    {isAuthenticated ? (
                        <>
                            <Link href="/client/profile" onClick={() => setIsMenuOpen(false)}>
                                <Image
                                    src="/images/user-avatar.png"
                                    alt="User Profile"
                                    width={32}
                                    height={32}
                                    className="user-avatar"
                                />
                            </Link>
                            <button onClick={handleLogout} className="logout-button">
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            href="/client/login"
                            className="client-login"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Sign-in/Sign-up
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
}