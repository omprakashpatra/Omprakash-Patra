import { motion } from 'motion/react';
import { FlaskConical, Beaker, CheckCircle, Info, ArrowRight, Wheat, Sprout, Leaf } from 'lucide-react';
import { FERTILIZERS } from '../constants';

export default function FertilizerGuide() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-24">
          <div className="bg-green-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 inline-block shadow-lg shadow-green-200">
            Scientific Agronomy
          </div>
          <h1 className="text-6xl md:text-9xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-8">
            Soil <span className="text-green-600">Nutrition</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-500 text-lg font-bold italic tracking-tight uppercase text-[10px]">
            Optimize your harvest potential with strategic N-P-K nutrient management.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main List */}
          <div className="lg:col-span-8 space-y-16">
            {FERTILIZERS.map((fert, idx) => (
              <motion.div 
                key={fert.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white rounded-[50px] shadow-sm hover:shadow-2xl transition-all overflow-hidden flex flex-col md:flex-row border border-slate-200"
              >
                <div className="md:w-1/3 h-64 md:h-auto overflow-hidden relative">
                   <img 
                    src={fert.image} 
                    alt={fert.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                   />
                   <div className="absolute inset-0 bg-green-600/10 mix-blend-overlay"></div>
                </div>
                <div className="md:w-2/3 p-12">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <span className="text-[10px] font-black text-green-600 uppercase tracking-widest bg-green-50 px-4 py-1.5 rounded-full mb-4 inline-block border border-green-100">
                        {fert.type}
                      </span>
                      <h3 className="text-4xl font-black text-slate-900 uppercase tracking-tighter leading-none">{fert.name}</h3>
                    </div>
                    <div className="bg-slate-900 p-5 rounded-[22px] shadow-xl">
                      <Beaker className="h-6 w-6 text-green-400" />
                    </div>
                  </div>

                  <p className="text-slate-500 mb-10 leading-relaxed font-bold lowercase text-sm italic tracking-tight opacity-70">
                    "{fert.description}"
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                    <div>
                      <h4 className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">
                        <Leaf className="h-4 w-4 text-green-500" /> Core Benefits
                      </h4>
                      <ul className="space-y-4">
                        {fert.benefits.map((benefit, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                            <span className="text-xs font-black text-slate-800 uppercase tracking-tight">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">
                        <Wheat className="h-4 w-4 text-yellow-500" /> Top Compatible Crops
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {fert.crops.map((crop, cIdx) => (
                          <span key={cIdx} className="px-4 py-2 bg-slate-50 rounded-2xl text-[10px] font-black text-slate-600 uppercase tracking-widest border border-slate-100">
                            {crop}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100 shadow-sm">
                        <Info className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 mb-1">Timing Window</div>
                        <div className="text-xs font-black text-slate-900 uppercase tracking-tight">{fert.timing}</div>
                      </div>
                    </div>
                    <button className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-green-600 transition-all shadow-xl">
                      Usage Metrics
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sidebar Highlights */}
          <div className="lg:col-span-4 space-y-8">
            <motion.div 
               whileHover={{ y: -10 }}
               className="p-10 bg-slate-900 rounded-[50px] text-white shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              <h3 className="text-2xl font-bold mb-6">Quick Pro-Tip</h3>
              <p className="text-slate-400 font-medium leading-relaxed mb-10 italic">
                Always perform a <span className="text-white font-bold underline decoration-emerald-500 decoration-2 underline-offset-4">Soil Testing</span> before major fertilization. Over-application can cause nitrogen leaching and damage the water table.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                      <Sprout className="h-6 w-6 text-emerald-400" />
                   </div>
                   <div className="text-sm font-bold">NPK Balanced Ratio: 19:19:19</div>
                </div>
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                      <Sprout className="h-6 w-6 text-emerald-400" />
                   </div>
                   <div className="text-sm font-bold">Organic Matter: Add 20% Humus</div>
                </div>
              </div>
            </motion.div>

            <div className="p-10 bg-white rounded-[50px] border border-emerald-100 shadow-sm">
              <h3 className="text-xl font-bold mb-8 text-emerald-900 uppercase tracking-tighter">Fertilizer Calendar</h3>
              <div className="space-y-6">
                {[
                  { m: "PRE-SOWING", t: "Basal Application", d: "P & K focus" },
                  { m: "SEEDLING", t: "First Top Dressing", d: "N focus" },
                  { m: "FLOWERING", t: "Nutrient Boost", d: "Micronutrients" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="w-px h-16 bg-emerald-100 relative mt-2">
                       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-emerald-400 tracking-[0.2em]">{item.m}</div>
                      <div className="font-bold text-slate-800 uppercase text-sm mt-1">{item.t}</div>
                      <div className="text-xs text-slate-400 mt-1">{item.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
