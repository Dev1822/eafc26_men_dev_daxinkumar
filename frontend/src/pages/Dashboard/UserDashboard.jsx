import AnalyticsDashboard from '../../features/analytics/AnalyticsDashboard';

const UserDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">User Dashboard</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Players</h3>
          <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mt-2">18,456</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Active Users</h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">1,204</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Server Health</h3>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2">99.9%</p>
        </div>
      </div>

      {/* Render the Recharts Analytics Dashboard */}
      <AnalyticsDashboard />
    </div>
  );
};

export default UserDashboard;
