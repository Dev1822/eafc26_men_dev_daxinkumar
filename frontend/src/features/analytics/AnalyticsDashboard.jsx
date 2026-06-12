import { useEffect, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line 
} from 'recharts';
import api from '../../services/api';

const AnalyticsDashboard = () => {
  const [stats, setStats] = useState({
    totalPlayers: 0,
    topNations: [],
    ovrDistribution: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // TODO: Replace with real endpoints when ready
        // const topRatedRes = await api.get('/players/top-rated?limit=5');
        // const heatMapRes = await api.get('/players/heatmap');
        
        // Mocking the data structure based on typical aggregations for now
        setStats({
          totalPlayers: 18456, 
          topNations: [
            { name: 'England', count: 1240 },
            { name: 'Spain', count: 980 },
            { name: 'France', count: 850 },
            { name: 'Brazil', count: 720 },
            { name: 'Germany', count: 690 },
          ],
          ovrDistribution: [
            { range: '50-60', count: 4500 },
            { range: '61-70', count: 8200 },
            { range: '71-80', count: 4100 },
            { range: '81-90', count: 1500 },
            { range: '91-99', count: 156 },
          ]
        });
      } catch (error) {
        console.error("Error fetching analytics", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return <div className="animate-pulse flex space-x-4">Loading analytics...</div>;
  }

  return (
    <div className="space-y-6 mt-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* OVR Distribution Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">OVR Distribution</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.ovrDistribution}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                <Tooltip 
                  cursor={{fill: 'rgba(99, 102, 241, 0.1)'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
                />
                <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Nations Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">Players by Top Nations</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.topNations}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
                />
                <Line type="monotone" dataKey="count" stroke="#8b5cf6" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AnalyticsDashboard;
