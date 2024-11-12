// src/components/Layout/Header.tsx
import React from 'react';
import { Menu } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  toggleSidebar: () => void;
}

export const Header = ({ toggleSidebar }: HeaderProps) => {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 
                    text-gray-900 dark:text-white h-16 fixed top-0 left-0 right-0 
                    flex items-center px-4 justify-between z-30">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold">Circuit Trainer</h1>
      </div>
      <ThemeToggle />
    </header>
  );
};