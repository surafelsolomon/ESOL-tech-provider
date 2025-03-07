'use client';

import { useState, useEffect } from 'react';

export default function ThemeSwitcher() {
    const [theme, setTheme] = useState(() => {
        // Check for saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) return savedTheme;

        // Get system theme preference
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
        return systemTheme;
    });

    // Update theme in localStorage and data attribute
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        if (!localStorage.getItem('theme')) {
            window.matchMedia('(prefers-color-scheme: dark)').matches
                ? localStorage.setItem('theme', 'dark')
                : localStorage.setItem('theme', 'light');
        }
    }, [theme]);

    // Toggle theme and persist in localStorage
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    // Watch for system preference changes when no user preference exists
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleMediaChange = () => {
            if (!localStorage.getItem('theme')) {
                setTheme(mediaQuery.matches ? 'dark' : 'light');
            }
        };

        mediaQuery.addEventListener('change', handleMediaChange);
        return () => mediaQuery.removeEventListener('change', handleMediaChange);
    }, []);

    return (
        <button
            onClick={toggleTheme}
            style={{
                position: 'fixed',
                bottom: '1rem',
                right: '1rem',
                padding: '0.5rem 1rem',
                backgroundColor: 'var(--primary-color)',
                color: 'var(--text-color)',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
            }}
        >
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
        </button>
    );
}