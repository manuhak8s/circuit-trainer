// src/components/Layout/Sidebar.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Timer, Settings, LogOut } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onExit: () => void;
  onClose: () => void;  // Neue Prop für das Schließen
}

export const Sidebar = ({ isOpen, onExit, onClose }: SidebarProps) => {
  const navigate = useNavigate();

  // Kombinierte Funktion für Navigation und Schließen
  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

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
    `}>
      <nav className="p-4 flex-1">
        <ul className="space-y-2">
          <li>
            <button 
              onClick={() => handleNavigation('/')}
              className="flex items-center gap-2 p-2 w-full rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
            >
              <Home size={20} />
              Home
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleNavigation('/workout')}
              className="flex items-center gap-2 p-2 w-full rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
            >
              <Timer size={20} />
              Workout
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleNavigation('/settings')}
              className="flex items-center gap-2 p-2 w-full rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
            >
              <Settings size={20} />
              Einstellungen
            </button>
          </li>
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <button 
          onClick={onExit}
          className="flex items-center gap-2 p-2 w-full rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <LogOut size={20} />
          App verlassen
        </button>
      </div>
    </aside>
  );
};