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
    <div className="fixed bottom-4 left-[88px] z-50 w-16">
      <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-lg border border-black/20 dark:border-white/20 shadow-lg">
        <div className="p-3">
          <button
            onClick={toggleTheme}
            className="w-full h-10 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-black/80 dark:hover:bg-white/80 transition-colors flex items-center justify-center"
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <Sun size={16} />
            ) : (
              <Moon size={16} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

