import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUpRight, FiPlus, FiX, FiMaximize2 } from 'react-icons/fi';

const PortfolioGallery = ({ t, data }) => {
  const [activeTab, setActiveTab] = useState('S');
  const [showAll, setShowAll] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null); // حالة الصورة المختارة للتكبير

  if (!data || !data[activeTab]) return null;

  const visibleImages = showAll ? data[activeTab] : [data[activeTab][0]];

  return (
    <section id="work" className="py-24 px-6 md:px-16 bg-[#020617] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div data-aos="fade-right">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('featured_work')}
            </h2>
            <p className="text-slate-400 max-w-md">
              {t('work_desc')}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex bg-slate-900/50 p-1.5 rounded-2xl border border-slate-800 backdrop-blur-sm" data-aos="fade-left">
            {['S', 'W'].map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setShowAll(false); }}
                className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 ${
                  activeTab === tab 
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20' 
                  : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab === 'S' ? (t('typeS')) : (t('typeW'))}
              </button>
            ))}
          </div>
        </div>

        {/* Grid System */}
        <div className="relative">
          <motion.div 
            layout
            className={`grid gap-6 ${
              showAll 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
            }`}
          >
            <AnimatePresence mode="popLayout">
              {visibleImages.map((img, index) => (
                <motion.div
                  key={`${activeTab}-${index}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  onClick={() => {
                    if (!showAll) {
                      setShowAll(true);
                    } else {
                      setSelectedImg(img); // تكبير الصورة إذا كان العرض مفعلاً بالفعل
                    }
                  }}
                  className={`relative group cursor-pointer overflow-hidden rounded-[2rem] border border-slate-800/50 bg-slate-900
                    ${!showAll ? 'h-[500px] w-full' : 'h-[350px]'} 
                    ${showAll && index === 0 ? 'md:col-span-2' : ''}`}
                >
                  <img
                    src={img}
                    alt="work"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80" />

                  <div className="absolute inset-0 p-8 flex flex-col justify-end transform transition-all duration-500">
                    {!showAll ? (
                      <div className="flex flex-col items-center justify-center h-full mb-12">
                        <motion.div 
                          animate={{ y: [0, -10, 0] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="w-20 h-20 bg-cyan-500 rounded-full flex items-center justify-center text-slate-950 text-3xl mb-6 shadow-2xl shadow-cyan-500/40"
                        >
                          <FiPlus />
                        </motion.div>
                        <h3 className="text-3xl md:text-4xl font-black text-white text-center">
                          {t('view_all_projects')}
                        </h3>
                      </div>
                    ) : (
                      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 backdrop-blur-md p-3 rounded-full text-white">
                        <FiMaximize2 size={20} />
                      </div>
                    )}

                    <div className={`flex justify-between items-center ${!showAll ? 'opacity-0' : 'opacity-100'}`}>
                       <div>
                          <p className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-1">{t('Portfolio')}</p>
                          <h4 className="text-xl font-bold text-white">{t("ProjectCaseStudy")}</h4>
                       </div>
                       <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white backdrop-blur-md group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-300">
                          <FiArrowUpRight size={24} />
                       </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {showAll && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center mt-12">
              <button 
                onClick={() => setShowAll(false)}
                className="group flex items-center gap-3 px-8 py-4 bg-slate-900 border border-slate-800 text-white rounded-2xl hover:border-cyan-500/50 transition-all"
              >
                <span className="font-bold text-sm tracking-widest uppercase">{t('show_less')}</span>
                <div className="w-6 h-6 bg-slate-800 rounded-full flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all">↑</div>
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Lightbox Modal - نافذة التكبير */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-10 backdrop-blur-xl"
            onClick={() => setSelectedImg(null)}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-8 right-8 text-white text-3xl z-[110] bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors"
              onClick={() => setSelectedImg(null)}
            >
              <FiX />
            </motion.button>

            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              src={selectedImg}
              alt="Project Full View"
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()} // منع إغلاق النافذة عند الضغط على الصورة نفسها
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioGallery;