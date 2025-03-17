'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';


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
                bottom: '0rem',
                right: '0rem',
                padding: '0.5rem 1rem',
                backgroundColor: 'transparent',
                color: 'var(--text-color)',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
            }}
        >
            {theme === 'light' ? <Image
                src="/images/moon.png"
                alt="moon"
                width={30}
                height={30}
            /> : 'sun'}
        </button>
    );
}