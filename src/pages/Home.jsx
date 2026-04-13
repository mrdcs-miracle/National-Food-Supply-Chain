import React from 'react';
import increaseIcon from '../assets/increase.png';
import groupIcon from '../assets/group.png';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero3D from '../Components/Hero3D';
import { Tractor, BarChart3, Globe, Sprout, Leaf, Waves, Package } from 'lucide-react';

const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const Home = () => {

    const features = [
        {
            title: "Real-time Analytics",
            description: "Monitor stock levels, pricing, and supply chain metrics in real-time with our advanced dashboard.",
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
            iconColor: "bg-blue-600",
            link: "/agri-tech",
            icon: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
        },
        {
            title: "Smart Inventory Management",
            description: "Automated stock tracking across multiple centers with predictive alerts for low inventory.",
            image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
            iconColor: "bg-green-500",
            link: "/supply-chain",
            icon: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
        },
        {
            title: "Market Intelligence",
            description: "Access comprehensive market data, pricing trends, and seasonal forecasts.",
            image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=800",
            iconColor: "bg-purple-500",
            link: "/modern-farming",
            icon: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>,
        },
        {
            title: "Secure & Compliant",
            description: "Role-based access control ensuring compliance with national food security standards.",
            isGradient: true,
            iconColor: "bg-orange-500",
            link: "/export-quality",
            icon: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
        },
    ];

    const workFlow = [
        {
            title: "Farmers",
            description: "Report harvest data via mobile, track farm production, and access market prices in real-time.",
            emoji: <Tractor size={36} className="text-emerald-500" />, 
        },
        {
            title: "Managers",
            description: "Monitor stock levels, manage distribution centers, and make data-driven decisions with analytics.",
            emoji: <BarChart3 size={36} className="text-teal-500" />
        },
        {
            title: "Public",
            description: "View market trends, receive important alerts, and stay informed about food supply chain status.",
            emoji: <Globe size={36} className="text-blue-500" />
        }
    ];

    const impactStories = [
        {
            badge: "Farmer Success",
            badgeColor: "bg-green-100 text-green-800",
            title: "Better Market Access",
            quote: "\"With real-time pricing and mobile harvest reporting, I can now make informed decisions about when to sell my crops.\"",
            author: "- Farmer, Anuradhapura",
            image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&q=80&w=800"
        },
        {
            badge: "Efficiency Gain",
            badgeColor: "bg-blue-100 text-blue-800",
            title: "Streamlined Operations",
            quote: "\"The automated alerts and analytics have reduced our response time to supply issues by 70%. A game changer.\"",
            author: "- Manager, Colombo DEC",
            image: "https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80&w=800"
        },
        {
            badge: "Supply Security",
            badgeColor: "bg-purple-100 text-purple-800",
            title: "Reduced Waste",
            quote: "\"Predictive alerts for stock levels helped us reduce food waste by 45% and ensure continuous supply to communities.\"",
            author: "- Administrator, National Level",
            image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=800"
        }
    ];

    const capabilities = [
        {
            title: "Rice Management",
            desc: "Track paddy, samba, and nadu varieties across storage silos",
            emoji: <Sprout size={32} className="text-green-400" />
        },
        {
            title: "Vegetable Supply",
            desc: "Monitor fresh produce through DEC networks nationwide",
            emoji: <Leaf size={32} className="text-emerald-400" />
        },
        {
            title: "Salt Production",
            desc: "Manage salterns and distribution to maintain consistent supply",
            emoji: <Waves size={32} className="text-cyan-400" />
        },
        {
            title: "Sugar Distribution",
            desc: "Track warehouses and export operations efficiently",
            emoji: <Package size={32} className="text-orange-400" />
        }
    ];

    const whatsappNumber = "94770000000"; 
    const whatsappMessage = "Hello! I need help with the Lk Supply Chain platform.";

    return (
        <div className="overflow-x-hidden font-sans">
            {/* ---------------- HERO SECTION ---------------- */}
            <section className='relative flex items-center min-h-[90vh] bg-[#f8fafc] overflow-hidden'>
                <div className='absolute inset-0 bg-gradient-to-br from-teal-50 via-green-50 to-emerald-100 opacity-60'></div>
                {/* Modern subtle grids */}
                <div className='absolute inset-0 opacity-10' style={{backgroundImage: "radial-gradient(#2d9b6x 1px, transparent 1px)", backgroundSize: "32px 32px"}}></div>
                
                <div className='container relative z-10 p-5 mx-auto max-w-7xl lg:px-8'>
                    <div className='grid items-center grid-cols-1 gap-12 lg:grid-cols-2'>
                        {/* --- Left Column: Text Content --- */}
                        <motion.div 
                            initial="hidden" animate="visible" variants={fadeIn}
                            className='relative z-20 pt-16 lg:pt-0'
                        >
                            <motion.div variants={fadeIn} className='inline-flex items-center gap-2 px-4 py-1.5 mb-6 bg-white/70 backdrop-blur-md border border-white/50 rounded-full shadow-sm'>
                                <span className='w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]'></span>
                                <span className='text-xs font-bold tracking-wider text-green-900 uppercase'>Live Supply Chain</span>
                            </motion.div>

                            <motion.h1 variants={fadeIn} className='mb-6 text-5xl font-extrabold leading-tight tracking-tight text-gray-900 lg:text-7xl drop-shadow-sm'>
                                Smart Food <br/> Supply Chain <br /> 
                                <span className='text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-green-500'>Sri Lanka</span>
                            </motion.h1>

                            <motion.p variants={fadeIn} className='max-w-lg mb-8 text-lg leading-relaxed text-gray-600 lg:text-xl'>
                                Experience the future of real-time tracking for rice, vegetables, salt, and sugar. Empower farmers and communities with beautiful, data-driven insights.
                            </motion.p>
                            
                            <motion.div variants={fadeIn}>
                                <Link to="/login">
                                    <button className='flex items-center gap-2 px-8 py-3.5 font-bold text-white transition-all duration-300 transform bg-gradient-to-r from-teal-500 to-green-500 rounded-full shadow-lg hover:shadow-teal-500/50 hover:-translate-y-1 active:translate-y-0'>
                                        Login / Sign Up 
                                        <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                                    </button>
                                </Link>
                            </motion.div>

                            {/* Statistics Row */}
                            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className='grid grid-cols-3 gap-4 mt-12 lg:gap-6'>
                                {[
                                    {val: '47+', label: 'Active Centers'},
                                    {val: '125k', label: 'Stock (MT)'},
                                    {val: '24/7', label: 'Monitoring'}
                                ].map((stat, i) => (
                                    <motion.div variants={fadeIn} key={i} className='p-4 transition-all duration-300 border border-white/60 bg-white/40 backdrop-blur-md shadow-xl lg:p-6 rounded-2xl shadow-teal-900/5 hover:-translate-y-1 hover:bg-white/60'>
                                        <h1 className='text-2xl font-black text-teal-700 lg:text-4xl'>{stat.val}</h1>
                                        <p className='mt-1 text-xs font-semibold text-gray-600 uppercase tracking-widest'>{stat.label}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* --- Right Column: 3D Elements --- */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className='relative z-10 flex justify-center w-full h-[400px] lg:h-[600px] items-center'
                        >
                            {/* Interactive 3D Canvas */}
                            <Hero3D />

                            {/* Floating UI Elements */}
                            <motion.div 
                                animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className='absolute top-10 lg:top-24 left-0 p-3 bg-white/70 backdrop-blur-xl border border-white/50 shadow-2xl rounded-2xl flex items-center gap-4'
                            >
                                <div className='p-2 shadow-inner bg-gradient-to-br from-green-400 to-green-500 rounded-xl'>
                                    <img src={increaseIcon} alt="Icon" className="w-5 h-5 filter brightness-0 invert" />
                                </div>
                                <div>
                                    <p className="text-xl font-bold text-gray-900">+12.5%</p>
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Stock Growth</p>
                                </div>
                            </motion.div>

                            <motion.div 
                                animate={{ y: [0, 15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute bottom-10 lg:bottom-24 right-0 p-3 bg-white/70 backdrop-blur-xl border border-white/50 shadow-2xl rounded-2xl flex items-center gap-4"
                            >
                                <div className="p-2 shadow-inner bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl">
                                    <img src={groupIcon} alt="Icon" className="w-5 h-5 filter brightness-0 invert" />
                                </div>
                                <div>
                                    <p className="text-xl font-bold text-gray-900">5,000+</p>
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Active Users</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ---------------- FEATURES SECTION ---------------- */}
            <section className="py-24 bg-white relative">
                <div className="container mx-auto max-w-7xl px-5 lg:px-8 relative z-10">
                    <motion.div 
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}
                        className="max-w-3xl mx-auto mb-20 text-center"
                    >
                        <span className="inline-block px-4 py-2 mb-6 text-xs font-bold tracking-widest text-teal-800 uppercase bg-teal-100 rounded-full">
                            Why Choose Us
                        </span>
                        <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl tracking-tight">
                            Comprehensive Supply Solutions
                        </h2>
                        <p className="mt-6 text-xl text-gray-500">
                            Leveraging modern aesthetics and 3D data visualization for total transparency.
                        </p>
                    </motion.div>

                    <motion.div 
                        variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 gap-8 md:grid-cols-2"
                    >
                        {features.map((feature, index) => (
                            <motion.div 
                                variants={fadeIn} key={index} 
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="overflow-hidden flex flex-col transition-all duration-300 bg-white border border-gray-100 shadow-xl shadow-gray-200/50 group rounded-[2rem]"
                            >
                                <div className={`relative h-64 w-full overflow-hidden ${feature.isGradient ? 'bg-gradient-to-br from-orange-300 to-pink-400' : ''}`}>
                                    {!feature.isGradient && (
                                        <img src={feature.image} alt={feature.title} className="object-cover w-full h-full transition-transform duration-700 transform group-hover:scale-110" />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-60"></div>
                                    <div className={`absolute p-4 rounded-2xl shadow-2xl backdrop-blur-sm ${feature.iconColor} ${feature.isGradient ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 flex items-center justify-center' : 'bottom-6 left-6'}`}>
                                        {feature.icon}
                                    </div>
                                </div>
                                <div className="p-10 flex flex-col flex-grow">
                                    <h3 className="mb-4 text-2xl font-bold text-gray-900">{feature.title}</h3>
                                    <p className="mb-8 text-base leading-relaxed text-gray-600 flex-grow">{feature.description}</p>
                                    <Link to={feature.link} className="inline-flex items-center text-sm font-bold tracking-wide text-teal-600 uppercase transition-colors hover:text-teal-800">
                                        Learn more
                                        <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ---------------- WORKFLOW SECTION ---------------- */}
            <section className="py-24 bg-gradient-to-br from-teal-50 to-white relative">
                <div className='container mx-auto px-5 lg:px-8 max-w-7xl relative z-10'>
                    <motion.div 
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                        className='max-w-3xl mx-auto mb-20 text-center'
                    >
                        <h2 className='text-4xl font-extrabold text-gray-900 sm:text-5xl'>How It Works</h2>
                        <p className='mt-6 text-xl text-gray-600'>A seamless ecosystem connecting all food supply chain stakeholders.</p>
                    </motion.div>
                    <motion.div 
                        variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        className='grid grid-cols-1 gap-10 md:grid-cols-3' 
                    >
                        {workFlow.map((item, index) => (
                            <motion.div 
                                variants={fadeIn} key={index} 
                                whileHover={{ y: -10 }}
                                className='flex flex-col items-center p-10 transition-all duration-300 bg-white/60 backdrop-blur-lg border border-white scroll-shadow-2xl rounded-[2.5rem] shadow-xl shadow-teal-900/5'
                            >
                                <div className='flex items-center justify-center w-24 h-24 mb-8 text-5xl rounded-[1.5rem] bg-gradient-to-br from-teal-100 to-green-100 shadow-inner'>
                                    {item.emoji}
                                </div>
                                <h3 className='mb-4 text-2xl font-bold text-gray-800' >{item.title}</h3>
                                <p className='text-base leading-relaxed text-center text-gray-600'>{item.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ---------------- IMPACT SECTION ---------------- */}
            <section className='py-24 bg-white relative'>
                <div className='container mx-auto px-5 lg:px-8 max-w-7xl'>
                    <motion.div 
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                        className='max-w-3xl mx-auto mb-20 text-center'
                    >
                        <div className='inline-block px-4 py-2 mb-6 text-xs font-bold tracking-widest text-white uppercase bg-gray-900 rounded-full shadow-xl'>
                            Real Impact
                        </div>
                        <h2 className='text-4xl font-extrabold text-gray-900 sm:text-5xl tracking-tight'>Transforming Agriculture</h2>
                        <p className='mt-6 text-xl text-gray-600'>Voices from the field driving national progress.</p>
                    </motion.div>
                    
                    <motion.div 
                        variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        className='grid grid-cols-1 gap-10 md:grid-cols-3'
                    >
                        {impactStories.map((story, index) => (
                            <motion.div 
                                variants={fadeIn} key={index} 
                                whileHover={{ scale: 1.03 }}
                                className='overflow-hidden bg-white border border-gray-100 shadow-2xl shadow-gray-200/60 rounded-[2rem] group'
                            >
                                <div className='relative h-56 overflow-hidden'>
                                    <img src={story.image} alt={story.title} className='object-cover w-full h-full transition-transform duration-700 group-hover:scale-110' />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                                </div>
                                <div className='p-8 relative'>
                                    <div className={`absolute -top-6 left-8 px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg border border-white ${story.badgeColor}`}>
                                        {story.badge}
                                    </div>
                                    <h3 className='mt-2 mb-4 text-xl font-bold text-gray-900'>{story.title}</h3>
                                    <p className='mb-6 text-lg italic font-medium text-gray-600'>"{story.quote}"</p>
                                    <p className='text-sm font-bold tracking-wider text-teal-600 uppercase'>{story.author}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ---------------- CAPABILITIES SECTION ---------------- */}
            <section className='py-24 bg-gradient-to-t from-gray-50 to-white'>
                <div className='container mx-auto px-5 lg:px-8 max-w-7xl'>
                    <div className='bg-gray-900 rounded-[3rem] shadow-2xl p-10 md:p-20 relative overflow-hidden'>
                        {/* Decorative background shapes */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
                        
                        <div className='max-w-3xl mx-auto mb-16 text-center relative z-10'>
                            <h2 className='mb-6 text-4xl font-extrabold text-white sm:text-5xl'>Platform Capabilities</h2>
                            <p className='text-xl text-gray-300'>Unleashing next-generation logistics for the nation</p>
                        </div>
                        
                        <div className='grid max-w-5xl grid-cols-1 gap-6 mx-auto md:grid-cols-2 relative z-10'>
                            {capabilities.map((item, index) => (
                                <motion.div 
                                    whileHover={{ scale: 1.02 }}
                                    key={index} 
                                    className='flex items-start p-8 transition-all duration-300 bg-white/10 backdrop-blur-md border border-white/10 rounded-[2rem] hover:bg-white/20'
                                >
                                    <div className='flex items-center justify-center flex-shrink-0 w-16 h-16 mr-6 text-4xl bg-white/20 rounded-2xl'>
                                        {item.emoji}
                                    </div>
                                    <div>
                                        <h3 className='mb-2 text-xl font-bold text-white'>{item.title}</h3>
                                        <p className='text-gray-300'>{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 🟢 FLOATING WHATSAPP BUTTON */}
            <a 
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed z-50 flex items-center justify-center transition-all duration-300 transform shadow-2xl bottom-8 right-8 w-16 h-16 bg-[#25D366] hover:bg-[#20bd5a] rounded-full hover:scale-110 hover:-translate-y-2 group shadow-[#25D366]/40"
                aria-label="Chat with us on WhatsApp"
            >
                <span className="absolute px-4 py-2 mb-3 text-xs font-bold tracking-wider text-white uppercase transition-opacity duration-300 transform -translate-x-1/2 bg-gray-900 rounded-xl opacity-0 pointer-events-none -top-12 left-1/2 group-hover:opacity-100 whitespace-nowrap shadow-xl">
                    Chat with Us
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="white">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
            </a>
        </div>
    )
}

export default Home;