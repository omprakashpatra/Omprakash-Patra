import { motion } from 'motion/react';
import { BarChart2, MapPin, TrendingUp, TrendingDown, RefreshCcw, Search, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { MarketPrice } from '../types';
import { INITIAL_MARKET_PRICES } from '../constants';
import { format } from 'date-fns';

export default function MarketPrices() {
  const [prices, setPrices] = useState<MarketPrice[]>(INITIAL_MARKET_PRICES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [loading, setLoading] = useState(false);

  // Mock refresh
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  };

  const locations = ['All', 'Indore Mandi', 'Karnal Mandi', 'Lasalgaon Mandi', 'Agra Mandi'];

  const filteredPrices = prices.filter(p => {
    const matchesSearch = p.crop.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === 'All' || p.location === selectedLocation;
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block">
              Daily Updates
            </div>
            <h1 className="text-6xl font-black text-slate-900 leading-none tracking-tighter uppercase mb-4">
              Live <span className="text-yellow-500">Mandi</span> Feed
            </h1>
            <p className="text-slate-500 font-bold italic">Real-time commodity data from APMC markets nationwide.</p>
          </div>
          
          <button 
            onClick={handleRefresh}
            className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-yellow-500 hover:text-yellow-900 transition-all shadow-xl"
          >
            <RefreshCcw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Sync Pulse
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Filter crops..." 
              className="w-full pl-16 pr-6 py-6 bg-white border border-slate-200 rounded-[30px] shadow-sm focus:ring-4 focus:ring-yellow-400/20 transition-all text-sm font-bold"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <select
              className="w-full pl-16 pr-6 py-6 bg-white border border-slate-200 rounded-[30px] shadow-sm focus:ring-4 focus:ring-yellow-400/20 transition-all text-sm font-bold appearance-none cursor-pointer"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
          </div>
        </div>

        {/* Price Table/Cards */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="h-12 w-12 text-yellow-500 animate-spin mb-4" />
            <p className="font-bold text-slate-400 uppercase tracking-widest text-sm">Syncing with Mandi APIs...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPrices.map((price, idx) => (
              <motion.div 
                key={price.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-yellow-100 p-3 rounded-2xl">
                    <BarChart2 className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${idx % 2 === 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {idx % 2 === 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {idx % 2 === 0 ? '+2.4%' : '-1.5%'}
                  </div>
                </div>
                
                <h3 className="text-lg font-black text-slate-800 mb-1 leading-tight uppercase tracking-tight">{price.crop}</h3>
                <div className="flex items-center gap-1 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                  <MapPin className="h-3 w-3" />
                  {price.location}
                </div>

                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-3xl font-black text-slate-900">₹{price.price.toLocaleString()}</span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">/ {price.unit}</span>
                </div>

                <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Last Updated</span>
                  <span className="text-[10px] font-bold text-slate-600">{format(price.updatedAt as Date, 'MMM dd, HH:mm')}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Market Insights */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-8 bg-green-900 rounded-[40px] text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-green-800 rounded-full blur-3xl -mr-32 -mt-32 opacity-50"></div>
             <h3 className="text-2xl font-bold mb-4 relative z-10">Market Insight</h3>
             <p className="text-green-100 mb-8 relative z-10 leading-relaxed font-medium">
               Wheat prices are expected to rise by 5-7% in the coming week due to increased export demand. Farmers are advised to hold onto their high-quality stock for better returns.
             </p>
             <button className="px-6 py-3 bg-white text-green-900 font-bold rounded-xl hover:bg-green-50 transition-all relative z-10">
               Read Full Report
             </button>
          </div>
          <div className="p-8 bg-sky-900 rounded-[40px] text-white relative overflow-hidden">
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-800 rounded-full blur-3xl -ml-32 -mb-32 opacity-50"></div>
             <h3 className="text-2xl font-bold mb-4 relative z-10">Historical Comparison</h3>
             <p className="text-sky-100 mb-8 relative z-10 leading-relaxed font-medium">
               Compared to the same period last year, Basmati Rice prices have seen a significant jump of 18%. This is attributed to weather-related harvest delays in key regions.
             </p>
             <button className="px-6 py-3 bg-white text-sky-900 font-bold rounded-xl hover:bg-sky-50 transition-all relative z-10">
               Analyze Trends
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
