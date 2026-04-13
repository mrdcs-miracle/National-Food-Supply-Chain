import React from 'react';
import { motion } from 'framer-motion';
import stockIcon from '../assets/stock.avif';

const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };

const Services = () => {
    const services = [
        {
            title: "Real-Time Stock Management",
            desc: "Track inventory levels across multiple distribution centers with automated updates from HARTI, DEC APIs, and manual inputs.",
            features: ["Live stock levels", "Automated data feeds", "Multi-center tracking", "Quality monitoring"],
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>,
            color: "bg-gradient-to-br from-blue-400 to-blue-600"
        },
        {
            title: "Market Price Intelligence",
            desc: "Access comprehensive pricing data and trends for rice, vegetables, salt, and sugar across all districts.",
            features: ["Real-time pricing", "Historical trends", "Price forecasting", "Market comparisons"],
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
            color: "bg-gradient-to-br from-emerald-400 to-green-600"
        },
        {
            title: "Smart Alert System",
            desc: "Receive instant notifications for low stock, price changes, quality issues, and seasonal events.",
            features: ["Custom alerts", "Priority notifications", "SMS/Email delivery", "Role-based filtering"],
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
            color: "bg-gradient-to-br from-orange-400 to-red-500"
        },
        {
            title: "Geographic Mapping",
            desc: "Visualize supply chain data with interactive maps showing center locations, stock distribution, and regional trends.",
            features: ["District-level data", "Center mapping", "Route optimization", "Regional analytics"],
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
            color: "bg-gradient-to-br from-indigo-400 to-purple-600"
        },
        {
            title: "Mobile Farm Management",
            desc: "Enable farmers to report harvest data, track farm production, and access market information directly from their mobile devices.",
            features: ["Harvest reporting", "Farm tracking", "Market access", "Simple interface"],
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
            color: "bg-gradient-to-br from-teal-400 to-emerald-500"
        },
        {
            title: "Comprehensive Reports",
            desc: "Generate detailed reports on stock movements, price trends, seasonal performance, and supply chain efficiency.",
            features: ["Custom reports", "Export options", "Analytics dashboard", "Scheduled reports"],
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
            color: "bg-gradient-to-br from-cyan-400 to-blue-500"
        },
        {
            title: "Role-Based Access Control",
            desc: "Secure platform with different access levels for public users, farmers, managers, and administrators.",
            features: ["4 user roles", "Custom permissions", "Data security", "Audit trails"],
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
            color: "bg-gradient-to-br from-orange-300 to-amber-500"
        },
        {
            title: "IoT Integration",
            desc: "Optional integration with IoT sensors for automated temperature, humidity, and weight monitoring in warehouses.",
            features: ["Sensor integration", "Automated monitoring", "Quality control", "Predictive maintenance"],
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" /></svg>,
            color: "bg-gradient-to-br from-violet-400 to-purple-600"
        }
    ];

    const productsTrack = [
        { title: "Rice", desc: "PMB & Distribution Network", emoji: "🌾", color: "from-yellow-100 to-amber-100", iconColor: "text-amber-600" },
        { title: "Vegetables", desc: "DEC Economic Centers", emoji: "🥬", color: "from-green-100 to-emerald-100", iconColor: "text-emerald-600" },
        { title: "Salt", desc: "Coastal Production Sites", emoji: "🧂", color: "from-cyan-100 to-blue-100", iconColor: "text-blue-600" },
        { title: "Sugar", desc: "Mills & Import Tracking", emoji: "🏗️", color: "from-orange-100 to-red-100", iconColor: "text-red-600" }
    ];

    const whatsappNumber = "94770000000"; 
    const whatsappMessage = "Hello! I need help with the Lk Supply Chain platform.";

    return (
        <div className="overflow-x-hidden font-sans bg-[#f8fafc]">
            {/* --- HERO SECTION --- */}
            <section className='relative min-h-[70vh] py-24 bg-[#f8fafc] overflow-hidden flex items-center'>
                <div className='absolute inset-0 bg-gradient-to-br from-teal-50 via-green-50 to-emerald-100 opacity-60'></div>
                <div className='absolute inset-0 opacity-10' style={{backgroundImage: "radial-gradient(#2d9b6x 1px, transparent 1px)", backgroundSize: "32px 32px"}}></div>
                
                <div className='container relative z-10 px-5 mx-auto max-w-7xl lg:px-8 mt-12'>
                    <motion.div initial="hidden" animate="visible" variants={fadeIn} className='max-w-3xl mx-auto text-center'>
                        <motion.div variants={fadeIn} className='inline-flex items-center gap-2 px-4 py-1.5 mb-6 bg-white/70 backdrop-blur-md border border-white/50 rounded-full shadow-sm'>
                            <span className='text-xs font-bold tracking-wider text-green-900 uppercase'>Our Services</span>
                        </motion.div>
                        <motion.h2 variants={fadeIn} className='mb-6 text-5xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-6xl drop-shadow-sm'>
                            Comprehensive Solutions for <br />
                            <span className='text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-green-500'>Supply Chain Excellence</span>
                        </motion.h2>
                        <motion.p variants={fadeIn} className='max-w-2xl mx-auto text-lg leading-relaxed text-gray-600 lg:text-xl'>
                            End-to-end digital solutions covering every aspect of food supply chain management, from farm to distribution center.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* --- INTEGRATED PLATFORM CARD --- */}
            <section className="-mt-16 relative z-20">
                <div className='container px-5 mx-auto max-w-7xl lg:px-8'>
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className='overflow-hidden bg-white/70 backdrop-blur-xl border border-white/60 shadow-2xl rounded-[3rem]'>
                        <div className='grid grid-cols-1 lg:grid-cols-2'>
                            <div className='relative h-80 lg:h-auto overflow-hidden group'>
                                <img src={stockIcon} className='object-cover w-full h-full transition-transform duration-700 group-hover:scale-105' alt="Platform Dashboard"/>
                                <div className='absolute inset-0 bg-gradient-to-r from-teal-900/40 to-transparent'></div>
                            </div>

                            <div className='flex flex-col justify-center p-10 lg:p-16'>
                                <h3 className='mb-6 text-3xl font-extrabold text-gray-900'>The Integrated Platform</h3>
                                <p className='mb-8 text-lg leading-relaxed text-gray-600'>
                                    Our unified architecture brings together multiple data sources, diverse stakeholders, and complex functionalities into one seamless, elegant experience. Powered by real-time sync.
                                </p>
                                <div className='space-y-4'>
                                    {['Multiple data source integration', 'Automated & manual data entry', 'Real-time synchronization'].map((feat, i) => (
                                        <div key={i} className='flex items-center gap-4'>
                                            <span className='flex items-center justify-center flex-shrink-0 w-8 h-8 text-white bg-gradient-to-br from-teal-400 to-green-500 rounded-full shadow-md'>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                                            </span>
                                            <span className='text-base font-bold text-gray-800'>{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- CORE SERVICES GRID --- */}
            <section className="py-32">
                <div className="container px-5 mx-auto max-w-7xl lg:px-8">
                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2'>
                        {services.map((service, index) => (
                            <motion.div variants={fadeIn} key={index} className='p-10 transition-all duration-300 bg-white border border-gray-100 shadow-xl shadow-gray-200/50 hover:-translate-y-2 hover:shadow-2xl rounded-[2.5rem] group relative overflow-hidden'>
                                {/* Abstract Background shape */}
                                <div className={`absolute top-0 right-0 w-32 h-32 opacity-10 rounded-full blur-2xl -mr-10 -mt-10 ${service.color}`}></div>
                                
                                <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    {service.icon}
                                </div>
                                <h3 className='mb-4 text-2xl font-bold text-gray-900'>{service.title}</h3>
                                <p className='mb-8 text-base leading-relaxed text-gray-600'>
                                    {service.desc}
                                </p>
                                <ul className='space-y-3 pt-6 border-t border-gray-50'>
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className='flex items-center gap-3 text-sm font-bold text-gray-700'>
                                            <span className={`w-2 h-2 rounded-full ${service.color}`}></span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
            
            {/* --- COMMODITIES SECTION --- */}
            <section className='py-32 bg-gray-900 relative overflow-hidden'>
                <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500 rounded-full mix-blend-screen filter blur-3xl opacity-10"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500 rounded-full mix-blend-screen filter blur-3xl opacity-10"></div>
                
                <div className='container mx-auto max-w-7xl px-5 lg:px-8 relative z-10'>
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className='max-w-3xl mx-auto text-center mb-20'>
                        <h2 className='mb-6 text-4xl font-extrabold text-white sm:text-5xl'>Commodities We Track</h2>
                        <p className='text-xl text-gray-400'>Comprehensive real-time coverage of essential national resources</p>
                    </motion.div>

                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
                        {productsTrack.map((product, index) => (
                            <motion.div variants={fadeIn} key={index} whileHover={{ y: -10 }} className='flex flex-col items-center p-10 bg-white/10 backdrop-blur-md border border-white/10 shadow-2xl rounded-[2.5rem] hover:bg-white/20 transition-all text-center'>
                                <div className={`flex items-center justify-center w-20 h-20 mb-8 text-4xl rounded-3xl bg-gradient-to-br ${product.color} shadow-inner`}>{product.emoji}</div>
                                <h3 className='mb-3 text-2xl font-bold text-white'>{product.title}</h3>
                                <p className='text-sm leading-relaxed text-gray-400 font-medium'>{product.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`} target="_blank" rel="noopener noreferrer" className="fixed z-50 flex items-center justify-center transition-all duration-300 transform shadow-2xl bottom-8 right-8 w-16 h-16 bg-[#25D366] hover:bg-[#20bd5a] rounded-full hover:scale-110 hover:-translate-y-2 group shadow-[#25D366]/40" aria-label="Chat with us on WhatsApp">
                <span className="absolute px-4 py-2 mb-3 text-xs font-bold tracking-wider text-white uppercase transition-opacity duration-300 transform -translate-x-1/2 bg-gray-900 rounded-xl opacity-0 pointer-events-none -top-12 left-1/2 group-hover:opacity-100 whitespace-nowrap shadow-xl">Chat with Us</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="white"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
            </a>
        </div>
    )
}

export default Services;
