import React, { useState, useEffect } from 'react';
import { Moon, Sun, Edit2, Check } from 'lucide-react';
import { Button } from './Button';

// Simple Input component inside header to avoid extra file dependency
const HeaderInput = ({ value, onChange, className, autoFocus }) => (
  <input
    value={value}
    onChange={onChange}
    autoFocus={autoFocus}
    className={`px-3 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
  />
);

export default function Header({ restaurantName, setRestaurantName, darkMode, toggleTheme }) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(restaurantName);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Client-side only to avoid hydration mismatch
    setTempName(restaurantName);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [restaurantName]);

  const handleSave = () => {
    setRestaurantName(tempName);
    setIsEditing(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {isEditing ? (
              <div className="flex items-center gap-2">
                <HeaderInput 
                  value={tempName} 
                  onChange={(e) => setTempName(e.target.value)}
                  className="w-48 md:w-64"
                  autoFocus
                />
                <Button onClick={handleSave} variant="success" className="p-2 h-9 w-9">
                  <Check className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 cursor-pointer flex items-center gap-2 group hover:text-blue-700 transition-colors" onClick={() => setIsEditing(true)}>
                {restaurantName}
                <Edit2 className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h1>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          <div className="hidden md:flex flex-col items-end mr-4">
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {currentTime.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300 ring-1 ring-gray-200 dark:ring-gray-700"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
}
