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
    const [openDropdown, setOpenDropdown] = useState(null);

    useEffect(() => {
        const authToken = document.cookie.split('; ').find(row => row.startsWith('auth_token='));
        setIsAuthenticated(!!authToken);
    }, [pathname]);

    const navItems = [

        {
            name: 'Services',
            href: '/services',
            children: [
                { name: 'ERP Solutions', href: '/services/erp-system' },
                { name: '3D Virtualization', href: '/services/3d-virtualization' },
                { name: 'Tech Consulting', href: '/services/other-services' }
            ]
        },
        {
            name: 'Resources',
            href: '/resources',
            children: [
                { name: 'Blog', href: '/resources/blog' },
                { name: 'Whitepapers', href: '/resources/whitepapers' },
                { name: 'FAQs', href: '/resources/faqs' },
                { name: 'Webinars', href: '/resources/webinars' }
            ]
        },
        { name: 'Contact Us', href: '/contact-us' },
        { name: 'About Us', href: '/about-us' }
    ];

    const handleLogout = () => {
        document.cookie = 'auth_token=; path=/; max-age=0';
        setIsAuthenticated(false);
        router.push('/client/login');
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setOpenDropdown(null);
    };

    const handleDropdown = (itemName) => {
        setOpenDropdown(openDropdown === itemName ? null : itemName);
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
                <p
                    className="menu-toggle"
                    onClick={toggleMenu}
                    aria-label="Toggle navigation menu"
                >
                    {isMenuOpen ? '×' : '☰'}
                </p>
            </div>

            <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                <div className="nav-main-links">
                    <Link href="/" className="desktop-logo" onClick={() => setIsMenuOpen(false)}>
                        <Image
                            src="/images/logo.svg"
                            alt="Esol Tech Logo"
                            className="logo"
                            width={32}
                            height={32}
                        />
                    </Link>

                    {navItems.map((item) => (
                        <div
                            key={item.name}
                            className="nav-item-container"
                            onMouseEnter={() => window.innerWidth > 768 && handleDropdown(item.name)}
                            onMouseLeave={() => window.innerWidth > 768 && handleDropdown(null)}
                        >
                            {item.children ? (
                                <>
                                    <Link
                                        href={item.href}
                                        className="dropdown-toggle"
                                        onClick={() => handleDropdown(item.name)}
                                    >
                                        {item.name}
                                    </Link>
                                    {openDropdown === item.name && (
                                        <div className="dropdown-menu">
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.name}
                                                    href={child.href}
                                                    onClick={() => {
                                                        setIsMenuOpen(false);
                                                        setOpenDropdown(null);
                                                    }}
                                                >
                                                    {child.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <Link
                                    href={item.href}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            )}
                        </div>
                    ))}
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
                        <button>
                            <Link
                                href="/client/login"
                                className="client-login"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Login
                            </Link>
                        </button>
                    )}
                </div>
            </nav>
        </header>
    );
}