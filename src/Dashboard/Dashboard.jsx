import React, { useState } from 'react';
import Sidebar from './Sidebar';
import LiveMap from './LiveMap'; // 🟢 Import the Map
import { Activity, TrendingUp, AlertTriangle, Package } from 'lucide-react';

// ... (Your existing StatCard component remains here) ...

const Dashboard = ({ user, handleLogout }) => {
  const [stats] = useState({ total: 0, low: 0, value: 0, active: 0 });

  // ... (Your existing fetchStats and activeTime logic remains here) ...

  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* Sidebar */}
      <Sidebar user={user} handleLogout={handleLogout} />

      {/* Main Content */}
      <div className="flex-1 p-8 ml-64">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Overview</h1>
                <p className="text-gray-500">Welcome back, {user?.name || 'Manager'}</p>
            </div>
            <div className="px-4 py-2 bg-white border border-gray-100 rounded-lg shadow-sm">
                <p className="text-xs font-bold text-gray-400 uppercase">System Date</p>
                <p className="text-sm font-bold text-gray-800">{new Date().toDateString()}</p>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
            {/* ... (Your existing StatCards code) ... */}
            <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-xs font-bold tracking-wider text-gray-400 uppercase">Total Stock</p>
                        <h3 className="mt-1 text-2xl font-bold text-gray-900">{stats.total}</h3>
                    </div>
                    <div className="p-3 text-blue-600 bg-blue-50 rounded-xl"><Package size={24} /></div>
                </div>
            </div>
             {/* ... Repeat for other cards ... */}
        </div>

        {/* 🟢 NEW: LIVE MAP SECTION */}
        <div className="mb-8 animate-fade-in-up">
            <LiveMap />
        </div>

        {/* Recent Activity Section (Keep your existing one below the map) */}
        {/* ... */}

      </div>
    </div>
  );
};

export default Dashboard;