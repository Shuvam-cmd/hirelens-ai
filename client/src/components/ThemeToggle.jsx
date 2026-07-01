import React from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <button
      id="theme-toggle"
      onClick={toggleTheme}
      className="p-2 rounded-xl transition-all duration-300 border border-slate-700/50 bg-slate-800/40 text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none cursor-pointer dark:bg-slate-800/40 dark:border-slate-700/50 light:bg-white light:border-slate-200 light:text-slate-700 light:hover:bg-slate-100"
      title="Toggle Theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-gold" />
      ) : (
        <Moon className="w-5 h-5 text-stone-850" />
      )}
    </button>
  );
};
