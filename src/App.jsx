import React, { useEffect, useState,useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';import { useTranslation } from 'react-i18next';
import { FiCode, FiCpu, FiLayers, FiArrowRight, FiMail, FiPhone, FiMapPin, FiGlobe ,FiMessageCircle , FiMenu, FiX, FiInstagram, FiFacebook, FiLinkedin } from 'react-icons/fi';
import { SiJavascript, SiReact, SiTailwindcss, SiFigma, SiNodedotjs, SiPython, SiTiktok  } from 'react-icons/si';
import AOS from 'aos';
import 'aos/dist/aos.css';
import emailjs from '@emailjs/browser'; // 2. استيراد المكتبة
import toast, { Toaster } from 'react-hot-toast';
import PortfolioDemoSection from './DashboardScreen';
import { FiBriefcase } from "react-icons/fi";
import CountUpLib from "react-countup";
import { FaWhatsapp } from "react-icons/fa";
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
    { name: t('nav_Home'), href: "#home", icon: <FiLayers /> },
  { name: t('nav_services'), href: "#services", icon: <FiLayers /> },
  { name: t('nav_work'), href: "#work", icon: <FiBriefcase /> },
  { name: t('nav_contact'), href: "#contact", icon: <FiMail /> },
];
  
  return (
  <div className={`min-h-screen relative bg-[#A590BF]/50 text-slate-200 font-sans selection:bg-cyan-500/30 overflow-hidden ${isRtl ? 'font-arabic' : ''}`}>
     
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

  <section  className="flex justify-between items-center w-full  px-6 md:px-16 py-5 
bg-[#08030D]/70 backdrop-blur-2xl 
border-b border-[#A590BF]/20 
fixed top-0 z-50">

  {/* Logo */}
  <div className="text-2xl font-black tracking-tight text-white flex items-center gap-1">
    CODIXIA
    <span className="text-[#A590BF] animate-pulse">.</span>
  </div>

  {/* Desktop Menu */}
  <div className="hidden md:flex gap-8 text-sm font-medium text-slate-300">

  {navItems.map((item, index) => (
    <motion.a
      key={item.name}
      href={item.href}
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative flex items-center gap-2 group px-2 py-1"
    >

      {/* Icon */}
      <span className="text-lg group-hover:text-[#A590BF] transition">
        {item.icon}
      </span>

      {/* Text */}
      <span className="group-hover:text-[#A590BF] transition">
        {item.name}
      </span>

      {/* Animated underline */}
      <span className="absolute left-0 -bottom-1 w-0 h-[2px] 
      bg-gradient-to-r from-[#A590BF] to-purple-400
      group-hover:w-full transition-all duration-300"></span>

      {/* Glow */}
      <span className="absolute inset-0 rounded-md opacity-0 
      group-hover:opacity-100 
      bg-[#A590BF]/10 blur-md transition"></span>

    </motion.a>
  ))}

</div>

  {/* Actions */}
  <div className="flex gap-4 items-center">

    {/* Language Button */}
    <button
      onClick={toggleLanguage}
      className="hidden md:flex items-center gap-2 text-sm 
      border border-[#A590BF]/30 
      bg-gradient-to-r from-[#A590BF]/10 to-transparent
      px-4 py-2 rounded-xl 
      hover:scale-105 hover:bg-[#A590BF]/20 
      transition-all duration-300"
    >
      <FiGlobe className="text-lg" />
      {isRtl ? 'English' : 'العربية'}
    </button>

    {/* Mobile Menu */}
    <button
      onClick={() => setIsOpen(true)}
      className="md:hidden text-2xl text-white p-2 
      hover:text-[#A590BF] hover:scale-110 
      transition-all duration-300"
    >
      <FiMenu />
    </button>

  </div>
</section>

     <AnimatePresence>
  {isOpen && (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-md z-[60]"
      />

      {/* Sidebar */}
      <motion.div
        initial={{ x: isRtl ? '100%' : '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: isRtl ? '100%' : '-100%' }}
        transition={{ type: 'spring', stiffness: 180, damping: 22 }}
        className={`fixed top-0 ${isRtl ? 'right-0' : 'left-0'} 
        h-full w-[300px] 
        bg-gradient-to-b from-[#08030D] to-[#12071A] 
        border-x border-[#A590BF]/20 
        shadow-[0_0_40px_rgba(165,144,191,0.2)] 
        z-[70] p-8 flex flex-col`}
      >

        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="text-xl font-black text-white">
            CODIXIA<span className="text-[#A590BF]">.</span>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="text-2xl text-slate-400 hover:text-[#A590BF] transition"
          >
            <FiX />
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-6 mb-auto">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="text-lg font-semibold text-slate-300 
              hover:text-[#A590BF] 
              hover:translate-x-2 
              transition-all duration-300"
            >
              {item.name}
            </motion.a>
          ))}

          {/* Language */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-[#A590BF] mt-6 
            hover:scale-105 transition"
          >
            <FiGlobe />
            {isRtl ? 'English Version' : 'النسخة العربية'}
          </button>
        </div>

        {/* Social */}
        <div className="flex gap-5 text-xl text-slate-500 pt-8 border-t border-[#A590BF]/20">
          {socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#A590BF] hover:scale-125 transition-all duration-300"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>

      <main>
          {/* Hero Section */}
   

      {/* Hero Section */}
  <section  id='home' className="relative overflow-hidden py-28 px-6 md:px-16 text-center bg-[#08030D]">

  {/* 🔮 Animated Glow Background */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[900px] h-[500px] 
    bg-[#A590BF]/20 blur-[140px] rounded-full animate-pulse" />

    <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] 
    bg-purple-500/20 blur-[120px] rounded-full animate-[spin_20s_linear_infinite]" />
  </div>

  {/* ✨ Content */}
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >

    {/* Badge */}
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className="px-5 py-2 rounded-full border border-[#A590BF]/30 
      bg-[#A590BF]/10 text-[#A590BF] text-xs font-bold tracking-widest uppercase mb-6 inline-block backdrop-blur-md"
    >
      {t('hero_badge')}
    </motion.span>

    {/* Title */}
    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight leading-tight"
    >
      {t('hero_title_1')} <br />

      <span className="relative inline-block">
        <span className="bg-gradient-to-r from-[#A590BF] via-purple-400 to-indigo-400 
        bg-clip-text text-transparent animate-gradient">
          {t('hero_title_2')}
        </span>

        {/* glow underline */}
        <span className="absolute left-0 bottom-0 w-full h-[2px] 
        bg-gradient-to-r from-[#A590BF] to-transparent blur-sm"></span>
      </span>
    </motion.h1>

    {/* Description */}
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
    >
      {t('hero_desc')}
    </motion.p>

    {/* Buttons */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="flex flex-col md:flex-row justify-center gap-5"
    >

     <button
  onClick={() => {
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
    });
  }}
  className="relative px-10 py-4 rounded-xl font-bold text-white 
  bg-gradient-to-r from-[#A590BF] to-purple-500 
  hover:scale-105 transition-all duration-300 
  shadow-[0_0_25px_#A590BF]"
>
  <span className="relative z-10">{t('btn_start')}</span>

  {/* glow */}
  <span className="absolute inset-0 rounded-xl bg-[#A590BF]/30 blur-lg opacity-0 hover:opacity-100 transition"></span>
</button>

    </motion.div>

  </motion.div>
</section>


<section className="relative py-16 bg-[#08030D] overflow-hidden border-y border-[#A590BF]/20">

  {/* 🔮 Background Glow */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute left-1/2 -translate-x-1/2 top-[-80px] 
    w-[800px] h-[400px] bg-[#A590BF]/20 blur-[120px] rounded-full animate-pulse" />
  </div>

  <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

    {[ 
      { label: t('stat_projects'), val: 150 },
      { label: t('stat_clients'), val: 80 },
      { label: t('stat_experts'), val: 25 },
      { label: t('stat_rate'), val: 99, suffix: "%" }
    ].map((stat, i) => (

      <motion.div
        key={i}
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: i * 0.1, duration: 0.6 }}
        viewport={{ once: true }}
        className="group relative p-6 rounded-2xl 
        bg-white/5 backdrop-blur-xl 
        border border-[#A590BF]/20 
        hover:scale-105 hover:-translate-y-2 
        transition-all duration-300 
        shadow-[0_0_20px_rgba(165,144,191,0.15)]"
      >

        {/* Glow Hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 
        bg-[#A590BF]/10 blur-xl transition"></div>

        {/* Number */}
        <CountUp end={stat.val} duration={2} />

        {/* Label */}
        <div className="text-slate-400 text-sm mt-2">
          {stat.label}
        </div>

      </motion.div>

    ))}

  </div>
</section>
<section id="services" className="relative py-32 px-6 md:px-16 bg-[#08030D] overflow-hidden">

  {/* 🔮 Background Glow */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 
    w-[900px] h-[500px] bg-[#A590BF]/20 blur-[140px] rounded-full animate-pulse" />
  </div>

  <div className="max-w-6xl mx-auto">

    {/* Title */}
    <motion.div
      initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mb-20"
    >
      <h2 className="text-4xl font-bold text-white mb-4">
        {t('services_title')}
      </h2>

      {/* animated line */}
      <div className="h-1 w-24 bg-gradient-to-r from-[#A590BF] to-purple-400 rounded-full animate-pulse"></div>
    </motion.div>

    {/* Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

      {[
        { icon: <FiCode />, title: t('service_1_title'), desc: t('service_1_desc') },
        { icon: <FiLayers />, title: t('service_2_title'), desc: t('service_2_desc') },
        { icon: <FiCpu />, title: t('service_3_title'), desc: t('service_3_desc') },
      ].map((item, i) => (

        <motion.div
          key={i}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: i * 0.15, duration: 0.6 }}
          viewport={{ once: true }}
          className="group relative p-8 rounded-3xl 
          bg-white/5 backdrop-blur-xl 
          border border-[#A590BF]/20 
          hover:scale-105 hover:-translate-y-3 
          transition-all duration-300 
          shadow-[0_0_25px_rgba(165,144,191,0.15)]"
        >

          {/* Glow hover */}
          <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 
          bg-[#A590BF]/10 blur-xl transition"></div>

          {/* Icon */}
          <div className="text-4xl text-[#A590BF] mb-6 
          group-hover:scale-125 group-hover:rotate-6 
          transition-all duration-300">
            {item.icon}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#A590BF] transition">
            {item.title}
          </h3>

          {/* Desc */}
          <p className="text-slate-400 leading-relaxed text-sm">
            {item.desc}
          </p>

        </motion.div>

      ))}

    </div>
  </div>
</section>

 



   <PortfolioDemoSection/>
<PortfolioGallery  t={t} data={data}/>


<section id="contact" className="relative py-32 px-6 md:px-16 overflow-hidden bg-[#08030D]">
  {/* الخلفية المضيئة - تحسين التوزيع */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#A590BF]/15 blur-[120px] rounded-full" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full" />
  </div>

  <div data-aos="fade-up" className="max-w-6xl mx-auto relative">
    <div className="bg-[#0D0714]/60 backdrop-blur-xl rounded-[2.5rem] border border-[#A590BF]/20 shadow-2xl overflow-hidden">
      <div className="grid lg:grid-cols-5 gap-0">
        
        {/* عمود معلومات الاتصال (2/5 من المساحة) */}
        <div className="lg:col-span-2 bg-[#A590BF]/5 p-10 md:p-14 border-b lg:border-b-0 lg:border-e border-[#A590BF]/10">
          <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
            {t('contact_title')}
          </h2>
          <p className="text-slate-400 mb-10 leading-relaxed">
            {isRtl ? 'نحن هنا لتحويل أفكارك إلى واقع رقمي. تواصل معنا اليوم!' : 'We are here to turn your ideas into digital reality. Get in touch today!'}
          </p>

         <div className="space-y-8">

  {/* Call */}
  <a href="tel:+201221278019" className="group flex items-center gap-5">
    <div className="w-12 h-12 rounded-2xl bg-[#A590BF]/10 flex items-center justify-center text-[#A590BF] group-hover:scale-110 group-hover:bg-[#A590BF] group-hover:text-white transition-all duration-300">
      <FiPhone size={20} />
    </div>
    <div>
      <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">
        {isRtl ? 'اتصل بنا' : 'Call Us'}
      </p>
      <p className="text-white font-medium" dir="ltr">
        +20 122 127 8019
      </p>
    </div>
  </a>

  {/* Email */}
  <a href="mailto:support@codixiatech.online" className="group flex items-center gap-5">
    <div className="w-12 h-12 rounded-2xl bg-[#A590BF]/10 flex items-center justify-center text-[#A590BF] group-hover:scale-110 group-hover:bg-[#A590BF] group-hover:text-white transition-all duration-300">
      <FiMail size={20} />
    </div>
    <div>
      <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">
        {isRtl ? 'البريد الإلكتروني' : 'Email Us'}
      </p>
      <p className="text-white font-medium">
        support@codixiatech.online
      </p>
    </div>
  </a>

  {/* WhatsApp */}
  <a 
    href="https://wa.me/201221278019" 
    target="_blank" 
    rel="noopener noreferrer"
    className="group flex items-center gap-5"
  >
    <div className="w-12 h-12 rounded-2xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:scale-110 group-hover:bg-[#25D366] group-hover:text-white transition-all duration-300">
      <FiMessageCircle size={20} />
    </div>
    <div>
      <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">
        {isRtl ? 'واتساب' : 'WhatsApp'}
      </p>
      <p className="text-white font-medium" dir="ltr">
        +20 122 127 8019
      </p>
    </div>
  </a>

</div>

          {/* إضافة ساعات العمل أو جملة تشجيعية */}
          <div className="mt-16 p-5 rounded-2xl bg-white/5 border border-white/5">
             <p className="text-sm text-slate-400 italic">
               {isRtl ? '⚡️ نرد عادةً خلال أقل من ساعتين' : '⚡️ We usually respond in less than 2 hours'}
             </p>
          </div>
        </div>

        {/* عمود الفورم (3/5 من المساحة) */}
        <div className="lg:col-span-3 p-10 md:p-14 bg-transparent">
          <form ref={form} onSubmit={sendEmail} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-slate-400 px-1">{t('form_name')}</label>
              <input 
                name="user_name"
                type="text" 
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-[#A590BF] focus:ring-4 focus:ring-[#A590BF]/10 transition-all duration-300"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-slate-400 px-1">{t('form_email')}</label>
              <input 
                name="user_email"
                type="email" 
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-[#A590BF] focus:ring-4 focus:ring-[#A590BF]/10 transition-all duration-300"
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-sm text-slate-400 px-1">{t('form_phone')}</label>
              <input 
                name="user_phone"
                type="number" 
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-[#A590BF] focus:ring-4 focus:ring-[#A590BF]/10 transition-all duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-sm text-slate-400 px-1">{t('form_message')}</label>
              <textarea 
                name="message"
                required
                rows="4"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-[#A590BF] focus:ring-4 focus:ring-[#A590BF]/10 transition-all duration-300 resize-none"
              ></textarea>
            </div>

            <div className="md:col-span-2 pt-4">
              <button 
                type="submit" 
                className="group w-full relative overflow-hidden px-8 py-5 font-bold rounded-2xl bg-[#A590BF] text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(165,144,191,0.4)] active:scale-[0.98]"
              >
                <div className="relative z-10 flex items-center justify-center gap-3">
                  <span>{t('btn_send')}</span>
                  <FiArrowRight className={`group-hover:translate-x-2 transition-transform ${isRtl ? 'rotate-180 group-hover:-translate-x-2' : ''}`} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-[#A590BF] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  </div>
</section>

    <footer className="relative py-16 px-6 md:px-16 border-t border-[#A590BF]/20 bg-[#08030D]/90 backdrop-blur-xl">
  {/* Background Glow */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#A590BF]/20 blur-[120px] rounded-full animate-pulse" />
  </div>

  <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
    {/* Logo & Description */}
    <div className="text-center md:text-start">
      <div className="text-2xl font-black text-white mb-2">
        CODIXIA
        <span className="text-[#A590BF] animate-pulse">.</span>
      </div>
      <p className="text-slate-400 text-sm max-w-xs">{t('hero_desc')}</p>
    </div>

    {/* Social Icons */}
    <div className="flex gap-6 text-2xl">
      {socialLinks.map((link) => (
        <motion.a
          whileHover={{ scale: 1.3, color: '#A590BF', rotate: 10 }}
          transition={{ type: 'spring', stiffness: 300 }}
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noreferrer"
          className="text-slate-400 transition-colors shadow-[0_0_10px_#A590BF]/20 rounded-full p-2 hover:shadow-lg"
        >
          {link.icon}
        </motion.a>
      ))}
    </div>
  </div>

  {/* Copyright */}
  <div className="mt-12 pt-8 border-t border-[#A590BF]/30 text-center text-slate-500 text-xs relative z-10">
    <p>
      &copy; 2026 CODIXIA. {isRtl ? 'جميع الحقوق محفوظة' : 'All rights reserved.'}
    </p>
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
const CountUp = ({ end, duration = 2 }) => {
  return (
    <div className="text-4xl font-extrabold text-white">
      <CountUpLib end={end} duration={duration} />
      +
    </div>
  );
};
export default App;