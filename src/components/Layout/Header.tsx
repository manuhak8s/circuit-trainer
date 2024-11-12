// src/components/Layout/Header.tsx
import React from 'react';
import { Menu } from 'lucide-react';

export const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  return (
    <header className="bg-gray-900 text-white h-16 fixed top-0 left-0 right-0 flex items-center px-4 justify-between">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-800 rounded-lg"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold">Circuit Trainer</h1>
      </div>
    </header>
  );
};