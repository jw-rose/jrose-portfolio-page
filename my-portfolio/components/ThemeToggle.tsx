'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10" />
    );
  }

  // Debug: Log theme changes
  console.log('Current theme:', theme);

  return (
    <button
      onClick={() => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        console.log('Switching to:', newTheme);
        setTheme(newTheme);
      }}
      className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <FaSun className="text-yellow-400 text-lg" />
      ) : (
        <FaMoon className="text-blue-500 text-lg" />
      )}
    </button>
  );
}
