import React, { useState } from 'react';
import { 
  Terminal, Code2, Camera, Palette, ArrowRight, ArrowLeft, 
  Github, ExternalLink, Star, GitBranch, CheckCircle2, 
  Mail, MapPin, Briefcase, Award, Eye, X, ZoomIn, Layers
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

export const PortfolioTemplate: React.FC<TemplateDesignProps> = ({
  template,
  config,
  isDark = true,
  onToggleDark,
  onBuyNow,
  language = 'ar',
  variant = 'developer',
}) => {
  const isEn = language === 'en';
  const tid = template.id.toLowerCase();
  
  // Resolve mode: 'developer' | 'creative-studio' | 'photography'
  const isPhotography = variant === 'photography' || tid.includes('photo') || tid.includes('framefolio') || tid.includes('shutter');
  const isCreativeStudio = variant === 'creative-studio' || tid.includes('atelier') || tid.includes('creative') || tid.includes('luxe') || tid.includes('artisan');
  const isDeveloper = !isPhotography && !isCreativeStudio;

  // Photography State
  const [photoFilter, setPhotoFilter] = useState<string>('all');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Developer State
  const [activeProjectTab, setActiveProjectTab] = useState<string>('all');
  const [contactSent, setContactSent] = useState<boolean>(false);

  // -------------------------------------------------------------
  // VARIANT 1: FRAME FOLIO PHOTOGRAPHY
  // -------------------------------------------------------------
  if (isPhotography) {
    const photos = [
      { id: 1, title: 'Nordic Solitude', cat: 'landscape', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80', desc: 'Lofoten Islands, Norway — Hasselblad X2D 100C' },
      { id: 2, title: 'Brutalist Geometry', cat: 'architecture', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop&q=80', desc: 'Barbican Estate, London — Leica M11 Monochrom' },
      { id: 3, title: 'Echoes of Sahara', cat: 'landscape', url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1200&auto=format&fit=crop&q=80', desc: 'Erg Chebbi, Morocco — Sony A7R V' },
      { id: 4, title: 'Silhouettes in Fog', cat: 'portrait', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&auto=format&fit=crop&q=80', desc: 'Studio Portrait Series — 85mm f/1.2 GM' },
      { id: 5, title: 'Vertical Zenith', cat: 'aerial', url: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=1200&auto=format&fit=crop&q=80', desc: 'Chicago Gridlock from 2,500ft — DJI Inspire 3' },
      { id: 6, title: 'The Gilded Hour', cat: 'portrait', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200&auto=format&fit=crop&q=80', desc: 'Editorial Fashion Shoot — Natural Ambient Light' },
    ];

    const filteredPhotos = photoFilter === 'all' ? photos : photos.filter(p => p.cat === photoFilter);

    return (
      <div className={`min-h-full font-serif transition-colors duration-200 ${isDark ? 'bg-stone-950 text-stone-100' : 'bg-stone-50 text-stone-900'}`} dir={isEn ? 'ltr' : 'rtl'}>
        {/* Navigation */}
        <header className={`sticky top-0 z-40 border-b backdrop-blur-md ${isDark ? 'bg-stone-950/90 border-stone-800' : 'bg-white/90 border-stone-200'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Camera className="w-5 h-5 text-amber-500" />
              <span className="font-sans font-black text-sm tracking-widest uppercase">
                {isEn ? (template.nameEn || 'FrameFolio Photography') : template.name}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={onToggleDark} className="p-2 text-xs rounded-xl border border-stone-800">
                {isDark ? '☀️' : '🌙'}
              </button>
              <button onClick={onBuyNow} className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-sans font-black transition">
                {isEn ? 'Acquire Theme' : 'شراء القالب'}
              </button>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <section className="relative h-[65vh] overflow-hidden">
          <img src={photos[0].url} alt="Hero Photograph" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-stone-950/50 flex items-center justify-center text-center p-6">
            <div className="max-w-2xl text-white">
              <span className="font-sans text-[11px] uppercase tracking-widest text-amber-400 block mb-3">
                {isEn ? 'Fine Art & Editorial Photography' : 'معرض التصوير الفوتوغرافي الراقي والتحريري'}
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight mb-4">
                {isEn ? 'Capturing Silence & Light.' : 'توثيق الضوء والصمت واللحظات الخالدة.'}
              </h1>
              <p className="font-sans text-xs sm:text-sm text-stone-300 max-w-lg mx-auto">
                {isEn ? 'Archival prints, editorial assignments, and fine art commercial monographs.' : 'مطبوعات متحفية، وتكليفات تصوير صحفي وتجاري راقٍ حول العالم.'}
              </p>
            </div>
          </div>
        </section>

        {/* Filter Navigation */}
        <section className="py-8 border-b border-stone-800 text-center font-sans text-xs font-bold">
          <div className="inline-flex gap-2 flex-wrap justify-center px-4">
            {['all', 'landscape', 'architecture', 'portrait', 'aerial'].map(cat => (
              <button
                key={cat}
                onClick={() => setPhotoFilter(cat)}
                className={`px-4 py-1.5 rounded-full capitalize transition ${photoFilter === cat ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-stone-100'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Masonry / Photo Gallery */}
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo) => (
              <div 
                key={photo.id}
                onClick={() => setLightboxImage(photo.url)}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-stone-900 cursor-pointer"
              >
                <img src={photo.url} alt={photo.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end text-white">
                  <h3 className="font-serif text-lg font-bold">{photo.title}</h3>
                  <p className="font-sans text-[11px] text-amber-400">{photo.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Lightbox Modal */}
        {lightboxImage && (
          <div className="fixed inset-0 z-50 bg-stone-950/95 flex items-center justify-center p-4">
            <button onClick={() => setLightboxImage(null)} className="absolute top-6 right-6 text-white p-2">
              <X className="w-8 h-8" />
            </button>
            <img src={lightboxImage} alt="Enlarged" className="max-w-full max-h-[85vh] object-contain rounded-xl" />
          </div>
        )}

        {/* Photographer Profile & Gear */}
        <section className={`py-16 border-t ${isDark ? 'bg-stone-900/40 border-stone-800' : 'bg-stone-100 border-stone-200'}`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center font-sans">
            <h2 className="font-serif text-2xl sm:text-3xl mb-4">{isEn ? 'Behind the Lens' : 'خلف العدسة'}</h2>
            <p className="text-xs sm:text-sm text-stone-400 max-w-xl mx-auto leading-relaxed mb-6">
              {isEn ? 'Shot with Hasselblad medium format and Leica M rangefinder optics. Printed on Hahnemühle Photo Rag Baryta 315gsm.' : 'يتم التصوير بعدسات لايكا وهاسيلبلاد ذات الحساس العريض، والطباعة على أرقى أوراق هانموله الألمانية المتحفية.'}
            </p>
            <div className="inline-flex gap-4 text-xs font-mono text-amber-400">
              <span>Hasselblad X2D 100C</span>
              <span>•</span>
              <span>Leica M11-P</span>
              <span>•</span>
              <span>Summilux 35mm f/1.4</span>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VARIANT 2: ATELIER CREATIVE STUDIO
  // -------------------------------------------------------------
  if (isCreativeStudio) {
    const projects = isEn ? [
      { client: 'Vogue Scandinavia', type: 'Art Direction & Editorial Typography', year: '2026', img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=1200&auto=format&fit=crop&q=80' },
      { client: 'Aethel Luxury House', type: 'Brand Identity & Visual Packaging', year: '2026', img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&auto=format&fit=crop&q=80' },
      { client: 'Krono Spatial Audio', type: 'Design System & Exhibition Spatial', year: '2025', img: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1200&auto=format&fit=crop&q=80' },
    ] : [
      { client: 'دار فوغ إسكندنافيا', type: 'الإدارة الفنية وتنسيق الخطوط التحريرية', year: '2026', img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=1200&auto=format&fit=crop&q=80' },
      { client: 'علامة آيثل الفاخرة', type: 'الهوية البصرية والتغليف الراقي للمنتجات', year: '2026', img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&auto=format&fit=crop&q=80' },
      { client: 'منظومة كرونو الصوتية', type: 'نظام التصميم الشامل والمعارض التفاعلية', year: '2025', img: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1200&auto=format&fit=crop&q=80' },
    ];

    return (
      <div className={`min-h-full font-serif transition-colors duration-200 ${isDark ? 'bg-zinc-950 text-zinc-100' : 'bg-zinc-50 text-zinc-900'}`} dir={isEn ? 'ltr' : 'rtl'}>
        <header className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex items-center justify-between border-b border-zinc-800/40">
          <div className="font-serif text-2xl font-light tracking-widest uppercase">
            {isEn ? (template.nameEn || 'Atelier Studio') : template.name}
          </div>
          <div className="flex items-center gap-4 font-sans text-xs">
            <button onClick={onToggleDark}>{isDark ? '☀️' : '🌙'}</button>
            <button onClick={onBuyNow} className="px-4 py-2 bg-zinc-100 text-zinc-950 font-bold rounded-full">
              {isEn ? 'Acquire Theme' : 'شراء القالب'}
            </button>
          </div>
        </header>

        <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6">
          <span className="font-sans text-xs uppercase tracking-widest text-zinc-400 block mb-6">
            {isEn ? 'Independent Creative Practice' : 'استوديو التصميم والإدارة الفنية المستقل'}
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light leading-none tracking-tight mb-8">
            {isEn ? 'We sculpt visual identities that resonate across culture & commerce.' : 'نبتكر هويات بصرية خالدة تعبر بجرأة عن التميز الإبداعي.'}
          </h1>
        </section>

        {/* Selected Work List */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-24 space-y-16">
          {projects.map((proj, idx) => (
            <div key={idx} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-t border-zinc-800/60 pt-12">
              <div className="lg:col-span-5 space-y-3 font-sans">
                <span className="text-xs text-zinc-400 font-mono">0{idx + 1} / {proj.year}</span>
                <h3 className="font-serif text-3xl font-light">{proj.client}</h3>
                <p className="text-xs text-zinc-400">{proj.type}</p>
              </div>
              <div className="lg:col-span-7 aspect-[16/10] overflow-hidden rounded-2xl bg-zinc-900">
                <img src={proj.img} alt={proj.client} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
          ))}
        </section>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VARIANT 3: CODE CRAFT DEVELOPER PORTFOLIO
  // -------------------------------------------------------------
  const devProjects = isEn ? [
    {
      title: 'Hyperion Kernel Mesh',
      tech: ['Rust', 'eBPF', 'Linux Kernel', 'Wasm'],
      stars: '1.4k',
      commits: '640',
      desc: 'High-throughput packet filtering and distributed proxy runtime achieving 40M RPS on bare metal.',
      demoUrl: '#'
    },
    {
      title: 'Aether Engine DB',
      tech: ['Go', 'Raft Consensus', 'gRPC', 'LSM-Tree'],
      stars: '890',
      commits: '412',
      desc: 'Distributed transactional key-value store engineered for zero-allocation memory utilization.',
      demoUrl: '#'
    },
    {
      title: 'Prism GraphQL Compiler',
      tech: ['TypeScript', 'Rust Compiler', 'AST', 'React 19'],
      stars: '2.1k',
      commits: '980',
      desc: 'Compile-time query planner and static code generator eliminating runtime GraphQL over-fetching.',
      demoUrl: '#'
    }
  ] : [
    {
      title: 'نواة شبكة هايبريون (Hyperion)',
      tech: ['Rust', 'eBPF', 'نواة لينكس', 'Wasm'],
      stars: '1.4k',
      commits: '640',
      desc: 'محرك معالجة حزم بيانات فائق السرعة يحقق أكثر من 40 مليون استجابة في الثانية مباشرة على العتاد.',
      demoUrl: '#'
    },
    {
      title: 'قاعدة بيانات آيثر الموزعة',
      tech: ['Go', 'Raft Consensus', 'gRPC', 'LSM-Tree'],
      stars: '890',
      commits: '412',
      desc: 'محرك تخزين معاملات مفتاح-قيمة موزع مصمم للاستغلال الأمثل للذاكرة دون أي هدر في الموارد.',
      demoUrl: '#'
    },
    {
      title: 'مترجم كود بريزم (Prism)',
      tech: ['TypeScript', 'Rust Compiler', 'AST', 'React 19'],
      stars: '2.1k',
      commits: '980',
      desc: 'مترجم وقت البناء يولد استعلامات دقيقة تلقائياً ويمنع جلب البيانات الزائدة عبر الويب.',
      demoUrl: '#'
    }
  ];

  const skills = [
    { cat: 'Systems & Cloud', items: ['Rust', 'Go', 'Docker', 'Kubernetes', 'Linux Kernel', 'eBPF', 'AWS', 'Terraform'] },
    { cat: 'Frontend & UI', items: ['TypeScript', 'React 19', 'Next.js', 'Tailwind CSS', 'WebAssembly', 'Vite'] },
    { cat: 'Databases & Protocols', items: ['PostgreSQL', 'Redis', 'Kafka', 'gRPC', 'HTTP/3', 'GraphQL'] }
  ];

  return (
    <div 
      className={`min-h-full font-mono transition-colors duration-200 ${
        isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-900 text-slate-100'
      }`}
      dir={isEn ? 'ltr' : 'rtl'}
    >
      {/* Terminal Bar */}
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/95 backdrop-blur px-4 sm:px-6 h-14 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span className="font-bold text-slate-300">
            {isEn ? (template.nameEn || 'codecraft@root: ~') : template.name}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onToggleDark} className="p-1.5 rounded bg-slate-900 border border-slate-800 text-[10px]">
            {isDark ? 'LIGHT' : 'DARK'}
          </button>
          <button onClick={onBuyNow} className="px-3 py-1.5 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition">
            {isEn ? 'Buy Template' : 'شراء هذا القالب'}
          </button>
        </div>
      </header>

      {/* Terminal Prompt Hero */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl space-y-4 text-xs sm:text-sm">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3 text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-[11px] ml-2 text-slate-500 font-bold">bash - 80x24</span>
          </div>

          <p className="text-emerald-400 font-bold">$ whoami</p>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-100 font-sans tracking-tight">
            {isEn ? 'Senior Staff Systems & Infrastructure Engineer' : 'كبير مهندسي النظم والبنى التحتية السحابية الموزعة'}
          </h1>
          <p className="text-slate-400 leading-relaxed max-w-2xl font-sans">
            {isEn 
              ? '12+ years architecting high-scale distributed backends, microkernels, and low-latency network primitives. Open source contributor and tech lead.'
              : 'أكثر من 12 عاماً في هندسة وتطوير النظم الموزعة عالية الأداء، وبرمجيات الشبكات منخفضة زمن الاستجابة، والمساهمة الفاعلة في البرمجيات مفتوحة المصدر.'}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <span className="px-3 py-1 rounded bg-slate-950 border border-emerald-500/30 text-emerald-400 text-xs">
              status: available for high-impact contracts
            </span>
            <span className="px-3 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 text-xs">
              location: Global Remote (UTC±4)
            </span>
          </div>
        </div>
      </section>

      {/* Tech Stack Matrix */}
      <section className="py-8 max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-4 font-sans">
          {isEn ? '// Core Competencies & Toolchain' : '// لغات البرمجة والتقنيات الأساسية'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {skills.map((grp, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h3 className="text-xs font-bold text-slate-300 mb-3 font-sans">{grp.cat}</h3>
              <div className="flex flex-wrap gap-1.5">
                {grp.items.map((it, i) => (
                  <span key={i} className="px-2 py-0.5 rounded text-[11px] bg-slate-950 border border-slate-800 text-slate-300">
                    {it}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-6 font-sans">
          {isEn ? '// Featured Open Source & Engineering Work' : '// مشاريع مفتوحة المصدر وهندسة النظم'}
        </h2>
        <div className="space-y-4">
          {devProjects.map((proj, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <Code2 className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-base font-bold text-slate-100 font-sans">{proj.title}</h3>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400" /> {proj.stars}</span>
                  <span className="flex items-center gap-1"><GitBranch className="w-3.5 h-3.5" /> {proj.commits} commits</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 mb-4 leading-relaxed font-sans">{proj.desc}</p>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/60">
                <div className="flex flex-wrap gap-1.5">
                  {proj.tech.map((t, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-emerald-400 border border-emerald-500/20 font-mono">
                      {t}
                    </span>
                  ))}
                </div>
                <a href={proj.demoUrl} className="text-xs font-bold text-slate-300 hover:text-emerald-400 flex items-center gap-1 transition">
                  <span>View Repository</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Terminal Contact */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800">
          <h2 className="text-sm font-bold text-emerald-400 mb-2">// Connect & Discuss Architecture</h2>
          <p className="text-xs text-slate-400 mb-6 font-sans">
            {isEn ? 'Direct channel for CTOs, hiring teams, and open source collaborations.' : 'قناة التواصل المباشر مع مديري التقنية والمؤسسات التقنية الكبرى.'}
          </p>

          {contactSent ? (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
              ✓ Message dispatched successfully. Will reply within 6 hours.
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setContactSent(true); }} className="space-y-3 text-xs">
              <input 
                type="text" 
                required 
                placeholder="name@company.com" 
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 outline-none text-slate-200 focus:border-emerald-500"
              />
              <textarea 
                rows={3} 
                required 
                placeholder="Project requirements, budget, or architectural question..." 
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 outline-none text-slate-200 focus:border-emerald-500 font-sans"
              />
              <button type="submit" className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition">
                $ send --priority=high
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
