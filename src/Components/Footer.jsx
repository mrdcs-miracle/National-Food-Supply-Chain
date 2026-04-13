import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="relative pt-24 pb-12 overflow-hidden text-white bg-gray-950">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500 rounded-full mix-blend-screen filter blur-[100px] opacity-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-green-600 rounded-full mix-blend-screen filter blur-[100px] opacity-10"></div>

      <div className="container relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        
        {/* Top Section: Grid */}
        <div className="grid grid-cols-1 gap-12 mb-20 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Column 1: Brand */}
          <div className="space-y-6">
            <Link to="/">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-400 to-green-500 shadow-lg shadow-green-500/30">
                        <span className="text-2xl text-white">🌱</span>
                    </div>
                    <div className="text-3xl font-extrabold tracking-tight text-white">
                        Lk Supply
                    </div>
                </div>
            </Link>
            <p className="text-sm leading-loose text-gray-400">
              Empowering Sri Lanka's agriculture with cutting-edge technology, total transparency, and unwavering trust. Connecting farmers to the nation, real-time.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="mb-6 text-xl font-bold text-white tracking-wide">Quick Links</h4>
            <ul className="space-y-4 text-sm font-medium text-gray-400">
              <li><Link to="/" className="transition-colors hover:text-teal-400">Home</Link></li>
              <li><Link to="/about" className="transition-colors hover:text-teal-400">About Us</Link></li>
              <li><Link to="/marketplace" className="transition-colors hover:text-teal-400">Marketplace</Link></li>
              <li><Link to="/contact" className="transition-colors hover:text-teal-400">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h4 className="mb-6 text-xl font-bold text-white tracking-wide">Legal</h4>
            <ul className="space-y-4 text-sm font-medium text-gray-400">
              <li><Link to="/privacy" className="transition-colors hover:text-teal-400">Privacy Policy</Link></li>
              <li><Link to="/terms" className="transition-colors hover:text-teal-400">Terms of Service</Link></li>
              <li><a href="#" className="transition-colors hover:text-teal-400">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Column 4: Subscribe */}
          <div>
            <h4 className="mb-6 text-xl font-bold text-white tracking-wide">Stay Updates</h4>
            <p className="mb-6 text-sm leading-relaxed text-gray-400">Get the latest market trends and supply alerts straight to your inbox.</p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 text-white placeholder-gray-500 transition-all bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white/10"
                  required
                />
              </div>
              <button 
                type="submit" 
                className={`w-full px-5 py-4 font-bold rounded-xl transition-all duration-300 transform active:scale-95 shadow-lg
                  ${subscribed 
                    ? 'bg-gradient-to-r from-teal-600 to-green-600 text-white cursor-default shadow-green-900/50' 
                    : 'bg-white text-gray-900 hover:bg-gray-100 hover:shadow-white/20'}`}
              >
                {subscribed ? '✅ Subscribed!' : 'Subscribe Now'}
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-6 pt-10 border-t border-white/10 md:flex-row">
          <p className="text-sm font-medium text-center text-gray-500 md:text-left">
            © {new Date().getFullYear()} Lk Supply Chain. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Facebook', 'Twitter', 'LinkedIn', 'Instagram'].map((social) => (
              <a key={social} href="#" className="text-sm font-bold tracking-wider text-gray-500 transition-colors uppercase hover:text-teal-400">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;