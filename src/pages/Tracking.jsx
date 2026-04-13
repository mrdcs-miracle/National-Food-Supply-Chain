import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Truck, CheckCircle, Package } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Tracking = () => {
  const location = useLocation();
  const [trackingId, setTrackingId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [trackingData, setTrackingData] = useState(null);

  const fetchTracking = (id) => {
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
      setTrackingData({
        id: id.toUpperCase(),
        status: 'Processed', // Just started shipping
        origin: 'Colombo Processing Center',
        destination: 'Your Delivery Address',
        eta: 'Oct 26, 4:00 PM',
        currentStep: 1, // At 'Processed' step
        history: [
          { time: 'Oct 24, 08:00 AM', event: 'Order Confirmed & Paid', location: 'Sri Lanka Supply Logistics' },
          { time: 'Oct 24, 10:30 AM', event: 'Package Processed', location: 'Colombo Processing Center' }
        ]
      });
    }, 1500);
  };

  useEffect(() => {
    // If we land here from Cart, auto-load the tracking ID!
    const queryParams = new URLSearchParams(location.search);
    const idFromUrl = queryParams.get('id');
    if (idFromUrl) {
        setTrackingId(idFromUrl);
        fetchTracking(idFromUrl);
    }
  }, [location.search]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!trackingId.trim()) return;
    fetchTracking(trackingId);
  };

  const steps = [
    { label: 'Harvested', icon: <Package size={24} /> },
    { label: 'Processed', icon: <CheckCircle size={24} /> },
    { label: 'In Transit', icon: <Truck size={24} /> },
    { label: 'Delivered', icon: <MapPin size={24} /> }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans pb-24">
      {/* 🟢 Search Header */}
      <div className="pt-24 pb-16 bg-gray-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20 pointer-events-none"></div>
        <div className="container px-4 mx-auto max-w-4xl relative z-10 text-center">
            <h1 className="text-4xl font-black text-white md:text-5xl tracking-tight mb-4">Track Your Shipment</h1>
            <p className="text-gray-400 text-lg mb-10">Real-time supply chain transparency at your fingertips.</p>
            
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto bg-white p-3 rounded-2xl flex items-center shadow-2xl focus-within:ring-4 focus-within:ring-teal-500/30 transition-all">
                <Search className="text-gray-400 ml-3" size={24} />
                <input 
                    type="text" 
                    placeholder="Enter Tracking ID (e.g. LK-9231-R)" 
                    className="flex-1 px-4 py-3 outline-none text-gray-800 text-lg font-medium"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                />
                <button type="submit" disabled={isSearching} className="bg-gradient-to-r from-teal-500 to-green-500 text-white px-8 py-3.5 rounded-xl font-bold uppercase tracking-wider hover:shadow-lg hover:-translate-y-0.5 transition-all w-40 flex items-center justify-center">
                    {isSearching ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Track Now'}
                </button>
            </form>
        </div>
      </div>

      {/* 🟢 Results Area */}
      <div className="container px-4 mx-auto max-w-4xl -mt-8 relative z-20">
        {!trackingData && !isSearching && (
            <div className="bg-white p-12 rounded-3xl shadow-xl text-center border border-gray-100 flex flex-col items-center">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <Truck size={40} className="text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No active shipment selected</h3>
                <p className="text-gray-500 max-w-sm">Enter your supply tracking ID above to see real-time logistics data, ETA, and history.</p>
            </div>
        )}

        {isSearching && (
            <div className="bg-white/80 backdrop-blur-md p-16 rounded-3xl shadow-xl text-center border border-gray-100">
                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="w-12 h-12 border-4 border-teal-100 border-t-teal-500 rounded-full animate-spin"></div>
                    <p className="text-teal-600 font-bold animate-pulse tracking-widest uppercase text-sm">Locating Cargo...</p>
                </div>
            </div>
        )}

        {trackingData && !isSearching && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                
                {/* Status Card */}
                <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Tracking ID</p>
                            <h2 className="text-2xl font-black text-gray-900">{trackingData.id}</h2>
                        </div>
                        <div className="text-left md:text-right">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Estimated Arrival</p>
                            <h2 className="text-2xl font-black text-teal-600">{trackingData.eta}</h2>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative mb-16">
                        <div className="absolute top-1/2 left-0 w-full h-1.5 bg-gray-100 -translate-y-1/2 rounded-full"></div>
                        <div className="absolute top-1/2 left-0 h-1.5 bg-gradient-to-r from-teal-400 to-green-500 -translate-y-1/2 rounded-full transition-all duration-1000" style={{ width: `${(trackingData.currentStep / (steps.length - 1)) * 100}%` }}></div>
                        
                        <div className="relative flex justify-between">
                            {steps.map((step, index) => {
                                const isCompleted = index <= trackingData.currentStep;
                                const isCurrent = index === trackingData.currentStep;
                                return (
                                    <div key={index} className="flex flex-col items-center">
                                        <div className={`w-14 h-14 rounded-full flex items-center justify-center relative z-10 transition-colors duration-500 ${isCompleted ? 'bg-gradient-to-br from-teal-500 to-green-500 text-white shadow-lg' : 'bg-gray-100 text-gray-400 border-[3px] border-white'}`}>
                                            {isCurrent && <span className="absolute inset-0 border-4 border-green-200 rounded-full animate-ping opacity-75"></span>}
                                            {step.icon}
                                        </div>
                                        <p className={`mt-4 text-xs md:text-sm font-bold uppercase tracking-wider ${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>{step.label}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Shipment Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                        <div className="flex gap-4 items-start">
                            <div className="p-3 bg-white rounded-xl shadow-sm"><Package className="text-teal-500"/></div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Origin</p>
                                <p className="font-bold text-gray-900">{trackingData.origin}</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div className="p-3 bg-white rounded-xl shadow-sm"><MapPin className="text-green-500"/></div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Destination</p>
                                <p className="font-bold text-gray-900">{trackingData.destination}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* History Timeline */}
                <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-8 border-b pb-4">Travel History</h3>
                    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                        {trackingData.history.map((event, index) => (
                            <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-teal-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                    <ViewIcon />
                                </div>
                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-100 bg-gray-50 shadow-sm ml-4 md:ml-0 group-hover:shadow-md transition-all">
                                    <div className="flex items-center justify-between mb-1">
                                        <p className="font-bold text-gray-900">{event.event}</p>
                                    </div>
                                    <p className="text-sm text-gray-500 font-medium">{event.location}</p>
                                    <p className="text-xs text-gray-400 mt-2 font-semibold flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>{event.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </motion.div>
        )}
      </div>
    </div>
  );
};

const ViewIcon = () => (
    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
)

export default Tracking;
