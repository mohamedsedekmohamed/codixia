import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ShoppingCart, Activity, Zap, Server, Smartphone, ArrowRightLeft, Settings, Megaphone, Tag } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next'; // استيراد دالة الترجمة

const PortfolioDemoSection = () => {
  const { t } = useTranslation(); // تهيئة دالة الترجمة

  const [products, setProducts] = useState([
    { id: 1, name: "Premium Plan", price: 299 },
    { id: 2, name: "Starter Kit", price: 99 },
  ]);
  const [sales, setSales] = useState(1450);
  const [isSyncing, setIsSyncing] = useState(false);

  const [appTheme, setAppTheme] = useState('cyan');
  const [announcement, setAnnouncement] = useState('');
  const [isSaleActive, setIsSaleActive] = useState(false);

  const themeColors = {
    cyan: { bg: 'bg-cyan-600', text: 'text-cyan-500', border: 'border-cyan-500', headerBg: 'bg-slate-900', hover: 'hover:bg-cyan-500' },
    purple: { bg: 'bg-purple-600', text: 'text-purple-500', border: 'border-purple-500', headerBg: 'bg-purple-950', hover: 'hover:bg-purple-500' },
    emerald: { bg: 'bg-emerald-600', text: 'text-emerald-500', border: 'border-emerald-500', headerBg: 'bg-emerald-950', hover: 'hover:bg-emerald-500' }
  };

  const currentTheme = themeColors[appTheme];

  const triggerSync = (actionMessage, icon = '📡') => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      if(actionMessage) {
        toast.success(actionMessage, {
          icon: icon,
          style: { borderRadius: '10px', background: '#1e293b', color: '#fff' },
        });
      }
    }, 600);
  };

  const addProduct = (name, price) => {
    const newP = { id: Date.now(), name, price: Number(price) };
    triggerSync(t('toast_broadcasting', { name }));
    setTimeout(() => setProducts(prev => [newP, ...prev]), 600);
  };

  const buyProduct = (product) => {
    const finalPrice = isSaleActive ? Math.round(product.price * 0.8) : product.price;
    setIsSyncing(true);
    setTimeout(() => {
      setSales(prev => prev + finalPrice);
      setIsSyncing(false);
      toast.success(t('toast_transaction', { price: finalPrice }), {
        icon: '💰',
        style: { borderRadius: '10px', background: '#064e3b', color: '#fff' },
      });
    }, 400);
  };

  return (
    <section id="work" className="py-24 px-6 md:px-8 bg-[#020617] border-y border-slate-800/50 overflow-hidden">
      <Toaster position="top-center" />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Zap size={14} fill="currentColor" /> {t('badge')}
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter flex justify-center gap-2 flex-wrap">
            {t('title_seamless')} <span className="text-cyan-500">{t('title_data_sync')}</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start relative">
          
          {/* Admin Dashboard Side */}
          <div className="lg:col-span-3 bg-slate-900/50 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-sm relative group">
             {/* استخدمنا -start-4 بدلاً من -left-4 لدعم اللغة العربية LTR/RTL */}
             <div className="absolute -top-4 -start-4 p-3 bg-cyan-600 rounded-2xl shadow-xl shadow-cyan-900/20">
                <Server className="text-white" size={24} />
             </div>
             
             <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
                <h3 className="text-white font-bold text-xl ms-6">{t('admin_panel')}</h3>
                <div className="flex gap-6 bg-slate-950/50 p-3 rounded-2xl border border-slate-800/50">
                   <div className="text-center">
                      <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">{t('total_revenue')}</p>
                      <p className="text-emerald-400 font-mono text-xl font-bold">${sales}</p>
                   </div>
                   <div className="w-px bg-slate-800"></div>
                   <div className="text-center">
                      <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">{t('active_items')}</p>
                      <p className="text-cyan-400 font-mono text-xl font-bold">{products.length}</p>
                   </div>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Product Form */}
                 <div className="bg-slate-950/50 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
                    <h4 className="text-slate-300 text-sm font-semibold mb-4 flex items-center gap-2">
                       <Plus size={16} className="text-cyan-500" /> {t('push_new_product')}
                    </h4>
                    <div className="space-y-4">
                       <input 
                          id="p-name" type="text" placeholder={t('product_name_placeholder')} 
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500 transition-all text-sm"
                       />
                       <div className="flex gap-3">
                          <input 
                             id="p-price" type="number" placeholder={t('price_placeholder')} 
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
                             className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-cyan-900/20 text-sm"
                          >
                             {t('deploy_btn')}
                          </button>
                       </div>
                    </div>
                 </div>

                 {/* App Controls */}
                 <div className="bg-slate-950/50 rounded-2xl p-6 border border-slate-800 space-y-5">
                    <h4 className="text-slate-300 text-sm font-semibold flex items-center gap-2">
                       <Settings size={16} className="text-cyan-500" /> {t('live_app_controls')}
                    </h4>
                    
                    {/* Theme Picker */}
                    <div>
                        <p className="text-slate-500 text-[10px] uppercase font-bold mb-2">{t('app_theme')}</p>
                        <div className="flex gap-2">
                            {['cyan', 'purple', 'emerald'].map(color => (
                                <button
                                    key={color}
                                    onClick={() => { setAppTheme(color); triggerSync(t('toast_theme', { color }), '🎨'); }}
                                    className={`w-8 h-8 rounded-full border-2 transition-all ${appTheme === color ? 'border-white scale-110' : 'border-transparent opacity-50 hover:opacity-100'} ${color === 'cyan' ? 'bg-cyan-500' : color === 'purple' ? 'bg-purple-500' : 'bg-emerald-500'}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Flash Sale Toggle */}
                    <div className="flex items-center justify-between bg-slate-900 p-3 rounded-xl border border-slate-700">
                        <div className="flex items-center gap-2">
                            <Tag size={14} className={isSaleActive ? "text-rose-500" : "text-slate-400"} />
                            <span className="text-sm font-medium text-slate-300">{t('flash_sale')}</span>
                        </div>
                        <button 
                            onClick={() => {
                                setIsSaleActive(!isSaleActive);
                                triggerSync(!isSaleActive ? t('toast_sale_active') : t('toast_sale_ended'));
                            }}
                            className={`w-12 h-6 rounded-full transition-colors relative ${isSaleActive ? 'bg-rose-500' : 'bg-slate-700'}`}
                        >
                            {/* استخدمنا ltr/rtl للتحكم في اتجاه الزر */}
                            <span className={`absolute top-1 start-1 w-4 h-4 rounded-full bg-white transition-transform ${isSaleActive ? 'ltr:translate-x-6 rtl:-translate-x-6' : 'translate-x-0'}`} />
                        </button>
                    </div>

                    {/* Announcement */}
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            placeholder={t('announce_placeholder')}
                            onChange={(e) => setAnnouncement(e.target.value)}
                            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-500 transition-all text-xs"
                        />
                        <button onClick={() => triggerSync(t('toast_banner'), '📢')} className="bg-slate-800 text-white px-3 rounded-xl hover:bg-slate-700 transition-colors">
                            <Megaphone size={14} />
                        </button>
                    </div>
                 </div>
             </div>
          </div>

          {/* Connection Line (Desktop Only) */}
          <div className="hidden lg:flex absolute start-[60%] top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex-col items-center gap-2">
              <div className={`p-3 rounded-full border border-slate-700 bg-slate-900 text-slate-400 shadow-2xl transition-all duration-500 ${isSyncing ? `scale-125 border-cyan-500 text-cyan-400` : ''}`}>
                 <ArrowRightLeft size={24} className={isSyncing ? "animate-spin" : ""} />
              </div>
              <span className={`text-[10px] font-black tracking-widest uppercase transition-opacity duration-300 ${isSyncing ? 'opacity-100 text-cyan-500' : 'opacity-0'}`}>
                 {t('syncing')}
              </span>
          </div>

          {/* Mobile App Side */}
          <div className="lg:col-span-2 flex justify-center">
             <div className="w-[300px] h-[550px] bg-slate-50 rounded-[3rem] p-4 shadow-2xl border-[10px] border-slate-900 relative overflow-hidden flex flex-col group transition-colors duration-500">
                <div className="absolute top-0 start-1/2 rtl:translate-x-1/2 ltr:-translate-x-1/2 w-28 h-6 bg-slate-900 rounded-b-2xl z-30"></div>
                
                <div className={`${currentTheme.headerBg} transition-colors duration-500 -m-4 mb-0 p-8 pt-12 rounded-b-[2rem] shadow-lg relative z-20`}>
                   <div className="flex justify-between items-center text-white">
                      <span className="font-black italic tracking-tighter text-xl">{t('store_name')}</span>
                      <Smartphone size={18} className={`${currentTheme.text} opacity-80`} />
                   </div>
                </div>

                <AnimatePresence>
                    {announcement && (
                        <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-amber-100 text-amber-900 text-[10px] font-bold text-center py-2 px-4 -mx-4 mb-2 shadow-sm z-10 flex items-center justify-center gap-2"
                        >
                            <Megaphone size={12} /> {announcement}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex-1 overflow-y-auto no-scrollbar space-y-3 pt-4">
                   <AnimatePresence initial={false}>
                      {products.map((p) => (
                        <motion.div 
                          key={p.id}
                          initial={{ opacity: 0, y: -20, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          className={`bg-white p-4 rounded-2xl border border-slate-200 shadow-sm transition-all flex justify-between items-center group/item hover:border-slate-300`}
                        >
                           <div>
                              <p className="font-bold text-slate-800 text-sm flex items-center gap-2">
                                  {p.name}
                                  {isSaleActive && <span className="bg-rose-100 text-rose-600 text-[8px] uppercase px-1.5 py-0.5 rounded font-black">{t('sale_badge')}</span>}
                              </p>
                              <div className="flex items-center gap-2 mt-0.5">
                                  <p className={`${currentTheme.text} font-black text-xs transition-colors`}>
                                      ${isSaleActive ? Math.round(p.price * 0.8) : p.price}
                                  </p>
                                  {isSaleActive && <p className="text-slate-400 line-through text-[10px]">${p.price}</p>}
                              </div>
                           </div>
                           <button 
                             onClick={() => buyProduct(p)}
                             className={`bg-slate-900 text-white p-2.5 rounded-xl ${currentTheme.hover} transition-colors active:scale-90`}
                           >
                              <ShoppingCart size={16} />
                           </button>
                        </motion.div>
                      ))}
                   </AnimatePresence>
                   
                   {products.length === 0 && (
                     <div className="h-full flex flex-col items-center justify-center opacity-40 py-12">
                        <Activity size={48} className="mb-4 text-slate-400" />
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{t('no_data')}</p>
                     </div>
                   )}
                </div>

                <div className="bg-white border-t border-slate-100 -m-4 mt-auto p-4 flex justify-around items-center z-20">
                   <div className={`w-8 h-1 rounded-full ${currentTheme.bg}`}></div>
                   <div className="w-8 h-1 bg-slate-200 rounded-full"></div>
                   <div className="w-8 h-1 bg-slate-200 rounded-full"></div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PortfolioDemoSection;