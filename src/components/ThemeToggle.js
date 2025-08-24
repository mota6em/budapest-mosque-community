import React from 'react';
import { Switch } from './ui/switch';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium">🌙</span>
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={toggleTheme}
        className="theme-transition"
      />
      <span className="text-sm font-medium">☀️</span>
    </div>
  );
};

export default ThemeToggle;
