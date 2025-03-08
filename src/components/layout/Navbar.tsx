
import React, { useState } from 'react';
import { Bell, Moon, Search, Sun, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

interface NavbarProps {
  onToggleTheme: () => void;
  isDarkMode: boolean;
}

const Navbar = ({ onToggleTheme, isDarkMode }: NavbarProps) => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex flex-1 items-center">
          {/* Mobile search toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setShowMobileSearch(!showMobileSearch)}
          >
            <Search className="h-5 w-5" />
          </Button>
          
          {/* Desktop search */}
          <div className="relative ml-2 hidden md:block max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 bg-muted/50 border-muted"
            />
          </div>
        </div>
        
        {/* Mobile search (conditionally rendered) */}
        {showMobileSearch && (
          <div className="absolute left-0 top-16 w-full border-b border-border bg-background p-3 md:hidden animate-fade-in">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-8 w-full"
                autoFocus
              />
            </div>
          </div>
        )}
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="icon-btn">
            <Bell className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" onClick={onToggleTheme} className="icon-btn">
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-8 w-8 bg-muted/50"
              >
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
