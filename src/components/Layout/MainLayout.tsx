// src/components/Layout/MainLayout.tsx
import React, { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
  onExit: () => void;
}

export const MainLayout = ({ children, onExit }: MainLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header 
        toggleSidebar={toggleSidebar} 
      />
      
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        onExit={onExit}
      />
      
      <main className="pt-16 pb-16">
        <div className="container mx-auto px-6">
          {children}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MainLayout;