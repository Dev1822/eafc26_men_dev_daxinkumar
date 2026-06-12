import AnalyticsDashboard from '../../features/analytics/AnalyticsDashboard';

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">In-Depth Analytics</h2>
      </div>
      <AnalyticsDashboard />
    </div>
  );
};

export default Analytics;
