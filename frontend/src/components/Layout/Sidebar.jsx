import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Database, Settings, LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from "../../store/slices/authSlice";

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Players', path: '/dashboard/players', icon: Users },
    { name: 'Analytics', path: '/dashboard/analytics', icon: Database },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-800 shadow-xl hidden md:flex flex-col border-r border-gray-100 dark:border-gray-700 transition-colors duration-200">
      <div className="h-20 flex items-center px-8 border-b border-gray-100 dark:border-gray-700">
        <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
          EAFC26
        </h1>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.includes(item.path) || (item.path === '/dashboard' && location.pathname === '/dashboard');
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 font-semibold shadow-sm' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : ''}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100 dark:border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
