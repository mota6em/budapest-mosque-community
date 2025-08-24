import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import HomePage from './components/HomePage';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <HomePage />
      </div>
    </ThemeProvider>
  );
}

export default App;
