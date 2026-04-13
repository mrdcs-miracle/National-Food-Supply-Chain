import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, setUser, cartCount = 0 }) => {
  
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const canAccessDashboard = user && (user.role === 'MANAGER' || user.role === 'ADMIN');

  return (
    <nav className={`sticky top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/70 backdrop-blur-xl shadow-lg border-b border-white/50 py-1' : 'bg-white/40 backdrop-blur-md border-b border-white/20 py-3'}`}>
      <div className="container px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link to="/">
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-green-500 shadow-lg shadow-green-500/30">
                        <span className="text-xl text-white">🌱</span>
                    </div>
                    <div className="text-2xl font-extrabold tracking-tight text-transparent bg-gradient-to-r from-teal-700 to-green-600 bg-clip-text">
                        Lk Supply
                    </div>
                </div>
            </Link>

            {/* Links */}
            <ul className="hidden gap-8 font-semibold text-gray-600 md:flex items-center"> 
                <li className="transition-colors cursor-pointer hover:text-teal-600">
                    <Link to="/">Home</Link>
                </li>
                <li className="px-4 py-1.5 font-bold text-green-700 bg-green-100 rounded-full transition-all border border-green-200 cursor-pointer hover:bg-green-200 hover:shadow-sm">
                    <Link to="/marketplace">Buy Seeds</Link>
                </li>
                <li className="transition-colors cursor-pointer hover:text-teal-600 font-bold border-b-2 border-transparent hover:border-teal-500 pb-1">
                    <Link to="/tracking">Track Order</Link>
                </li>
                <li className="transition-colors cursor-pointer hover:text-teal-600">
                    <Link to="/about">About</Link>
                </li>
                <li className="transition-colors cursor-pointer hover:text-teal-600">
                    <Link to="/services">Services</Link>
                </li>
                <li className="transition-colors cursor-pointer hover:text-teal-600">
                    <Link to="/contact">Contact</Link>
                </li>
            </ul>

            {/* --- RIGHT SIDE --- */}
            <div className="flex items-center gap-6">
                
                {/* Cart Icon */}
                <Link to="/cart" className="relative group">
                    <div className="p-2.5 transition-colors rounded-xl bg-white/50 border border-white/40 group-hover:bg-white group-hover:shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700 group-hover:text-teal-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-red-500 border-2 border-white rounded-full shadow-sm">
                            {cartCount}
                        </span>
                    )}
                </Link>

                {/* USER AUTH SECTION */}
                <div className="pl-6 border-l border-gray-300">
                    {user ? (
                        <div className="flex items-center gap-4">
                            
                            {/* Dashboard Button (Only for Admins/Managers) */}
                            {canAccessDashboard && (
                                <Link to="/dashboard">
                                    <button className="hidden px-4 py-2 text-xs font-bold text-white uppercase transition-all bg-gray-900 rounded-xl shadow-md sm:block hover:bg-gray-800 hover:scale-105 hover:shadow-xl">
                                        Dashboard
                                    </button>
                                </Link>
                            )}

                            <div className="hidden text-right sm:block">
                                <p className="text-sm font-bold text-gray-800">{user.name}</p>
                                <span className="text-[10px] uppercase tracking-wider font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded-md border border-teal-200">
                                    {user.role}
                                </span>
                            </div>

                            <div className="flex items-center justify-center w-10 h-10 font-black text-white bg-gradient-to-br from-teal-400 to-green-500 rounded-xl shadow-lg">
                                {user.name.charAt(0).toUpperCase()}
                            </div>

                            <button 
                                onClick={handleLogout} 
                                title="Logout"
                                className="p-2 text-gray-400 transition-colors bg-white border border-gray-200 rounded-xl hover:text-red-500 hover:border-red-200 hover:bg-red-50 hover:shadow-sm"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </button>
                        </div>
                    ) : (
                        <Link to="/login">
                            <button className='flex items-center gap-2 px-6 py-2.5 font-bold text-white transition-all bg-gradient-to-r from-teal-500 to-green-500 rounded-full shadow-lg hover:shadow-teal-500/50 hover:-translate-y-0.5 active:translate-y-0'>
                                Login
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                            </button>
                        </Link>
                    )}
                </div>
            </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;