// src/components/Layout/Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Timer, Settings } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar = ({ isOpen }: SidebarProps) => {
  return (
    <aside className={`
      fixed left-0 top-16 bottom-16 bg-gray-900 text-white w-64 
      transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link to="/" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800">
              <Home size={20} />
              Home
            </Link>
          </li>
          <li>
            <Link to="/workout" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800">
              <Timer size={20} />
              Workout
            </Link>
          </li>
          <li>
            <Link to="/settings" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800">
              <Settings size={20} />
              Einstellungen
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};