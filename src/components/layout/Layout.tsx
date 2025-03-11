
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { cn } from '@/lib/utils';

const Layout = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
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

  // Subscribe to sidebar collapse state changes
  useEffect(() => {
    const handleSidebarChange = (e: CustomEvent) => {
      setSidebarCollapsed(e.detail.collapsed);
    };
    
    window.addEventListener('sidebar-toggle' as any, handleSidebarChange);
    
    return () => {
      window.removeEventListener('sidebar-toggle' as any, handleSidebarChange);
    };
  }, []);

  return (
    <div className={cn("min-h-screen bg-background text-foreground")}>
      <Sidebar onToggleCollapse={(collapsed) => setSidebarCollapsed(collapsed)} />
      <div className={cn(
        "flex flex-col min-h-screen transition-all duration-300",
        sidebarCollapsed ? "ml-[70px]" : "ml-[240px]"
      )}>
        <Navbar onToggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <main className="flex-1 p-4 md:p-6 transition-all duration-200 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
