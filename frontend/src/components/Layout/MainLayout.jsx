import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import SEO from '../SEO/SEO';

const MainLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <SEO 
        title="Dashboard | EAFC26 Admin" 
        description="Premium admin dashboard for EAFC26 player management and analytics."
      />
      
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6 lg:p-10 transition-colors duration-200">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
