// src/components/Layout/Footer.tsx
import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 
                     text-gray-900 dark:text-white h-16 fixed bottom-0 left-0 right-0 
                     flex items-center justify-center">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Circuit Trainer
      </p>
    </footer>
  );
};