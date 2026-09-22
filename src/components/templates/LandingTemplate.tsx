import React, { useState } from 'react';
import { 
  Sparkles, Smartphone, Download, Star, CheckCircle2, 
  Play, BookOpen, Clock, ShieldCheck, ArrowRight, ArrowLeft, 
  ChevronDown, ChevronUp, Layers, Award, Zap
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

export const LandingTemplate: React.FC<TemplateDesignProps> = ({
  template,
  config,
  isDark = true,
  onToggleDark,
  onBuyNow,
  language = 'ar',
  variant = 'product-launch',
}) => {
  const isEn = language === 'en';
  const tid = template.id.toLowerCase();

  const isCourse = variant === 'course-education' || tid.includes('course') || tid.includes('academy');
  const isApp = variant === 'mobile-app' || tid.includes('app') || tid.includes('forge') || tid.includes('pulse-mobile');
  const isHardware = !isCourse && !isApp;

  // Course Accordion State
  const [activeModule, setActiveModule] = useState<number | null>(0);

  // -------------------------------------------------------------
  // VARIANT 1: COURSE FLOW ACADEMY (EDUCATION)
  // -------------------------------------------------------------
  if (isCourse) {
    const modules = isEn ? [
      { title: 'Module 1: Foundations of Distributed Architecture', lessons: '8 Lessons • 2h 45m', topics: ['Consensus Protocols (Raft & Paxos)', 'CAP Theorem in Practice', 'Designing Idempotent APIs'] },
      { title: 'Module 2: High-Throughput Event Streams with Kafka', lessons: '12 Lessons • 4h 10m', topics: ['Partitioning Strategies', 'Exactly-Once Semantics', 'Dead Letter Queue Patterns'] },
      { title: 'Module 3: Database Internals: B-Trees vs LSM-Trees', lessons: '10 Lessons • 3h 30m', topics: ['Storage Engine Mechanics', 'WAL & Write Amplification', 'Zero-Downtime Schema Migrations'] },
      { title: 'Module 4: Global Caching & Edge Consistency', lessons: '6 Lessons • 2h 15m', topics: ['Cache Stampede Mitigation', 'Redis Cluster Topologies', 'Eventual Consistency Testing'] },
    ] : [
      { title: 'الوحدة 1: أساسيات النظم والبنى التحتية الموزعة', lessons: '8 دروس • ساعتان و45 دقيقة', topics: ['بروتوكولات الإجماع (Raft & Paxos)', 'نظرية CAP في التطبيقات الواقعية', 'تصميم واجهات برمجية آمنة التكرار'] },
      { title: 'الوحدة 2: معالجة تدفقات البيانات الضخمة عبر Kafka', lessons: '12 درساً • 4 ساعات و10 دقائق', topics: ['استراتيجيات تقسيم الحزم', 'ضمان معالجة البيانات لمرة واحدة بدقة', 'معالجة الرسائل العالقة والمفقودة'] },
      { title: 'الوحدة 3: هندسة قواعد البيانات من الداخل (B-Trees & LSM)', lessons: '10 دروس • 3 ساعات و30 دقيقة', topics: ['آليات عمل محركات التخزين السحابية', 'سجلات الكتابة المسبقة (WAL)', 'ترحيل البيانات وقواعد البيانات بدون توقف'] },
      { title: 'الوحدة 4: التخزين المؤقت وحصانة أطراف الشبكة العالمية', lessons: '6 دروس • ساعتان و15 دقيقة', topics: ['حماية الخوادم من انهيار الكاش المفاجئ', 'بنى مصفوفات Redis العنقودية', 'اختبار اتساق البيانات اللحظي'] },
    ];

    return (
      <div className={`min-h-full font-sans transition-colors duration-200 ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`} dir={isEn ? 'ltr' : 'rtl'}>
        <header className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2 font-black text-sm">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            <span>{isEn ? (template.nameEn || 'CourseFlow Academy') : template.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onToggleDark}>{isDark ? '☀️' : '🌙'}</button>
            <button onClick={onBuyNow} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl">
              {isEn ? 'Enroll in Masterclass' : 'الانضمام للدورة التدريبية'}
            </button>
          </div>
        </header>

        <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 inline-block mb-4">
            {isEn ? 'Elite Staff Engineer Curriculum' : 'برنامج تدريبي متقدم لكبار مهندسي البرمجيات'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black mb-6">
            {isEn ? 'Master Large-Scale Distributed Systems Engineering.' : 'احتراف هندسة النظم البرمجية الموزعة فائقة الضخامة.'}
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mb-8 max-w-2xl mx-auto">
            {isEn ? 'Learn from industry veterans who scaled systems to 100M+ users at Google, Netflix, and Meta.' : 'تعلم مباشرة من كبار مهندسي النظم الذين صمموا وأداروا أنظمة تخدم مئات الملايين من المستخدمين.'}
          </p>
        </section>

        {/* Syllabus Accordion */}
        <section className="py-12 max-w-3xl mx-auto px-4 sm:px-6 space-y-4">
          <h2 className="text-xl font-black mb-6 text-center">{isEn ? 'Comprehensive Curriculum Syllabus' : 'المحتوى الدراسي التفصيلي للدورة'}</h2>
          {modules.map((m, idx) => {
            const isOpen = activeModule === idx;
            return (
              <div key={idx} className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden">
                <button onClick={() => setActiveModule(isOpen ? null : idx)} className="w-full p-5 text-left flex items-center justify-between font-bold text-sm">
                  <div>
                    <h3 className="text-sm font-bold text-slate-200">{m.title}</h3>
                    <span className="text-xs text-indigo-400 font-semibold">{m.lessons}</span>
                  </div>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-indigo-400" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 border-t border-slate-800/60 pt-3 space-y-2">
                    {m.topics.map((t, tIdx) => (
                      <div key={tIdx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </section>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VARIANT 2: APP FORGE MOBILE SHOWCASE
  // -------------------------------------------------------------
  if (isApp) {
    return (
      <div className={`min-h-full font-sans transition-colors duration-200 ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`} dir={isEn ? 'ltr' : 'rtl'}>
        <header className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2 font-black text-sm">
            <Smartphone className="w-5 h-5 text-cyan-400" />
            <span>{isEn ? (template.nameEn || 'AppForge Mobile') : template.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onToggleDark}>{isDark ? '☀️' : '🌙'}</button>
            <button onClick={onBuyNow} className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs rounded-xl">
              {isEn ? 'Get App Template' : 'شراء قالب التطبيق'}
            </button>
          </div>
        </header>

        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 inline-block mb-4">
                iOS 19 & Android 15 Ready
              </span>
              <h1 className="text-3xl sm:text-5xl font-black mb-6 leading-tight">
                {isEn ? 'Your Entire Financial Life in One Powerful App.' : 'حياتك المالية واستثماراتك الذكية في تطبيق فائق الأناقة والسرعة.'}
              </h1>
              <p className="text-sm sm:text-base text-slate-400 mb-8 leading-relaxed">
                {isEn ? 'Instant biometric login, AI spending predictions, and multi-currency virtual cards with zero foreign transaction fees.' : 'تسجيل دخول بيومتري فوري، وتنبؤات ذكية بمصاريفك الشهرية، وبطاقات رقمية متعددة العملات بدون أي رسوم دولية.'}
              </p>

              {/* Store Download Badges */}
              <div className="flex flex-wrap items-center gap-4">
                <button onClick={onBuyNow} className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-900 border border-slate-700 hover:border-slate-500 transition">
                  <AppleIcon className="w-6 h-6 text-white" />
                  <div className="text-left text-xs">
                    <span className="block text-[10px] text-slate-400">Download on the</span>
                    <span className="font-bold text-white">Apple App Store</span>
                  </div>
                </button>
                <button onClick={onBuyNow} className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-900 border border-slate-700 hover:border-slate-500 transition">
                  <PlayStoreIcon className="w-6 h-6 text-white" />
                  <div className="text-left text-xs">
                    <span className="block text-[10px] text-slate-400">Get it on</span>
                    <span className="font-bold text-white">Google Play</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Mobile App Phone Frame */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-64 sm:w-72 aspect-[9/19] rounded-[48px] border-4 border-slate-700 bg-slate-900 shadow-2xl p-3 relative overflow-hidden">
                <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-4"></div>
                <div className="p-3 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Total Balance</span>
                    <span className="text-emerald-400 font-bold">+14.2%</span>
                  </div>
                  <div className="text-2xl font-black font-mono text-white">$42,850.00</div>
                  <div className="h-24 rounded-xl bg-gradient-to-tr from-cyan-600/30 to-indigo-600/30 border border-cyan-500/20 p-2 flex items-end">
                    <div className="w-full flex items-end justify-between h-12 gap-1">
                      {[40, 65, 55, 80, 70, 95, 85].map((h, i) => (
                        <div key={i} style={{ height: `${h}%` }} className="w-full bg-cyan-400 rounded-t-sm"></div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    {['Netflix Subscription', 'Apple Store Online', 'Coffee Roasters'].map((tx, idx) => (
                      <div key={idx} className="p-2 rounded-lg bg-slate-950 flex justify-between text-[11px]">
                        <span className="text-slate-300">{tx}</span>
                        <span className="text-rose-400 font-bold">-$14.99</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VARIANT 3: LAUNCH KIT PRODUCT (HARDWARE LAUNCH)
  // -------------------------------------------------------------
  return (
    <div className={`min-h-full font-sans transition-colors duration-200 ${isDark ? 'bg-neutral-950 text-neutral-100' : 'bg-neutral-50 text-neutral-900'}`} dir={isEn ? 'ltr' : 'rtl'}>
      <header className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between border-b border-neutral-800">
        <div className="flex items-center gap-2 font-black text-sm">
          <Zap className="w-5 h-5 text-amber-400" />
          <span>{isEn ? (template.nameEn || 'LaunchKit Product') : template.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onToggleDark}>{isDark ? '☀️' : '🌙'}</button>
          <button onClick={onBuyNow} className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black text-xs rounded-xl">
            {isEn ? 'Pre-Order Now' : 'الطلب المسبق الآن'}
          </button>
        </div>
      </header>

      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-400 text-neutral-950 inline-block mb-6">
          {isEn ? 'FOUNDERS BATCH: ONLY 240 UNITS REMAINING' : 'دفعة الإطلاق الأولى: بقي 240 وحدة فقط'}
        </span>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-6">
          {isEn ? 'Precision Sound. Titanium Core.' : 'نقاء صوتي استثنائي. بهيكل صلب من التيتانيوم.'}
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto mb-10">
          {isEn ? 'Planar magnetic acoustic drivers with lossless wireless Bluetooth 5.4 and 60-hour continuous playback.' : 'سماعات احترافية بدقة صوتية مذهلة وتقنية بلوتوث 5.4 وبطارية تدوم لأكثر من 60 ساعة تشغيل متواصلة.'}
        </p>
        <button onClick={onBuyNow} className="px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black text-sm transition">
          {isEn ? 'Reserve Early-Bird Tier ($299)' : 'حجز سعر الطرح المبكر ($299)'}
        </button>
      </section>
    </div>
  );
};

// Simple vector badges
function AppleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.67-.82 1.13-1.96.99-3.1-.98.04-2.19.67-2.88 1.48-.61.71-1.14 1.88-1 3 .01 0 .04 0 .07 0 1.01 0 2.14-.56 2.82-1.38z"/>
    </svg>
  );
}

function PlayStoreIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M3.61 2.37c-.36.38-.56.96-.56 1.7v15.86c0 .74.2 1.32.56 1.7l.09.09 9.39-9.39v-.22L3.7 2.28l-.09.09zm11.75 8.16l-2.36-2.36L3.92 2.76l9.08 5.25 2.36 2.52zm.47.47l2.84 1.64c.81.47.81 1.24 0 1.71l-2.84 1.64-2.42-2.49 2.42-2.5zm-.47.47L3.92 21.24l9.08-5.41 2.36-2.36-2.36-2z"/>
    </svg>
  );
}
