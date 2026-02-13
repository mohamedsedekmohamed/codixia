import React, { useEffect, useState,useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';import { useTranslation } from 'react-i18next';
import { FiCode, FiCpu, FiLayers, FiArrowRight, FiMail, FiPhone, FiMapPin, FiGlobe, FiMenu, FiX, FiInstagram, FiFacebook, FiLinkedin } from 'react-icons/fi';
import { SiJavascript, SiReact, SiTailwindcss, SiFigma, SiNodedotjs, SiPython, SiTiktok } from 'react-icons/si';
import AOS from 'aos';
import 'aos/dist/aos.css';
import emailjs from '@emailjs/browser'; // 2. استيراد المكتبة
import toast, { Toaster } from 'react-hot-toast';
import PortfolioDemoSection from './DashboardScreen';


import s1 from './assets/s1.png';
import s2 from './assets/s2.png';
import s3 from './assets/s3.png';
import s4 from './assets/s4.png';
import s5 from './assets/s5.png';
import s6 from './assets/s6.png';
// import s7 from './assets/s7.png';
import w1 from './assets/w1.png';
import w2 from './assets/w2.png';
import w3 from './assets/w3.png';
import w4 from './assets/w4.png';
import w5 from './assets/w5.png';
import w6 from './assets/w6.png'; 
// import w7 from './assets/w7.png';
// import w8 from './assets/w8.png';
import PortfolioGallery from './PortfolioGallery';
import { FaWhatsapp } from "react-icons/fa";

const App = () => {
// const [activeTab, setActiveTab] = useState('S');
const data = {
    S: [s5,s2,s1,  s3, s4,  s6],
    W: [w5,w2,w1,  w3, w4,  w6]
  };
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
const [isOpen, setIsOpen] = useState(false); // حالة القائمة الجانبية
  useEffect(() => {
    // 2. تشغيل المكتبة مع إعدادات مخصصة
    AOS.init({
      duration: 1000, // مدة الحركة بالملي ثانية
      once: true,     // الحركة تحدث مرة واحدة فقط أثناء التمرير لأسفل
      offset: 100,    // المسافة قبل بدء الحركة
    });
    
    document.dir = isRtl ? 'rtl' : 'ltr';
  }, [isRtl]);

  const toggleLanguage = () => {
    i18n.changeLanguage(isRtl ? 'en' : 'ar');
  };
const form = useRef(); 
const sendEmail = (e) => {
  e.preventDefault();
  
  const loadingToast = toast.loading(isRtl ? 'جاري الإرسال...' : 'Sending message...');
    emailjs.sendForm(
      'service_j1600ac', 
      'template_vzg7n7l', 
      form.current, 
      'qma7w3771APtoKwzb'
    )
    .then(() => {
        // 2. نجاح الإرسال: تغيير الرسالة لموجبة
        toast.success(isRtl ? 'تم الإرسال بنجاح!' : 'Message sent successfully!', {
          id: loadingToast,
        });
        
        // 3. مسح الداتا بعد الارسال
        form.current.reset(); 
    }, (error) => {
        // 4. فشل الإرسال: تغيير الرسالة لخطأ
        toast.error(isRtl ? 'عذراً، فشل الإرسال.' : 'Failed to send: ' + error.text, {
          id: loadingToast,
        });
    });
  };

const socialLinks = [
    { id: 1, icon: <FiInstagram />, url: "https://www.instagram.com/codixia.tech", label: "Instagram" },
    { id: 2, icon: <FiFacebook />, url: "https://www.facebook.com/share/14aQoFR8joe/", label: "Facebook" },
    { id: 3, icon: <FiLinkedin />, url: "https://www.linkedin.com/company/codixia-tech/", label: "LinkedIn" },
    { id: 4, icon: <SiTiktok />, url: "https://tiktok.com/@codixia.tech", label: "TikTok" },
  ];
  const navItems = [
    { name: t('nav_services'), href: "#services" },
    { name: t('nav_work'), href: "#work" },
    { name: t('nav_contact'), href: "#contact" },
  ];
  return (
  <div className={`min-h-screen relative bg-[#020617] text-slate-200 font-sans selection:bg-cyan-500/30 overflow-x-hidden ${isRtl ? 'font-arabic' : ''}`}>
     
       <a
      href="https://wa.me/201221278019" // ✏️ غيّر الرقم
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-2xl"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={28} />
    </a>
      <Toaster position="top-center" reverseOrder={false} />
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-16 py-5 border-b border-slate-800/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="text-2xl font-black tracking-tighter text-white">CODIXIA<span className="text-cyan-500">.</span></div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 text-sm font-medium text-slate-400">
          {navItems.map((item) => (
            <a key={item.name} href={item.href} className="hover:text-cyan-400 transition-colors">{item.name}</a>
          ))}
        </div>

        <div className="flex gap-4 items-center">
          <button onClick={toggleLanguage} className="hidden md:flex text-cyan-400 items-center gap-1 text-sm border border-cyan-500/20 px-3 py-1 rounded-md hover:bg-cyan-500/10 transition">
            <FiGlobe /> {isRtl ? 'English' : 'العربية'}
          </button>
          
          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(true)} className="md:hidden text-2xl text-white p-2">
            <FiMenu />
          </button>
        </div>
      </nav>

      {/* Sidebar Overlay & Content */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* الخلفية المظلمة */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            
            {/* الـ Sidebar نفسه */}
            <motion.div 
              initial={{ x: isRtl ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRtl ? '100%' : '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed top-0 ${isRtl ? 'right-0' : 'left-0'} h-full w-[280px] bg-[#020617] border-x border-slate-800 z-[70] p-8 flex flex-col`}
            >
              <div className="flex justify-between items-center mb-12">
                <div className="text-xl font-black text-white">CODIXIA<span className="text-cyan-500">.</span></div>
                <button onClick={() => setIsOpen(false)} className="text-2xl text-slate-400 hover:text-white"><FiX /></button>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-6 mb-auto">
                {navItems.map((item) => (
                  <a 
                    key={item.name} 
                    href={item.href} 
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-semibold text-slate-300 hover:text-cyan-400 transition-all"
                  >
                    {item.name}
                  </a>
                ))}
                <button onClick={toggleLanguage} className="flex text-cyan-400 items-center gap-2 text-sm mt-4">
                  <FiGlobe /> {isRtl ? 'English Version' : 'النسخة العربية'}
                </button>
              </div>

              {/* Social links at the bottom of sidebar */}
              <div className="flex gap-5 text-xl text-slate-500 pt-8 border-t border-slate-800">
                {socialLinks.map((link) => (
                  <a key={link.id} href={link.url} target="_blank" rel="noreferrer" className="hover:text-cyan-400">
                    {link.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* بقية محتوى الصفحة (Hero, Stats, etc.) كما هو... */}
      <main>
          {/* Hero Section */}
   

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-6 md:px-16 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full -z-10" />
        <div data-aos="fade-up"> {/* تطبيق AOS هنا */}
          <span className="px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-6 inline-block">
            {t('hero_badge')}
          </span>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tight leading-tight">
            {t('hero_title_1')} <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">{t('hero_title_2')}</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            {t('hero_desc')}
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-5">
            <button className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-10 py-4 rounded-xl font-bold transition-all transform hover:scale-105">
              {t('btn_start')}
            </button>
          </div>
        </div>
      </section>

      {/* Stats - Animations */}
      <section className="py-12 border-y border-slate-800/50 bg-slate-900/20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[{ label: t('stat_projects'), val: '150+' }, { label: t('stat_clients'), val: '80+' }, { label: t('stat_experts'), val: '25+' }, { label: t('stat_rate'), val: '99%' }].map((stat, i) => (
            <div key={i} data-aos="zoom-in" data-aos-delay={i * 100}>
              <div className="text-3xl font-bold text-white mb-1">{stat.val}</div>
              <div className="text-slate-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section  className="py-32 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20" data-aos={isRtl ? "fade-left" : "fade-right"}>
            <h2 className="text-4xl font-bold text-white mb-4">{t('services_title')}</h2>
            <div className={`h-1 w-20 bg-cyan-500`}></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div data-aos="fade-up" data-aos-delay="100">
              <ServiceCard icon={<FiCode />} title={t('service_1_title')} desc={t('service_1_desc')} />
            </div>
            <div data-aos="fade-up" data-aos-delay="200">
              <ServiceCard icon={<FiLayers />} title={t('service_2_title')} desc={t('service_2_desc')} />
            </div>
            <div data-aos="fade-up" data-aos-delay="300">
              <ServiceCard icon={<FiCpu />} title={t('service_3_title')} desc={t('service_3_desc')} />
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio with AOS */}
   <PortfolioDemoSection/>
<PortfolioGallery  t={t} data={data}/>


<section id="contact" className="py-32 px-6 md:px-16">
      <div data-aos="zoom-out-up" className="max-w-6xl mx-auto bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-10 md:p-20 border border-slate-700/50 shadow-2xl relative">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">{t('contact_title')}</h2>
            <div className="space-y-6">
              <ContactInfo icon={<FiPhone />} text="+20 155 062 2443" />
              <ContactInfo icon={<FiMail />} text="codixiatech@gmail.com" />
            </div>
          </div>

          {/* 4. إضافة ref و onSubmit للفورم */}
          <form ref={form} onSubmit={sendEmail} className="space-y-4">
            
            {/* 5. إضافة name="user_name" لتطابق الـ Template */}
            <input 
              name="user_name"
              type="text" 
              required
              placeholder={t('form_name')} 
              className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-5 py-4 text-white outline-none focus:border-cyan-500 transition" 
            />
            <input 
              name="user_email"
              type="email" 
              required
              placeholder={t('form_email')} 
              className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-5 py-4 text-white outline-none focus:border-cyan-500 transition" 
            />
            
         <input 
  name="user_phone"
  type="number" 
  required
  placeholder={t('form_phone') || "رقم الهاتف"} 
  className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-5 py-4 text-white outline-none focus:border-cyan-500 transition 
             [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
/>

            {/* 7. إضافة name="message" لتطابق الـ Template */}
            <textarea 
              name="message"
              required
              placeholder={t('form_message') || "رسالتك"} 
              rows="4"
              className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-5 py-4 text-white outline-none focus:border-cyan-500 transition resize-none"
            ></textarea>

            <button type="submit" className="w-full bg-white text-slate-900 font-bold py-4 rounded-xl hover:bg-cyan-400 transition">
              {t('btn_send')}
            </button>
          </form>
        </div>
      </div>
    </section>

    <footer className="py-16 px-6 md:px-16 border-t border-slate-800/50 bg-slate-950/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-start">
            <div className="text-2xl font-black text-white mb-2">CODIXIA<span className="text-cyan-500"></span></div>
            <p className="text-slate-500 text-sm max-w-xs">{t('hero_desc')}</p>
          </div>

          {/* Social Icons in Footer */}
          <div className="flex gap-6 text-2xl">
            {socialLinks.map((link) => (
              <motion.a 
                whileHover={{ scale: 1.2, color: '#22d3ee' }}
                key={link.id} 
                href={link.url} 
                target="_blank" 
                rel="noreferrer" 
                className="text-slate-400 transition-colors"
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-800/30 text-center text-slate-600 text-xs">
          <p>&copy; 2026 CODIXIA. {isRtl ? 'جميع الحقوق محفوظة' : 'All rights reserved.'}</p>
        </div>
      </footer>
      </main>
    </div>
  );
};

// مكونات فرعية معدلة
const ProjectCard = ({ project, isRtl }) => (
  <motion.div whileHover={{ y: -10 }} className="group relative overflow-hidden rounded-3xl bg-slate-800 border border-slate-700/50 aspect-video cursor-pointer">
    <img src={project.img} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60" />
    <div className={`absolute inset-0 bg-gradient-to-t ${project.color} to-transparent opacity-60`} />
    <div className="absolute bottom-0 p-8 w-full">
      <span className="text-cyan-400 text-sm font-bold uppercase mb-2 block">{project.category}</span>
      <div className="flex justify-between items-end">
        <h3 className="text-2xl font-bold text-white">{project.title}</h3>
        <div className="bg-white/10 p-3 rounded-full text-white"><FiArrowRight className={isRtl ? "rotate-180" : ""} /></div>
      </div>
    </div>
  </motion.div>
);

const ServiceCard = ({ icon, title, desc }) => (
  <div className="p-10 rounded-3xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all h-full">
    <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-3xl text-cyan-400 mb-8">{icon}</div>
    <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{desc}</p>
  </div>
);

const ContactInfo = ({ icon, text }) => (
  <div className="flex flex-row items-center gap-4 text-slate-300">
    <div className="w-10 h-10 shrink-0 bg-slate-800 rounded-lg flex items-center justify-center text-cyan-400">
      {icon}
    </div>
  
    <span className="text-sm md:text-base whitespace-nowrap" dir="ltr">
      {text}
    </span>
  </div>

);

export default App;