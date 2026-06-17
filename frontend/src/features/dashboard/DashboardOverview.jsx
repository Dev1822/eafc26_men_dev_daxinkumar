import React, { useState, useEffect } from 'react';
import { Users, Star, Trophy, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import api from '../../services/api';

const DashboardOverview = ({ title }) => {
  const [stats, setStats] = useState({
    totalPlayers: 0,
    averageRating: 0,
    topPlayer: null,
    topLeagues: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Fetch all needed stats
        const [countRes, avgRatingRes, topPlayerRes, topLeaguesRes] = await Promise.all([
          api.get('/stats/players/count'),
          api.get('/stats/players/average-rating'),
          api.get('/stats/players/highest-rated'),
          api.get('/analytics/players/top-leagues?limit=5')
        ]);

        setStats({
          totalPlayers: countRes.data?.count || 0,
          averageRating: avgRatingRes.data?.averageRating || 0,
          topPlayer: topPlayerRes.data?.data || null,
          topLeagues: topLeaguesRes.data?.data || []
        });
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const statCards = [
    { title: "Total Players", value: stats.totalPlayers.toLocaleString(), icon: Users, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30" },
    { title: "Average Rating", value: stats.averageRating, icon: Star, color: "text-yellow-500", bg: "bg-yellow-100 dark:bg-yellow-900/30" },
    { title: "Highest Rated", value: stats.topPlayer ? stats.topPlayer.Name : 'N/A', subValue: stats.topPlayer ? `OVR: ${stats.topPlayer.OVR}` : '', icon: Trophy, color: "text-green-500", bg: "bg-green-100 dark:bg-green-900/30" },
    { title: "Top Leagues", value: stats.topLeagues.length, icon: Activity, color: "text-purple-500", bg: "bg-purple-100 dark:bg-purple-900/30" },
  ];

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{title || 'Overview'}</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome to the EAFC26 Dashboard</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-300">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</h3>
                  {stat.subValue && <p className="text-xs text-gray-400 mt-1">{stat.subValue}</p>}
                </div>
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Top Leagues by Avg OVR</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.topLeagues} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                <XAxis 
                  dataKey="_id" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6b7280', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  domain={['dataMin - 5', 'dataMax + 2']}
                />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ backgroundColor: '#1f2937', borderRadius: '8px', border: 'none', color: '#f3f4f6' }}
                  itemStyle={{ color: '#60a5fa' }}
                />
                <Bar dataKey="averageOVR" radius={[6, 6, 0, 0]} maxBarSize={50}>
                  {stats.topLeagues.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 shadow-sm text-white flex flex-col justify-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 opacity-10">
            <Trophy className="w-64 h-64" />
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-2">EAFC26 Database</h3>
            <p className="text-blue-100 mb-6 max-w-md leading-relaxed">
              Manage and analyze comprehensive player statistics, playstyles, and analytics from the game dataset.
            </p>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 inline-block border border-white/20">
              <p className="text-sm text-blue-100 font-medium">Database Status</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full absolute top-0 left-0 animate-ping"></div>
                </div>
                <span className="font-semibold text-green-50">Online & Synced</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
