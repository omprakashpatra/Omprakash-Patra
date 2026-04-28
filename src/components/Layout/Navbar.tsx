import { Link, useLocation } from 'react-router-dom';
import { Leaf, ShoppingBag, Cloud, BarChart2, Hammer, FlaskConical, MessageSquare, Menu, X, LogIn, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import { UserProfile } from '../../types';
import { loginWithGoogle, logout } from '../../lib/firebase';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  user: UserProfile | null;
}

export default function Navbar({ user }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Marketplace', path: '/marketplace', icon: ShoppingBag },
    { name: 'Market Prices', path: '/prices', icon: BarChart2 },
    { name: 'Weather', path: '/weather', icon: Cloud },
    { name: 'Fertilizers', path: '/fertilizers', icon: FlaskConical },
    { name: 'Machinery', path: '/machinery', icon: Hammer },
  ];

  const handleAuth = async () => {
    if (user) {
      await logout();
    } else {
      await loginWithGoogle();
    }
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm px-4 sm:px-8 py-2">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-200">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-black text-green-700 tracking-tight">Agrom</span>
            </Link>
            
            <div className="hidden lg:flex gap-6">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm font-semibold transition-all pb-1 border-b-2 ${
                      isActive 
                        ? 'text-green-600 border-green-600' 
                        : 'text-slate-500 border-transparent hover:text-green-600'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <div className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 border border-blue-100">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
              Live: Market Open
            </div>
            {user ? (
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-[10px] font-black text-green-600 uppercase tracking-widest">{user.role}</p>
                  <p className="text-sm font-bold text-slate-800">{user.name}</p>
                </div>
                <button
                  onClick={handleAuth}
                  className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 hover:text-red-600 transition-all"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleAuth}
                className="bg-green-600 text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-green-700 shadow-md shadow-green-200 transition-all active:scale-95"
              >
                Farmer Login
              </button>
            )}
          </div>

          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-slate-500 hover:text-green-600 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-green-50"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium ${
                      isActive 
                        ? 'text-green-700 bg-green-50' 
                        : 'text-slate-600 hover:text-green-600 hover:bg-green-50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-4 pb-3 border-t border-slate-100">
                <button
                  onClick={handleAuth}
                  className="flex items-center gap-3 w-full px-3 py-3 text-left text-base font-medium text-slate-600 hover:text-green-600 hover:bg-green-50"
                >
                  {user ? <LogOut className="h-5 w-5" /> : <LogIn className="h-5 w-5" />}
                  {user ? 'Logout' : 'Farmer Login'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
