import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  Lock, 
  ShoppingBag, 
  Globe, 
  LogOut 
} from 'lucide-react';

const Sidebar = ({ handleLogout }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    // 🟢 Keep your "Public Website" link
    { path: '/', label: 'Public Website', icon: <Globe size={20} /> },
    
    // Standard Dashboard Links
    { path: '/dashboard', label: 'Overview', icon: <LayoutDashboard size={20} /> },
    { path: '/dashboard/stocks', label: 'Stocks', icon: <Package size={20} /> },
    { path: '/dashboard/reports', label: 'Reports', icon: <FileText size={20} /> },
    
    // 🟢 NEW: Marketplace (Added back)
    { path: '/dashboard/marketplace', label: 'Marketplace', icon: <ShoppingBag size={20} /> },
    
    // 🟢 NEW: Security (Added back)
    { path: '/dashboard/settings', label: 'Security', icon: <Lock size={20} /> },
    
    // ❌ DELETED: "Alerts" is completely gone now.
  ];

  return (
    <div className="fixed top-0 left-0 flex flex-col w-64 h-screen bg-[#111827] text-gray-400 border-r border-gray-800 z-50">
      
      {/* Header */}
      <div className="flex items-center gap-3 p-6 text-xl font-bold tracking-wider text-white border-b border-gray-800">
        <span className="text-blue-500">LK</span> SUPPLY
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group
              ${isActive(item.path) 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' 
                : 'hover:bg-gray-800 hover:text-white'
              }`}
          >
            <span className={`${isActive(item.path) ? 'text-white' : 'text-gray-500 group-hover:text-white'}`}>
              {item.icon}
            </span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-gray-800">
        <button 
            onClick={handleLogout}
            className="flex items-center w-full gap-3 px-4 py-3 text-red-400 transition-colors rounded-lg hover:bg-red-500/10 hover:text-red-500"
        >
            <LogOut size={20} />
            <span className="font-bold">Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;