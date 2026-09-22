import React, { useState, useMemo } from 'react';
import { StoreTemplate, ThemeLanguage } from '../types';
import { MARKETPLACE_CATEGORIES } from '../data/categoriesData';
import { TemplateCard } from './TemplateCard';
import { 
  Sparkles, Search, CheckCircle2, ShieldCheck, Zap, 
  Tag, Download, ArrowRight, Layers, HelpCircle, 
  ChevronDown, ChevronUp, Cpu, Monitor, Globe, Award
} from 'lucide-react';

interface Props {
  templates: StoreTemplate[];
  onSelectCategory: (categorySlug: string) => void;
  onPreviewTemplate: (template: StoreTemplate) => void;
  onBuyTemplate: (template: StoreTemplate) => void;
  onSelectTemplate: (template: StoreTemplate) => void;
  onGoToStore: () => void;
  onGoToStudio: () => void;
  language?: ThemeLanguage;
}

export const MarketplaceHome: React.FC<Props> = ({
  templates,
  onSelectCategory,
  onPreviewTemplate,
  onBuyTemplate,
  onSelectTemplate,
  onGoToStore,
  onGoToStudio,
  language = 'ar',
}) => {
  const isEn = language === 'en';
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const featuredTemplates = useMemo(() => {
    return templates.filter(t => t.featured).slice(0, 6);
  }, [templates]);

  const latestTemplates = useMemo(() => {
    return [...templates].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 6);
  }, [templates]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGoToStore();
  };

  const marketplaceFaqs = [
    {
      q: 'ما الذي أحصل عليه فور إتمام عملية الشراء في TechVault-Pro؟',
      qEn: 'What deliverables do I receive immediately after purchasing on TechVault-Pro?',
      a: 'تحصل على تنزيل رقمي فوري لملف القالب الصافي (كود XML لبلوجر و/أو حزمة ZIP كاملة لووردبريس) مع كود مصدري نظيف 100%، ودليل التثبيت السريع وخطوات الإعداد.',
      aEn: 'You receive instant digital access to the production-ready source code (raw XML for Blogger and/or standalone ZIP for WordPress) with full documentation and setup instructions.'
    },
    {
      q: 'هل السعر 9.99$ هو اشتراك شهري أم دفع لمرة واحدة؟',
      qEn: 'Is the $9.99 USD price a subscription or a one-time purchase?',
      a: 'سعر 9.99$ هو دفع لمرة واحدة يمنحك ترخيصاً تجارياً دائماً مدى الحياة لموقعك بدون أي رسوم شهرية أو سنوية متكررة.',
      aEn: 'The $9.99 USD fee is a strict one-time payment providing a perpetual commercial license with zero recurring or hidden subscription fees.'
    },
    {
      q: 'هل القوالب متوافقة مع شروط ومعايير Google AdSense؟',
      qEn: 'Are all templates compliant with Google AdSense and Core Web Vitals?',
      a: 'نعم بالكامل، صُممت كافة القوالب بنسبة نقر إلى ظهور مدروسة (High CTR Ad Slots) مع الحفاظ على سرعة 100/100 وتجنب أي نقرات غير مقصودة وفق سياسات جوجل الصارمة.',
      aEn: 'Yes, every template is rigorously coded with high-CTR AdSense placements following official Google compliance guidelines and achieving top Core Web Vitals performance.'
    },
    {
      q: 'هل تدعم القوالب الاتجاهين العربي والإنجليزي (RTL & LTR)؟',
      qEn: 'Do the templates support both Arabic and English (RTL & LTR)?',
      a: 'نعم، جميع القوالب مهيأة برمجياً لدعم الاتجاهين العربي (من اليمين لليسار) والإنجليزي (من اليسار لليمين) مع خطوط ويب متناسقة ومحاذاة بصرية متقنة.',
      aEn: 'Yes, all templates are engineered with native bidirectional RTL and LTR support with matched Arabic and Latin typography.'
    }
  ];

  return (
    <div className="space-y-16" dir={isEn ? 'ltr' : 'rtl'}>
      
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-slate-800 p-6 sm:p-12 md:p-16 shadow-2xl text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-black shadow-inner">
            <Sparkles className="w-3.5 h-3.5 fill-current animate-pulse" />
            <span>{isEn ? 'OFFICIAL DIGITAL ASSET MARKETPLACE' : 'متجر القوالب والأصول الرقمية المعتمد'}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-emerald-400">{isEn ? '26+ Templates • $9.99' : '26+ قالباً • سعر موحد 9.99$'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.15]">
            {isEn ? (
              <>Premium Web Templates Built for <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">Speed & Revenue</span></>
            ) : (
              <>قوالب مواقع احترافية مصممة <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">للسرعة والأرباح</span></>
            )}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {isEn
              ? 'Discover ultra-optimized Blogger XML and WordPress themes across business, SaaS, e-commerce, portfolio, and editorial niches. 100% Core Web Vitals, instant digital delivery.'
              : 'اكتشف قوالب بلوجر وووردبريس فائقة السرعة للأعمال، المتاجر، صفحات الهبوط، والمجلات التقنية. أكواد نظيفة 100%، وتوافق كامل مع أدسنس وتسليم فوري.'}
          </p>

          {/* Quick Search & Explore Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <button
              onClick={onGoToStore}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-cyan-950/50 transition active:scale-95"
            >
              <Layers className="w-4 h-4" />
              <span>{isEn ? 'Browse All 26+ Templates' : 'تصفح كافة القوالب (26+)'}</span>
            </button>
            <button
              onClick={onGoToStudio}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-bold text-xs sm:text-sm transition active:scale-95"
            >
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>{isEn ? 'Open Theme Studio' : 'استوديو التخصيص الحي'}</span>
            </button>
          </div>

          {/* Trust Value Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800/80 text-xs text-slate-300">
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{isEn ? '100% Core Web Vitals' : 'سرعة 100/100'}</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>{isEn ? 'AdSense High CTR' : 'متوافق مع أدسنس'}</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>{isEn ? 'Virus-Free Clean Code' : 'كود سليم بدون حشو'}</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <Globe className="w-4 h-4 text-purple-400" />
              <span>{isEn ? 'Bilingual RTL & LTR' : 'دعم كامل للعربية'}</span>
            </div>
          </div>

        </div>
      </section>

      {/* Categories Showcase Grid */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
              {isEn ? 'Curated Niches' : 'التصنيفات المعتمدة'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {isEn ? 'Explore Templates by Category' : 'استكشف القوالب حسب المجال'}
            </h2>
          </div>
          <button
            onClick={onGoToStore}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition hidden sm:inline"
          >
            {isEn ? 'View All Categories →' : 'عرض كافة التصنيفات ←'}
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {MARKETPLACE_CATEGORIES.map((cat) => {
            const count = templates.filter(t => t.categorySlug === cat.slug).length;
            return (
              <div
                key={cat.slug}
                onClick={() => onSelectCategory(cat.slug)}
                className="group p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition cursor-pointer flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-110 transition">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-cyan-300 transition mb-1">
                    {isEn ? cat.nameEn : cat.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {isEn ? cat.shortDescriptionEn : cat.shortDescription}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 group-hover:text-cyan-400 transition font-bold">
                  <span>{isEn ? `${count} Templates` : `${count} قوالب`}</span>
                  <span>{isEn ? 'Explore →' : 'تصفح ←'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Templates Section */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isEn ? 'Handpicked Excellence' : 'مختارات مميزة'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {isEn ? 'Featured Templates & Themes' : 'القوالب المميزة الأكثر طلباً'}
            </h2>
          </div>
          <button
            onClick={onGoToStore}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition"
          >
            {isEn ? 'Browse Store →' : 'تصفح المتجر بالكامل ←'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTemplates.map((tmpl) => (
            <TemplateCard
              key={tmpl.id}
              template={tmpl}
              onPreview={onPreviewTemplate}
              onBuy={onBuyTemplate}
              onViewDetails={onSelectTemplate}
              language={language}
            />
          ))}
        </div>
      </section>

      {/* Why Choose TechVault-Pro Value Props */}
      <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
            {isEn ? 'Our Engineering Standards' : 'معاييرنا الهندسية'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {isEn ? 'Why TechVault-Pro Templates Outperform' : 'لماذا تتفوق قوالب TechVault-Pro؟'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {isEn
              ? 'Built from the ground up for webmasters who prioritize sub-second load times, reliable monetization, and search engine dominance.'
              : 'تمت برمجتها وتطويرها وفق أعلى المعايير القياسية لتوفير سرعة خارقة، وأمان فائق، وتهيؤ تام لتحقيق الأرباح.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              {isEn ? 'Zero-Bloat Performance' : 'كود نقي وخالٍ من الحشو'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isEn
                ? 'No bulky external libraries or slow frameworks. Clean HTML5 and CSS Grid ensuring 100/100 Core Web Vitals.'
                : 'بدون مكتبات ثقيلة أو إضافات معقدة. كود HTML5 وCSS Grid نقي يحقق أعلى علامات الأداء في اختبارات جوجل.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              {isEn ? 'Direct Raw Deliverables' : 'تسليم فوري ومباشر للملفات'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isEn
                ? 'Get raw, unencrypted XML for Blogger and standalone ZIP files for WordPress immediately after purchase.'
                : 'تحصل على ملفات القالب المصدرية كاملة وبشكل مباشر فور إتمام الدفع، دون أي تشفير أو اشتراكات خفية.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
              <Tag className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              {isEn ? 'Fair Unified Pricing: $9.99' : 'سعر موحد عادل: 9.99$'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isEn
                ? 'Every commercial template in our catalog is priced fairly at $9.99 USD with lifetime ownership and updates.'
                : 'سعر موحد وشفاف 9.99$ لكافة القوالب التجارية، يمنحك ترخيصاً دائماً مع تحديثات مستمرة.'}
            </p>
          </div>
        </div>
      </section>

      {/* Latest Additions Section */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
              {isEn ? 'Recently Published' : 'أحدث الإضافات'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {isEn ? 'Fresh Templates in the Catalog' : 'أحدث القوالب المضافة للمتجر'}
            </h2>
          </div>
          <button
            onClick={onGoToStore}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition"
          >
            {isEn ? 'View All →' : 'عرض الكل ←'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestTemplates.map((tmpl) => (
            <TemplateCard
              key={tmpl.id}
              template={tmpl}
              onPreview={onPreviewTemplate}
              onBuy={onBuyTemplate}
              onViewDetails={onSelectTemplate}
              language={language}
            />
          ))}
        </div>
      </section>

      {/* Marketplace FAQ */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center justify-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{isEn ? 'Clear Answers' : 'إجابات واضحة'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {isEn ? 'Frequently Asked Questions' : 'الأسئلة الشائعة حول المتجر'}
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {marketplaceFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950">
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-xs sm:text-sm text-slate-200 hover:text-cyan-300 transition"
                >
                  <span>{isEn ? faq.qEn : faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-cyan-400" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-800/80 pt-3">
                    {isEn ? faq.aEn : faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
