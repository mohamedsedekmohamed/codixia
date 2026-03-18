import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ShoppingCart, Activity, Zap, Server, Smartphone, ArrowRightLeft, Settings, Megaphone, Tag } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const PortfolioDemoSection = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Premium Plan", price: 299 },
    { id: 2, name: "Starter Kit", price: 99 },
  ]);
  const [sales, setSales] = useState(1450);
  const [isSyncing, setIsSyncing] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const [isSaleActive, setIsSaleActive] = useState(false);

  // Dark Theme Colors
  const themeColors = {
    primary: {
      bg: 'bg-[#A590BF]',
      text: 'text-[#A590BF]',
      border: 'border-[#A590BF]/30',
      headerBg: 'bg-gradient-to-r from-[#A590BF] to-purple-500',
      hover: 'hover:bg-[#A590BF]/10'
    }
  };
  const [appTheme, setAppTheme] = useState('primary');
  const currentTheme = themeColors[appTheme];

  // Toast Style
  const toastStyle = {
    borderRadius: '12px',
    background: '#0D0515',
    color: '#fff',
    border: '1px solid rgba(165,144,191,0.2)',
    boxShadow: '0 0 20px rgba(165,144,191,0.2)'
  };

  const triggerSync = (actionMessage, icon = '📡') => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      if (actionMessage) {
        toast.success(actionMessage, { icon, style: toastStyle });
      }
    }, 600);
  };

  const addProduct = (name, price) => {
    const newP = { id: Date.now(), name, price: Number(price) };
    triggerSync(`Broadcasting ${name}...`);
    setTimeout(() => setProducts(prev => [newP, ...prev]), 600);
  };

  const buyProduct = (product) => {
    const finalPrice = isSaleActive ? Math.round(product.price * 0.8) : product.price;
    setIsSyncing(true);
    setTimeout(() => {
      setSales(prev => prev + finalPrice);
      setIsSyncing(false);
      toast.success(`Transaction successful: $${finalPrice}`, { icon: '💰', style: toastStyle });
    }, 400);
  };

  return (
    <section id="work" className="relative py-24 px-6 md:px-8 bg-[#08030D] border-y border-[#A590BF]/20 overflow-hidden font-sans">
      <Toaster position="top-center" />

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#A590BF]/20 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-purple-500/20 blur-[120px] rounded-full" />
      </div>

      <div className="mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A590BF]/10 border border-[#A590BF]/20 text-[#A590BF] text-xs font-bold uppercase tracking-widest mb-4">
            <Zap size={14} className="text-amber-500" fill="currentColor" /> Live Demo
          </div>
          <h2 className={`text-4xl md:text-5xl font-black mb-4 tracking-tight flex justify-center gap-2 flex-wrap text-white`}>
            Seamless <span className={currentTheme.text}>Data Sync</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Experience real-time data synchronization between the admin dashboard and the live mobile app. Try pushing a new product or changing the theme!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start relative">
          
          {/* Admin Dashboard Side */}
          <div className="lg:col-span-3 bg-white/5 backdrop-blur-xl border border-[#A590BF]/20 shadow-xl rounded-3xl p-6 md:p-8 relative group">
             <div className="absolute -top-4 -left-4 p-3 bg-[#0D0515] rounded-2xl shadow-lg">
                <Server className="text-white" size={24} />
             </div>
             
             <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
                <h3 className="text-white font-bold text-xl ml-6">Admin Panel</h3>
                <div className="flex gap-6 bg-[#0D0515]/50 p-3 rounded-2xl border border-[#A590BF]/20">
                   <div className="text-center">
                      <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Total Revenue</p>
                      <p className="text-[#A590BF] font-mono text-xl font-bold">${sales}</p>
                   </div>
                   <div className="w-px bg-[#A590BF]/20"></div>
                   <div className="text-center">
                      <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Active Items</p>
                      <p className="text-[#A590BF] font-mono text-xl font-bold">{products.length}</p>
                   </div>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Product Form */}
                 <div className="bg-white/5 rounded-2xl p-6 border border-[#A590BF]/20 flex flex-col justify-between">
                    <h4 className="text-[#A590BF] text-sm font-semibold mb-4 flex items-center gap-2">
                       <Plus size={16} /> Push New Product
                    </h4>
                    <div className="space-y-4">
                       <input 
                          id="p-name" type="text" placeholder="Product Name..." 
                          className="w-full bg-[#0D0515] border border-[#A590BF]/20 rounded-xl px-4 py-3 text-white outline-none focus:border-[#A590BF] focus:ring-2 focus:ring-[#A590BF]/20 transition-all text-sm shadow-sm"
                       />
                       <div className="flex gap-3">
                          <input 
                             id="p-price" type="number" placeholder="Price..." 
                             className="w-1/3 bg-[#0D0515] border border-[#A590BF]/20 rounded-xl px-4 py-3 text-white outline-none focus:border-[#A590BF] focus:ring-2 focus:ring-[#A590BF]/20 transition-all text-sm shadow-sm"
                          />
                          <button 
                             onClick={() => {
                                const name = document.getElementById('p-name').value;
                                const price = document.getElementById('p-price').value;
                                if(name && price) {
                                   addProduct(name, price);
                                   document.getElementById('p-name').value = '';
                                   document.getElementById('p-price').value = '';
                                }
                             }}
                             className="flex-1 bg-[#A590BF] hover:bg-purple-500 text-white font-bold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 shadow-md text-sm"
                          >
                             Deploy
                          </button>
                       </div>
                    </div>
                 </div>

                 {/* App Controls */}
                 <div className="bg-white/5 rounded-2xl p-6 border border-[#A590BF]/20 space-y-5">
                    <h4 className="text-[#A590BF] text-sm font-semibold flex items-center gap-2">
                       <Settings size={16} /> Live App Controls
                    </h4>
                    
                    {/* Theme Picker */}
                    <div>
                        <p className="text-slate-400 text-[10px] uppercase font-bold mb-2">App Theme</p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => { setAppTheme('primary'); triggerSync(`Theme updated`, '🎨'); }}
                                className={`w-8 h-8 rounded-full border-2 transition-all border-[#A590BF] scale-110 shadow-md bg-[#A590BF]`}
                            />
                        </div>
                    </div>

                    {/* Flash Sale Toggle */}
                    <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-[#A590BF]/20 shadow-sm">
                        <div className="flex items-center gap-2">
                            <Tag size={14} className={isSaleActive ? "text-rose-500" : "text-slate-400"} />
                            <span className="text-sm font-medium text-slate-400">Flash Sale</span>
                        </div>
                        <button 
                            onClick={() => {
                                setIsSaleActive(!isSaleActive);
                                triggerSync(!isSaleActive ? 'Flash sale activated!' : 'Flash sale ended!');
                            }}
                            className={`w-12 h-6 rounded-full transition-colors relative ${isSaleActive ? 'bg-rose-500' : 'bg-slate-600'}`}
                        >
                            <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform shadow-sm ${isSaleActive ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>
                    </div>

                    {/* Announcement */}
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            placeholder="Type announcement..."
                            onChange={(e) => setAnnouncement(e.target.value)}
                            className="flex-1 bg-[#0D0515] border border-[#A590BF]/20 rounded-xl px-3 py-2 text-white outline-none focus:border-[#A590BF] focus:ring-2 focus:ring-[#A590BF]/20 transition-all text-xs shadow-sm"
                        />
                        <button onClick={() => triggerSync('Announcement broadcasted!', '📢')} className="bg-[#A590BF]/10 text-white px-3 rounded-xl hover:bg-[#A590BF]/20 transition-colors">
                            <Megaphone size={14} />
                        </button>
                    </div>
                 </div>
             </div>
          </div>

          {/* Connection Line (Desktop Only) */}
          <div className="hidden lg:flex absolute left-[60%] top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex-col items-center gap-2">
              <div className={`p-3 rounded-full border border-[#A590BF]/20 bg-[#0D0515] text-slate-400 shadow-xl transition-all duration-500 ${isSyncing ? `scale-125 border-[#A590BF]/40 text-white` : ''}`}>
                 <ArrowRightLeft size={24} className={isSyncing ? "animate-spin" : ""} />
              </div>
              <span className={`text-[10px] font-black tracking-widest uppercase transition-opacity duration-300 ${isSyncing ? 'opacity-100 text-[#A590BF]' : 'opacity-0'}`}>
                 SYNCING...
              </span>
          </div>

          {/* Mobile App Side */}
          <div className="lg:col-span-2 flex justify-center">
             <div className="w-[300px] h-[550px] bg-[#0D0515] rounded-[3rem] p-3 shadow-2xl border-[8px] border-[#A590BF]/20 relative overflow-hidden flex flex-col group transition-colors duration-500">
                {/* Mobile Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#A590BF]/10 rounded-b-2xl z-30"></div>
                
                <div className={`${currentTheme.headerBg} transition-colors duration-500 -m-3 mb-0 p-8 pt-12 rounded-b-[2rem] shadow-sm relative z-20`}>
                   <div className="flex justify-between items-center text-white">
                      <span className="font-bold tracking-tight text-xl">My Store</span>
                      <Smartphone size={18} className="opacity-90 text-white" />
                   </div>
                </div>

                <AnimatePresence>
                    {announcement && (
                        <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-amber-100 text-amber-800 text-[10px] font-bold text-center py-2 px-4 -mx-3 mb-2 shadow-sm z-10 flex items-center justify-center gap-2"
                        >
                            <Megaphone size={12} /> {announcement}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex-1 overflow-y-auto no-scrollbar space-y-3 pt-4 px-1">
                   <AnimatePresence initial={false}>
                      {products.map((p) => (
                        <motion.div 
                          key={p.id}
                          initial={{ opacity: 0, y: -20, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          className="bg-white/5 p-4 rounded-2xl border border-[#A590BF]/20 shadow-sm transition-all flex justify-between items-center hover:shadow-md hover:border-[#A590BF]/30"
                        >
                           <div>
                              <p className="font-bold text-white text-sm flex items-center gap-2">
                                  {p.name}
                                  {isSaleActive && <span className="bg-rose-100 text-rose-600 text-[8px] uppercase px-1.5 py-0.5 rounded font-black">SALE</span>}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                  <p className={`${currentTheme.text} font-black text-sm transition-colors`}>
                                      ${isSaleActive ? Math.round(p.price * 0.8) : p.price}
                                  </p>
                                  {isSaleActive && <p className="text-slate-400 line-through text-[10px]">${p.price}</p>}
                              </div>
                           </div>
                           <button 
                             onClick={() => buyProduct(p)}
                             className="bg-[#A590BF]/10 text-white p-2.5 rounded-xl border border-[#A590BF]/20 hover:bg-[#A590BF] hover:text-white transition-colors active:scale-90"
                           >
                              <ShoppingCart size={16} />
                           </button>
                        </motion.div>
                      ))}
                   </AnimatePresence>
                   
                   {products.length === 0 && (
                     <div className="h-full flex flex-col items-center justify-center opacity-50 py-12">
                        <Activity size={48} className="mb-4 text-slate-400" />
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No Products</p>
                     </div>
                   )}
                </div>

                {/* Mobile Bottom Bar */}
                <div className="bg-[#A590BF]/10 border-t border-[#A590BF]/20 -m-3 mt-auto p-4 flex justify-around items-center z-20">
                   <div className={`w-8 h-1 rounded-full ${currentTheme.bg}`}></div>
                   <div className="w-8 h-1 bg-[#A590BF]/20 rounded-full"></div>
                   <div className="w-8 h-1 bg-[#A590BF]/20 rounded-full"></div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PortfolioDemoSection;