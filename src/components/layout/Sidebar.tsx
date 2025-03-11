
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, LayoutDashboard, Users, BarChart3, Settings, LogOut, FileEdit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type SidebarLink = {
  href: string;
  label: string;
  icon: React.ElementType;
};

interface SidebarProps {
  onToggleCollapse?: (collapsed: boolean) => void;
}

const links: SidebarLink[] = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/users', label: 'Users', icon: Users },
  { href: '/reports', label: 'Reports', icon: BarChart3 },
  { href: '/form-template', label: 'Form Template', icon: FileEdit },
  { href: '/settings', label: 'Settings', icon: Settings },
];

const Sidebar = ({ onToggleCollapse }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    const newCollapsedState = !collapsed;
    setCollapsed(newCollapsedState);
    
    // Notify parent component
    if (onToggleCollapse) {
      onToggleCollapse(newCollapsedState);
    }
    
    // Dispatch custom event for other components to listen to
    const event = new CustomEvent('sidebar-toggle', { 
      detail: { collapsed: newCollapsedState } 
    });
    window.dispatchEvent(event);
  };

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-background border-r border-border transition-all duration-300 ease-in-out",
        collapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between h-16 px-3 border-b border-border">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-bold">A</span>
              </div>
              <span className="font-semibold">Admin</span>
            </div>
          )}
          {collapsed && <div className="w-full flex justify-center">
            <div className="w-8 h-8 rounded-md bg-accent flex items-center justify-center">
              <span className="text-accent-foreground font-bold">A</span>
            </div>
          </div>}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="text-muted-foreground hover:text-foreground"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
        </div>
        
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.href;
              
              return (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className={cn(
                      "sidebar-item",
                      isActive && "active"
                    )}
                  >
                    <Icon size={20} />
                    {!collapsed && <span>{link.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="p-3 border-t border-border">
          <button className="sidebar-item w-full">
            <LogOut size={20} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
