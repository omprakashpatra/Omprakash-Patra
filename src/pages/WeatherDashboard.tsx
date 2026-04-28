import { motion } from 'motion/react';
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer, MapPin, Navigation, AlertTriangle, CloudLightning } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function WeatherDashboard() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    // Attempt to get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          // In a real app, you would call a weather API here with coordinates
          // For this demo, we'll wait and then show high-quality mock data
          setTimeout(() => {
            setWeather({
              city: 'Farming Hub, MH',
              temp: 28,
              condition: 'Partly Cloudy',
              humidity: 65,
              wind: 12,
              rain: 10,
              forecast: [
                { day: 'Tue', temp: 29, icon: Sun },
                { day: 'Wed', temp: 27, icon: Cloud },
                { day: 'Thu', temp: 26, icon: CloudRain },
                { day: 'Fri', temp: 28, icon: CloudLightning },
                { day: 'Sat', temp: 30, icon: Sun },
              ],
              alerts: [
                { type: 'Warning', msg: 'Moderate rainfall expected on Thursday' },
                { type: 'Alert', msg: 'High humidity levels might affect harvest storage' }
              ]
            });
            setLoading(false);
          }, 1500);
        },
        (error) => {
          console.error("Error getting location", error);
          setLocationError("Could not detect location. Showing general data.");
          // Fallback data
          setTimeout(() => {
            setWeather({
              city: 'Central India',
              temp: 30,
              condition: 'Sunny',
              humidity: 45,
              wind: 8,
              rain: 0,
              forecast: [
                { day: 'Tue', temp: 31, icon: Sun },
                { day: 'Wed', temp: 32, icon: Sun },
                { day: 'Thu', temp: 30, icon: Cloud },
                { day: 'Fri', temp: 29, icon: Cloud },
                { day: 'Sat', temp: 31, icon: Sun },
              ],
              alerts: []
            });
            setLoading(false);
          }, 1500);
        }
      );
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-sky-50 flex flex-col items-center justify-center p-8">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="bg-white p-8 rounded-full shadow-2xl shadow-sky-200 mb-8"
        >
          <Cloud className="h-16 w-16 text-sky-500" />
        </motion.div>
        <p className="font-black text-sky-900 uppercase tracking-widest text-lg">Syncing with Weather Satellites...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-blue-600 rounded-xl">
                 <Navigation className="h-5 w-5 text-white fill-white" />
              </div>
              <span className="text-blue-600 font-black uppercase tracking-widest text-[10px]">Real-Time Monitoring</span>
            </div>
            <h1 className="text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none">{weather.city}</h1>
          </div>
          <div className="text-right">
            <p className="text-blue-500 font-black mb-1 uppercase tracking-[0.3em] text-[10px]">Agronomist Insight</p>
            <p className="text-slate-900 font-black text-2xl italic uppercase tracking-tighter">"Optimal window for Urea application"</p>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Weather Card */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="lg:col-span-8 bg-blue-600 rounded-[50px] shadow-2xl shadow-blue-200 overflow-hidden relative text-white"
          >
            <div className="absolute top-0 right-0 p-12 -mr-16 -mt-16 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

            <div className="p-12 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="flex flex-col items-center lg:items-start">
                <div className="bg-white/20 p-6 rounded-[32px] backdrop-blur-md mb-6 border border-white/10 shadow-xl">
                   <Sun className="h-16 w-16 text-yellow-400" />
                </div>
                <div className="text-[100px] font-black tracking-tighter leading-none mb-2">{weather.temp}°</div>
                <div className="text-2xl font-black uppercase tracking-[0.3em] text-blue-100 italic">{weather.condition}</div>
              </div>

              <div className="grid grid-cols-2 gap-6 flex-grow">
                {[
                  { label: 'Humidity', val: `${weather.humidity}%`, icon: Droplets, color: 'bg-white/10' },
                  { label: 'Wind Force', val: `${weather.wind} km/h`, icon: Wind, color: 'bg-white/10' },
                  { label: 'Precipitation', val: `${weather.rain}%`, icon: CloudRain, color: 'bg-white/10' },
                  { label: 'Sensation', val: `${weather.temp + 2}°C`, icon: Thermometer, color: 'bg-white/10' },
                ].map((stat, i) => (
                  <div key={i} className={`${stat.color} backdrop-blur-md p-6 rounded-[32px] flex items-center gap-5 border border-white/10 shadow-lg`}>
                    <div className="bg-white/20 p-3 rounded-2xl">
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-blue-100/60 uppercase tracking-widest leading-none mb-1">{stat.label}</div>
                      <div className="text-xl font-black">{stat.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-12 py-10 bg-slate-900 grid grid-cols-5 gap-4">
              {weather.forecast.map((f: any, idx: number) => {
                const Icon = f.icon;
                return (
                  <div key={idx} className="flex flex-col items-center group transition-transform hover:scale-110">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">{f.day}</span>
                    <div className="bg-slate-800 p-4 rounded-2xl mb-4 border border-slate-700 shadow-xl">
                       <Icon className="h-6 w-6 text-blue-400" />
                    </div>
                    <span className="text-xl font-black text-white">{f.temp}°</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Side Alerts & Tips */}
          <div className="lg:col-span-4 space-y-8">
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="bg-yellow-400 p-8 rounded-[40px] shadow-xl text-green-900"
            >
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="h-7 w-7" />
                <h3 className="text-xl font-black uppercase tracking-tight">Farmer Warnings</h3>
              </div>
              <div className="space-y-4">
                {weather.alerts.length > 0 ? weather.alerts.map((alert: any, idx: number) => (
                  <div key={idx} className="p-4 bg-white/30 backdrop-blur-md rounded-2xl border border-white/20">
                    <div className="text-[10px] font-black uppercase tracking-widest mb-1">{alert.type}</div>
                    <p className="text-sm font-bold leading-tight">{alert.msg}</p>
                  </div>
                )) : (
                  <p className="text-sm font-bold">Stable conditions. Ideal for general field work.</p>
                )}
              </div>
            </motion.div>

            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-900 p-8 rounded-[40px] shadow-xl text-white"
            >
              <h3 className="text-xl font-bold mb-6">Soil Health Tip</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Current moisture levels are at 62%, which is optimal for the upcoming soy planting cycle. Avoid excessive irrigation for the next 48 hours.
              </p>
              <div className="bg-slate-800 p-4 rounded-2xl flex items-center gap-4">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <MapPin className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Target Region</div>
                  <div className="font-bold text-sm">Zone 4A: Vidarbha</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Agricultural Calendar */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Season <span className="text-sky-600">Calendar</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { phase: "Sowing", status: "Optimal", period: "June 15 - July 10", color: "border-green-400 text-green-600" },
              { phase: "Fertilizing", status: "Wait", period: "August 05 - August 15", color: "border-yellow-400 text-yellow-600" },
              { phase: "Harvesting", status: "Pending", period: "October 20 - Nov 10", color: "border-slate-200 text-slate-400" },
            ].map((phase, idx) => (
              <div key={idx} className={`p-8 bg-white rounded-3xl border-2 ${phase.color.split(' ')[0]} shadow-sm`}>
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-2xl font-black uppercase tracking-tighter">{phase.phase}</h4>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${phase.color.split(' ')[1]} bg-current/10`}>
                    {phase.status}
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-500">{phase.period}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
