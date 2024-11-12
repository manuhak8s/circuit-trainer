// src/components/Layout/MainLayout.tsx
import React, { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-800">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
      <main className="pt-16 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};