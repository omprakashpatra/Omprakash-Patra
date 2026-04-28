import { motion } from 'motion/react';
import { ShoppingBag, Search, Plus, Filter, ArrowRight, User, MapPin, Tag } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  key?: string;
  product: Product;
  onSelect: (product: Product) => void;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all group cursor-pointer flex flex-col"
      onClick={() => onSelect(product)}
    >
      <div className="relative h-48 bg-slate-100 overflow-hidden">
        <img 
          src={product.image || `https://picsum.photos/seed/${product.id}/600/400`} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white border border-slate-200 text-green-700 text-[10px] font-black uppercase tracking-widest rounded-lg shadow-sm">
            {product.category}
          </span>
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-black text-slate-800 text-lg uppercase tracking-tight leading-tight">{product.title}</h3>
          <span className="text-lg font-black text-green-600">₹{product.price}</span>
        </div>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-4">per {product.unit}</p>
        
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
            <User className="h-3 w-3" />
            <span>Sold by {product.farmerName}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
            <MapPin className="h-3 w-3" />
            <span>{product.location}</span>
          </div>
        </div>

        <button className="w-full mt-auto bg-green-50 text-green-700 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-green-600 hover:text-white transition-all">
          Contact Farmer
        </button>
      </div>
    </motion.div>
  );
}
