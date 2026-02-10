import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ShoppingCart, Activity, Zap, Server, Smartphone, ArrowRightLeft } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const PortfolioDemoSection = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Premium Plan", price: 299 },
  ]);
  const [sales, setSales] = useState(1450);
  const [isSyncing, setIsSyncing] = useState(false);

  // دالة إضافة منتج من الداشبورد
  const addProduct = (name, price) => {
    setIsSyncing(true);
    const newP = { id: Date.now(), name, price: Number(price) };
    
    // محاكاة تأخير الشبكة (Latency)
    setTimeout(() => {
      setProducts(prev => [newP, ...prev]);
      setIsSyncing(false);
      toast.success(`Broadcasting "${name}" to Mobile App`, {
        icon: '📡',
        style: { borderRadius: '10px', background: '#1e293b', color: '#fff' },
      });
    }, 600);
  };

  // دالة الشراء من الموبايل
  const buyProduct = (product) => {
    setIsSyncing(true);
    setTimeout(() => {
      setSales(prev => prev + product.price);
      setIsSyncing(false);
      toast.success(`Transaction Verified: +$${product.price}`, {
        icon: '💰',
        style: { borderRadius: '10px', background: '#064e3b', color: '#fff' },
      });
    }, 400);
  };

  return (
    <section id="work" className="py-24 px-6 md:px-16 bg-[#020617] border-y border-slate-800/50 overflow-hidden">
      <Toaster position="top-center" />
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Zap size={14} fill="currentColor" /> Live System Demo
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">
            Seamless <span className="text-cyan-500">Data Sync</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
            اختبر دورة حياة البيانات: أضف منتجاً من لوحة الإدارة وشاهده يظهر فوراً في تطبيق المستخدم، 
            وعند الشراء، يتم تحديث التقارير المالية في التو واللحظة.
          </p>
        </div>

        {/* Interaction Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
          
          {/* 1. Admin Dashboard Side */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-sm relative group">
             <div className="absolute -top-4 -left-4 p-3 bg-cyan-600 rounded-2xl shadow-xl shadow-cyan-900/20">
                <Server className="text-white" size={24} />
             </div>
             
             <div className="flex justify-between items-center mb-8">
                <h3 className="text-white font-bold text-xl ml-6">Admin Panel</h3>
                <div className="flex gap-4">
                   <div className="text-center">
                      <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Total Sales</p>
                      <p className="text-emerald-400 font-mono text-xl font-bold">${sales}</p>
                   </div>
                   <div className="text-center">
                      <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Inventory</p>
                      <p className="text-cyan-400 font-mono text-xl font-bold">{products.length}</p>
                   </div>
                </div>
             </div>

             {/* Add Product Form */}
             <div className="bg-slate-950/50 rounded-2xl p-6 border border-slate-800">
                <h4 className="text-slate-300 text-sm font-semibold mb-4 flex items-center gap-2">
                   <Plus size={16} className="text-cyan-500" /> Push New Product
                </h4>
                <div className="space-y-4">
                   <input 
                      id="p-name" type="text" placeholder="Product Name..." 
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500 transition-all text-sm"
                   />
                   <div className="flex gap-3">
                      <input 
                        id="p-price" type="number" placeholder="Price $" 
                        className="w-1/3 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500 transition-all text-sm"
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
                        className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-cyan-900/20"
                      >
                         DEPLOY TO APP
                      </button>
                   </div>
                </div>
             </div>
          </div>

          {/* Connection Line (Desktop Only) */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex-col items-center gap-2">
              <div className={`p-3 rounded-full border border-slate-700 bg-slate-900 text-slate-400 shadow-2xl transition-all duration-500 ${isSyncing ? 'scale-125 border-cyan-500 text-cyan-400' : ''}`}>
                 <ArrowRightLeft size={24} className={isSyncing ? "animate-spin" : ""} />
              </div>
              <span className={`text-[10px] font-black tracking-widest uppercase transition-opacity duration-300 ${isSyncing ? 'opacity-100 text-cyan-500' : 'opacity-0'}`}>
                 Syncing...
              </span>
          </div>

          {/* 2. Mobile App Side */}
          <div className="flex justify-center">
             <div className="w-[300px] h-[550px] bg-white rounded-[3rem] p-4 shadow-2xl border-[10px] border-slate-900 relative overflow-hidden flex flex-col group">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-slate-900 rounded-b-2xl z-20"></div>
                
                {/* App Header */}
                <div className="bg-slate-900 -m-4 mb-4 p-8 pt-12 rounded-b-[2.5rem] shadow-lg relative z-10">
                   <div className="flex justify-between items-center text-white">
                      <span className="font-black italic tracking-tighter text-xl">NexusStore</span>
                      <Smartphone size={18} className="text-cyan-400 opacity-50" />
                   </div>
                </div>

                {/* Products List */}
                <div className="flex-1 overflow-y-auto no-scrollbar space-y-3 pt-2">
                   <AnimatePresence initial={false}>
                      {products.map((p) => (
                        <motion.div 
                          key={p.id}
                          initial={{ opacity: 0, y: -20, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:border-cyan-200 transition-all flex justify-between items-center group/item"
                        >
                           <div>
                              <p className="font-bold text-slate-800 text-sm">{p.name}</p>
                              <p className="text-cyan-600 font-black text-xs mt-0.5">${p.price}</p>
                           </div>
                           <button 
                             onClick={() => buyProduct(p)}
                             className="bg-slate-900 text-white p-2.5 rounded-xl hover:bg-cyan-600 transition-colors active:scale-90"
                           >
                              <ShoppingCart size={16} />
                           </button>
                        </motion.div>
                      ))}
                   </AnimatePresence>
                   
                   {products.length === 0 && (
                     <div className="h-full flex flex-col items-center justify-center opacity-20 py-12">
                        <Activity size={48} className="mb-4 text-slate-400" />
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No Active Data</p>
                     </div>
                   )}
                </div>

                {/* App Bottom Nav (Visual Only) */}
                <div className="bg-slate-50 border-t border-slate-100 -m-4 mt-auto p-4 flex justify-around items-center">
                   <div className="w-8 h-1 bg-slate-200 rounded-full"></div>
                   <div className="w-8 h-1 bg-slate-200 rounded-full"></div>
                   <div className="w-8 h-1 bg-slate-200 rounded-full"></div>
                </div>
             </div>
          </div>

        </div>

        {/* Legend / Workflow Steps */}
        <div className="mt-20 flex flex-wrap justify-center gap-8 opacity-50">
           <div className="flex items-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <span className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center text-cyan-400">01</span>
              Add via Dashboard
           </div>
           <ArrowRightLeft size={16} className="text-slate-800 hidden md:block" />
           <div className="flex items-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <span className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center text-cyan-400">02</span>
              Instant Mobile Sync
           </div>
           <ArrowRightLeft size={16} className="text-slate-800 hidden md:block" />
           <div className="flex items-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <span className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center text-cyan-400">03</span>
              Purchase & Update Revenue
           </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioDemoSection;