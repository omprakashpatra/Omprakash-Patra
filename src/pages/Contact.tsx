import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageCircle, HeartHandshake, PhoneCall } from 'lucide-react';
import { useState, FormEvent } from 'react';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, send data to Firebase
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <h1 className="text-6xl font-black text-slate-900 leading-none tracking-tighter mb-6 uppercase">
            Let's <span className="text-green-600">Grow</span> Together
          </h1>
          <p className="text-lg text-slate-500 font-medium italic italic">
            "Whether you're a farmer, a buyer, or a partner, we're here to help you navigate the Agrom ecosystem."
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-10 rounded-[50px] shadow-sm border border-slate-100 flex flex-col items-center text-center">
               <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center mb-6">
                  <PhoneCall className="h-10 w-10 text-green-600" />
               </div>
               <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight mb-2">Call Support</h3>
               <p className="text-slate-500 text-sm mb-6 font-medium italic">24/7 dedicated helpline for farmers.</p>
               <div className="text-2xl font-black text-green-700 tracking-tighter">1800 123 4567</div>
            </div>

            <div className="bg-slate-900 p-10 rounded-[50px] shadow-xl text-white">
               <h3 className="text-2xl font-bold mb-8">Our Presence</h3>
               <div className="space-y-6">
                  <div className="flex gap-4">
                     <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-green-500" />
                     </div>
                     <div>
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">HQ Address</div>
                        <div className="text-sm font-bold text-slate-300">123 Agri-Tech Tower, Bandra Kurla Complex, Mumbai, MH - 400051</div>
                     </div>
                  </div>
                  <div className="flex gap-4">
                     <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-green-500" />
                     </div>
                     <div>
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Email Support</div>
                        <div className="text-sm font-bold text-slate-300">contact@agrom.com</div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="p-8 bg-yellow-400 rounded-[40px] flex items-center gap-6">
               <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl">
                  <HeartHandshake className="h-8 w-8 text-green-900" />
               </div>
               <div>
                  <h4 className="font-black uppercase tracking-tight text-green-900 leading-tight">Partnership Inquiries</h4>
                  <p className="text-xs font-bold text-green-800/80 mt-1 uppercase tracking-widest">Join our ecosystem today</p>
               </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            <motion.div 
               initial={{ opacity: 0, x: 50 }}
               animate={{ opacity: 1, x: 0 }}
               className="bg-white p-12 rounded-[60px] shadow-2xl shadow-green-900/5 border border-slate-50 h-full"
            >
              <h3 className="text-3xl font-black text-slate-800 uppercase tracking-tighter mb-10 flex items-center gap-4">
                 Send a <span className="text-green-600">Message</span>
                 <MessageCircle className="h-8 w-8 text-green-500" />
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">Full Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Ramesh Patil"
                      className="w-full px-6 py-4 bg-slate-50 border-none rounded-3xl focus:ring-2 focus:ring-green-500 font-bold text-slate-700 transition-all"
                      value={formState.name}
                      onChange={e => setFormState({...formState, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">Email Address</label>
                    <input 
                      required
                      type="email" 
                      placeholder="e.g. ramesh@agrom.com"
                      className="w-full px-6 py-4 bg-slate-50 border-none rounded-3xl focus:ring-2 focus:ring-green-500 font-bold text-slate-700 transition-all"
                      value={formState.email}
                      onChange={e => setFormState({...formState, email: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                   <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">Subject</label>
                   <input 
                     required
                     type="text" 
                     placeholder="e.g. Marketplace Listing Query"
                     className="w-full px-6 py-4 bg-slate-50 border-none rounded-3xl focus:ring-2 focus:ring-green-500 font-bold text-slate-700 transition-all"
                     value={formState.subject}
                     onChange={e => setFormState({...formState, subject: e.target.value})}
                   />
                </div>

                <div>
                   <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">Message</label>
                   <textarea
                     required
                     rows={5}
                     placeholder="How can we help you today?"
                     className="w-full px-6 py-4 bg-slate-50 border-none rounded-3xl focus:ring-2 focus:ring-green-500 font-bold text-slate-700 transition-all resize-none"
                     value={formState.message}
                     onChange={e => setFormState({...formState, message: e.target.value})}
                   />
                </div>

                <div className="pt-6">
                  <button 
                    disabled={submitted}
                    type="submit"
                    className={`w-full py-5 rounded-[28px] font-black uppercase tracking-[0.1em] text-lg flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl ${
                      submitted 
                        ? 'bg-green-100 text-green-600 shadow-none' 
                        : 'bg-green-600 text-white hover:bg-green-700 shadow-green-100'
                    }`}
                  >
                    {submitted ? (
                      <>
                        <CheckCircle className="h-6 w-6" />
                        Message Sent
                      </>
                    ) : (
                      <>
                        <Send className="h-6 w-6" />
                        Send Dispatch
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckCircle(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
