import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, FileText, AlertTriangle, Menu, LogOut, Search, Bell, ChevronLeft, Globe } from 'lucide-react';

const DashboardLayout = ({ children, handleLogout, user }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex bg-[#f8fafc] overflow-hidden fixed inset-0">
      
      {/* 🟢 FLOATING SUPERB SIDEBAR */}
      <aside className={`${isSidebarOpen ? 'w-72' : 'w-20'} bg-slate-900/80 backdrop-blur-3xl m-4 rounded-[2.5rem] relative z-20 text-white transition-all duration-300 flex flex-col shadow-2xl border border-white/10 overflow-hidden`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500 rounded-full mix-blend-screen filter blur-[60px] opacity-20 pointer-events-none"></div>

        <div className="relative z-10 flex items-center justify-between h-20 px-6 border-b border-white/5 bg-white/5">
          {isSidebarOpen ? (
              <h1 className="flex items-center gap-2 text-xl font-bold tracking-tight text-white">
                  <span className="text-xl text-teal-400">🌱</span> Lk Supply
              </h1>
          ) : (
              <h1 className="mx-auto text-xl text-teal-400">🌱</h1>
          )}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1.5 text-gray-400 transition-colors rounded-lg bg-white/5 hover:bg-white/10 hover:text-white">
              <ChevronLeft size={20} className={`transform transition-transform ${isSidebarOpen ? '' : 'rotate-180'}`} />
          </button>
        </div>
        
        <nav className="relative z-10 flex-1 px-4 mt-8 space-y-3">
          <SidebarLink to="/" icon={<Globe size={20} className="text-teal-400" />} text="Public Website" active={false} isOpen={isSidebarOpen} />
          
          <div className="my-4 border-t opacity-30 border-white/10"></div>
          
          <SidebarLink to="/dashboard" icon={<LayoutDashboard size={20} />} text="Overview" active={isActive('/dashboard')} isOpen={isSidebarOpen} />
          <SidebarLink to="/dashboard/stocks" icon={<Package size={20} />} text="Stocks" active={isActive('/dashboard/stocks')} isOpen={isSidebarOpen} />
          <SidebarLink to="/dashboard/reports" icon={<FileText size={20} />} text="Reports" active={isActive('/dashboard/reports')} isOpen={isSidebarOpen} />
          <SidebarLink to="/dashboard/alerts" icon={<AlertTriangle size={20} />} text="Alerts" active={isActive('/dashboard/alerts')} isOpen={isSidebarOpen} />
        </nav>

        <div className="relative z-10 p-4 border-t border-white/10 bg-black/20">
          <button onClick={handleLogout} className="flex items-center justify-center w-full px-4 py-3.5 font-bold text-red-400 transition-all rounded-2xl bg-red-500/10 hover:bg-red-500/20 hover:text-red-300">
              <LogOut size={20} />{isSidebarOpen && <span className="ml-3 uppercase tracking-wider text-xs">Log Out</span>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex flex-col flex-1 overflow-hidden relative">
        <div className='absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-teal-500/20 rounded-full mix-blend-multiply filter blur-[150px] pointer-events-none'></div>

        {/* 🟢 FLOATING HEADER */}
        <header className="relative z-10 flex items-center justify-between h-[80px] px-8 bg-white/60 backdrop-blur-3xl border border-white scroll-shadow-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] mt-4 mr-4 shrink-0 transition-all">
          <div className="flex items-center px-5 py-3 transition-all bg-white border border-gray-100 shadow-inner rounded-2xl w-[400px] focus-within:shadow-md focus-within:ring-2 focus-within:ring-teal-500/20">
              <Search size={18} className="mr-3 text-teal-600" />
              <input placeholder="Search analytics, alerts, stocks..." className="w-full text-sm font-bold text-gray-700 bg-transparent outline-none placeholder:font-medium placeholder:text-gray-400" />
          </div>
          
          <div className="flex items-center space-x-8">
            <button className="relative p-3 transition-colors bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 shadow-sm group">
                <Bell size={20} className="text-gray-600 group-hover:text-teal-600 transition-colors" />
                <span className="absolute w-2.5 h-2.5 border-2 border-white bg-red-500 rounded-full top-2 right-2 shadow-sm animate-pulse"></span>
            </button>
            <div className="flex items-center pl-8 space-x-4 border-l border-gray-200">
              <div className="text-right">
                <p className="text-sm font-bold text-gray-800">{user?.role || "Admin"}</p>
                <p className="text-[10px] font-bold tracking-widest uppercase text-teal-600">Online Center</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 font-black text-white bg-gradient-to-br from-teal-500 to-green-500 shadow-xl shadow-green-500/30 rounded-2xl border-2 border-white scale-100 hover:scale-105 transition-transform cursor-pointer">
                  {user?.name?.charAt(0).toUpperCase() || "A"}
              </div>
            </div>
          </div>
        </header>

        {/* SCROLLING CONTENT OVER THE BACKGROUND */}
        <main className="relative z-10 flex-1 p-8 pr-12 overflow-y-auto custom-scrollbar">
            <div className="mx-auto max-w-[1500px] pb-10">
                {children}
            </div>
        </main>
      </div>
    </div>
  );
};

const SidebarLink = ({ to, icon, text, active, isOpen }) => (
  <Link to={to} className={`flex items-center px-4 py-3.5 mb-2 rounded-xl transition-all duration-300 font-semibold group ${active ? 'bg-gradient-to-r from-teal-600 to-green-500 text-white shadow-lg shadow-teal-900/30' : 'text-gray-400 hover:bg-white/5 hover:text-white'} ${!isOpen && 'justify-center px-0'}`}>
    <div className={`transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
        {icon}
    </div>
    {isOpen && <span className="ml-4">{text}</span>}
  </Link>
);

export default DashboardLayout;