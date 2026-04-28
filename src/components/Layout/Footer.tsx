import { Leaf, Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-24 border-t-8 border-green-600 mt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-green-600 p-2 rounded-xl shadow-lg shadow-green-900/40">
                 <Leaf className="h-7 w-7 text-white" />
              </div>
              <span className="text-3xl font-black text-white tracking-tighter uppercase">Agrom</span>
            </div>
            <p className="text-sm leading-relaxed mb-10 font-bold italic opacity-60">
              Transforming individual fields into a global digital network. Fair prices. Direct trade. Scientific scaling.
            </p>
            <div className="flex space-x-5">
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="h-10 w-10 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-green-600 hover:text-white transition-all shadow-xl">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-green-500 font-black mb-8 uppercase text-[10px] tracking-[0.3em] border-b border-green-500/20 pb-3 inline-block">Platform Ecosystem</h3>
            <ul className="space-y-4 text-[10px] font-black uppercase tracking-widest">
              <li><Link to="/marketplace" className="hover:text-white transition-colors">Direct Marketplace</Link></li>
              <li><Link to="/prices" className="hover:text-white transition-colors">Mandi Pulse</Link></li>
              <li><Link to="/weather" className="hover:text-white transition-colors">Satellite Weather</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Support Nexus</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-blue-500 font-black mb-8 uppercase text-[10px] tracking-[0.3em] border-b border-blue-500/20 pb-3 inline-block">Knowledge Vault</h3>
            <ul className="space-y-4 text-[10px] font-black uppercase tracking-widest">
              <li><Link to="/fertilizers" className="hover:text-white transition-colors">Soil Nutrition Guide</Link></li>
              <li><Link to="/machinery" className="hover:text-white transition-colors">Precision Machinery</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Sustainability Code</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Agri-Tech Blog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-yellow-500 font-black mb-8 uppercase text-[10px] tracking-[0.3em] border-b border-yellow-500/20 pb-3 inline-block">Support Hub</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-4 bg-slate-800 p-4 rounded-2xl border border-slate-700">
                <Mail className="h-5 w-5 text-yellow-400" />
                <span className="text-[10px] font-black uppercase tracking-widest leading-none">support@agrom.network</span>
              </li>
              <li className="flex items-center gap-4 bg-slate-800 p-4 rounded-2xl border border-slate-700">
                <Phone className="h-5 w-5 text-yellow-400" />
                <span className="text-[10px] font-black uppercase tracking-widest leading-none">+91 800 AGRI FAST</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">
            © {new Date().getFullYear()} Agrom Technologies. Built for the modern farmer.
          </p>
          <div className="flex gap-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Code</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Exchange</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
