
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { cn } from '@/lib/utils';

const Layout = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Check for user's preferred color scheme
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      setIsDarkMode(isDark);
    }
  }, []);
  
  // Apply theme class to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={cn("min-h-screen bg-background text-foreground")}>
      <Sidebar />
      <div className="flex flex-col ml-[70px] md:ml-[240px] min-h-screen">
        <Navbar onToggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <main className="flex-1 p-4 md:p-6 transition-all duration-200 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
