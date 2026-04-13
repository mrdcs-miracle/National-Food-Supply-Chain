import React from 'react';
import { motion } from 'framer-motion';

const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };

const About = () => {

    const aboutCards = [
        {
           title: "Our Mission",
           desc:"To create a transparent, efficient, and resilient food supply chain management system that empowers farmers, supports decision-makers, and ensures food security for all Sri Lankans through innovative technology and real-time data insights.",
           iconColor: "text-teal-600",
           bgColor: "bg-teal-100", 
           borderColor: "border-teal-100",
           iconPath: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        },
        {
            title: "Our Vision",
            desc: "To become the leading digital platform for agricultural supply chain management in South Asia, setting new standards for transparency, efficiency, and sustainability while supporting local communities and national food security goals.",
            iconColor: "text-emerald-600",
            bgColor: "bg-emerald-100",
            borderColor: "border-emerald-100",
            iconPath: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        }
    ];

    const workFlow = [
        {
            title: "Transparency",
            description: "Open access to data and insights that promote accountability across the entire supply chain.",
            emoji: "👨‍🌾", 
        },
        {
            title: "Collaboration",
            description: "Bringing together farmers, managers, and administrators in a unified platform.",
            emoji: "📊" 
        },
        {
            title: "Innovation",
            description: "Leveraging cutting-edge technology to solve complex supply chain challenges.",
            emoji: "🌍" 
        }
    ];

    const impactStats = [
        { number: "50+", label: "Distribution Centers", sub: "Across all districts" },
        { number: "5,000+", label: "Active Users", sub: "Farmers & managers" },
        { number: "100K+", label: "Metric Tons", sub: "Tracked annually" },
        { number: "24/7", label: "Monitoring", sub: "Real-time tracking" }
    ];

    const whatsappNumber = "94770000000"; 
    const whatsappMessage = "Hello! I need help with the Lk Supply Chain platform.";

  return (
    <div className="overflow-x-hidden font-sans bg-[#f8fafc]">
        {/* --- SECTION 1: Intro & Mission/Vision --- */}
        <section className='relative min-h-[85vh] py-24 bg-[#f8fafc] overflow-hidden flex items-center'>
            <div className='absolute inset-0 bg-gradient-to-br from-teal-50 via-green-50 to-emerald-100 opacity-60'></div>
            <div className='absolute inset-0 opacity-10' style={{backgroundImage: "radial-gradient(#2d9b6x 1px, transparent 1px)", backgroundSize: "32px 32px"}}></div>
            
            <div className='container relative z-10 px-5 mx-auto max-w-7xl lg:px-8 mt-12'>
                <motion.div initial="hidden" animate="visible" variants={fadeIn} className='max-w-3xl mx-auto mb-20 text-center'>
                    <motion.div variants={fadeIn} className='inline-flex items-center gap-2 px-4 py-1.5 mb-6 bg-white/70 backdrop-blur-md border border-white/50 rounded-full shadow-sm'>
                        <span className='text-xs font-bold tracking-wider text-green-900 uppercase'>About Us</span>
                    </motion.div>
                    <motion.h2 variants={fadeIn} className='mb-6 text-5xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-6xl drop-shadow-sm'>
                        Revolutionizing Sri Lanka's <br />
                        <span className='text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-green-500'>Food Supply Chain</span>
                    </motion.h2>
                    <motion.p variants={fadeIn} className='max-w-xl mx-auto text-lg leading-relaxed text-gray-600 lg:text-xl'>
                        We're building a comprehensive digital infrastructure to ensure food security, transparency, and efficiency across Sri Lanka's agricultural ecosystem.
                    </motion.p>
                </motion.div>

                <motion.div initial="hidden" animate="visible" variants={staggerContainer} className='max-w-5xl mx-auto'>
                    <div className='grid grid-cols-1 gap-8 mb-16 md:grid-cols-2'>
                        {aboutCards.map((card, index) => (
                            <motion.div variants={fadeIn} key={index} className='p-10 transition-all duration-300 bg-white/60 backdrop-blur-xl border border-white/60 shadow-xl shadow-teal-900/5 hover:-translate-y-2 rounded-[2.5rem] group'>
                                <div className={`w-16 h-16 ${card.bgColor} rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${card.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        {card.iconPath}
                                    </svg>
                                </div>
                                <h3 className='mb-4 text-2xl font-bold text-gray-900'>{card.title}</h3>
                                <p className='text-base leading-relaxed text-gray-600'>{card.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div variants={fadeIn} className='overflow-hidden bg-white/40 backdrop-blur-xl border border-white/60 shadow-xl shadow-teal-900/5 rounded-[2.5rem] group'>
                        <div className='relative h-72 md:h-[28rem] overflow-hidden'>
                            <img src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1200&q=80" alt="Green Crops" className='object-cover w-full h-full transition-transform duration-700 group-hover:scale-105' />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent"></div>
                            <div className='absolute bottom-0 left-0 p-10'>
                                <h3 className='mb-2 text-2xl font-bold text-white md:text-3xl drop-shadow-md'>Platformizing Every Link in the Chain</h3>
                                <p className='text-base leading-relaxed text-gray-200 md:text-lg max-w-2xl'>
                                    From farmers in rural districts to distribution centers nationwide, our platform connects and empowers every participant in Sri Lanka's food supply ecosystem.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
        
        {/* --- SECTION 2: How it Works --- */}
        <section className="relative py-32 bg-white">
            <div className='px-5 mx-auto max-w-7xl lg:px-8 relative z-10'>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className='max-w-3xl mx-auto mb-20 text-center'>
                    <span className="inline-block px-4 py-2 mb-6 text-xs font-bold tracking-widest text-teal-800 uppercase bg-teal-100 rounded-full">Core Pillars</span>
                    <h2 className='text-4xl font-extrabold text-gray-900 sm:text-5xl tracking-tight'>How Our Platform Works</h2>
                    <p className='mt-6 text-xl text-gray-500'>A seamless experience connecting all stakeholders in the ecosystem.</p>
                </motion.div>

                <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className='grid max-w-5xl grid-cols-1 gap-10 mx-auto md:grid-cols-3' >
                    {workFlow.map((item, index) => (
                        <motion.div variants={fadeIn} key={index} whileHover={{ y: -10 }} className='flex flex-col items-center p-10 transition-all duration-300 bg-white border border-gray-100 shadow-xl shadow-gray-200/50 rounded-[2.5rem] group'>
                            <div className='flex items-center justify-center w-20 h-20 mb-8 text-4xl rounded-[1.5rem] bg-gradient-to-br from-teal-50 to-emerald-50 shadow-inner group-hover:scale-110 transition-transform'>
                                {item.emoji}
                            </div>
                            <h3 className='mb-4 text-2xl font-bold text-gray-800'>{item.title}</h3>
                            <p className='text-base leading-relaxed text-center text-gray-600'>{item.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>

        {/* --- SECTION 3: Our Impact --- */}
        <section className='relative py-32 bg-gradient-to-t from-gray-50 to-white'>
            <div className='container mx-auto px-5 lg:px-8 max-w-7xl'>
                <div className='max-w-6xl mx-auto'>
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className='relative p-12 md:p-20 overflow-hidden bg-gray-900 shadow-2xl rounded-[3rem] text-center'>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
                        
                        <div className="relative z-10">
                            <h2 className='mb-6 text-4xl font-extrabold text-white sm:text-5xl'>Our Impact</h2>
                            <p className='mb-16 text-xl text-gray-300'>Making a measurable difference across Sri Lanka's food supply network.</p>

                            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
                                {impactStats.map((stat, index) => (
                                    <motion.div variants={fadeIn} key={index} className='flex flex-col items-center p-8 transition-all bg-white/10 backdrop-blur-md border border-white/10 rounded-[2rem] hover:bg-white/20'>
                                        <span className='mb-4 text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-teal-400 to-emerald-300 drop-shadow-sm'>{stat.number}</span>
                                        <span className='mb-2 text-lg font-bold text-white'>{stat.label}</span>
                                        <span className='text-sm font-medium text-gray-400'>{stat.sub}</span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>

        <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`} target="_blank" rel="noopener noreferrer" className="fixed z-50 flex items-center justify-center transition-all duration-300 transform shadow-2xl bottom-8 right-8 w-16 h-16 bg-[#25D366] hover:bg-[#20bd5a] rounded-full hover:scale-110 hover:-translate-y-2 group shadow-[#25D366]/40" aria-label="Chat with us on WhatsApp">
            <span className="absolute px-4 py-2 mb-3 text-xs font-bold tracking-wider text-white uppercase transition-opacity duration-300 transform -translate-x-1/2 bg-gray-900 rounded-xl opacity-0 pointer-events-none -top-12 left-1/2 group-hover:opacity-100 whitespace-nowrap shadow-xl">Chat with Us</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="white"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
        </a>
    </div>
  )
}

export default About;