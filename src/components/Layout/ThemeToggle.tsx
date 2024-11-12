// src/components/Layout/ThemeToggle.tsx
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../theme/ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-14 h-7 rounded-full bg-gray-200 dark:bg-gray-700 relative transition-colors"
      aria-label="Toggle theme"
    >
      <div
        className={`
          absolute w-6 h-6 rounded-full 
          transition-transform duration-200 ease-in-out
          bg-white dark:bg-gray-900
          ${theme === 'light' ? 'translate-x-[-16px]' : 'translate-x-[16px]'}
          shadow-md flex items-center justify-center
        `}
      />
      <Sun 
        size={14} 
        className="absolute left-[6px] text-yellow-500 transition-opacity"
        style={{ opacity: theme === 'light' ? 1 : 0.5 }}
      />
      <Moon 
        size={14} 
        className="absolute right-[6px] text-gray-400 transition-opacity"
        style={{ opacity: theme === 'dark' ? 1 : 0.5 }}
      />
    </button>
  );
};