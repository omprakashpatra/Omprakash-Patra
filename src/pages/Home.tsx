import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Cloud, BarChart2, ArrowRight, ShieldCheck, Zap, HeartHandshake, MapPin, AlertTriangle } from 'lucide-react';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-6 py-12 lg:py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 lg:h-[70vh]">
          {/* Main CTAs */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="col-span-12 lg:col-span-8 bg-green-600 rounded-[40px] p-8 lg:p-16 text-white flex flex-col justify-center relative overflow-hidden shadow-2xl shadow-green-200"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="relative z-10">
              <span className="bg-yellow-400 text-green-900 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6 inline-block">
                Direct From Farm
              </span>
              <h1 className="text-4xl md:text-7xl font-black mb-8 leading-none tracking-tight">
                Empowering <br />
                <span className="text-yellow-400">Farmers,</span> <br />
                Delivering <span className="text-blue-100">Quality.</span>
              </h1>
              <div className="flex flex-wrap gap-4">
                <Link to="/marketplace" className="bg-white text-green-700 px-8 py-4 rounded-2xl font-black text-lg hover:bg-yellow-400 hover:text-green-900 transition-all shadow-xl active:scale-95">
                  Start Trading
                </Link>
                <Link to="/prices" className="bg-green-500/30 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all">
                  Mandi Prices
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Quick Weather */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="col-span-12 lg:col-span-4 bg-blue-600 rounded-[40px] p-8 text-white flex flex-col justify-between shadow-xl shadow-blue-200"
          >
            <div>
              <div className="flex justify-between items-start">
                <p className="text-blue-100 font-bold uppercase tracking-widest text-xs">Weather Check</p>
                <span className="bg-blue-500 text-[10px] px-2 py-1 rounded-full uppercase font-black tracking-wider">Live</span>
              </div>
              <div className="flex items-end gap-2 mt-6">
                <h3 className="text-5xl font-black">28°C</h3>
                <Cloud className="h-10 w-10 text-white/50 mb-2" />
              </div>
              <p className="text-blue-100 font-medium">Mostly Sunny • Vidarbha Region</p>
            </div>
            
            <div className="mt-8">
              <div className="p-4 bg-blue-500/30 rounded-3xl border border-white/10 flex items-center gap-4">
                <AlertTriangle className="h-6 w-6 text-yellow-400" />
                <p className="text-xs font-bold leading-tight">Alert: Heavy Rain Expected Friday. Protect your harvest.</p>
              </div>
              <Link to="/weather" className="w-full mt-4 bg-white/20 hover:bg-white/30 py-3 rounded-2xl text-center text-xs font-black uppercase tracking-widest transition-all block">
                Details & Alerts
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Market Strip */}
      <section className="px-6 py-6 overflow-hidden">
        <div className="max-w-7xl mx-auto bg-white border border-slate-200 rounded-[30px] p-6 shadow-sm flex items-center overflow-x-auto scrollbar-hide">
          <div className="bg-yellow-400 p-3 rounded-2xl mr-8 flex-shrink-0">
            <BarChart2 className="h-6 w-6 text-yellow-900" />
          </div>
          <div className="flex gap-12 whitespace-nowrap">
            {[
              { label: 'Wheat (Gehun)', val: '₹2,450', trend: '+2.4%', up: true },
              { label: 'Rice (Basmati)', val: '₹4,100', trend: '-0.8%', up: false },
              { label: 'Mustard Seeds', val: '₹6,200', trend: '+1.2%', up: true },
              { label: 'Potato (Aloo)', val: '₹1,800', trend: '0.0%', up: null },
              { label: 'Onion (Pyaz)', val: '₹1,500', trend: '+4.1%', up: true },
            ].map((m, i) => (
              <div key={i} className={i !== 0 ? "border-l border-slate-100 pl-12" : ""}>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">{m.label}</p>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black text-slate-900">{m.val}</span>
                  {m.up !== null && (
                    <span className={`text-[10px] font-bold ${m.up ? 'text-green-500' : 'text-red-500'}`}>
                      {m.up ? '▲' : '▼'} {m.trend}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <Link to="/prices" className="ml-auto p-3 bg-slate-100 rounded-full hover:bg-slate-200 transition-all flex-shrink-0">
            <ArrowRight className="h-5 w-5 text-slate-600" />
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-yellow-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-green-900 text-center">
            <div>
              <div className="text-4xl font-black mb-1">10k+</div>
              <div className="text-sm font-semibold uppercase tracking-wider">Active Farmers</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-1">50+</div>
              <div className="text-sm font-semibold uppercase tracking-wider">Mandi Tracked</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-1">200+</div>
              <div className="text-sm font-semibold uppercase tracking-wider">Crops Listed</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-1">24/7</div>
              <div className="text-sm font-semibold uppercase tracking-wider">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Cultivating Digital <span className="text-green-600">Solutions</span></h2>
            <p className="text-slate-500 max-w-2xl mx-auto italic">Everything a farmer needs to succeed in the modern age.</p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Farmer Marketplace",
                desc: "List your produce and sell directly to customers nationwide. Zero commissions, full control.",
                icon: ShoppingBag,
                color: "bg-green-100 text-green-600",
                link: "/marketplace"
              },
              {
                title: "Mandi Prices",
                desc: "Real-time updates from local markets. Know exactly how much your crop is worth today.",
                icon: BarChart2,
                color: "bg-yellow-100 text-yellow-600",
                link: "/prices"
              },
              {
                title: "Weather Alerts",
                desc: "Precision hyperlocal forecasts and alerts to protect your crops from sudden climatic changes.",
                icon: Cloud,
                color: "bg-sky-100 text-sky-600",
                link: "/weather"
              },
              {
                title: "Fertilizer Guide",
                desc: "Expert recommendations on fertilizer usage for maximum yield and soil health.",
                icon: HeartHandshake,
                color: "bg-emerald-100 text-emerald-600",
                link: "/fertilizers"
              },
              {
                title: "Machinery Intel",
                desc: "Detailed guides on the best farming equipment to automate and scale your production.",
                icon: Zap,
                color: "bg-orange-100 text-orange-600",
                link: "/machinery"
              },
              {
                title: "Direct Support",
                desc: "Connect with agricultural experts or other farmers for advice and collaboration.",
                icon: MapPin,
                color: "bg-indigo-100 text-indigo-600",
                link: "/contact"
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="p-8 rounded-3xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className={`${feature.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6`}>
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-600 mb-6 text-sm leading-relaxed">{feature.desc}</p>
                <Link to={feature.link} className="flex items-center gap-2 text-sm font-bold text-green-600 hover:text-green-700">
                  Try it out <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-6">Why Trust Agrom?</h2>
              <div className="space-y-6">
                {[
                  { icon: ShieldCheck, title: "Verified Profiles", desc: "Every farmer and buyer is verified through official documentation." },
                  { icon: Zap, title: "No Middlemen", desc: "No commissions or hidden charges. You keep 100% of your earnings." },
                  { icon: HeartHandshake, title: "Community Focused", desc: "Built by agricultural enthusiasts for the farming community." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="bg-white p-3 rounded-xl shadow-sm self-start">
                      <item.icon className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-slate-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="rounded-3xl overflow-hidden shadow-2xl"
              >
                <img 
                  src="https://picsum.photos/seed/agri-trust/800/600" 
                  alt="Happy farmer" 
                  className="w-full h-auto"
                />
              </motion.div>
              {/* Floating Widget */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-green-50 max-w-[240px]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">R</div>
                  <div>
                    <div className="text-sm font-bold">Rajesh Kumar</div>
                    <div className="text-[10px] text-slate-400">Registered Farmer</div>
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-tight">
                  "Agrom helped me sell my entire harvest at a 30% higher profit than the local mandi."
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-green-600 z-0">
           <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Ready to Transform Your Farming Business?</h2>
          <p className="text-green-50 text-xl mb-12">Join thousands of farmers already winning with Agrom. Registration is free and takes less than 2 minutes.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <button className="px-10 py-5 bg-yellow-400 text-green-900 font-black text-xl rounded-2xl shadow-2xl shadow-black/20 hover:scale-105 active:scale-95 transition-all">
              Join as a Farmer
            </button>
            <button className="px-10 py-5 bg-white text-green-600 font-bold text-xl rounded-2xl hover:bg-green-50 transition-all">
              Register as Buyer
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
