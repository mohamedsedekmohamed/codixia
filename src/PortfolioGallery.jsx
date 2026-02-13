import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PortfolioGallery = ({ t, data }) => {
  const [activeTab, setActiveTab] = useState('S');

  // جلب صور القسم الحالي
  const currentData = data[activeTab] || [];

  return (
    <div id="services" className="py-24 bg-white font-sans border-y border-slate-800/50">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        
        {/* Header */}
        <header className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-[#020617] mb-4 tracking-tight"
          >
            {t("title")}
          </motion.h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">{t("subtitle")}</p>
        </header>

        {/* Modern Glassmorphism Tabs */}
        <div className="flex justify-center mb-16">
          <div className="p-1.5 rounded-2xl flex gap-2 shadow-xl bg-slate-50 border border-slate-200">
            {['S', 'W'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-10 py-3 rounded-xl font-bold transition-all duration-300 ${
                  activeTab === tab 
                  ? 'bg-[#020617] text-white shadow-lg' 
                  : 'text-slate-500 hover:text-[#020617] hover:bg-slate-200/50'
                }`}
              >
                {tab === 'S' ? t("typeS") : t("typeW")}
              </button>
            ))}
          </div>
        </div>

        {/* Static Image Grid with Animation on Tab Change */}
        <motion.div 
          layout
          // Grid متجاوب: عمود في الموبايل، 2 في التابلت، 3 في الشاشات الكبيرة
          // المسافات (gap) كبيرة لتعطي مساحة للصور
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
        >
          <AnimatePresence mode="wait">
            {currentData.map((img, index) => (
              <motion.div
                key={`${activeTab}-${index}`}
                // أنيميشن عند ظهور الصور لأول مرة أو عند تغيير التاب
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="relative group cursor-pointer"
              >
                {/* حاوية الصورة (Aspect Ratio 4/5) للحفاظ على الطول */}
                <div className="relative overflow-hidden rounded-3xl bg-slate-100 border border-slate-200 aspect-[4/5] shadow-xl hover:shadow-2xl transition-shadow duration-500">
                  <img
                    src={img}
                    alt={`Project ${index + 1}`}
                    loading="lazy"
                    // تأثير تكبير بسيط عند تمرير الماوس
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  
                  {/* Overlay الذي يظهر عند تمرير الماوس */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="text-white text-sm md:text-base font-bold uppercase tracking-widest block mb-3 shadow-black">
                        {activeTab === 'S' ? t("typeS") : t("typeW")}
                      </span>
                      <div className="w-12 h-1 bg-cyan-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
};

export default PortfolioGallery;