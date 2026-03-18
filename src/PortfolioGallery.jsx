import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUpRight, FiPlus, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const PortfolioGallery = ({ t, data }) => {
  const [activeTab, setActiveTab] = useState('S');
  const [showAll, setShowAll] = useState(false);
  const [selectedImgIndex, setSelectedImgIndex] = useState(null);

  if (!data || !data[activeTab]) return null;

  const currentImages = data[activeTab];
  const visibleImages = showAll ? currentImages : [currentImages[0]];

  const showNext = (e) => {
    e.stopPropagation();
    setSelectedImgIndex((prev) => (prev + 1) % currentImages.length);
  };

  const showPrev = (e) => {
    e.stopPropagation();
    setSelectedImgIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  };

  return (
    <section id="work" className="py-24 px-6 md:px-16 bg-[#08030D] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-[#A590BF]/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-80px] right-[-60px] w-[300px] h-[300px] bg-cyan-500/20 blur-[100px] rounded-full animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div data-aos="fade-up">
            <h2 className="text-5xl font-black text-white mb-4 tracking-tight">
              {t('featured_work')}
            </h2>
            <div className="h-1.5 w-20 bg-[#A590BF] rounded-full mb-4"></div>
            <p className="text-slate-400 max-w-md text-lg leading-relaxed">
              {t('work_desc')}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex p-1 bg-[#08030D]/80 backdrop-blur-md rounded-2xl border border-[#A590BF]/20 shadow-2xl">
            {['S', 'W'].map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setShowAll(false); }}
                className={`px-10 py-3.5 rounded-xl font-bold transition-all duration-500 text-sm tracking-widest uppercase ${
                  activeTab === tab 
                    ? 'bg-[#A590BF] text-[#08030D] shadow-[0_0_20px_rgba(165,144,191,0.4)]' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab === 'S' ? t('typeS') : t('typeW')}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="relative">
          <motion.div 
            layout
            className={`grid gap-8 ${
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
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.4 }}
                  transition={{ duration: 0.6, ease: "circOut" }}
                  onClick={() => {
                    if (!showAll) setShowAll(true);
                    else setSelectedImgIndex(index);
                  }}
                  className={`relative group cursor-pointer overflow-hidden rounded-[2.5rem] border border-[#A590BF]/20 bg-[#0b0b1f] shadow-2xl
                    ${!showAll ? 'aspect-[21/9] w-full min-h-[400px]' : 'aspect-[4/3]'} 
                    ${showAll && index === 0 ? 'md:col-span-2 aspect-auto md:aspect-[16/7]' : ''}`}
                >
                  <img
                    src={img}
                    alt="work"
                    className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-110"
                  />

                  {/* Glass Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08030D] via-[#08030D]/20 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />

                  <div className="absolute inset-0 p-10 flex flex-col justify-end">
                    {!showAll ? (
                      <div className="flex flex-col items-center justify-center h-full space-y-6">
                        <div className="w-24 h-24 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-[#A590BF] text-4xl shadow-2xl">
                          <FiPlus />
                        </div>
                        <h3 className="text-4xl md:text-5xl font-black text-white text-center tracking-tighter">
                          {t('view_all_projects')}
                        </h3>
                      </div>
                    ) : (
                      <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 flex justify-between items-end">
                        <div></div>
                        <div className="w-14 h-14 rounded-2xl bg-white text-[#08030D] flex items-center justify-center shadow-xl group-hover:bg-[#A590BF] group-hover:text-[#08030D] transition-colors duration-300">
                          <FiArrowUpRight size={28} />
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Show Less Button */}
          {showAll && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center mt-20">
              <button 
                onClick={() => setShowAll(false)}
                className="group relative flex items-center gap-4 px-12 py-5 bg-transparent border-2 border-[#A590BF] text-white rounded-2xl overflow-hidden transition-all hover:border-cyan-500"
              >
                <span className="relative z-10 font-black text-sm tracking-[0.3em] uppercase">{t('show_less')}</span>
                <div className="relative z-10 w-8 h-8 bg-[#08030D] rounded-full flex items-center justify-center group-hover:bg-[#A590BF] group-hover:text-[#08030D] transition-all">↑</div>
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImgIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-2xl px-4"
            onClick={() => setSelectedImgIndex(null)}
          >
            <button className="absolute top-10 right-10 text-white/50 hover:text-white text-4xl p-2 transition-colors" onClick={() => setSelectedImgIndex(null)}>
              <FiX />
            </button>

            <button className="absolute left-6 md:left-12 w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white text-3xl hover:bg-white/10 transition-all" onClick={showPrev}>
              <FiChevronLeft />
            </button>
            <button className="absolute right-6 md:right-12 w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white text-3xl hover:bg-white/10 transition-all" onClick={showNext}>
              <FiChevronRight />
            </button>

            <motion.div 
              className="max-w-6xl max-h-[85vh] relative"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
               <img
                src={currentImages[selectedImgIndex]}
                alt="Full View"
                className="w-full h-full object-contain rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)]"
              />
              <div className="absolute -bottom-12 left-0 right-0 text-center text-slate-500 font-mono text-sm">
                PROJECT {selectedImgIndex + 1} / {currentImages.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioGallery;