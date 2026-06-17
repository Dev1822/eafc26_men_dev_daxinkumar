import { useState, useEffect } from 'react';
import { Sun, Moon, Search, User } from 'lucide-react';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check initial theme
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  return (
    <header className="h-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-gray-700 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-10 transition-colors duration-200">
      
      <div className="flex-1 flex items-center">
        <div className="relative w-full max-w-md hidden sm:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-600 rounded-xl leading-5 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
            placeholder="Search players, stats..."
          />
        </div>
      </div>

      <div className="flex items-center space-x-4 lg:space-x-6">
        <button
          onClick={toggleTheme}
          className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 bg-gray-50 dark:bg-gray-700/50 rounded-full transition-all duration-200"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>


        <div className="flex items-center space-x-3 border-l border-gray-200 dark:border-gray-700 pl-6 ml-2">
          <div className="hidden md:block text-right">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 leading-tight">{user?.name || 'Admin User'}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{user?.role || 'Administrator'}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md">
            <User className="h-5 w-5" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
