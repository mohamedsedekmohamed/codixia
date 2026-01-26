import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          nav_services: "Services",
          nav_work: "Our Work",
          nav_contact: "Contact",
          btn_build: "Build a Project",
          hero_badge: "Next-Gen Software House",
          hero_title_1: "Engineering the",
          hero_title_2: "Digital Future.",
          hero_desc: "We don't just write code; we architect solutions that scale businesses and redefine industries through innovation.",
          btn_start: "Start Your Journey",
          btn_portfolio: "View Portfolio",
          stat_projects: "Completed Projects",
          stat_clients: "Happy Clients",
          stat_experts: "Team Experts",
          stat_rate: "Success Rate",
          services_title: "Core Expertise",
          service_1_title: "Full-Stack Dev",
          service_1_desc: "Robust architecture using React, Node, and specialized cloud infrastructure.",
          service_2_title: "UI/UX Engineering",
          service_2_desc: "Deeply researched user journeys translated into stunning visual interfaces.",
          service_3_title: "AI & Automation",
          service_3_desc: "Custom LLMs and automation bots to optimize your operational workflow.",
          work_title: "Featured Work",
          contact_title: "Let's build something great together.",
          contact_desc: "Ready to start? Contact us today for a free consultation.",
          form_name: "Your Name",
          form_email: "Email Address",
          form_msg: "Tell us about your project",
          btn_send: "Send Message",
          portfolio_title: "Featured Projects",
    portfolio_subtitle: "Turning complex ideas into user-friendly digital products.",
    cat_all: "All",
    cat_web: "Web",
    cat_mobile: "Mobile",
    cat_ai: "AI",
    view_project: "View Project"
        }
      },
      ar: {
        translation: {
            portfolio_title: "أحدث مشاريعنا",
    portfolio_subtitle: "نحول الأفكار المعقدة إلى منتجات رقمية سهلة الاستخدام.",
    cat_all: " الكل",
    cat_web: "مواقع",
    cat_mobile: "تطبيقات",
    cat_ai: "ذكاء اصطناعي",
    view_project: "عرض المشروع",
          nav_services: "خدماتنا",
          nav_work: "أعمالنا",
          nav_contact: "تواصل معنا",
          btn_build: "ابدأ مشروعك",
          hero_badge: "بيت البرمجيات للجيل القادم",
          hero_title_1: "هندسة",
          hero_title_2: "المستقبل الرقمي.",
          hero_desc: "نحن لا نكتب الكود فحسب، بل نبني حلولاً تقنية تساهم في نمو الشركات وإعادة صياغة المفاهيم عبر الابتكار.",
          btn_start: "ابدأ رحلتك",
          btn_portfolio: "عرض سابقة الأعمال",
          stat_projects: "مشروع مكتمل",
          stat_clients: "عميل سعيد",
          stat_experts: "خبير تقني",
          stat_rate: "نسبة النجاح",
          services_title: "خبراتنا الأساسية",
          service_1_title: "تطوير كامل المواقع",
          service_1_desc: "بنية تحتية قوية باستخدام React و Node مع بنية سحابية متخصصة.",
          service_2_title: "هندسة تجربة المستخدم",
          service_2_desc: "دراسة عميقة لرحلة المستخدم تترجم إلى واجهات بصرية مذهلة.",
          service_3_title: "الذكاء الاصطناعي",
          service_3_desc: "نماذج لغوية مخصصة وبوتات أتمتة لتحسين سير العمل في شركتك.",
          work_title: "أبرز أعمالنا",
          contact_title: "دعنا نبني شيئاً عظيماً معاً.",
          contact_desc: "هل أنت جاهز للبدء؟ اتصل بنا اليوم للحصول على استشارة مجانية.",
          form_name: "الاسم الكريم",
          form_email: "البريد الإلكتروني",
          form_msg: "أخبرنا عن تفاصيل مشروعك",
          btn_send: "إرسال الرسالة"
        }
      }
    },
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  });

export default i18n;