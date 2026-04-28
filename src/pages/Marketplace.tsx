import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Product, UserProfile } from '../types';
import ProductCard from '../components/Marketplace/ProductCard';
import { Search, Plus, X, ShoppingBag, Loader2, MapPin, User as UserIcon, MessageCircle, Tag } from 'lucide-react';

interface MarketplaceProps {
  user: UserProfile | null;
}

export default function Marketplace({ user }: MarketplaceProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Form State
  const [newProduct, setNewProduct] = useState({
    title: '',
    category: 'Fruits',
    price: '',
    unit: 'kg',
    quantity: '',
    description: '',
    location: user?.location || '',
  });

  const categories = ['All', 'Fruits', 'Vegetables', 'Grains', 'Pulses', 'Others'];

  useEffect(() => {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      setProducts(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAddProduct = async (e: FormEvent) => {
    e.preventDefault();
    if (!user || user.role !== 'farmer') {
      alert('Only farmers can list products!');
      return;
    }

    try {
      await addDoc(collection(db, 'products'), {
        ...newProduct,
        price: Number(newProduct.price),
        quantity: Number(newProduct.quantity),
        farmerId: user.uid,
        farmerName: user.name,
        createdAt: serverTimestamp(),
        image: `https://picsum.photos/seed/${Date.now()}/600/400`,
      });
      setIsAddModalOpen(false);
      setNewProduct({
        title: '',
        category: 'Fruits',
        price: '',
        unit: 'kg',
        quantity: '',
        description: '',
        location: user?.location || '',
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-3">Direct <span className="text-green-600">Market</span></h1>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Buy organic produce without the middleman Markup</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-2xl border border-yellow-200">
               <Tag className="h-4 w-4" />
               <span className="text-xs font-black uppercase">Active Deals</span>
            </div>
            {user?.role === 'farmer' && (
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black shadow-xl hover:bg-green-600 transition-all uppercase tracking-widest text-xs"
              >
                <Plus className="h-4 w-4" />
                Sell Harvest
              </button>
            )}
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col lg:flex-row gap-4 items-center mb-8">
          <div className="relative flex-grow w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search fruits, vegetables, grains..." 
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-green-500 transition-all text-sm font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat 
                    ? 'bg-yellow-400 text-green-900 shadow-md' 
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="h-12 w-12 text-green-500 animate-spin mb-4" />
            <p className="font-bold text-slate-400 uppercase tracking-widest text-sm">Harvesting listings...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onSelect={handleSelectProduct}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-16 text-center border-2 border-dashed border-slate-200">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-10 w-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No products found</h3>
            <p className="text-slate-400">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-green-50">
                <h2 className="text-xl font-bold text-green-900">List Your Produce</h2>
                <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-white rounded-full transition-colors">
                  <X className="h-5 w-5 text-slate-500" />
                </button>
              </div>
              <form onSubmit={handleAddProduct} className="p-8 space-y-5 max-h-[70vh] overflow-y-auto">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Product Title</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Organic Alphanso Mangoes"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-green-500 font-medium"
                    value={newProduct.title}
                    onChange={e => setNewProduct({...newProduct, title: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Category</label>
                    <select 
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-green-500 font-medium"
                      value={newProduct.category}
                      onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                    >
                      {categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Location</label>
                    <input 
                      required
                      type="text" 
                      placeholder="City, State"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-green-500 font-medium"
                      value={newProduct.location}
                      onChange={e => setNewProduct({...newProduct, location: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Price (₹)</label>
                    <input 
                      required
                      type="number" 
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-green-500 font-medium"
                      value={newProduct.price}
                      onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Unit</label>
                    <select 
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-green-500 font-medium"
                      value={newProduct.unit}
                      onChange={e => setNewProduct({...newProduct, unit: e.target.value})}
                    >
                      <option value="kg">kilogram (kg)</option>
                      <option value="quintal">quintal (100kg)</option>
                      <option value="ton">ton</option>
                      <option value="dozen">dozen</option>
                      <option value="piece">piece</option>
                    </select>
                  </div>
                  <div className="col-span-1">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Quantity</label>
                    <input 
                      required
                      type="number" 
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-green-500 font-medium"
                      value={newProduct.quantity}
                      onChange={e => setNewProduct({...newProduct, quantity: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Description</label>
                  <textarea 
                    rows={3}
                    placeholder="Describe the quality, harvest date, and other details..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-green-500 font-medium"
                    value={newProduct.description}
                    onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 shadow-lg shadow-green-100 transition-all active:scale-95"
                >
                  Confirm Listing
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {isDetailModalOpen && selectedProduct && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDetailModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              layoutId={selectedProduct.id}
              className="relative bg-white w-full max-w-4xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
              <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.title} 
                  className="w-full h-full object-cover"
                />
                <button 
                  onClick={() => setIsDetailModalOpen(false)}
                  className="absolute top-6 left-6 p-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl hover:bg-white transition-all md:hidden"
                >
                   <X className="h-5 w-5 text-slate-900" />
                </button>
              </div>
              <div className="w-full md:w-1/2 p-10 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-widest rounded-full mb-3 inline-block">
                      {selectedProduct.category}
                    </span>
                    <h2 className="text-3xl font-black text-slate-900 leading-tight uppercase tracking-tight">{selectedProduct.title}</h2>
                  </div>
                  <button 
                    onClick={() => setIsDetailModalOpen(false)}
                    className="hidden md:flex p-2 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <X className="h-6 w-6 text-slate-400" />
                  </button>
                </div>

                <div className="flex items-center gap-6 mb-8 p-4 bg-slate-50 rounded-3xl">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Price</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-green-600">₹{selectedProduct.price}</span>
                      <span className="text-xs text-slate-500 font-bold uppercase">/ {selectedProduct.unit}</span>
                    </div>
                  </div>
                  <div className="w-px h-10 bg-slate-200" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Available</span>
                    <span className="text-xl font-bold text-slate-700">{selectedProduct.quantity} {selectedProduct.unit}s</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-sky-50 flex items-center justify-center">
                      <UserIcon className="h-5 w-5 text-sky-600" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Farmer</div>
                      <div className="text-sm font-bold">{selectedProduct.farmerName}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-yellow-50 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Location</div>
                      <div className="text-sm font-bold">{selectedProduct.location}</div>
                    </div>
                  </div>
                </div>

                <p className="text-slate-500 text-sm leading-relaxed mb-10 italic">
                  "{selectedProduct.description || 'No detailed description provided for this organic produce.'}"
                </p>

                <div className="mt-auto flex gap-4">
                  <button className="flex-1 py-4 bg-green-600 text-white font-black text-lg rounded-2xl shadow-xl shadow-green-100 hover:bg-green-700 transition-all flex items-center justify-center gap-2">
                    <ShoppingBag className="h-5 w-5" />
                    Purchase Now
                  </button>
                  <button className="p-4 bg-sky-50 text-sky-600 rounded-2xl hover:bg-sky-100 transition-all">
                    <MessageCircle className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
