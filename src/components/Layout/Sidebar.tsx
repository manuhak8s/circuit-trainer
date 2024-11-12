// src/components/Layout/Sidebar.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Timer, Settings, LogOut } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onExit: () => void;
}

export const Sidebar = ({ isOpen, onClose, onExit }: SidebarProps) => {
  const location = useLocation();

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const handleExit = () => {
    onClose();
    onExit();
  };

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/workout', icon: Timer, label: 'Workouts' },
    { path: '/settings', icon: Settings, label: 'Einstellungen' }
  ];

  return (
    <aside className={`
      fixed left-0 top-16 bottom-16 
      bg-white dark:bg-gray-900 
      text-gray-900 dark:text-white 
      border-r border-gray-200 dark:border-gray-800
      w-64 
      transition-all duration-300 ease-in-out
      flex flex-col
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      z-20
    `}>
      {/* Main Navigation */}
      <nav className="p-4 flex-1">
        <ul className="space-y-2">
          {navItems.map(({ path, icon: Icon, label }) => (
            <li key={path}>
              <Link
                to={path}
                onClick={onClose}
                className={`
                  flex items-center gap-2 p-2 rounded-lg
                  transition-colors duration-200
                  ${isActivePath(path) 
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'}
                `}
              >
                <Icon size={20} />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Section with Exit Button */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <button 
          onClick={handleExit}
          className="flex items-center gap-2 w-full p-2 rounded-lg
                   text-red-600 dark:text-red-400 
                   hover:bg-red-50 dark:hover:bg-red-900/20 
                   transition-colors duration-200"
        >
          <LogOut size={20} />
          App verlassen
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 dark:bg-black/40 z-10 lg:hidden"
          onClick={onClose}
        />
      )}
    </aside>
  );
};