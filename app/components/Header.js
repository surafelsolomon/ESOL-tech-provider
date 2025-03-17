'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Header() {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [user, setUser] = useState(null);
    const profileRef = useRef(null);

    useEffect(() => {
        const checkAuth = () => {
            console.log('Checking authentication status');
            const authToken = document.cookie.split('; ').find(row => row.startsWith('auth_token='));
            if (authToken) {
                console.log('User is authenticated');
                setIsAuthenticated(true);

                // Retrieve user information from cookies
                const cookies = document.cookie.split('; ');
                const userNameCookie = cookies.find(cookie => cookie.startsWith('user_name='));
                const userPictureCookie = cookies.find(cookie => cookie.startsWith('user_picture='));

                if (userNameCookie && userPictureCookie) {
                    const userName = decodeURIComponent(userNameCookie.split('=')[1]);
                    const userPicture = decodeURIComponent(userPictureCookie.split('=')[1]);
                    console.log('Retrieved user information:', { userName, userPicture });
                    setUser({
                        name: userName,
                        picture: userPicture
                    });
                } else {
                    console.log('User information cookies not found');
                }
            } else {
                console.log('User is not authenticated');
                setIsAuthenticated(false);
                setUser(null);
            }
        };

        checkAuth();
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
        { name: "Pricing", href: '/pricing' },
        { name: 'Contact Us', href: '/contact-us' },
        { name: 'About Us', href: '/about-us' }
    ];

    const handleLogout = () => {
        // Clear authentication cookies
        document.cookie = 'auth_token=; Path=/; Max-Age=0';
        document.cookie = 'user_name=; Path=/; Max-Age=0';
        document.cookie = 'user_picture=; Path=/; Max-Age=0';

        setIsAuthenticated(false);
        setUser(null);
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

    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
                        <div className="user-profile" ref={profileRef}>
                            {user && (
                                <div className="user-info" onClick={toggleProfileDropdown}>
                                    <Image
                                        src={user.picture}
                                        alt="User Profile"
                                        width={32}
                                        height={32}
                                        className="user-avatar"
                                    />
                                </div>
                            )}

                            {isProfileDropdownOpen && (
                                <div className="profile-dropdown">
                                    <Link href="/client/cost">Cost</Link>
                                    <Link href="/client/account">Account</Link>
                                    <button onClick={handleLogout}>Logout</button>
                                </div>
                            )}
                        </div>
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