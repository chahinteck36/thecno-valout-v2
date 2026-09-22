import React, { useState } from 'react';
import { 
  Sparkles, Shield, Scale, MapPin, Calendar, Clock, 
  CheckCircle2, Star, ArrowRight, ArrowLeft, Phone, 
  Mail, Users, Award, Bed, Coffee, Wifi, ChevronRight
} from 'lucide-react';
import { StoreTemplate, ThemeConfig, ThemeLanguage } from '../../types';

export interface TemplateDesignProps {
  template: StoreTemplate;
  config: ThemeConfig;
  isDark: boolean;
  onToggleDark: () => void;
  onBuyNow: () => void;
  language: ThemeLanguage;
  variant?: string;
}

export const ServiceTemplate: React.FC<TemplateDesignProps> = ({
  template,
  config,
  isDark = true,
  onToggleDark,
  onBuyNow,
  language = 'ar',
  variant = 'cleaning-services',
}) => {
  const isEn = language === 'en';
  const tid = template.id.toLowerCase();

  const isLegal = variant === 'legal-firm' || tid.includes('legal') || tid.includes('advisory');
  const isHospitality = variant === 'hospitality-hotel' || tid.includes('stay') || tid.includes('hotel') || tid.includes('bistro');
  const isCleaning = !isLegal && !isHospitality;

  // Booking states
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [zipCheck, setZipCheck] = useState('');
  const [zipStatus, setZipStatus] = useState<string | null>(null);

  // -------------------------------------------------------------
  // VARIANT 1: PRO CLEAN & LOCAL HOME/COMMERCIAL SERVICES
  // -------------------------------------------------------------
  if (isCleaning) {
    const packages = isEn ? [
      { name: 'Standard Residential Clean', price: '$120', time: '2-3 Hours', desc: 'Dusting, vacuuming, mopping, bathroom sanitation, and kitchen deep scrub.', items: ['All Bedrooms & Living Areas', 'Surface Disinfection', 'Organic Eco Detergents', 'Satisfaction Guaranteed'] },
      { name: 'Deep Move-In / Move-Out', price: '$240', time: '4-5 Hours', desc: 'Comprehensive top-to-bottom scrub including ovens, baseboards, and interior windows.', items: ['Appliance Deep Scrub', 'Interior Window Polish', 'Baseboards & Moulding', 'Cabinet Interior Clean'] },
      { name: 'Commercial Office Suite', price: '$350+', time: 'Flexible Hours', desc: 'Recurring scheduled night or weekend commercial sanitation for corporate workplaces.', items: ['Restroom Disinfection', 'High-Traffic Carpet Extraction', 'Desk & Tech Sanitization', 'Trash & Recycling Disposal'] },
    ] : [
      { name: 'التنظيف المنزلي الدوري', price: '120$', time: '2-3 ساعات', desc: 'إزالة الغبار، تنظيف الأرضيات، تعقيم وتطهير الحمامات، وتنظيف أسطح المطابخ.', items: ['جميع الغرف والمجالس', 'تعقيم شامل للأسطح', 'منظفات عضوية صديقة للبيئة', 'ضمان الرضا 100%'] },
      { name: 'التنظيف العميق (نقل المنازل)', price: '240$', time: '4-5 ساعات', desc: 'تنظيف شامل ودقيق يشمل الأفران، وحواف الجدران، والنوافذ الداخلية والزوايا الصعبة.', items: ['تنظيف عميق للأجهزة الكهربائية', 'تلميع النوافذ والواجهات', 'تنظيف الزوايا وحواف الأرضيات', 'تنظيف الخزائن الداخلية'] },
      { name: 'المكاتب والمقرات المؤسسية', price: '350$+', time: 'مواعيد مرنة', desc: 'برامج دورية متكاملة لتعقيم وتنظيف مقرات الشركات والمكاتب قبل أو بعد ساعات العمل.', items: ['تعقيم دورات المياه بالكامل', 'غسيل سجاد المكاتب وتعقيمه', 'تنظيف شاشات وأجهزة العمل', 'إفراغ وتدوير النفايات'] },
    ];

    const handleCheckZip = (e: React.FormEvent) => {
      e.preventDefault();
      if (zipCheck.trim()) {
        setZipStatus(isEn ? `✓ Great news! Our crews operate in area code ${zipCheck}.` : `✓ رائع! فرقنا الميدانية تخدم الرمز البريدي ${zipCheck} بالكامل.`);
      }
    };

    return (
      <div className={`min-h-full font-sans transition-colors duration-200 ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`} dir={isEn ? 'ltr' : 'rtl'}>
        <header className={`sticky top-0 z-40 border-b backdrop-blur-md ${isDark ? 'bg-slate-950/90 border-slate-800' : 'bg-white/90 border-slate-200'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500 text-slate-950 flex items-center justify-center font-black">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-black text-base tracking-tight">{isEn ? (template.nameEn || 'ProClean Services') : template.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={onToggleDark} className="p-2 border border-slate-800 rounded-xl text-xs">{isDark ? '☀️' : '🌙'}</button>
              <button onClick={onBuyNow} className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs rounded-xl transition">
                {isEn ? 'Acquire Theme' : 'شراء القالب'}
              </button>
            </div>
          </div>
        </header>

        {/* Hero with ZIP checker */}
        <section className={`py-16 md:py-24 border-b ${isDark ? 'bg-slate-900/60 border-slate-900' : 'bg-teal-50/50 border-slate-200'}`}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20 inline-block mb-4">
              {isEn ? 'Eco-Friendly Professional Sanitation' : 'خدمات تنظيف احترافية بمواد آمنة ومعتمدة'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black mb-6">
              {isEn ? 'Spotless Spaces. Zero Hassle. Guaranteed.' : 'مساحات نظيفة وصحية. بدون أي عناء وبضمان كامل.'}
            </h1>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mb-8">
              {isEn ? 'Vetted and insured cleaning technicians providing residential and commercial sanitization with transparent flat-rate pricing.' : 'فرق فنية مدربة ومؤمنة بالكامل تقدم خدمات التنظيف المنزلي والمكتبي بأسعار ثابتة وشفافة.'}
            </p>

            <form onSubmit={handleCheckZip} className="max-w-md mx-auto flex items-center gap-2 mb-4">
              <input 
                type="text" 
                value={zipCheck} 
                onChange={(e) => setZipCheck(e.target.value)}
                placeholder={isEn ? "Enter Zip Code (e.g. 90210)..." : "أدخل الرمز البريدي أو الحي..."}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-teal-500"
              />
              <button type="submit" className="px-5 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-black whitespace-nowrap">
                {isEn ? 'Check Coverage' : 'فحص التغطية'}
              </button>
            </form>
            {zipStatus && <p className="text-xs text-teal-400 font-bold">{zipStatus}</p>}
          </div>
        </section>

        {/* Packages Grid */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-black mb-3">{isEn ? 'Upfront Flat-Rate Packages' : 'باقات تنظيف واضحة بأسعار محددة'}</h2>
            <p className="text-xs text-slate-400">{isEn ? 'No hidden fees. Book online in 60 seconds.' : 'لا توجد أي رسوم خفية. احجز موعدك خلال 60 ثانية.'}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, i) => (
              <div key={i} className={`p-8 rounded-3xl border flex flex-col justify-between ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div>
                  <h3 className="text-lg font-black mb-2">{pkg.name}</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-black text-teal-400">{pkg.price}</span>
                    <span className="text-xs text-slate-400 font-semibold">{pkg.time}</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-6 leading-relaxed">{pkg.desc}</p>
                  <div className="space-y-2 mb-6">
                    {pkg.items.map((it, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                        <span>{it}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button onClick={onBuyNow} className="w-full py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs transition">
                  {isEn ? 'Book This Clean' : 'حجز هذه الباقة'}
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VARIANT 2: LEGAL POINT LAW FIRM & ADVISORY
  // -------------------------------------------------------------
  if (isLegal) {
    const practiceAreas = isEn ? [
      { title: 'Corporate Litigation & Arbitrations', desc: 'Defending institutional clients in complex cross-border contractual disputes and regulatory inquiries.', cases: '98% Favorable Settlements' },
      { title: 'Intellectual Property & Patents', desc: 'Protecting proprietary software, pharmaceutical patents, and global trademark portfolios.', cases: '420+ Registered Patents' },
      { title: 'M&A and Commercial Contracts', desc: 'Structuring multi-jurisdictional joint ventures, acquisitions, and private equity investments.', cases: '$1.8B Deal Volume' },
      { title: 'Employment & Labor Defense', desc: 'Advising executive leadership on compliance, non-competes, and workforce restructurings.', cases: 'Zero Class-Action Liability' },
    ] : [
      { title: 'التقاضي والتحكيم التجاري', desc: 'تمثيل الشركات والمؤسسات الكبرى في النزاعات التعاقدية المعقدة والتحكيم الدولي وفق أعلى المعايير القانونية.', cases: '98% تسويات رابحة' },
      { title: 'الملكية الفكرية وبراءات الاختراع', desc: 'تسجيل وحماية براءات الاختراع والعلامات التجارية والبرمجيات ضد أي تعديات تجارية محلياً ودولياً.', cases: '+420 براءة اختراع مسجلة' },
      { title: 'عقود الاندماج والاستحواذ', desc: 'صياغة وهيكلة الصفقات والاتفاقيات التجارية والشراكات الاستراتيجية بما يضمن الحماية القانونية التامة.', cases: '1.8 مليار دولار صفقات' },
      { title: 'قضايا العمل والحوكمة العمالية', desc: 'تقديم استشارات شاملة للإدارات التنفيذية حول لوائح العمل وعقود كبار التنفيذيين والامتثال.', cases: 'صفر دعاوى جماعية' },
    ];

    return (
      <div className={`min-h-full font-serif transition-colors duration-200 ${isDark ? 'bg-stone-950 text-stone-100' : 'bg-stone-50 text-stone-900'}`} dir={isEn ? 'ltr' : 'rtl'}>
        <header className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <Scale className="w-6 h-6 text-amber-500" />
            <span className="font-sans font-black text-base tracking-widest uppercase">
              {isEn ? (template.nameEn || 'LegalPoint Advisory') : template.name}
            </span>
          </div>
          <div className="flex items-center gap-4 font-sans text-xs">
            <button onClick={onToggleDark}>{isDark ? '☀️' : '🌙'}</button>
            <button onClick={onBuyNow} className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-black">
              {isEn ? 'Acquire Legal Theme' : 'شراء هذا القالب'}
            </button>
          </div>
        </header>

        <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <span className="font-sans text-xs uppercase tracking-widest text-amber-500 block mb-4">
            {isEn ? 'Prestigious Counsel Since 1998' : 'استشارات قانونية وقضائية مرموقة منذ 1998'}
          </span>
          <h1 className="text-4xl sm:text-6xl font-normal leading-tight mb-8">
            {isEn ? 'Unyielding Advocacy. Strategic Precision.' : 'دفاع قانوني صارم. وحلول استراتيجية لحماية مصالحك.'}
          </h1>
          <p className="font-sans text-xs sm:text-sm text-stone-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            {isEn ? 'Senior legal partners representing institutional boards, corporations, and high-net-worth clients across federal and international courts.' : 'نخبة من كبار المحامين والمستشارين المعتمدين لتمثيل الشركات والمؤسسات الكبرى أمام كافة المحاكم والهيئات القضائية.'}
          </p>
        </section>

        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
          {practiceAreas.map((pa, idx) => (
            <div key={idx} className="p-8 rounded-2xl border border-stone-800 bg-stone-900/40">
              <span className="text-xs text-amber-500 font-bold mb-2 block">{pa.cases}</span>
              <h3 className="font-serif text-xl font-normal mb-3">{pa.title}</h3>
              <p className="text-xs text-stone-400 leading-relaxed">{pa.desc}</p>
            </div>
          ))}
        </section>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VARIANT 3: STAYWISE BOUTIQUE HOSPITALITY & HOTEL
  // -------------------------------------------------------------
  const suites = isEn ? [
    { title: 'The Penthouse Ocean Villa', price: '$850 / night', specs: '140 m² • King Bed • Private Infinity Pool • Butler', img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80' },
    { title: 'Azure Deluxe King Suite', price: '$420 / night', specs: '65 m² • Panoramic Balcony • Marble Bath • Breakfast', img: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80' },
    { title: 'Garden Zen Sanctuary', price: '$310 / night', specs: '48 m² • Private Bamboo Terrace • Soaking Tub', img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80' },
  ] : [
    { title: 'فيلا البنتهاوس المطلة على المحيط', price: '850$ / ليلة', specs: '140 م² • سرير كينغ • مسبح لا متناهي خاص • خادم شخصي', img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80' },
    { title: 'جناح أزور ديلوكس الملكي', price: '420$ / ليلة', specs: '65 م² • شرفة بانورامية • حمام رخامي فاخر • إفطار شامل', img: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80' },
    { title: 'ملاذ حديقة الزن الطبيعية', price: '310$ / ليلة', specs: '48 م² • تراس خيزران خاص • حوض استحمام استرخائي', img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80' },
  ];

  return (
    <div className={`min-h-full font-serif transition-colors duration-200 ${isDark ? 'bg-zinc-950 text-zinc-100' : 'bg-zinc-50 text-zinc-900'}`} dir={isEn ? 'ltr' : 'rtl'}>
      <header className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between border-b border-zinc-800">
        <div className="font-serif text-xl tracking-widest uppercase">{isEn ? (template.nameEn || 'StayWise Resort') : template.name}</div>
        <div className="flex items-center gap-3 font-sans text-xs">
          <button onClick={onToggleDark}>{isDark ? '☀️' : '🌙'}</button>
          <button onClick={onBuyNow} className="px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-lg">
            {isEn ? 'Buy Theme' : 'شراء القالب'}
          </button>
        </div>
      </header>

      {/* Hero with Reservation Bar */}
      <section className="relative h-[65vh] overflow-hidden">
        <img src={suites[0].img} alt="Resort" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-zinc-950/40 flex items-center justify-center text-center p-6 text-white">
          <div className="max-w-2xl">
            <span className="font-sans text-xs uppercase tracking-widest text-amber-400 block mb-2">{isEn ? '5-Star Luxury Resort' : 'منتجع فندقي فاخر 5 نجوم'}</span>
            <h1 className="text-3xl sm:text-6xl font-light mb-4">{isEn ? 'Where Calm Meets Ocean Splendor.' : 'حيث تلتقي السكينة بسحر الطبيعة والرفاهية.'}</h1>
          </div>
        </div>
      </section>

      {/* Suites Showcase */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-light text-center mb-12">{isEn ? 'Suites & Private Villas' : 'الأجنحة والفيلات الخاصة'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-sans">
          {suites.map((st, i) => (
            <div key={i} className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/60">
              <img src={st.img} alt={st.title} className="w-full aspect-[4/3] object-cover" referrerPolicy="no-referrer" />
              <div className="p-6">
                <span className="text-xs text-amber-400 font-bold block mb-1">{st.price}</span>
                <h3 className="font-serif text-lg font-normal mb-2">{st.title}</h3>
                <p className="text-xs text-zinc-400 mb-4">{st.specs}</p>
                <button onClick={onBuyNow} className="w-full py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-white transition">
                  {isEn ? 'Reserve Suite' : 'حجز الجناح'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
