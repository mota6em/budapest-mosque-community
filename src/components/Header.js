import React, { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/95 backdrop-blur-md shadow-lg border-border/50' 
        : 'bg-background/80 backdrop-blur-sm border-border/20'
    }`}>
      <div className="container flex h-20 items-center justify-between">
        {/* Enhanced Logo */}
        <div className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
            <span className="text-white font-bold text-xl">☪</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl text-foreground group-hover:text-primary transition-colors duration-300">
              Islamic Community
            </span>
            <Badge variant="outline" className="text-xs px-2 py-1 border-primary/30 text-primary w-fit">
              Platform
            </Badge>
          </div>
        </div>

        {/* Enhanced Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#prayer-times" className="group relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300">
            <span className="flex items-center gap-2">
              <span className="text-lg">🕐</span>
              Prayer Times
            </span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></div>
          </a>
          <a href="#spiritual-content" className="group relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300">
            <span className="flex items-center gap-2">
              <span className="text-lg">📖</span>
              Daily Content
            </span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></div>
          </a>
          <a href="#navigation" className="group relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300">
            <span className="flex items-center gap-2">
              <span className="text-lg">🧭</span>
              Resources
            </span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></div>
          </a>
          <a href="#about" className="group relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300">
            <span className="flex items-center gap-2">
              <span className="text-lg">ℹ️</span>
              About
            </span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></div>
          </a>
        </nav>

        {/* Enhanced Theme Toggle and Mobile Menu Button */}
        <div className="flex items-center space-x-6">
          <ThemeToggle />
          
          {/* Enhanced Mobile Menu Button */}
          <button
            className="md:hidden p-3 rounded-xl hover:bg-accent transition-all duration-300 group"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`w-5 h-0.5 bg-foreground rounded-full transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}></span>
              <span className={`w-5 h-0.5 bg-foreground rounded-full transition-all duration-300 mt-1 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}></span>
              <span className={`w-5 h-0.5 bg-foreground rounded-full transition-all duration-300 mt-1 ${
                isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Enhanced Mobile Navigation */}
      <div className={`md:hidden border-t transition-all duration-300 overflow-hidden ${
        isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="container py-6 space-y-4 bg-background/95 backdrop-blur-sm">
          <Separator className="mb-4" />
          <a 
            href="#prayer-times" 
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-all duration-300 group"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="text-xl">🕐</span>
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
              Prayer Times
            </span>
          </a>
          <a 
            href="#spiritual-content" 
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-all duration-300 group"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="text-xl">📖</span>
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
              Daily Content
            </span>
          </a>
          <a 
            href="#navigation" 
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-all duration-300 group"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="text-xl">🧭</span>
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
              Resources
            </span>
          </a>
          <a 
            href="#about" 
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-all duration-300 group"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="text-xl">ℹ️</span>
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
              About
            </span>
          </a>
          <Separator className="mt-4" />
          <div className="text-center pt-2">
            <Badge variant="outline" className="text-xs px-3 py-1 border-primary/30 text-primary">
              Mobile Navigation
            </Badge>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
