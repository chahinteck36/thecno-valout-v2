import React, { useState } from 'react';
import { 
  DollarSign, TrendingUp, ShieldCheck, PieChart, Landmark, 
  ArrowRight, ArrowLeft, CheckCircle2, Percent, Briefcase, 
  HelpCircle, ChevronDown, ChevronUp, Calculator, Clock, 
  Star, ExternalLink, BarChart2, Award, Sparkles, Building
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

export const FinanceTemplate: React.FC<TemplateDesignProps> = ({
  template,
  config,
  isDark = true,
  onToggleDark,
  onBuyNow,
  language = 'ar',
  variant = 'finora',
}) => {
  const isEn = language === 'en';
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [investmentAmount, setInvestmentAmount] = useState<number>(50000);
  const [investmentYears, setInvestmentYears] = useState<number>(5);
  const [consultationBooked, setConsultationBooked] = useState<boolean>(false);

  // Projected compound growth at 11.4% historical benchmark
  const projectedReturn = Math.round(investmentAmount * Math.pow(1 + 0.114, investmentYears));

  const financialServices = isEn ? [
    {
      title: 'Discretionary Wealth & Portfolio Management',
      desc: 'Institutional-grade asset allocation tailored to long-term capital preservation, dividend yield, and asymmetric growth across global markets.',
      yield: '+14.8% 5-Yr Ann. Return',
      icon: TrendingUp,
    },
    {
      title: 'Corporate Treasury & Liquidity Optimization',
      desc: 'Automated yield maximization for institutional cash reserves, ensuring instant liquidity with competitive risk-adjusted returns.',
      yield: '5.25% Liquid Overnight Yield',
      icon: Landmark,
    },
    {
      title: 'Tax-Advantaged Estate & Trust Advisory',
      desc: 'Cross-border succession planning, tax minimization strategies, and custodial trust structures safeguarding generational family wealth.',
      yield: 'Zero-Leakage Compliance',
      icon: ShieldCheck,
    },
    {
      title: 'M&A and Private Equity Deal Structuring',
      desc: 'Independent financial due diligence, valuation modeling, and capital raising coordination for mid-market corporate acquisitions.',
      yield: '$850M+ Closed Deals',
      icon: Briefcase,
    }
  ] : [
    {
      title: 'إدارة الثروات والمحافظ الاستثمارية',
      desc: 'توزيع مؤسسي للأصول يهدف لحماية رأس المال وتحقيق عوائد مركبة ونمو مستدام في الأسواق المالية العالمية والناشئة.',
      yield: '+14.8% متوسط العائد السنوي',
      icon: TrendingUp,
    },
    {
      title: 'إدارة السيولة والخزينة المؤسسية',
      desc: 'حلول ذكية لتعظيم عوائد الاحتياطيات النقدية للشركات مع ضمان سيولة فورية وحماية تامة ضد تقلبات العملات.',
      yield: '5.25% عائد يومي مضمون',
      icon: Landmark,
    },
    {
      title: 'التخطيط الضريبي وحوكمة التركات',
      desc: 'هيكلة الصناديق الائتمانية العائلية واستراتيجيات تخفيف الأعباء الضريبية بما يحفظ استمرارية ثروات الأجيال.',
      yield: 'امتثال مالي كامل 100%',
      icon: ShieldCheck,
    },
    {
      title: 'استشارات الاندماج والاستحواذ',
      desc: 'الفحص المالي النافي للجهالة، وتقييم الصفقات، وترتيب جولات التمويل الاستراتيجي للشركات متوسطة وكبيرة الحجم.',
      yield: '+850 مليون دولار صفقات منجزة',
      icon: Briefcase,
    }
  ];

  const marketIndicators = [
    { name: 'S&P 500 Index', value: '5,864.20', change: '+1.42%', up: true },
    { name: 'US 10-Yr Treasury', value: '4.12%', change: '-0.05%', up: false },
    { name: 'Finora Private Equity Alpha', value: '18.4% APY', change: '+2.10%', up: true },
    { name: 'Gold / Troy Oz', value: '$2,714.50', change: '+0.88%', up: true },
  ];

  const faqs = isEn ? [
    {
      q: 'How does Finora safeguard client custodial assets?',
      a: 'All client funds are held by independent tier-1 custodian banks (BNY Mellon & Charles Schwab) with SIPC insurance coverage up to $500,000 and supplemental aggregate Lloyd\'s of London protection.'
    },
    {
      q: 'What is the minimum onboarding threshold for private wealth management?',
      a: 'Our bespoke private client advisory commences at $250,000 in investable liquid assets, while our institutional treasury services require a $1,000,000 baseline.'
    },
    {
      q: 'Are your advisory fees transparent and fiduciary-bound?',
      a: 'Yes. Finora operates strictly as a fee-only SEC-registered fiduciary. We never receive third-party broker commissions or proprietary product kickbacks.'
    }
  ] : [
    {
      q: 'كيف يتم تأمين وحفظ أصول العملاء المالية؟',
      a: 'تودع كافة أموال العملاء في بنوك حفظ دولية من الفئة الأولى ومحمية بتغطيات تأمينية معتمدة، مع فصل تام بين حسابات العملاء وحسابات الشركة التشغيلية.'
    },
    {
      q: 'ما هو الحد الأدنى للبدء في إدارة الثروات الخاصة؟',
      a: 'تبدأ خدمات إدارة الثروات الخاصة والاستثمار المخصص من 250,000 دولار للأفراد، و 1,000,000 دولار للشركات والمؤسسات.'
    },
    {
      q: 'هل تعمل المنظومة كجهة استشارية ائتمانية خالية من تضارب المصالح؟',
      a: 'نعم، نحن ملزمون قانونياً وأخلاقياً بالواجب الائتماني الصارم (Fiduciary Duty)، ونعتمد نظام الأتعاب الواضحة دون أي عمولات خفية من أطراف ثالثة.'
    }
  ];

  return (
    <div 
      className={`min-h-full font-sans transition-colors duration-200 ${
        isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
      dir={isEn ? 'ltr' : 'rtl'}
    >
      {/* Financial Header */}
      <header className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors ${
        isDark ? 'bg-slate-950/90 border-slate-800' : 'bg-white/90 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-950/40">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <span className="font-black text-base tracking-tight block">
                {isEn ? (template.nameEn || 'Finora Finance & Wealth') : template.name}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-emerald-500 font-bold block">
                {isEn ? 'Private Wealth & Institutional Advisory' : 'إدارة الثروات والاستشارات المالية المعتمدة'}
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold">
            <a href="#services" className="hover:text-emerald-400 transition">{isEn ? 'Wealth Services' : 'الخدمات المالية'}</a>
            <a href="#calculator" className="hover:text-emerald-400 transition">{isEn ? 'Growth Calculator' : 'حاسبة العوائد'}</a>
            <a href="#indicators" className="hover:text-emerald-400 transition">{isEn ? 'Indicators' : 'المؤشرات'}</a>
            <a href="#faq" className="hover:text-emerald-400 transition">{isEn ? 'FAQ' : 'الأسئلة الشائعة'}</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={onToggleDark}
              className={`p-2 rounded-xl border text-xs transition ${
                isDark 
                  ? 'border-slate-800 bg-slate-900 text-slate-300 hover:text-white' 
                  : 'border-slate-200 bg-slate-100 text-slate-700 hover:text-black'
              }`}
            >
              {isDark ? '☀️' : '🌙'}
            </button>
            <button
              onClick={onBuyNow}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black shadow-lg shadow-emerald-950/40 transition active:scale-95"
            >
              {isEn ? 'Purchase Template' : 'شراء هذا القالب'}
            </button>
          </div>
        </div>
      </header>

      {/* Live Market Indicators Ribbon */}
      <div className={`py-2 px-4 border-b text-[11px] overflow-x-auto flex items-center justify-between gap-6 ${
        isDark ? 'bg-slate-900/90 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
      }`}>
        <div className="flex items-center gap-6 mx-auto flex-nowrap whitespace-nowrap">
          {marketIndicators.map((ind, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="font-semibold text-slate-300">{ind.name}:</span>
              <span className="font-mono font-bold text-slate-100">{ind.value}</span>
              <span className={`font-mono font-bold text-[10px] ${ind.up ? 'text-emerald-400' : 'text-rose-400'}`}>
                {ind.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className={`py-16 md:py-24 border-b relative overflow-hidden ${
        isDark ? 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-slate-900' : 'bg-gradient-to-b from-white via-emerald-50/20 to-white border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-6 border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{isEn ? 'Fiduciary-Grade Wealth Management 2026' : 'منظومة مالية ائتمانية متوافقة مع أعلى معايير الحوكمة'}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6">
                {isEn
                  ? 'Disciplined Wealth Management for Exceptional Horizons.'
                  : 'إدارة منضبطة للثروات واستراتيجيات مالية تصنع الفارق الاستثماري.'}
              </h1>

              <p className={`text-base sm:text-lg leading-relaxed mb-8 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {isEn
                  ? 'Finora merges quantitative algorithmic allocation with fiduciary guidance to safeguard assets and generate consistent inflation-beating alpha.'
                  : 'تجمع فينورا بين النماذج الكمية المتقدمة والاستشارات الائتمانية المعتمدة لحماية الأصول وتحقيق عوائد مجزية تفوق معدلات التضخم العالمية.'}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#consultation"
                  className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-black shadow-xl shadow-emerald-950/30 transition flex items-center gap-2"
                >
                  <span>{isEn ? 'Book Portfolio Consultation' : 'حجز استشارة محفظة مالية'}</span>
                  {isEn ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                </a>
                <a
                  href="#calculator"
                  className={`px-6 py-3.5 rounded-xl text-sm font-bold border transition ${
                    isDark ? 'border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-200' : 'border-slate-300 bg-white hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  {isEn ? 'Simulate Growth' : 'محاكاة العوائد التراكمية'}
                </a>
              </div>
            </div>

            {/* Quick Hero Financial Scorecard */}
            <div className="lg:col-span-5">
              <div className={`p-8 rounded-3xl border shadow-2xl relative ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/60">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">{isEn ? 'Benchmark Portfolio' : 'المحفظة النموذجية'}</span>
                    <span className="text-xl font-black text-emerald-400">Finora Alpha Global</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Active Fiduciary
                  </span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-xs">
                    <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>{isEn ? 'Historical 10-Yr Alpha' : 'العائد التراكمي لـ 10 سنوات'}:</span>
                    <span className="font-mono font-bold text-emerald-400">+248.6%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>{isEn ? 'Sharpe Ratio (Risk-Adjusted)' : 'معامل شارب (العائد مقابل المخاطر)'}:</span>
                    <span className="font-mono font-bold">1.84</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>{isEn ? 'Max Historical Drawdown' : 'أقصى تراجع تاريخي'}:</span>
                    <span className="font-mono font-bold text-slate-300">-6.2%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>{isEn ? 'Custodial Security Tier' : 'مستوى الأمان المصرفي'}:</span>
                    <span className="font-bold text-cyan-400">Tier-1 Institutional</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex items-center gap-3">
                  <Award className="w-8 h-8 text-emerald-400 flex-shrink-0" />
                  <p className="text-[11px] leading-relaxed text-slate-300">
                    {isEn ? 'Ranked #1 Independent Wealth Advisory Platform in Institutional Fiduciary Review.' : 'مصنفة كأفضل منصة استشارات ثروات مستقلة وفق التقييم المصرفي الائتماني لعام 2026.'}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-500 block mb-2">
            {isEn ? 'Tailored Solutions' : 'الخدمات المالية المتخصصة'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black">
            {isEn ? 'Institutional Wealth & Strategic Advisory' : 'حلول مصممة لحماية وتنمية رأس المال المؤسسي والخاص'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {financialServices.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div 
                key={idx}
                className={`p-8 rounded-3xl border transition-all ${
                  isDark ? 'border-slate-800 bg-slate-900/40 hover:border-slate-700' : 'border-slate-200 bg-white hover:border-slate-300 shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-800/80 text-emerald-400 border border-slate-700">
                    {srv.yield}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3">{srv.title}</h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{srv.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Growth Simulator */}
      <section id="calculator" className={`py-20 border-y ${isDark ? 'bg-slate-900/50 border-slate-900' : 'bg-slate-100/80 border-slate-200'}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-500 block mb-2">
              {isEn ? 'Compounding Engine' : 'محاكي النمو الاستثماري'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black">
              {isEn ? 'Estimate Your Portfolio Growth' : 'حاسبة العوائد التراكمية المتوقعة'}
            </h2>
          </div>

          <div className={`p-8 rounded-3xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200 shadow-xl'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span>{isEn ? 'Initial Investment' : 'مبلغ الاستثمار الأولي'}:</span>
                    <span className="text-emerald-400 font-mono text-sm">${investmentAmount.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" 
                    min="10000" 
                    max="1000000" 
                    step="10000"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>$10,000</span>
                    <span>$500,000</span>
                    <span>$1,000,000</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span>{isEn ? 'Horizon (Years)' : 'المدة الزمنية (سنوات)'}:</span>
                    <span className="text-emerald-400 font-mono text-sm">{investmentYears} {isEn ? 'Years' : 'سنوات'}</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="20" 
                    step="1"
                    value={investmentYears}
                    onChange={(e) => setInvestmentYears(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>1 {isEn ? 'Yr' : 'سنة'}</span>
                    <span>10 {isEn ? 'Yrs' : 'سنوات'}</span>
                    <span>20 {isEn ? 'Yrs' : 'سنة'}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
                <span className="text-xs uppercase font-bold text-slate-400 block mb-1">
                  {isEn ? 'Projected Future Valuation (11.4% Benchmark)' : 'القيمة المستقبلية المتوقعة (بمعدل 11.4% سنوياً)'}
                </span>
                <span className="text-4xl font-black text-emerald-400 font-mono block mb-2">
                  ${projectedReturn.toLocaleString()}
                </span>
                <span className="text-xs text-slate-400 block mb-4">
                  {isEn ? `Potential capital gains: +$${(projectedReturn - investmentAmount).toLocaleString()}` : `صافي الأرباح الرأسمالية التراكمية: +$${(projectedReturn - investmentAmount).toLocaleString()}`}
                </span>
                <a
                  href="#consultation"
                  className="inline-block px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition active:scale-95"
                >
                  {isEn ? 'Lock In Strategy' : 'تطبيق هذه الاستراتيجية'}
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Consultation & FAQ */}
      <section id="faq" className="py-20 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-500 block mb-2">
            {isEn ? 'Regulatory & Operational Inquiries' : 'الأسئلة المتكررة والشفافية'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black">
            {isEn ? 'Frequently Asked Questions' : 'كل ما تحتاج معرفته عن الحفظ والأمان المالي'}
          </h2>
        </div>

        <div className="space-y-4 mb-16">
          {faqs.map((faq, i) => {
            const isOpen = activeFaq === i;
            return (
              <div 
                key={i}
                className={`rounded-2xl border transition-all ${
                  isDark ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'
                }`}
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : i)}
                  className="w-full p-5 text-left flex items-center justify-between font-bold text-sm"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-emerald-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {isOpen && (
                  <div className={`px-5 pb-5 text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Consultation Scheduler */}
        <div id="consultation" className={`p-8 rounded-3xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xl'}`}>
          <div className="text-center max-w-md mx-auto mb-6">
            <h3 className="text-xl font-black mb-2">{isEn ? 'Schedule Private Portfolio Review' : 'حجز جلسة مراجعة مالية شاملة'}</h3>
            <p className="text-xs text-slate-400">{isEn ? 'Our CFA advisors will contact you within 24 hours.' : 'يتواصل معك أحد كبار المحللين الماليين المعتمدين خلال 24 ساعة.'}</p>
          </div>

          {consultationBooked ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-emerald-300">{isEn ? 'Consultation Booked Successfully' : 'تم تأكيد حجز الجلسة بنجاح'}</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setConsultationBooked(true); }} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  required 
                  placeholder={isEn ? "Investor Name" : "اسم المستثمر"} 
                  className={`px-4 py-2.5 rounded-xl border text-xs outline-none ${
                    isDark ? 'bg-slate-950 border-slate-800 text-slate-100 focus:border-emerald-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-500'
                  }`}
                />
                <input 
                  type="email" 
                  required 
                  placeholder={isEn ? "Email Address" : "البريد الإلكتروني"} 
                  className={`px-4 py-2.5 rounded-xl border text-xs outline-none ${
                    isDark ? 'bg-slate-950 border-slate-800 text-slate-100 focus:border-emerald-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-500'
                  }`}
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black shadow-lg shadow-emerald-950/40 transition active:scale-95"
              >
                {isEn ? 'Confirm Confidential Consultation' : 'تأكيد طلب المراجعة المالية السرية'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 border-t text-xs ${isDark ? 'bg-slate-950 border-slate-900 text-slate-500' : 'bg-white border-slate-200 text-slate-600'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-slate-300">Finora Wealth Management & Fiduciary Advisory</span>
          </div>
          <p>© 2026 TechVault Pro Marketplace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
