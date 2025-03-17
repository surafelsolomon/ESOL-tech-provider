'use client';
import { useState, useEffect } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function ThemeSwitcher() {
    const [theme, setTheme] = useState('light'); // Default theme
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const savedTheme = localStorage.getItem('theme');
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
        const initialTheme = savedTheme || systemTheme;
        setTheme(initialTheme);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleMediaChange = () => {
            if (!localStorage.getItem('theme')) {
                setTheme(mediaQuery.matches ? 'dark' : 'light');
            }
        };

        mediaQuery.addEventListener('change', handleMediaChange);
        return () => mediaQuery.removeEventListener('change', handleMediaChange);
    }, [theme, isMounted]);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    };

    if (!isMounted) return null;

    return (
        <button
            onClick={toggleTheme}
            style={{
                position: 'fixed',
                bottom: '0.3px',
                right: '0.3px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: '1000',
                backgroundColor: theme === 'light' ? '#222' : '#eee',
                border: '3px solid',
                borderColor: theme === 'light' ? '#444' : '#ccc',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.1)';
                e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
            }}
            onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
            }}
        >
            {theme === 'light' ? (
                <FiMoon
                    style={{
                        fontSize: '30px',
                        color: '#fff',
                        animation: 'bounce 2s infinite',
                    }}
                    className="moon-icon"
                />
            ) : (
                <FiSun
                    style={{
                        fontSize: '30px',
                        color: '#000',
                        animation: 'bounce 2s infinite',
                    }}
                    className="sun-icon"
                />
            )}
            <style jsx>{`
                @keyframes bounce {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
                .moon-icon, .sun-icon {
                    display: block;
                }
            `}</style>
        </button>
    );
}