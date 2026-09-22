import React, { useState } from 'react';
import { 
  Building2, ShieldCheck, TrendingUp, Users, Award, 
  ArrowRight, ArrowLeft, CheckCircle2, Globe, Briefcase, 
  FileText, MessageSquare, Phone, Mail, ChevronRight, 
  Star, ExternalLink, Sparkles, Clock, Calendar, BarChart3
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

export const CorporateTemplate: React.FC<TemplateDesignProps> = ({
  template,
  config,
  isDark = true,
  onToggleDark,
  onBuyNow,
  language = 'ar',
  variant = 'nova',
}) => {
  const isEn = language === 'en';
  const [selectedService, setSelectedService] = useState<number>(0);
  const [contactSubmitted, setContactSubmitted] = useState<boolean>(false);
  const [consultationDate, setConsultationDate] = useState<string>('2026-10-15');

  const services = isEn ? [
    {
      title: 'Enterprise Digital Transformation',
      desc: 'Architecting modern cloud-native systems, microservices, and automated workflows to accelerate operational throughput by 4x.',
      metrics: '350+ Global Deployments',
      icon: Globe,
      tags: ['Cloud Native', 'Microservices', 'Enterprise Architecture']
    },
    {
      title: 'Strategic Advisory & Governance',
      desc: 'C-level roadmapping, risk mitigation, and compliance frameworks engineered to protect institutional assets and ensure regulatory parity.',
      metrics: '$2.4B Transaction Volume',
      icon: ShieldCheck,
      tags: ['Risk Modeling', 'Compliance', 'Board Advisory']
    },
    {
      title: 'Enterprise AI & Cognitive Systems',
      desc: 'Integrating production-grade LLMs, autonomous agents, and predictive telemetry into core mission-critical business processes.',
      metrics: '89% Operational Efficiency',
      icon: Sparkles,
      tags: ['Machine Learning', 'GenAI Workflows', 'Data Fabric']
    },
    {
      title: 'Global Supply & Infrastructure',
      desc: 'Resilient multi-region network topology and real-time observability delivering 99.995% uptime for distributed multinational teams.',
      metrics: '99.995% SLA Guaranteed',
      icon: BarChart3,
      tags: ['Multi-Cloud', 'Zero-Trust', 'Real-Time Telemetry']
    }
  ] : [
    {
      title: 'التحول الرقمي المؤسسي',
      desc: 'بناء وهندسة أنظمة سحابية متقدمة وسير عمل مؤتمت لرفع كفاءة العمليات المؤسسية بأكثر من 4 أضعاف وفق أحدث المعايير العالمية.',
      metrics: '+350 مشروع عالمي',
      icon: Globe,
      tags: ['سحابة هجينة', 'بنى تحتية دقيقة', 'أتمتة العمليات']
    },
    {
      title: 'الاستشارات الاستراتيجية والحوكمة',
      desc: 'تخطيط استراتيجي للإدارات التنفيذية، وإدارة المخاطر، وحوكمة الامتثال المؤسسي لضمان التوافق مع أعلى المعايير التنظيمية.',
      metrics: '2.4 مليار دولار صفقات',
      icon: ShieldCheck,
      tags: ['إدارة المخاطر', 'الامتثال المالي', 'استشارات مجالس الإدارة']
    },
    {
      title: 'حلول الذكاء الاصطناعي المؤسسي',
      desc: 'دمج نماذج الذكاء الاصطناعي والوكلاء الأذكياء في العمليات الحيوية للشركات لتحقيق أقصى إنتاجية واتخاذ قرارات فورية دقيقة.',
      metrics: '89% تحسن في الإنتاجية',
      icon: Sparkles,
      tags: ['الذكاء التوليدي', 'أنظمة التنبؤ', 'تحليلات البيانات الضخمة']
    },
    {
      title: 'البنية التحتية والشبكات العالمية',
      desc: 'شبكات سحابية متعددة المناطق تتمتع بحصانة قصوى ومراقبة فورية تضمن جاهزية تشغيلية بنسبة 99.995% للمؤسسات الكبرى.',
      metrics: '99.995% اتفاقية مستوى الخدمة',
      icon: BarChart3,
      tags: ['أمان الصفر ثقة', 'مراقبة فورية', 'بنية مرنة']
    }
  ];

  const stats = isEn ? [
    { label: 'Enterprise Clients', value: '500+' },
    { label: 'Transactions Processed', value: '$2.4B' },
    { label: 'Guaranteed SLA Uptime', value: '99.99%' },
    { label: 'Global Offices', value: '35+' },
  ] : [
    { label: 'عميل مؤسسي وحكومي', value: '+500' },
    { label: 'حجم المعاملات المدارة', value: '2.4B$' },
    { label: 'نسبة الجاهزية المضمونة', value: '99.99%' },
    { label: 'مكتب وشريك حول العالم', value: '+35' },
  ];

  const caseStudies = isEn ? [
    {
      client: 'NexaCorp Global Logistics',
      category: 'Supply Chain Overhaul',
      result: '+142% throughput, -38% latency',
      summary: 'Migrated 42 legacy distribution centers into a unified edge orchestration network with predictive delivery routing.'
    },
    {
      client: 'Apex Financial Consortium',
      category: 'FinTech Compliance & Cloud',
      result: 'Zero security breaches, $18M saved',
      summary: 'Engineered an air-gapped zero-trust audit architecture processing 80,000 real-time financial clearances per second.'
    }
  ] : [
    {
      client: 'مجموعة نيكسا العالمية للخدمات اللوجستية',
      category: 'تحديث سلاسل الإمداد السحابية',
      result: '+142% سرعة معالجة، -38% انخفاض في التكاليف',
      summary: 'نقل 42 مركز توزيع لوجستي إلى منظومة سحابية موحدة تعتمد التوجيه الذكي وتتبع الشحنات بالذكاء الاصطناعي.'
    },
    {
      client: 'اتحاد أبيكس للحلول المالية والمصرفية',
      category: 'الأمن السيبراني والامتثال المصرفي',
      result: 'صفر اختراقات، وتوفير 18 مليون دولار',
      summary: 'بناء منظومة تدقيق وحماية بنظام الثقة الصفرية لمعالجة 80,000 معاملة مالية فورية في الثانية بأعلى موثوقية.'
    }
  ];

  const team = isEn ? [
    { name: 'Dr. Arthur Sterling', role: 'Chief Executive Officer', exp: 'Ex-McKinsey, Harvard MBA' },
    { name: 'Elena Rostova', role: 'Head of Enterprise Strategy', exp: '18 yrs Digital Transformation' },
    { name: 'Marcus Vance', role: 'Chief Technology Architect', exp: 'Former Cloud Principal at MIT' },
  ] : [
    { name: 'د. آرثر ستيرلينغ', role: 'الرئيس التنفيذي للمجموعة', exp: 'شريك استراتيجي سابق، هارفارد' },
    { name: 'إيلينا روستوفا', role: 'مدير الاستراتيجيات المؤسسية', exp: '18 عاماً في قيادة التحول الرقمي' },
    { name: 'ماركوس فانس', role: 'كبير مهندسي النظم السحابية', exp: 'باحث رئيسي سابق في هندسة النظم' },
  ];

  return (
    <div 
      className={`min-h-full font-sans transition-colors duration-200 ${
        isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
      dir={isEn ? 'ltr' : 'rtl'}
    >
      {/* Top Corporate Brand Bar */}
      <header className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors ${
        isDark ? 'bg-slate-950/90 border-slate-800' : 'bg-white/90 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-cyan-950/30">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight block">
                {isEn ? (template.nameEn || 'Nova Corporate Suite') : template.name}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-cyan-500 font-bold block">
                {isEn ? 'Enterprise Solutions & Advisory' : 'الحلول المؤسسية والاستشارات الاستراتيجية'}
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold">
            <a href="#services" className="hover:text-cyan-400 transition">{isEn ? 'Services' : 'الخدمات'}</a>
            <a href="#about" className="hover:text-cyan-400 transition">{isEn ? 'About Us' : 'عن المؤسسة'}</a>
            <a href="#metrics" className="hover:text-cyan-400 transition">{isEn ? 'Metrics' : 'المؤشرات'}</a>
            <a href="#cases" className="hover:text-cyan-400 transition">{isEn ? 'Case Studies' : 'دراسات الحالة'}</a>
            <a href="#contact" className="hover:text-cyan-400 transition">{isEn ? 'Consultation' : 'حجز استشارة'}</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={onToggleDark}
              className={`p-2 rounded-xl border text-xs transition ${
                isDark 
                  ? 'border-slate-800 bg-slate-900 text-slate-300 hover:text-white' 
                  : 'border-slate-200 bg-slate-100 text-slate-700 hover:text-black'
              }`}
              title="Toggle Theme"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
            <button
              onClick={onBuyNow}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black shadow-lg shadow-cyan-950/40 transition active:scale-95"
            >
              {isEn ? 'Acquire Template' : 'شراء هذا القالب'}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className={`relative overflow-hidden py-16 md:py-24 border-b ${
        isDark ? 'border-slate-900 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950' : 'border-slate-200 bg-gradient-to-b from-white via-slate-100 to-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-6 border bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isEn ? 'Next-Gen Corporate Blueprint 2026' : 'قالب الشركات والمؤسسات الكبرى المتقدم 2026'}</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6">
              {isEn 
                ? 'Architecting Resilient Enterprise Solutions for Global Growth.' 
                : 'نبتكر حلولاً مؤسسية رائدة لتمكين النمو الاستراتيجي العالمي.'}
            </h1>
            
            <p className={`text-base sm:text-lg leading-relaxed mb-8 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {isEn
                ? 'We partner with Fortune 500 leadership to modernize technology stacks, streamline global governance, and deploy mission-critical software architectures.'
                : 'شريكك الاستراتيجي الموثوق لتحديث البنى التحتية التكنولوجية، وحوكمة المنظومات الرقمية المعقدة، وتقديم استشارات رفيعة المستوى لكبرى الشركات العالمية.'}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-sm font-black shadow-xl shadow-cyan-950/30 transition flex items-center gap-2"
              >
                <span>{isEn ? 'Schedule Strategic Consultation' : 'طلب استشارة استراتيجية'}</span>
                {isEn ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              </a>
              <a
                href="#services"
                className={`px-6 py-3.5 rounded-xl text-sm font-bold border transition ${
                  isDark 
                    ? 'border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-200' 
                    : 'border-slate-300 bg-white hover:bg-slate-100 text-slate-800'
                }`}
              >
                {isEn ? 'Explore Capabilities' : 'استعراض مجالات الخبرة'}
              </a>
            </div>
          </div>

          {/* Trusted By Bar */}
          <div className="mt-16 pt-8 border-t border-slate-800/60">
            <p className={`text-xs font-bold uppercase tracking-wider mb-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              {isEn ? 'Trusted by Institutional Leaders Worldwide' : 'تحظى بثقة قادة المؤسسات والشركات الرائدة'}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-6 items-center opacity-60">
              {['VANGUARD GLOBAL', 'MERIDIAN HOLDINGS', 'QUANTUM NEXUS', 'APEX ALLIANCE', 'CROWN CAPITAL'].map((partner, i) => (
                <div key={i} className="text-center font-black tracking-widest text-xs py-2 border border-dashed border-slate-700/50 rounded-lg">
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Metrics & Numbers Section */}
      <section id="metrics" className={`py-12 border-b ${isDark ? 'bg-slate-900/50 border-slate-900' : 'bg-slate-100/70 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-slate-800/40 bg-slate-900/30 text-center">
                <span className="text-3xl sm:text-4xl font-black text-cyan-400 block mb-1">{s.value}</span>
                <span className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-cyan-500 block mb-2">
            {isEn ? 'Core Pillars of Excellence' : 'ركائز التميز المؤسسي'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black">
            {isEn ? 'Comprehensive Enterprise Services' : 'خدمات استراتيجية متكاملة لبيئات العمل المعقدة'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            const isSelected = selectedService === idx;
            return (
              <div
                key={idx}
                onClick={() => setSelectedService(idx)}
                className={`p-8 rounded-3xl border transition-all cursor-pointer ${
                  isSelected 
                    ? 'border-cyan-500 shadow-xl shadow-cyan-950/20 bg-slate-900/80' 
                    : isDark 
                    ? 'border-slate-800 bg-slate-900/40 hover:border-slate-700' 
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-800/80 text-cyan-300 border border-slate-700">
                    {srv.metrics}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3">{srv.title}</h3>
                <p className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {srv.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {srv.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-slate-800/60 text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="cases" className={`py-20 border-y ${isDark ? 'bg-slate-900/40 border-slate-900' : 'bg-slate-100/60 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-cyan-500 block mb-2">
                {isEn ? 'Proven Track Record' : 'نتائج واقعية ملموسة'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-black">
                {isEn ? 'Selected Enterprise Case Studies' : 'دراسات حالة لأبرز إنجازاتنا مع الشركاء'}
              </h2>
            </div>
            <span className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {isEn ? 'Audited Performance Benchmarks' : 'مؤشرات أداء خضعت للتدقيق والتوثيق'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {caseStudies.map((cs, idx) => (
              <div key={idx} className={`p-8 rounded-3xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-cyan-400">{cs.category}</span>
                  <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    {cs.result}
                  </span>
                </div>
                <h3 className="text-lg font-black mb-3">{cs.client}</h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{cs.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-cyan-500 block mb-2">
            {isEn ? 'Executive Board' : 'القيادة التنفيذية'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black">
            {isEn ? 'Guided by Industry Authorities' : 'نخبة من كبار الخبراء والاستشاريين المعتمدين'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <div key={idx} className={`p-6 rounded-3xl border text-center ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-slate-800 to-cyan-800 mb-4 flex items-center justify-center font-black text-xl text-white">
                {member.name.charAt(0)}
              </div>
              <h4 className="text-base font-bold mb-1">{member.name}</h4>
              <p className="text-xs text-cyan-400 font-semibold mb-2">{member.role}</p>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{member.exp}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Strategic Consultation Contact Section */}
      <section id="contact" className={`py-20 border-t ${isDark ? 'bg-slate-950 border-slate-900' : 'bg-slate-100 border-slate-200'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className={`p-8 sm:p-12 rounded-3xl border shadow-2xl ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300'}`}>
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs uppercase font-extrabold tracking-widest text-cyan-500 block mb-2">
                {isEn ? 'Direct Strategic Channel' : 'قناة الاستشارات المباشرة'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mb-3">
                {isEn ? 'Schedule a Confidential Strategic Session' : 'حجز جلسة استشارية استراتيجية مع فريق الخبراء'}
              </h2>
              <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {isEn ? 'Our senior advisors reply within 4 business hours to discuss scope and feasibility.' : 'يتواصل مستشارونا المعتمدون خلال 4 ساعات عمل لمناقشة المتطلبات وتحديد إطار العمل.'}
              </p>
            </div>

            {contactSubmitted ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h4 className="text-base font-bold text-emerald-300 mb-1">
                  {isEn ? 'Consultation Request Registered' : 'تم استلام طلب الجلسة الاستشارية بنجاح'}
                </h4>
                <p className="text-xs text-slate-400 mb-4">
                  {isEn ? 'Our corporate affairs officer will reach out with calendar options.' : 'سيتواصل معك منسق الاستشارات عبر البريد لتأكيد الموعد المناسب.'}
                </p>
                <button
                  onClick={() => setContactSubmitted(false)}
                  className="text-xs text-cyan-400 underline font-semibold"
                >
                  {isEn ? 'Submit another inquiry' : 'تقديم استفسار آخر'}
                </button>
              </div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setContactSubmitted(true);
                }} 
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold mb-1.5">{isEn ? 'Full Name' : 'الاسم الكامل'}</label>
                    <input 
                      type="text" 
                      required 
                      placeholder={isEn ? "Arthur Pendelton" : "محمد المنصوري"}
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs outline-none transition ${
                        isDark ? 'bg-slate-950 border-slate-800 text-slate-100 focus:border-cyan-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-cyan-500'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1.5">{isEn ? 'Corporate Email' : 'البريد المؤسسي'}</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="corporate@enterprise.com"
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs outline-none transition ${
                        isDark ? 'bg-slate-950 border-slate-800 text-slate-100 focus:border-cyan-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-cyan-500'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold mb-1.5">{isEn ? 'Company / Institution' : 'اسم الشركة أو المؤسسة'}</label>
                    <input 
                      type="text" 
                      required 
                      placeholder={isEn ? "Global Holdings LLC" : "شركة الحلول المتقدمة"}
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs outline-none transition ${
                        isDark ? 'bg-slate-950 border-slate-800 text-slate-100 focus:border-cyan-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-cyan-500'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1.5">{isEn ? 'Preferred Date' : 'الموعد المفضل'}</label>
                    <input 
                      type="date" 
                      value={consultationDate}
                      onChange={(e) => setConsultationDate(e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs outline-none transition ${
                        isDark ? 'bg-slate-950 border-slate-800 text-slate-100 focus:border-cyan-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-cyan-500'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1.5">{isEn ? 'Project Scope & Objectives' : 'نطاق المشروع والأهداف المرجوة'}</label>
                  <textarea 
                    rows={3}
                    placeholder={isEn ? "Brief description of strategic challenges, timeline, and technology expectations..." : "نبذة موجزة عن التحديات الاستراتيجية، والجدول الزمني، والتطلعات التقنية..."}
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs outline-none transition ${
                      isDark ? 'bg-slate-950 border-slate-800 text-slate-100 focus:border-cyan-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-cyan-500'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black shadow-lg shadow-cyan-950/40 transition active:scale-95"
                >
                  {isEn ? 'Confirm Confidential Consultation Request' : 'تأكيد إرسال طلب الجلسة الاستشارية'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 border-t text-xs ${isDark ? 'bg-slate-950 border-slate-900 text-slate-500' : 'bg-white border-slate-200 text-slate-600'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-slate-300">Nova Corporate Suite & Enterprise Architecture</span>
          </div>
          <p>© 2026 TechVault Pro Marketplace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
