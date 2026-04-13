import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { motion } from 'framer-motion';
import LiveMap from './LiveMap'; // Import the Map Component
import {
  BarChart3, TrendingUp, AlertTriangle, Package,
  ArrowUpRight, Activity, BellRing, Send, Calendar, Clock
} from 'lucide-react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, AreaChart, Area,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

const Overview = ({ user }) => {

  // --- STATE ---
  const [stats, setStats] = useState({ totalStock: 0, lowStockItems: 0, criticalItems: 0, activeCenters: 0 });
  const [stocks, setStocks] = useState([]);
  const [recentLogs, setRecentLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Chart & Filter State
  const [chartData, setChartData] = useState([]);
  const [timeFilter, setTimeFilter] = useState('Weekly'); // Weekly, Monthly, Yearly
  const [currentTime, setCurrentTime] = useState(new Date());

  // SMS Broadcast State
  const [smsMessage, setSmsMessage] = useState("");
  const [smsSending, setSmsSending] = useState(false);

  const isManager = user && (user.role === 'MANAGER' || user.role === 'ADMIN');
  const COLORS = ['#14b8a6', '#0ea5e9', '#6366f1', '#a855f7', '#ec4899', '#f43f5e', '#f59e0b'];

  // --- EFFECTS ---

  // 1. Live Clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchData = async () => {
    try {
      const [stocksRes, logsRes] = await Promise.all([
        api.get('/stocks'),
        api.get('/logs/recent')
      ]);

      const fetchedStocks = stocksRes.data;
      const logs = logsRes.data;

      // Stats Calculation
      const total = fetchedStocks.reduce((acc, item) => acc + item.quantity, 0);
      const low = fetchedStocks.filter(item => item.status === 'Low').length;
      const critical = fetchedStocks.filter(item => item.status === 'Critical').length;
      const locations = new Set(fetchedStocks.map(s => s.location)).size;

      // Group Data for Pie Chart (Specific Categories)
      const categoryCounts = fetchedStocks.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + item.quantity;
        return acc;
      }, {});
      let processedChartData = Object.keys(categoryCounts)
        .map(key => ({ name: key, value: categoryCounts[key] }))
        .sort((a, b) => b.value - a.value);

      // Prevent Legend Overflow by grouping into "Other"
      if (processedChartData.length > 6) {
        const top5 = processedChartData.slice(0, 5);
        const othersValue = processedChartData.slice(5).reduce((sum, item) => sum + item.value, 0);
        processedChartData = [...top5, { name: 'Other', value: othersValue }];
      }

      setStocks(fetchedStocks);
      setChartData(processedChartData);
      setRecentLogs(logs);
      setStats({ totalStock: total, lowStockItems: low, criticalItems: critical, activeCenters: locations });
      setLoading(false);

    } catch (error) {
      console.error("Dashboard Sync Failed", error);
    }
  };

  // 2. Fetch Data Polling (Updates every 5 seconds)
  useEffect(() => {
    // Defer initial fetch to avoid synchronous setState in effect
    const timeoutId = setTimeout(() => fetchData(), 0);
    const interval = setInterval(fetchData, 5000);
    return () => {
      clearTimeout(timeoutId);
      clearInterval(interval);
    };
  }, []);

  // --- HANDLERS ---

  const handleSendSMS = (e) => {
    e.preventDefault();
    if (!smsMessage.trim()) return;
    setSmsSending(true);

    // Simulate API Call
    setTimeout(() => {
      alert(`BROADCAST SENT: "${smsMessage}" to all active centers.`);
      setSmsMessage("");
      setSmsSending(false);
    }, 1500);
  };

  // Mock Data for Bar Chart based on Filter
  const getTrendData = () => {
    // In a real app, this comes from backend history. Mocking for UI demo.
    if (timeFilter === 'Weekly') return [
      { name: 'Mon', sales: 4000, stock: 2400 },
      { name: 'Tue', sales: 3000, stock: 1398 },
      { name: 'Wed', sales: 2000, stock: 9800 },
      { name: 'Thu', sales: 2780, stock: 3908 },
      { name: 'Fri', sales: 1890, stock: 4800 },
      { name: 'Sat', sales: 2390, stock: 3800 },
      { name: 'Sun', sales: 3490, stock: 4300 },
    ];
    if (timeFilter === 'Monthly') return [
      { name: 'Week 1', sales: 14000, stock: 12400 },
      { name: 'Week 2', sales: 13000, stock: 11398 },
      { name: 'Week 3', sales: 12000, stock: 19800 },
      { name: 'Week 4', sales: 12780, stock: 13908 },
    ];
    return [
      { name: 'Jan', sales: 4000, stock: 2400 }, { name: 'Feb', sales: 3000, stock: 1398 },
      { name: 'Mar', sales: 2000, stock: 9800 }, { name: 'Apr', sales: 2780, stock: 3908 },
      { name: 'May', sales: 1890, stock: 4800 }, { name: 'Jun', sales: 2390, stock: 3800 },
    ];
  };

  // --- RENDER ---

  // --- FRAME MOTION VARIANTS ---
  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };

  if (loading) return <div className="p-10 text-center text-gray-500 animate-pulse">Syncing Live Dashboard...</div>;

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="pb-10 space-y-8">

      {/* 1. TOP BAR: Date & Welcome */}
      <motion.div variants={itemVariants} className="flex flex-col justify-between gap-4 p-6 bg-white border border-gray-100 shadow-sm md:flex-row md:items-center rounded-2xl">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
          <p className="text-gray-500">Welcome back, <span className="font-bold text-green-600">{user?.name}</span></p>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden text-right md:block">
            <p className="flex items-center justify-end gap-2 text-sm font-bold text-gray-800">
              <Clock size={16} className="text-blue-500" /> {currentTime.toLocaleTimeString()}
            </p>
            <p className="flex items-center justify-end gap-2 text-xs text-gray-500">
              <Calendar size={14} /> {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          {isManager && (
            <span className="px-4 py-2 text-xs font-bold text-indigo-700 border border-indigo-100 rounded-lg bg-indigo-50 animate-pulse">
              ⚡ Manager Access
            </span>
          )}
        </div>
      </motion.div>

      {/* 2. STATS GRID */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Stock (kg)" value={stats.totalStock.toLocaleString()} icon={<Package />} color="bg-blue-500" />
        <StatCard title="Active Centers" value={stats.activeCenters} icon={<BarChart3 />} color="bg-purple-500" sparkData={[{v:5},{v:10},{v:2},{v:15},{v:20}]} />
        <StatCard title="Low Stock Items" value={stats.lowStockItems} icon={<TrendingUp />} color="bg-orange-500" sparkData={[{v:20},{v:15},{v:30},{v:25},{v:40}]} />
        <StatCard title="Critical Alerts" value={stats.criticalItems} icon={<AlertTriangle />} color="bg-red-500" sparkData={[{v:50},{v:30},{v:40},{v:10},{v:5}]} />
      </motion.div>

      {/* 🟢 3. LIVE MAP SECTION */}
      {/* Updated: Now passing the 'stocks' state directly to the map */}
      <motion.div variants={itemVariants}>
        <LiveMap stocks={stocks} />
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 gap-8 lg:grid-cols-3">

        {/* 4. MANAGER ZONE: SMS & Critical Alerts */}
        <div className="space-y-8 lg:col-span-2">

          {/* SMS Broadcast */}
          {isManager && (
            <div className="p-6 text-white shadow-xl bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-white/10"><Send size={20} className="text-green-400" /></div>
                <div>
                  <h3 className="text-lg font-bold">SMS Broadcast System</h3>
                  <p className="text-xs text-slate-400">Send emergency alerts to all warehouse managers.</p>
                </div>
              </div>
              <form onSubmit={handleSendSMS} className="flex gap-4">
                <input
                  value={smsMessage}
                  onChange={(e) => setSmsMessage(e.target.value)}
                  placeholder="Type alert message here (e.g., 'Check Rice Stocks immediately')..."
                  className="flex-1 px-4 py-3 text-sm transition-all border bg-white/5 border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-slate-500"
                />
                <button
                  disabled={smsSending}
                  className="px-6 font-bold text-white transition-all bg-green-600 shadow-lg hover:bg-green-500 rounded-xl shadow-green-900/20 disabled:opacity-50"
                >
                  {smsSending ? 'Sending...' : 'Send'}
                </button>
              </form>
            </div>
          )}

          {/* Time-Based Chart */}
          <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-800">Inventory Trends</h3>
              <div className="flex p-1 bg-gray-100 rounded-lg">
                {['Weekly', 'Monthly', 'Yearly'].map(filter => (
                  <button
                    key={filter}
                    onClick={() => setTimeFilter(filter)}
                    className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${timeFilter === filter ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={getTrendData()} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorStock" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.7}/>
                      <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.05}/>
                    </linearGradient>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.7}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <Tooltip cursor={{ fill: '#f8fafc', strokeWidth: 1, strokeDasharray: '4 4', stroke: '#cbd5e1' }} contentStyle={{ borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', backdropFilter: 'blur(10px)' }} />
                  <Legend wrapperStyle={{ paddingTop: '10px' }} iconType="circle" />
                  <Area type="monotone" dataKey="stock" stroke="#14b8a6" strokeWidth={4} fillOpacity={1} fill="url(#colorStock)" name="Network Capacity" />
                  <Area type="monotone" dataKey="sales" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" name="Real-time Flow (kg)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Critical Alerts List */}
          {isManager && (stats.criticalItems > 0 || stats.lowStockItems > 0) && (
            <div className="p-6 border border-red-100 bg-red-50 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <BellRing className="text-red-600 animate-bounce" size={20} />
                <h3 className="font-bold text-red-800">Critical Decisions Required</h3>
              </div>
              <div className="grid gap-3">
                {stocks.filter(s => s.status === 'Critical' || s.status === 'Low').slice(0, 3).map(stock => (
                  <div key={stock.id} className="flex items-center justify-between p-4 bg-white border border-red-100 shadow-sm rounded-xl">
                    <div>
                      <h4 className="font-bold text-gray-800">{stock.itemName}</h4>
                      <p className="text-xs text-gray-500">{stock.location} • {stock.category}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${stock.status === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                        {stock.status}
                      </span>
                      <p className="mt-1 text-sm font-bold">{stock.quantity} kg</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 5. SIDEBAR: Pie Chart & Logs */}
        <div className="space-y-8">
          {/* Top Stock Distribution */}
          <div className="p-6 bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem]">
            <div className="flex items-center justify-between mb-6">
                <div>
                   <h3 className="font-black text-gray-900 tracking-tight">Stock Distribution</h3>
                   <p className="text-xs font-medium text-gray-500 mt-1">Highest volume by category</p>
                </div>
                <div className="p-2.5 bg-teal-50 text-teal-600 rounded-xl shadow-inner shadow-teal-100/50">
                    <Package size={20} />
                </div>
            </div>
            <div className="space-y-5">
              {chartData.slice(0, 5).map((data, index) => {
                const maxVal = Math.max(...chartData.map(d => d.value));
                const percentage = (data.value / maxVal) * 100;
                const colors = [
                    'from-teal-500 to-emerald-400',
                    'from-blue-500 to-cyan-400',
                    'from-indigo-500 to-purple-400',
                    'from-orange-400 to-amber-300',
                    'from-pink-500 to-rose-400',
                    'from-slate-500 to-gray-400'
                ];
                return (
                  <div key={index} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-gray-800 flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${colors[index % colors.length]}`}></span>
                          {data.name}
                      </span>
                      <span className="text-xs font-black text-gray-600 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
                          {data.value.toLocaleString()} kg
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                        className={`h-full rounded-full bg-gradient-to-r ${colors[index % colors.length]} relative overflow-hidden`}
                      >
                          <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite] -translate-x-full"></div>
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>
            {chartData.length > 5 && (
                <div className="mt-6 pt-5 border-t border-gray-50 flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-400">Other Categories</span>
                    <span className="text-xs font-bold text-gray-600 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
                        {chartData.slice(5).reduce((acc, curr) => acc + curr.value, 0).toLocaleString()} kg
                    </span>
                </div>
            )}
          </div>

          {/* Radar Chart: Regional Performance */}
          <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
            <h3 className="mb-6 font-bold text-gray-800">Regional Efficiency</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                  { region: 'Colombo', logistics: 120, storage: 110, fullMark: 150 },
                  { region: 'Kandy', logistics: 98, storage: 130, fullMark: 150 },
                  { region: 'Galle', logistics: 86, storage: 130, fullMark: 150 },
                  { region: 'Jaffna', logistics: 99, storage: 100, fullMark: 150 },
                  { region: 'Ampara', logistics: 85, storage: 90, fullMark: 150 },
                  { region: 'Kurunegala', logistics: 65, storage: 85, fullMark: 150 },
                ]}>
                  <PolarGrid stroke="#f1f5f9" />
                  <PolarAngleAxis dataKey="region" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                  <Radar name="Logistics" dataKey="logistics" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.6} />
                  <Radar name="Storage" dataKey="storage" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                  <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.9)' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Live Logs */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-[400px] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800">Live Activity</h3>
              <Activity size={18} className="text-gray-400" />
            </div>
            <div className="flex-1 pr-2 space-y-4 overflow-y-auto custom-scrollbar">
              {recentLogs.map((log) => (
                <div key={log.id} className="flex gap-3 pb-3 text-sm border-b border-gray-50 last:border-0">
                  <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${log.status === 'Success' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                  <div>
                    <p className="text-xs font-bold text-gray-700">{log.action}</p>
                    <p className="text-gray-500 text-[11px] leading-tight mt-0.5">{log.details}</p>
                    <p className="text-gray-400 text-[10px] mt-1">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
};

// UI Helper
const StatCard = ({ title, value, icon, color, sparkData = [{v: 10},{v: 25},{v: 15},{v: 40},{v: 30},{v: 50}] }) => {
  // Extract base color for stroke
  const strokeColor = color.includes('blue') ? '#3b82f6' : 
                      color.includes('purple') ? '#a855f7' : 
                      color.includes('orange') ? '#f97316' : '#ef4444';

  return (
    <div className="p-6 transition-all duration-300 bg-white/70 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl hover:shadow-[0_15px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-white/80 to-transparent rounded-full -mr-12 -mt-12 pointer-events-none group-hover:scale-110 transition-transform duration-700 ease-out"></div>
      
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className={`p-4 rounded-2xl ${color} bg-opacity-10 text-${color.split('-')[1]}-500 shadow-inner group-hover:scale-105 transition-transform duration-300`}>
          {React.cloneElement(icon, { size: 24 })}
        </div>
        <span className="flex h-3 w-3 relative">
          <span className="absolute inline-flex w-full h-full bg-teal-400 rounded-full opacity-75 animate-ping"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
        </span>
      </div>
      
      <div className="flex items-end justify-between relative z-10">
        <div>
          <h3 className="text-3xl font-black text-gray-900 drop-shadow-sm tracking-tight">{value}</h3>
          <p className="mt-1 text-[11px] font-bold tracking-widest text-gray-400 uppercase">{title}</p>
        </div>
        <div className="w-24 h-12">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparkData}>
              <defs>
                <linearGradient id={`grad-${title}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={strokeColor} stopOpacity={0.4}/>
                  <stop offset="95%" stopColor={strokeColor} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="basis" dataKey="v" stroke={strokeColor} strokeWidth={3} fillOpacity={1} fill={`url(#grad-${title})`} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Overview;