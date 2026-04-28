import { motion } from 'motion/react';
import { Hammer, Zap, Info, ArrowRight, ShieldCheck, Settings, Ruler, Package } from 'lucide-react';
import { MACHINERY } from '../constants';

export default function MachineryInfo() {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-24 text-center lg:text-left">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 justify-center lg:justify-start mb-6">
              <span className="px-4 py-2 bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-[0.3em] rounded-full shadow-sm border border-blue-200">Direct Automation</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-none tracking-tighter mb-8 uppercase">
              Mech <span className="text-blue-600">Vault</span>
            </h1>
            <p className="text-xl text-slate-500 font-bold italic opacity-60">
              "Future-proof your cultivation with high-precision engineering and automated tools."
            </p>
          </div>
          <div className="flex items-center justify-center gap-5 bg-white p-8 rounded-[40px] shadow-sm border border-slate-200">
             <div className="w-16 h-16 bg-blue-600 rounded-[20px] flex items-center justify-center shadow-xl shadow-blue-200">
                <ShieldCheck className="h-8 w-8 text-white" />
             </div>
             <div className="text-left">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">Platform Standard</div>
                <div className="text-sm font-black text-slate-800 uppercase tracking-tight">ISO 9001:2026 CERTIFIED</div>
             </div>
          </div>
        </div>

        {/* Machinery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {MACHINERY.map((machine, idx) => (
            <motion.div 
              key={machine.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-[50px] overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition-all group flex flex-col"
            >
              <div className="relative h-72 overflow-hidden bg-slate-100">
                 <img 
                  src={machine.image} 
                  alt={machine.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                 />
                 <div className="absolute top-8 left-8">
                    <span className="px-5 py-2.5 bg-black text-white rounded-2xl text-[10px] font-black shadow-xl uppercase tracking-[0.2em]">
                      {machine.type}
                    </span>
                 </div>
              </div>
              
              <div className="p-12 flex-1 flex flex-col">
                <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-6 leading-none group-hover:text-blue-600 transition-colors">
                  {machine.name}
                </h3>
                
                <p className="text-slate-500 text-sm font-bold leading-relaxed mb-8 italic opacity-70">
                  "{machine.description}"
                </p>

                <div className="grid grid-cols-2 gap-4 mb-10">
                  <div className="p-5 bg-slate-50 rounded-[30px] flex items-center gap-4 border border-slate-100">
                     <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                        <Settings className="h-5 w-5 text-blue-500" />
                     </div>
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sys Opt</span>
                  </div>
                  <div className="p-5 bg-slate-50 rounded-[30px] flex items-center gap-4 border border-slate-100">
                     <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                        <Ruler className="h-5 w-5 text-blue-500" />
                     </div>
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Precision</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-10 border-t border-slate-100 mt-auto">
                   <div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">MSRP ESTIMATE</div>
                      <div className="text-2xl font-black text-slate-900 tracking-tighter leading-none">{machine.priceRange}</div>
                   </div>
                   <button className="w-16 h-16 bg-slate-900 text-white rounded-[26px] flex items-center justify-center hover:bg-blue-600 shadow-xl transition-all">
                      <ArrowRight className="h-6 w-6" />
                   </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured Service Area */}
        <section className="mt-40 p-16 bg-blue-600 rounded-[60px] text-white flex flex-col md:flex-row items-center gap-16 relative overflow-hidden shadow-2xl shadow-blue-200">
           <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl opacity-50"></div>
           <div className="flex-1 text-center md:text-left z-10">
              <span className="bg-yellow-400 text-slate-900 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-8 inline-block">Support Network</span>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-none">Need <span className="text-blue-100">Custom</span> Gears?</h2>
              <p className="text-blue-100 text-lg font-bold mb-10 max-w-xl italic opacity-80 leading-relaxed">
                 Connect with regional experts for specialized implements and spare parts tailored for Indian terrain.
              </p>
              <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                 <button className="px-10 py-5 bg-white text-slate-900 rounded-3xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-2xl active:scale-95">
                    Locate Service Center
                 </button>
                 <button className="px-10 py-5 border-2 border-white/20 text-white rounded-3xl font-black uppercase text-xs tracking-widest hover:bg-white/10 transition-all">
                    Financing Schemes
                 </button>
              </div>
           </div>
           <div className="w-full md:w-1/3 z-10 order-first md:order-last">
              <motion.div 
                animate={{ rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="bg-white/10 backdrop-blur-md p-12 rounded-[50px] border border-white/10 shadow-2xl"
              >
                 <Package className="h-24 w-24 text-yellow-400 opacity-90 mx-auto" />
                 <div className="mt-8 text-center">
                    <div className="text-[10px] font-black uppercase tracking-widest text-blue-200 mb-2">Logistics Hub</div>
                    <div className="text-2xl font-black uppercase tracking-tighter italic">Swift Delivery</div>
                 </div>
              </motion.div>
           </div>
        </section>
      </div>
    </div>
  );
}
