import React, { useState } from 'react';
import { 
  Zap, Rocket, Code2, Cpu, ArrowRight, ArrowLeft, 
  CheckCircle2, Star, Sparkles, Terminal, Layers, 
  ShieldCheck, RefreshCw, ChevronDown, ChevronUp, 
  Check, Play, Globe, ExternalLink, Cloud
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

export const StartupTemplate: React.FC<TemplateDesignProps> = ({
  template,
  config,
  isDark = true,
  onToggleDark,
  onBuyNow,
  language = 'ar',
  variant = 'vertex',
}) => {
  const isEn = language === 'en';
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [activeTab, setActiveTab] = useState<string>('telemetry');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const isCloudPilot = variant === 'cloudpilot' || template.id.includes('cloudpilot');

  const integrations = [
    { name: 'GitHub Actions', desc: 'Continuous Deployment' },
    { name: 'Amazon Web Services', desc: 'Multi-Region Lambda' },
    { name: 'Slack Enterprise', desc: 'Real-Time Alerting' },
    { name: 'Stripe Billing', desc: 'Automated Subscriptions' },
    { name: 'Datadog APM', desc: 'Full-Stack Observability' },
    { name: 'Figma Design API', desc: 'Design Token Sync' }
  ];

  const features = isEn ? [
    {
      title: 'Zero-Latency Edge Execution',
      desc: 'Deploy micro-functions globally to 310+ edge locations with instantaneous cold-start under 12ms.',
      icon: Zap
    },
    {
      title: 'Autonomous AI Copilot',
      desc: 'Real-time static code analysis and predictive regression testing embedded directly in your commit pipeline.',
      icon: Sparkles
    },
    {
      title: 'SOC2 & HIPAA Compliant Data Vault',
      desc: 'End-to-end payload encryption at rest and in transit with hardware-isolated KMS multi-tenancy.',
      icon: ShieldCheck
    },
    {
      title: 'Collaborative Live Canvas',
      desc: 'Real-time multiplayer workspaces allowing engineering, product, and design teams to co-author architectures.',
      icon: Layers
    }
  ] : [
    {
      title: 'معالجة فورية عند أطراف الشبكة (Edge)',
      desc: 'نشر الدوال البرمجية فورياً في أكثر من 310 مركز بيانات حول العالم مع زمن تشغيل قياسي أقل من 12 مللي ثانية.',
      icon: Zap
    },
    {
      title: 'مساعد ذكاء اصطناعي مستقل للمطورين',
      desc: 'تحليل دقيق للأكواد واكتشاف الأخطاء البرمجية التراجعية قبل وصولها للإنتاج مدمج مع مستودعات الأكواد.',
      icon: Sparkles
    },
    {
      title: 'خزائن بيانات مشفرة بأعلى معايير الأمان',
      desc: 'تشفير كامل للبيانات مع مطابقة معايير SOC2 و HIPAA العالمية وعزل تام بين بيئات المستأجرين.',
      icon: ShieldCheck
    },
    {
      title: 'مساحات عمل جماعية تفاعلية فورية',
      desc: 'بيئة تطوير تعاونية تمكّن فرق الهندسة وتصميم واجهات المستخدم من التعديل والمزامنة اللحظية معاً.',
      icon: Layers
    }
  ];

  const pricingTiers = isEn ? [
    {
      name: 'Starter',
      price: billingCycle === 'annual' ? 24 : 29,
      desc: 'For early-stage startups and indie hackers launching their MVP.',
      features: ['Up to 5 Team Members', '100k Monthly API Calls', 'Edge Deployments (3 Regions)', 'Community Discord Support'],
      popular: false
    },
    {
      name: 'Scale Pro',
      price: billingCycle === 'annual' ? 79 : 99,
      desc: 'For scaling engineering teams requiring multi-region high availability.',
      features: ['Unlimited Team Members', '5M Monthly API Calls', 'Global Edge Mesh (310+ PoPs)', 'SOC2 Compliance Suite', 'Priority 24/7 SLA Support'],
      popular: true
    },
    {
      name: 'Enterprise',
      price: billingCycle === 'annual' ? 249 : 299,
      desc: 'Dedicated clusters, custom VPC peering, and custom contractual SLAs.',
      features: ['Dedicated Edge Infrastructure', 'Custom SLA 99.999%', 'On-Premises Hybrid Relay', 'Custom Single Sign-On (SAML/Okta)', 'Dedicated Solutions Engineer'],
      popular: false
    }
  ] : [
    {
      name: 'البداية (Starter)',
      price: billingCycle === 'annual' ? 24 : 29,
      desc: 'مثالية للشركات الناشئة والمطورين المستقلين لإطلاق نموذج العمل الأولي.',
      features: ['حتى 5 أعضاء في الفريق', '100,000 استدعاء شهري للـ API', 'نشر سحابي في 3 مناطق جغرافية', 'دعم مجتمعي عبر ديسكورد'],
      popular: false
    },
    {
      name: 'النمو الاحترافي (Scale Pro)',
      price: billingCycle === 'annual' ? 79 : 99,
      desc: 'للشركات التكنولوجية سريعة النمو التي تحتاج جاهزية عالية وسرعة خارقة.',
      features: ['عدد لا محدود من أعضاء الفريق', '5 مليون استدعاء شهري للـ API', 'شبكة أطراف عالمية (310+ مركز)', 'حزمة الامتثال الأمني الكامل', 'دعم فني مخصص على مدار الساعة'],
      popular: true
    },
    {
      name: 'المؤسسات الكبرى (Enterprise)',
      price: billingCycle === 'annual' ? 249 : 299,
      desc: 'بنية تحتية سحابية مستقلة بالكامل مع اتفاقيات مستوى خدمة مخصصة.',
      features: ['بنية سحابية مخصصة ومعزولة', 'اتفاقية مستوى خدمة 99.999%', 'ربط مباشر مع شبكات VPC الخاصة', 'تسجيل دخول موحد SAML/Okta', 'مهندس حلول تقنية مخصص'],
      popular: false
    }
  ];

  const faqs = isEn ? [
    {
      q: 'Can I integrate Vertex with our existing GitHub CI/CD pipeline?',
      a: 'Yes, Vertex features native GitHub Actions and GitLab CI integrations. A single webhook synchronizes builds with zero config.'
    },
    {
      q: 'How does the 14-day free trial work?',
      a: 'You get unrestricted access to the Scale Pro plan with full global edge deployment credits. No credit card is required upfront.'
    },
    {
      q: 'Is there a self-hosted or on-premises deployment option?',
      a: 'Yes, our Enterprise tier includes a Docker Compose and Kubernetes Helm chart for air-gapped on-premise deployments.'
    }
  ] : [
    {
      q: 'هل يمكن ربط القالب والمنظومة بمستودعات GitHub الحالية؟',
      a: 'نعم، يتكامل القالب تلقائياً مع GitHub Actions و GitLab CI عبر Webhook بسيط بدون الحاجة لإعدادات معقدة.'
    },
    {
      q: 'كيف تعمل الفترة التجريبية المجانية؟',
      a: 'تحصل على وصول كامل وغير مقيد لمميزات باقة Scale Pro لمدة 14 يوماً مع كافة رصيد المعالجة، دون طلب بطاقة بنكية مسبقاً.'
    },
    {
      q: 'هل يتوفر خيار الاستضافة الذاتية (On-Premises)؟',
      a: 'نعم، توفر باقة Enterprise حزم Kubernetes Helm و Docker Compose للتثبيت في خوادمك السحابية الخاصة والمعزولة تماماً.'
    }
  ];

  return (
    <div 
      className={`min-h-full font-sans transition-colors duration-200 ${
        isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
      dir={isEn ? 'ltr' : 'rtl'}
    >
      {/* SaaS Navigation */}
      <header className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors ${
        isDark ? 'bg-slate-950/90 border-slate-800' : 'bg-white/90 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-950/40">
              {isCloudPilot ? <Cloud className="w-5 h-5" /> : <Rocket className="w-5 h-5" />}
            </div>
            <div>
              <span className="font-black text-base tracking-tight block">
                {isEn ? (template.nameEn || 'Vertex SaaS Platform') : template.name}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-cyan-400 font-bold block">
                {isCloudPilot ? 'Cloud Infrastructure Platform' : 'Next-Gen Developer Operating System'}
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold">
            <a href="#features" className="hover:text-cyan-400 transition">{isEn ? 'Features' : 'المميزات'}</a>
            <a href="#preview" className="hover:text-cyan-400 transition">{isEn ? 'Console Tour' : 'واجهة التحكم'}</a>
            <a href="#integrations" className="hover:text-cyan-400 transition">{isEn ? 'Integrations' : 'التكاملات'}</a>
            <a href="#pricing" className="hover:text-cyan-400 transition">{isEn ? 'Pricing' : 'الأسعار'}</a>
            <a href="#faq" className="hover:text-cyan-400 transition">{isEn ? 'FAQ' : 'الأسئلة الشائعة'}</a>
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
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-black shadow-lg shadow-cyan-950/40 transition active:scale-95"
            >
              {isEn ? 'Acquire Theme' : 'شراء هذا القالب'}
            </button>
          </div>
        </div>
      </header>

      {/* SaaS Futuristic Hero */}
      <section className={`py-16 md:py-24 border-b relative overflow-hidden ${
        isDark 
          ? 'bg-gradient-to-b from-slate-950 via-indigo-950/20 to-slate-950 border-slate-900' 
          : 'bg-gradient-to-b from-white via-indigo-50/30 to-white border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-6 border bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
            <Zap className="w-3.5 h-3.5" />
            <span>{isEn ? 'Vertex 3.0: Edge Orchestration Live' : 'الإصدار المطور: بنية سحابية فائقة السرعة للمطورين'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto mb-6">
            {isEn
              ? 'The Unified Edge Platform for High-Velocity Engineering Teams.'
              : 'المنصة السحابية الموحدة لفرق الهندسة البرمجية سريعة الإنجاز.'}
          </h1>

          <p className={`text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            {isEn
              ? 'Deploy containerized microservices, automate distributed CI/CD, and visualize global telemetry with zero infrastructure overhead.'
              : 'انشر الحاويات البرمجية المصغرة فورياً، وأتمت عمليات الفحص والاختبار السحابية، وراقب الأداء العالمي في منصة متكاملة مذهلة.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <a
              href="#pricing"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-sm font-black shadow-xl shadow-indigo-950/40 transition flex items-center gap-2"
            >
              <span>{isEn ? 'Start 14-Day Free Trial' : 'بدء التجربة المجانية لمدة 14 يوماً'}</span>
              {isEn ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            </a>
            <a
              href="#preview"
              className={`px-6 py-3.5 rounded-xl text-sm font-bold border transition ${
                isDark ? 'border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-200' : 'border-slate-300 bg-white hover:bg-slate-100 text-slate-800'
              }`}
            >
              {isEn ? 'Watch Interactive Demo' : 'مشاهدة العرض التفاعلي'}
            </a>
          </div>

          {/* SaaS Console Mockup */}
          <div id="preview" className="max-w-5xl mx-auto rounded-3xl border border-slate-800 bg-slate-900/90 shadow-2xl p-4 sm:p-6 text-left" dir="ltr">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-xs text-slate-400 font-mono ml-2">https://console.vertex.cloud/clusters/prod-eu-west</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  HEALTHY 99.99%
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 font-mono uppercase block mb-1">Global Traffic (RPS)</span>
                <span className="text-2xl font-black text-cyan-400 font-mono">148,290 /s</span>
                <span className="text-[10px] text-emerald-400 block mt-1">+18.4% vs peak</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 font-mono uppercase block mb-1">P99 Edge Latency</span>
                <span className="text-2xl font-black text-indigo-400 font-mono">11.4 ms</span>
                <span className="text-[10px] text-slate-400 block mt-1">310 Edge Nodes</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 font-mono uppercase block mb-1">Zero-Trust Isolation</span>
                <span className="text-2xl font-black text-purple-400 font-mono">Active 256-bit</span>
                <span className="text-[10px] text-emerald-400 block mt-1">SOC2 Certified</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300">
              <p className="text-slate-500 mb-1">// Real-time cluster log stream</p>
              <p><span className="text-emerald-400">11:42:01</span> [deploy] Canary release v3.4.1 deployed to 310 edge nodes across 42 regions.</p>
              <p><span className="text-cyan-400">11:42:04</span> [proxy] Traffic balanced: 100% healthy, 0 dropped packets, TLS 1.3 handshake 1.2ms.</p>
              <p><span className="text-indigo-400">11:42:09</span> [ai-copilot] Memory consumption optimized by -32% using dynamic buffer reallocation.</p>
            </div>
          </div>

        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-cyan-400 block mb-2">
            {isEn ? 'Engineered for Performance' : 'مصممة للسرعة والموثوقية القصوى'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black">
            {isEn ? 'Everything You Need to Ship at Scale' : 'كل ما تحتاجه لإطلاق برمجياتك عالمياً باحترافية'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className={`p-8 rounded-3xl border transition-all ${
                  isDark ? 'border-slate-800 bg-slate-900/40 hover:border-slate-700' : 'border-slate-200 bg-white hover:border-slate-300 shadow-sm'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Integrations Cloud */}
      <section id="integrations" className={`py-20 border-y ${isDark ? 'bg-slate-900/50 border-slate-900' : 'bg-slate-100/70 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-indigo-400 block mb-2">
              {isEn ? 'Ecosystem Integration' : 'التكامل السلس مع أدواتك المفضلة'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black">
              {isEn ? 'Works with Your Modern Tech Stack' : 'اربط منصتك بنقرة واحدة مع أكثر من 50 أداة برمجية'}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {integrations.map((itg, i) => (
              <div key={i} className={`p-4 rounded-2xl border text-center ${
                isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="w-10 h-10 mx-auto rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold mb-2">
                  {itg.name.charAt(0)}
                </div>
                <h4 className="text-xs font-bold mb-1">{itg.name}</h4>
                <p className="text-[10px] text-slate-400">{itg.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tiered Pricing Section */}
      <section id="pricing" className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-cyan-400 block mb-2">
            {isEn ? 'Transparent Pricing' : 'خطط أسعار واضحة ومرنة'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black mb-6">
            {isEn ? 'Predictable Plans That Scale With You' : 'اختر الخطة المناسبة لحجم ونمو فريقك'}
          </h2>

          {/* Billing Switch */}
          <div className="inline-flex items-center gap-3 p-1.5 rounded-2xl border border-slate-800 bg-slate-900 text-xs font-bold">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-xl transition ${billingCycle === 'monthly' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'}`}
            >
              {isEn ? 'Monthly' : 'شهري'}
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${billingCycle === 'annual' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'}`}
            >
              <span>{isEn ? 'Annual Billing' : 'سنوي'}</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-indigo-600 text-white font-extrabold">20% OFF</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pricingTiers.map((tier, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-3xl border flex flex-col justify-between transition-all ${
                tier.popular 
                  ? 'border-cyan-500 shadow-2xl shadow-cyan-950/40 bg-slate-900 relative' 
                  : isDark 
                  ? 'border-slate-800 bg-slate-900/40' 
                  : 'border-slate-200 bg-white'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                  {isEn ? 'Most Popular for High Velocity' : 'الخطة الأكثر طلباً'}
                </div>
              )}

              <div>
                <h3 className="text-xl font-black mb-2">{tier.name}</h3>
                <p className={`text-xs mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{tier.desc}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-black font-mono">${tier.price}</span>
                  <span className="text-xs text-slate-400">{isEn ? '/mo billed ' + billingCycle : '/شهر تدفع ' + (billingCycle === 'annual' ? 'سنوياً' : 'شهرياً')}</span>
                </div>

                <div className="space-y-3 mb-8">
                  {tier.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs">
                      <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={onBuyNow}
                className={`w-full py-3 rounded-xl text-xs font-black transition active:scale-95 ${
                  tier.popular
                    ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-950/30'
                    : isDark
                    ? 'bg-slate-800 hover:bg-slate-700 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                }`}
              >
                {isEn ? 'Deploy with Vertex' : 'تفعيل الخطة الآن'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ & CTA */}
      <section id="faq" className="py-20 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-cyan-400 block mb-2">
            {isEn ? 'Clear Answers' : 'إجابات واضحة'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black">
            {isEn ? 'Frequently Asked Questions' : 'الأسئلة الشائعة حول المنصة'}
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
                  {isOpen ? <ChevronUp className="w-4 h-4 text-cyan-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
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

        {/* Final CTA Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-cyan-900/40 via-indigo-900/40 to-purple-900/40 border border-indigo-500/30 text-center relative overflow-hidden">
          <h3 className="text-2xl sm:text-3xl font-black mb-3">
            {isEn ? 'Ready to Ship with Instant Velocity?' : 'جاهز لنقل مشاريعك البرمجية للمستوى التالي؟'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mb-6">
            {isEn ? 'Join over 4,500 engineering teams deploying on Vertex today.' : 'انضم لأكثر من 4,500 فريق تطوير يبنون ويطلقون برمجياتهم على المنصة اليوم.'}
          </p>
          <button
            onClick={onBuyNow}
            className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black shadow-xl shadow-cyan-950/40 transition active:scale-95"
          >
            {isEn ? 'Get Started Free' : 'ابدأ تجربتك المجانية الآن'}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 border-t text-xs ${isDark ? 'bg-slate-950 border-slate-900 text-slate-500' : 'bg-white border-slate-200 text-slate-600'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Rocket className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-slate-300">Vertex Cloud Operating System & SaaS Architecture</span>
          </div>
          <p>© 2026 TechVault Pro Marketplace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
