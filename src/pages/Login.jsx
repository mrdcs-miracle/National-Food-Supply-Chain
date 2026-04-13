import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios'; 
import lgImage from '../assets/lg.avif'; 
import { User, Mail, Lock, ArrowRight, CheckCircle } from 'lucide-react';

const Login = ({ setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  
  // State Variables
  const [username, setUsername] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 🟢 Helper: Handle Success & Redirect
  const handleSuccess = (userData) => {
    // 1. Update Global User State
    const userObj = { 
        name: userData.name || username, 
        role: userData.role, 
        username: userData.name || username 
    };
    setUser(userObj);

    // 2. Auto Navigate to Homepage
    // (If you want Admins to go to Dashboard, uncomment the check below)
    // if (userData.role === 'ADMIN' || userData.role === 'MANAGER') {
    //    navigate('/dashboard');
    // } else {
        navigate('/'); // 🟢 EVERYONE goes to Homepage now
    // }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!isLogin) {
        // --- 1. REGISTER ---
        await api.post('/auth/register', {
            username: username,
            email: email,
            password: password,
            role: "PUBLIC" 
        });

        // --- 2. AUTO-LOGIN (New Feature) ---
        // Instead of asking to login, we do it automatically!
        const loginResponse = await api.post('/auth/login', {
            username: username,
            password: password
        });
        
        handleSuccess(loginResponse.data);

      } else {
        // --- LOGIN ---
        if (username === 'admin' && password === '123') {
            handleSuccess({ name: 'Super Admin', role: 'ADMIN' });
            return;
        }

        const response = await api.post('/auth/login', {
            username: username,
            password: password
        });

        handleSuccess(response.data);
      }
    } catch (err) {
      console.error(err);
      setError(isLogin ? "Invalid Username or Password" : "Username or Email already exists");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex min-h-screen bg-gray-50'>
      
      {/* LEFT SIDE - FORM */}
      <div className='z-10 flex items-center justify-center w-full p-8 bg-white shadow-2xl md:w-1/2 lg:p-16'>
        <div className='w-full max-w-md space-y-6'>
          
          <div className='text-left'>
            <h1 className='text-4xl font-extrabold tracking-tight text-green-800'>
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className='mt-2 text-gray-500'>
              {isLogin ? 'Enter your credentials to access your account.' : 'Join the Sri Lankan Agriculture Marketplace today.'}
            </p>
          </div>

          {error && (
            <div className="p-4 text-sm text-red-700 border-l-4 border-red-500 bg-red-50 rounded-r-md animate-pulse">
              {error}
            </div>
          )}

          <form className='mt-8 space-y-5' onSubmit={handleAuth}>
            
            {/* 1. USERNAME (Always Visible) */}
            <div>
              <label className='block mb-1 text-sm font-bold text-gray-700'>Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
                  <User size={18} />
                </div>
                <input 
                  type="text" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  className='w-full py-3 pl-10 pr-4 transition-all border border-gray-300 outline-none rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent' 
                  placeholder='Enter username' 
                  required 
                />
              </div>
            </div>

            {/* 2. EMAIL (Only for Signup) */}
            {!isLogin && (
              <div className="animate-fade-in-down">
                <label className='block mb-1 text-sm font-bold text-gray-700'>Email Address</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
                    <Mail size={18} />
                    </div>
                    <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className='w-full py-3 pl-10 pr-4 transition-all border border-gray-300 outline-none rounded-xl focus:ring-2 focus:ring-green-500' 
                    placeholder='name@example.com' 
                    required 
                    />
                </div>
              </div>
            )}

            {/* 3. PASSWORD (Always Visible) */}
            <div>
              <label className='block mb-1 text-sm font-bold text-gray-700'>Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className='w-full py-3 pl-10 pr-4 transition-all border border-gray-300 outline-none rounded-xl focus:ring-2 focus:ring-green-500' 
                  placeholder='••••••••' 
                  required 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className='flex items-center justify-center w-full gap-2 px-4 py-3 font-bold text-white transition-all transform bg-green-700 shadow-lg rounded-xl hover:bg-green-800 hover:shadow-green-900/30 disabled:opacity-50 active:scale-95'
            >
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className='pt-4 text-center border-t border-gray-100'>
            <p className='text-sm text-gray-500'>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                onClick={() => { setIsLogin(!isLogin); setError(''); }} 
                className='ml-2 font-bold text-green-700 underline transition-colors hover:text-green-900'
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - IMAGE */}
      <div className='relative hidden w-1/2 bg-green-900 md:block'>
        <img src={lgImage} alt="Sri Lanka Agriculture" className='absolute inset-0 object-cover w-full h-full opacity-80 mix-blend-overlay' />
        <div className="absolute inset-0 flex flex-col justify-end p-12 text-white bg-gradient-to-t from-green-900/90 to-transparent">
            <h2 className="mb-2 text-3xl font-bold">Empowering Farmers.</h2>
            <p className="text-lg text-green-100">Join the national digital supply chain network today.</p>
            
            {/* Trust Badges */}
            <div className="flex gap-4 mt-6">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm">
                    <CheckCircle size={16} className="text-green-400" />
                    <span className="text-sm font-medium">Verified Sellers</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm">
                    <CheckCircle size={16} className="text-green-400" />
                    <span className="text-sm font-medium">Gov Approved</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;