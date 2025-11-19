'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-[200px] z-50 py-2 rounded text-sm font-medium bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors border border-gray-200 dark:border-neutral-700 flex items-center justify-center"
      style={{ 
        width: 'calc(0.5rem + 1.25rem + 0.5rem + 2px)',
        height: 'calc(0.5rem + 1.25rem + 0.5rem + 2px)',
        paddingLeft: '0.5rem',
        paddingRight: '0.5rem'
      }}
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <Sun size={16} className="text-gray-700 dark:text-gray-200" />
      ) : (
        <Moon size={16} className="text-gray-700 dark:text-gray-200" />
      )}
    </button>
  );
}

