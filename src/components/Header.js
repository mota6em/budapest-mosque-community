import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">☪</span>
          </div>
          <span className="font-bold text-xl text-foreground">Islamic Community</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#prayer-times" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Prayer Times
          </a>
          <a href="#spiritual-content" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Daily Content
          </a>
          <a href="#navigation" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Resources
          </a>
          <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            About
          </a>
        </nav>

        {/* Theme Toggle and Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-accent"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="text-2xl">☰</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container py-4 space-y-4">
            <a href="#prayer-times" className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Prayer Times
            </a>
            <a href="#spiritual-content" className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Daily Content
            </a>
            <a href="#navigation" className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Resources
            </a>
            <a href="#about" className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
