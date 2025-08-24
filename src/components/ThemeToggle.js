import React from 'react';
import { Switch } from './ui/switch';
import { useTheme } from '../contexts/ThemeContext';
import { Badge } from './ui/badge';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center space-x-3 p-2 rounded-xl bg-muted/50 hover:bg-muted/80 transition-all duration-300 group">
      <div className="flex items-center gap-2">
        <span className={`text-lg transition-all duration-300 ${theme === 'dark' ? 'text-yellow-500' : 'text-blue-500'}`}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </span>
        <Switch
          checked={theme === 'dark'}
          onCheckedChange={toggleTheme}
          className="theme-transition"
        />
        <span className={`text-lg transition-all duration-300 ${theme === 'dark' ? 'text-blue-500' : 'text-yellow-500'}`}>
          {theme === 'dark' ? '🌙' : '☀️'}
        </span>
      </div>
      
      {/* Theme indicator badge */}
      <Badge 
        variant="outline" 
        className={`text-xs px-2 py-1 border-current transition-all duration-300 ${
          theme === 'dark' 
            ? 'text-blue-500 border-blue-500/30 bg-blue-500/10' 
            : 'text-yellow-500 border-yellow-500/30 bg-yellow-500/10'
        }`}
      >
        {theme === 'dark' ? 'Dark' : 'Light'}
      </Badge>
    </div>
  );
};

export default ThemeToggle;
