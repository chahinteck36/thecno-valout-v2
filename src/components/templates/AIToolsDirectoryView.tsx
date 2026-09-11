import React, { useState } from 'react';
import { 
  Search, Sparkles, Star, ExternalLink, Bookmark, Filter, 
  ArrowUpRight, Tag, Check, Layers, Zap, ShoppingCart, 
  Cpu, Code2, Image, Video, Mic, MessageSquare, Briefcase
} from 'lucide-react';
import { ThemeConfig, ThemeLanguage } from '../../types';

interface Props {
  config: ThemeConfig;
  isDark?: boolean;
  onToggleDark?: () => void;
  onBuyNow?: () => void;
  language?: ThemeLanguage;
}

export const AIToolsDirectoryView: React.FC<Props> = ({
  config,
  isDark = true,
  onToggleDark,
  onBuyNow,
  language = 'ar',
}) => {
  const isEn = language === 'en';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPricing, setSelectedPricing] = useState<'all' | 'free' | 'freemium' | 'paid'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [bookmarkedTools, setBookmarkedTools] = useState<Record<string, boolean>>({});

  const aiCategories = [
    { id: 'all', name: 'الكل', nameEn: 'All Categories', icon: Layers },
    { id: 'code', name: 'برمجة وتطوير', nameEn: 'Coding & Dev', icon: Code2 },
    { id: 'image', name: 'توليد الصور', nameEn: 'Image & Art', icon: Image },
    { id: 'video', name: 'فيديو ومونتاج', nameEn: 'Video & VFX', icon: Video },
    { id: 'voice', name: 'صوت وتعليق', nameEn: 'Voice & Audio', icon: Mic },
    { id: 'business', name: 'إنتاجية وأعمال', nameEn: 'Productivity', icon: Briefcase },
  ];

  const aiTools = [
    {
      id: 'tool-1',
      name: 'Cursor AI IDE',
      category: 'code',
      tagline: 'محرر أكواد ذكي مبني على VS Code مع وكلاء برمجة فورية وحل المشكلات التلقائي.',
      taglineEn: 'The AI-first Code Editor built on VS Code with multi-file reasoning and agentic autofix.',
      pricing: 'freemium',
      pricingLabel: 'Freemium (مجاني + برو)',
      pricingLabelEn: 'Freemium',
      rating: 4.9,
      upvotes: 1420,
      tags: ['Claude 3.7', 'GPT-4o', 'Autofix', 'VS Code Fork'],
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
      url: 'https://cursor.com',
      isFeatured: true,
    },
    {
      id: 'tool-2',
      name: 'Midjourney v7',
      category: 'image',
      tagline: 'المنصة الرائدة عالمياً في توليد الصور الفنية والتصميم الجرافيكي فائق الواقعية.',
      taglineEn: 'The industry standard for photorealistic generative AI art, concept design, and renders.',
      pricing: 'paid',
      pricingLabel: 'مدفوع (اشتراك)',
      pricingLabelEn: 'Paid ($10/mo)',
      rating: 5.0,
      upvotes: 2890,
      tags: ['Photorealism', '8K Render', 'Discord / Web'],
      logo: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=150&auto=format&fit=crop&q=80',
      url: 'https://midjourney.com',
      isFeatured: true,
    },
    {
      id: 'tool-3',
      name: 'ElevenLabs Prime',
      category: 'voice',
      tagline: 'استنساخ الأصوات البشرية بدقة متناهية ودعم كامل للعواطف والنبرات العربية والإنجليزية.',
      taglineEn: 'Hyper-realistic voice synthesis, emotional speech cloning, and multilingual dubbing.',
      pricing: 'freemium',
      pricingLabel: 'Freemium',
      pricingLabelEn: 'Freemium',
      rating: 4.8,
      upvotes: 1150,
      tags: ['Voice Clone', 'Arabic TTS', 'API Available'],
      logo: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=150&auto=format&fit=crop&q=80',
      url: 'https://elevenlabs.io',
      isFeatured: false,
    },
    {
      id: 'tool-4',
      name: 'Kling AI Video',
      category: 'video',
      tagline: 'توليد مقاطع فيديو سينمائية عالية الدقة 1080p حتى دقيقتين مع فيزياء حركة متقدمة.',
      taglineEn: 'Cinematic text-to-video generation with realistic motion physics and camera controls.',
      pricing: 'freemium',
      pricingLabel: 'تجربة مجانية',
      pricingLabelEn: 'Free Credits',
      rating: 4.7,
      upvotes: 890,
      tags: ['Text-to-Video', 'Image-to-Video', 'High FPS'],
      logo: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=150&auto=format&fit=crop&q=80',
      url: 'https://klingai.com',
      isFeatured: false,
    },
    {
      id: 'tool-5',
      name: 'Ollama Open-Source',
      category: 'code',
      tagline: 'تشغيل نماذج الذكاء الاصطناعي الضخمة محلياً على جهازك مجاناً 100% وبسرعة قياسية.',
      taglineEn: 'Run large language models locally (Llama 3, DeepSeek, Qwen) 100% offline & free.',
      pricing: 'free',
      pricingLabel: 'مجاني 100% ومفتوح المصدر',
      pricingLabelEn: '100% Free & Open Source',
      rating: 5.0,
      upvotes: 3200,
      tags: ['Offline LLM', 'Open Source', 'Privacy First'],
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
      url: 'https://ollama.com',
      isFeatured: true,
    },
    {
      id: 'tool-6',
      name: 'Perplexity AI Pro',
      category: 'business',
      tagline: 'محرك بحث ذكي يقدم إجابات موثقة بالمصادر الحية والمراجع الأكاديمية اللحظية.',
      taglineEn: 'Conversational search engine with real-time web citations and multi-model research.',
      pricing: 'freemium',
      pricingLabel: 'Freemium',
      pricingLabelEn: 'Freemium',
      rating: 4.9,
      upvotes: 2100,
      tags: ['Live Search', 'Deep Research', 'Citations'],
      logo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=150&auto=format&fit=crop&q=80',
      url: 'https://perplexity.ai',
      isFeatured: false,
    },
  ];

  const filteredTools = aiTools.filter((t) => {
    const matchesSearch = 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.taglineEn.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPricing = selectedPricing === 'all' || t.pricing === selectedPricing;
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;

    return matchesSearch && matchesPricing && matchesCategory;
  });

  const toggleBookmark = (id: string) => {
    setBookmarkedTools(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div 
      className="min-h-screen bg-[#07090e] text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950"
      dir={isEn ? 'ltr' : 'rtl'}
    >
      {/* Directory Top Bar */}
      <div className="border-b border-amber-950/40 bg-[#04060a] py-2 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>{isEn ? 'Verified Directory Catalog • 1,520 AI Tools Indexed' : 'دليل أدوات الذكاء الاصطناعي المعتمد • 1,520 أداة موثقة'}</span>
          </div>

          <div className="flex items-center gap-3 text-slate-400 text-[11px]">
            <span>{isEn ? 'Updated Today: 14 New Tools' : 'تم إضافة 14 أداة جديدة اليوم'}</span>
            <span>•</span>
            <span className="text-amber-400 cursor-pointer hover:underline">
              {isEn ? '+ Submit Tool' : '+ أضف أداتك للدليل'}
            </span>
          </div>
        </div>
      </div>

      {/* Directory Header */}
      <header className="border-b border-slate-800 bg-[#0a0d14]/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-400 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20 font-black">
              <Sparkles className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
                <span>AiTools</span>
                <span className="text-amber-400">Directory</span>
              </h1>
              <p className="text-[10px] text-slate-400 font-medium">
                {isEn ? 'The Curated Marketplace for Generative AI & SaaS Software' : 'الدليل المتكامل لاكتشاف أدوات وتطبيقات الذكاء الاصطناعي'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {onBuyNow && (
              <button
                onClick={onBuyNow}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-xs font-black shadow-lg shadow-emerald-500/20 hover:brightness-110 transition active:scale-95"
              >
                <ShoppingCart className="w-4 h-4 stroke-[2.5]" />
                <span>{isEn ? 'Buy Theme ($9.99)' : 'شراء ترخيص القالب (9.99$)'}</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Directory Area */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-10">
        
        {/* Directory Search & Filter Hero */}
        <section className="text-center space-y-5 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black shadow-inner">
            <Zap className="w-3.5 h-3.5 fill-current animate-bounce" />
            <span>{isEn ? 'EXPLORE THE FUTURE OF AI WORKFLOWS' : 'اكتشف أفضل أدوات الذكاء الاصطناعي لعام 2026'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {isEn ? (
              <>Find the Best AI Tools for <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Any Task</span></>
            ) : (
              <>اعثر على الأداة الذكية المثالية <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">لإنجاز مهامك</span></>
            )}
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {isEn
              ? 'Filter through 1,500+ curated generative AI products, LLMs, coding copilots, and voice cloners with verified user reviews.'
              : 'دليل منظم ومحدث يومياً يضم أكثر من 1,500 منتج ذكاء اصطناعي وبرمجيات SaaS مع روابط الأفلييت ونظام الفلترة الفوري.'}
          </p>

          {/* Big Search Input */}
          <div className="relative max-w-2xl mx-auto">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isEn ? "Search tools by name, category, or model (e.g., Midjourney, Claude, Code)..." : "ابحث عن أداة بالاسم أو الوظيفة (مثال: توليد فيديو، كتابة كود، تفريغ صوت)..."}
              className="w-full px-5 py-4 pl-12 rounded-2xl bg-slate-900/90 border-2 border-amber-500/30 focus:border-amber-400 text-sm text-white placeholder-slate-500 shadow-2xl focus:outline-none transition"
            />
            <Search className={`w-5 h-5 text-amber-400 absolute top-1/2 -translate-y-1/2 ${isEn ? 'left-4' : 'right-4'}`} />
          </div>

          {/* Quick Pricing Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {[
              { id: 'all', label: isEn ? 'All Pricing' : 'كافة الاشتراكات' },
              { id: 'free', label: isEn ? '100% Free' : 'مجانية 100%' },
              { id: 'freemium', label: isEn ? 'Freemium' : 'مجانية مع ترقية' },
              { id: 'paid', label: isEn ? 'Paid' : 'مدفوعة' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPricing(p.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                  selectedPricing === p.id
                    ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </section>

        {/* Category Filter Icons Grid */}
        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {aiCategories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-3 rounded-2xl border flex flex-col items-center gap-2 transition text-center ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-500 text-amber-400 font-bold shadow-lg shadow-amber-500/10'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-semibold">{isEn ? cat.nameEn : cat.name}</span>
              </button>
            );
          })}
        </section>

        {/* Directory Tools Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>{isEn ? `Showing ${filteredTools.length} AI Tools` : `عرض ${filteredTools.length} أداة ذكاء اصطناعي`}</span>
            </h3>
            <span className="text-xs text-slate-400">
              {isEn ? 'Sorted by Community Upvotes' : 'مرتبة حسب تصويت المجتمع'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTools.map((tool) => {
              const isSaved = bookmarkedTools[tool.id];
              return (
                <div 
                  key={tool.id}
                  className="rounded-2xl border border-slate-800 hover:border-amber-500/40 bg-slate-900/80 p-5 flex flex-col justify-between shadow-xl transition-all duration-300 hover:scale-[1.01] space-y-4"
                >
                  <div>
                    {/* Tool Header with Logo, Title & Pricing Pill */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <img 
                          src={tool.logo} 
                          alt={tool.name} 
                          className="w-12 h-12 rounded-xl object-cover border border-slate-700 bg-slate-950 p-1 flex-shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-white text-base hover:text-amber-400 transition">
                              {tool.name}
                            </h4>
                            {tool.isFeatured && (
                              <span className="bg-amber-500/20 text-amber-400 text-[10px] font-black px-1.5 py-0.5 rounded border border-amber-500/30">
                                {isEn ? 'Featured' : 'مميزة'}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-amber-400 pt-0.5">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span className="font-bold">{tool.rating}</span>
                            <span className="text-slate-500">•</span>
                            <span className="text-slate-400 text-[11px]">{tool.upvotes} upvotes</span>
                          </div>
                        </div>
                      </div>

                      {/* Pricing Tag */}
                      <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border flex-shrink-0 ${
                        tool.pricing === 'free' 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : tool.pricing === 'freemium'
                            ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                            : 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                      }`}>
                        {isEn ? tool.pricingLabelEn : tool.pricingLabel}
                      </span>
                    </div>

                    {/* Short Tagline */}
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-3">
                      {isEn ? tool.taglineEn : tool.tagline}
                    </p>

                    {/* Tags Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {tool.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-400 text-[10px] border border-slate-700/60">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
                    <button
                      onClick={() => toggleBookmark(tool.id)}
                      className={`p-2.5 rounded-xl border transition ${
                        isSaved 
                          ? 'bg-amber-500/20 border-amber-500 text-amber-400' 
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-400 border-slate-700'
                      }`}
                      title={isEn ? "Save Tool" : "حفظ الأداة"}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                    </button>

                    <a 
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-amber-500 text-slate-200 hover:text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition duration-200 shadow-md border border-slate-700"
                    >
                      <span>{isEn ? 'Visit Tool Website' : 'زيارة موقع الأداة'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                </div>
              );
            })}
          </div>
        </section>

      </main>

      {/* Directory Dedicated Footer */}
      <footer className="border-t border-slate-800 bg-[#05070c] py-8 px-4 text-slate-400 text-xs mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span className="font-black text-white">AiTools Directory WordPress Theme</span>
            <span>•</span>
            <span className="text-emerald-400 font-bold">{isEn ? 'Commercial License $9.99' : 'ترخيص تجاري موحد 9.99$'}</span>
          </div>

          <p className="text-slate-500 text-[11px]">
            {isEn ? 'SEO-optimized affiliate directory engine with instant keyword filtering.' : 'محرك أدلة ذكاء اصطناعي متكامل مع روابط الإحالة والسيو 100%'}
          </p>
        </div>
      </footer>
    </div>
  );
};
