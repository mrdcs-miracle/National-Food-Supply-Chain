import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, MessageSquare, Send, Activity, Settings2, BellOff, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Alerts = ({ stocks = [], addActivity, user }) => {
  const [message, setMessage] = useState('');
  const [targetGroup, setTargetGroup] = useState('farmers');
  const [urgency, setUrgency] = useState('normal');
  const [sending, setSending] = useState(false);

  // Check Admin Status
  const isAdmin = user && user.role === 'Administrator';

  const stockAlerts = stocks
    .filter(stock => stock.status === 'Critical' || stock.status === 'Low')
    .map(stock => ({
        id: `stock-${stock.id}`,
        type: stock.status === 'Critical' ? 'critical' : 'warning',
        title: `${stock.status} Stock Alert: ${stock.item || stock.itemName || 'Unknown Item'}`,
        desc: `${stock.location || 'Unknown'} storage center is reporting down to ${stock.quantity || stock.qty || 0}kg. Immediate action required to restock.`,
        time: 'Just now',
        status: stock.status
    }));

  const handleSendSMS = (e) => {
    e.preventDefault();
    if (!message) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      if (addActivity) {
          addActivity("SMS Broadcast", `Sent to ${targetGroup} with ${urgency} priority.`, "Success");
      }
      setMessage('');
      alert(`Success! SMS broadcast delivered to ${targetGroup}.`);
    }, 2000);
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 animate-fade-in pb-10">
        
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
            <div>
                <h1 className="text-3xl font-black tracking-tight text-gray-900">Alert Center</h1>
                <p className="mt-2 text-sm font-medium text-gray-500">Monitor system irregularities and broadcast critical notifications.</p>
            </div>
            <div className="flex items-center gap-4">
                <div className="px-5 py-2.5 font-bold text-teal-700 bg-teal-50 border border-teal-100 rounded-xl shadow-sm flex items-center gap-2 text-sm">
                    <ShieldCheck size={18} className="text-teal-600"/> System Secure
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-3 xl:gap-12">
           {/* LEFT COLUMN: ACTIVE ALERTS */}
           <div className="xl:col-span-2 space-y-6">
              
              <div className="flex items-center justify-between mb-2">
                 <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800">
                    <Activity size={20} className="text-gray-400" /> Live Feed
                 </h2>
                 <span className="text-xs font-bold px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg">{stockAlerts.length} Active</span>
              </div>

              {stockAlerts.length > 0 ? (
                  <div className="space-y-4">
                      <AnimatePresence>
                         {stockAlerts.map((alert, idx) => (
                             <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                key={alert.id} 
                                className={`relative p-6 overflow-hidden transition-all bg-white border shadow-sm rounded-3xl group hover:shadow-md ${alert.type === 'critical' ? 'border-red-100 hover:border-red-200' : 'border-orange-100 hover:border-orange-200'}`}
                             >
                                 <div className={`absolute top-0 left-0 w-1.5 h-full ${alert.type === 'critical' ? 'bg-red-500' : 'bg-orange-500'}`}></div>
                                 <div className="flex flex-col sm:flex-row items-start justify-between gap-4 ml-2">
                                     <div className="flex gap-4">
                                         <div className={`p-3 rounded-2xl flex-shrink-0 ${alert.type === 'critical' ? 'bg-red-50 text-red-500' : 'bg-orange-50 text-orange-500'}`}>
                                             <AlertTriangle fill="currentColor" className="fill-current opacity-20" size={24} />
                                         </div>
                                         <div>
                                             <h3 className="text-lg font-bold text-gray-900 leading-tight">{alert.title}</h3>
                                             <p className="mt-1 text-sm font-medium text-gray-600 leading-relaxed max-w-xl">{alert.desc}</p>
                                         </div>
                                     </div>
                                     <div className="flex flex-row sm:flex-col items-center sm:items-end w-full sm:w-auto justify-between sm:justify-start gap-3 flex-shrink-0 mt-4 sm:mt-0">
                                         <span className="text-xs font-bold text-gray-400">{alert.time}</span>
                                         <button className={`text-xs font-bold px-4 py-2 rounded-xl transition-colors ${alert.type === 'critical' ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-orange-50 text-orange-600 hover:bg-orange-100'}`}>
                                            Resolve Alert
                                         </button>
                                     </div>
                                 </div>
                             </motion.div>
                         ))}
                      </AnimatePresence>
                  </div>
              ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center p-12 text-center transition-all bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] min-h-[400px]"
                  >
                     <div className="relative mb-6 group cursor-default">
                         <div className="absolute inset-0 bg-teal-100 rounded-full blur-2xl opacity-50 animate-pulse group-hover:scale-125 transition-transform duration-500"></div>
                         <div className="relative flex items-center justify-center w-28 h-28 bg-teal-50 rounded-full shadow-inner shadow-teal-100/50">
                             <ShieldCheck size={56} className="text-teal-500" />
                         </div>
                     </div>
                     <h3 className="text-2xl font-black text-gray-800">All Systems Nominal</h3>
                     <p className="max-w-md mt-3 text-sm font-medium text-gray-500 leading-relaxed">There are currently no critical or low stock alerts across the distribution network. Keep up the great work.</p>
                     
                     <div className="flex gap-4 mt-10">
                         <div className="px-6 py-5 border border-gray-100 bg-gray-50 rounded-3xl text-left min-w-[150px] shadow-sm">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Network Uptime</p>
                            <p className="text-2xl font-black text-gray-900 tracking-tight">99.9%</p>
                         </div>
                         <div className="px-6 py-5 border border-gray-100 bg-gray-50 rounded-3xl text-left min-w-[150px] shadow-sm">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Resolved Today</p>
                            <p className="text-2xl font-black text-gray-900 tracking-tight">24<span className="text-sm font-medium text-gray-400 ml-1">alerts</span></p>
                         </div>
                     </div>
                  </motion.div>
              )}
           </div>

           {/* RIGHT COLUMN: SMS BROADCAST */}
           <div className="space-y-6">
              
              <div className="flex items-center justify-between mb-2">
                 <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800">
                    <MessageSquare size={20} className="text-gray-400" /> Broadcast System
                 </h2>
              </div>

              {isAdmin ? (
                  <div className="relative overflow-hidden bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-[2.5rem]">
                     <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full mix-blend-multiply blur-3xl pointer-events-none"></div>
                     
                     <div className="p-8">
                         <div className="mb-8">
                            <h3 className="text-xl font-black tracking-tight text-gray-900">Emergency SMS</h3>
                            <p className="text-xs font-medium text-gray-500 mt-2 leading-relaxed">Send mass notifications directly to the mobile devices of connected network personnel.</p>
                         </div>

                         <form onSubmit={handleSendSMS} className="space-y-6 relative z-10">
                            <div>
                                <label className="block mb-2.5 text-[11px] font-bold tracking-widest text-gray-400 uppercase">Target Audience</label>
                                <div className="relative">
                                    <select value={targetGroup} onChange={(e) => setTargetGroup(e.target.value)} className="w-full px-5 py-4 text-sm font-bold text-gray-800 transition-colors bg-gray-50 border border-gray-100 rounded-2xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 hover:bg-gray-100/50 cursor-pointer">
                                        <option value="farmers">🌾 Registered Farmers</option>
                                        <option value="distributors">🚚 Logistics & Distributors</option>
                                        <option value="public">👥 General Public</option>
                                        <option value="managers">👨‍💼 Center Managers</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-gray-400">
                                        <Settings2 size={18} />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block mb-2.5 text-[11px] font-bold tracking-widest text-gray-400 uppercase">Priority Level</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button type="button" onClick={() => setUrgency('normal')} className={`py-3.5 text-sm font-bold rounded-2xl border transition-all ${urgency === 'normal' ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm' : 'bg-white border-gray-100 text-gray-500 hover:bg-gray-50'}`}>Normal</button>
                                    <button type="button" onClick={() => setUrgency('critical')} className={`py-3.5 text-sm font-bold rounded-2xl border transition-all ${urgency === 'critical' ? 'bg-red-50 border-red-200 text-red-700 shadow-sm' : 'bg-white border-gray-100 text-gray-500 hover:bg-gray-50'}`}>Critical</button>
                                </div>
                            </div>

                            <div>
                                <label className="block mb-2.5 text-[11px] font-bold tracking-widest text-gray-400 uppercase">Message Content</label>
                                <textarea 
                                  value={message} 
                                  onChange={(e) => setMessage(e.target.value)} 
                                  placeholder="Type your alert message here..."
                                  className="w-full p-5 text-sm font-medium text-gray-800 transition-colors border border-gray-200 bg-white rounded-2xl min-h-[140px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none placeholder:text-gray-400" 
                                  required
                                ></textarea>
                                <div className="flex justify-between mt-3 px-1">
                                    <span className="text-[10px] font-bold text-gray-400">{message.length}/160 chars</span>
                                    <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded-md">1 SMS Credit</span>
                                </div>
                            </div>

                            <button type="submit" disabled={sending || !message} className="relative flex items-center justify-center w-full gap-2 py-4.5 mt-4 overflow-hidden font-black text-white transition-all bg-gray-900 rounded-2xl group hover:shadow-xl hover:shadow-gray-900/20 disabled:opacity-50 disabled:cursor-not-allowed">
                                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></span>
                                {sending ? (
                                   <span className="flex items-center gap-2"><ArrowRight size={18} className="animate-spin" /> Broadcasting...</span>
                                ) : (
                                   <span className="flex items-center gap-2">Send Broadcast <Send size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></span>
                                )}
                            </button>
                         </form>
                     </div>
                  </div>
              ) : (
                  <div className="flex flex-col items-center justify-center p-10 mt-8 text-center transition-all bg-white border border-gray-100 shadow-sm rounded-[2.5rem] min-h-[300px]">
                      <div className="p-5 mb-5 bg-gray-50 rounded-full border border-gray-100">
                          <BellOff size={36} className="text-gray-400" />
                      </div>
                      <h3 className="text-xl font-black text-gray-800 mb-2">Restricted Access</h3>
                      <p className="text-sm font-medium text-gray-500 leading-relaxed max-w-[200px] mx-auto">Broadcasting is only available to System Administrators.</p>
                      <button className="mt-8 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-5 py-2.5 rounded-xl transition-colors">
                          Request Permission
                      </button>
                  </div>
              )}
           </div>
        </div>
    </div>
  );
};

export default Alerts;