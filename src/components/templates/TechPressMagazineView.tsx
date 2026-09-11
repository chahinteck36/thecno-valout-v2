import React, { useState } from 'react';
import { 
  Flame, TrendingUp, Clock, Eye, MessageSquare, Bookmark, 
  Share2, ArrowRight, ArrowLeft, Star, ThumbsUp, ThumbsDown, 
  Mail, Newspaper, CheckCircle2, ChevronRight, Zap, ShoppingCart
} from 'lucide-react';
import { ThemeConfig, ThemeLanguage } from '../../types';

interface Props {
  config: ThemeConfig;
  isDark?: boolean;
  onToggleDark?: () => void;
  onBuyNow?: () => void;
  language?: ThemeLanguage;
}

export const TechPressMagazineView: React.FC<Props> = ({
  config,
  isDark = true,
  onToggleDark,
  onBuyNow,
  language = 'ar',
}) => {
  const isEn = language === 'en';
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const categories = [
    { id: 'all', name: 'جميع الأخبار', nameEn: 'All News' },
    { id: 'ai', name: 'أخبار الذكاء الاصطناعي', nameEn: 'AI & LLMs' },
    { id: 'hardware', name: 'الأجهزة والهواتف', nameEn: 'Hardware & Phones' },
    { id: 'software', name: 'البرمجيات والتطوير', nameEn: 'Software & Dev' },
    { id: 'reviews', name: 'المراجعات التقنية', nameEn: 'Tech Reviews' },
  ];

  const newsArticles = [
    {
      id: 'news-1',
      title: 'إطلاق نموذج Gemini 2.5: قفزة استثنائية في قدرات التفكير البرمجي وحل المشكلات المعقدة',
      titleEn: 'Gemini 2.5 Official Launch: A Major Breakthrough in Agentic Reasoning & Code Generation',
      category: 'ذكاء اصطناعي',
      categoryEn: 'Artificial Intelligence',
      author: 'م. أحمد الشامي',
      authorEn: 'Ahmed Al-Shami',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      date: 'منذ 15 دقيقة',
      dateEn: '15 mins ago',
      readTime: '4 دقائق قراءة',
      readTimeEn: '4 min read',
      views: '12.4k',
      comments: 38,
      image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=1000&auto=format&fit=crop&q=80',
      summary: 'أعلنت جوجل اليوم رسمياً عن إطلاق الجيل الجديد من نماذج جيميني بقدرات تفكير متزامنة ومخرجات برمجية متقدمة تفوقت على كافة المعايير الصناعية.',
      summaryEn: 'Google officially announced the next generation of Gemini models featuring concurrent reasoning and advanced code synthesis that outperformed all benchmarks.',
    },
    {
      id: 'news-2',
      title: 'مقارنة شاملة: معالج Snapdragon 8 Gen 5 ضد Apple A19 Pro في اختبارات الألعاب والحرارة',
      titleEn: 'Snapdragon 8 Gen 5 vs Apple A19 Pro: Thermal & Gaming Benchmark Showdown',
      category: 'أجهزة وعتاد',
      categoryEn: 'Hardware & Chips',
      author: 'كريم المنصور',
      authorEn: 'Karim Mansour',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      date: 'منذ ساعتين',
      dateEn: '2 hours ago',
      readTime: '6 دقائق',
      readTimeEn: '6 min read',
      views: '8.9k',
      comments: 24,
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
      summary: 'تحليل دقيق لأداء أحدث معالجات الهواتف الرائدة تحت الضغط المستمر وكفاءة استهلاك الطاقة.',
      summaryEn: 'In-depth breakdown of leading mobile silicon under continuous gaming stress and power efficiency.',
    },
    {
      id: 'news-3',
      title: 'مايكروسوفت تكشف عن معمارية Windows 12 الجديدة كلياً المدعومة بالنواة الذكية',
      titleEn: 'Microsoft Previews Windows 12: Ground-up Neural Kernel Architecture',
      category: 'أنظمة تشغيل',
      categoryEn: 'Operating Systems',
      author: 'سارة عبد الله',
      authorEn: 'Sara Abdullah',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      date: 'اليوم',
      dateEn: 'Today',
      readTime: '3 دقائق',
      readTimeEn: '3 min read',
      views: '15.1k',
      comments: 52,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
      summary: 'تحول جذري في إدارة الذاكرة واستهلاك البطارية مع دمج معالجات NPU محلياً بدون إبطاء للنظام.',
      summaryEn: 'A radical shift in memory management and battery preservation with native on-device NPU integration.',
    },
    {
      id: 'news-4',
      title: 'اختراق أمني واسع يهدد مكتبات النواة المفتوحة: تفاصيل ثغرة Zero-Day وكيفية معالجتها',
      titleEn: 'Critical Zero-Day in Open-Source Core Libraries: Full Analysis & Patch Protocol',
      category: 'أمن سيبراني',
      categoryEn: 'Cybersecurity',
      author: 'هشام طارق',
      authorEn: 'Hisham Tarek',
      authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      date: 'منذ يوم',
      dateEn: 'Yesterday',
      readTime: '5 دقائق',
      readTimeEn: '5 min read',
      views: '9.3k',
      comments: 19,
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
      summary: 'تحذيرات عاجلة لمطوري الويب والأنظمة السحابية لتحديث حزم التبعيات وتفعيل التحقق المتعدد.',
      summaryEn: 'Urgent alerts for cloud engineers and web developers to patch vulnerable runtime packages.',
    },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setEmailSubscribed(true);
      setEmailInput('');
    }
  };

  return (
    <div 
      className={`min-h-screen font-sans transition-colors duration-300 ${
        isDark ? 'bg-[#090d16] text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
      dir={isEn ? 'ltr' : 'rtl'}
    >
      {/* Magazine Top Financial & Status Ticker Bar */}
      <div className={`border-b py-2 px-4 text-xs font-semibold ${
        isDark ? 'bg-[#060910] border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-4 flex-shrink-0">
            <span className="text-indigo-400 font-bold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{isEn ? 'Tech Markets:' : 'مؤشرات التكنولوجيا:'}</span>
            </span>
            <span className="text-emerald-400">NASDAQ ▲ +1.8%</span>
            <span className="text-emerald-400">AI INDEX ▲ +3.4%</span>
            <span className="text-cyan-400">NVIDIA $148.50 ▲</span>
            <span className="text-amber-400">BTC $92,400 ▲</span>
          </div>

          <div className="flex items-center gap-3 text-[11px] flex-shrink-0 text-slate-400">
            <span>{isEn ? 'Friday, Sep 11, 2026' : 'الجمعة، 11 سبتمبر 2026'}</span>
            <span>•</span>
            <span>{isEn ? 'Editorial Edition v4.8' : 'النسخة الإخبارية المعتمدة'}</span>
          </div>
        </div>
      </div>

      {/* Breaking News Flashing Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-violet-900 text-white py-2 px-4 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center gap-3 text-xs sm:text-sm">
          <span className="bg-red-500 text-white font-black px-2 py-0.5 rounded uppercase tracking-wider text-[10px] animate-pulse flex-shrink-0">
            {isEn ? 'BREAKING' : 'عاجل'}
          </span>
          <span className="truncate font-semibold">
            {isEn 
              ? 'OpenAI & Anthropic release cooperative AI safety standards for autonomous programming agents.'
              : 'اتفاق تاريخي بين كبرى شركات الذكاء الاصطناعي لتوحيد معايير أمان الوكلاء المستقلين.'}
          </span>
        </div>
      </div>

      {/* Editorial Magazine Masthead / Header */}
      <header className={`border-b py-5 px-4 transition-colors ${
        isDark ? 'bg-[#0d121f] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-900/40">
              <Newspaper className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
                <span>TechPress</span>
                <span className="text-indigo-400">Prime</span>
              </h1>
              <p className="text-[10px] sm:text-xs text-slate-400 font-medium">
                {isEn ? 'The Independent Tech Journalism & Review Magazine' : 'المجلة التقنية الإخبارية المستقلة لمراجعات العتاد والذكاء الاصطناعي'}
              </p>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {onBuyNow && (
              <button
                onClick={onBuyNow}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 text-xs font-black shadow-lg shadow-emerald-950/40 hover:from-emerald-400 hover:to-teal-400 transition"
              >
                <ShoppingCart className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{isEn ? 'Buy Theme ($9.99)' : 'شراء القالب (9.99$)'}</span>
              </button>
            )}

            {onToggleDark && (
              <button
                onClick={onToggleDark}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition"
              >
                {isDark ? '☀️' : '🌙'}
              </button>
            )}
          </div>
        </div>

        {/* Magazine Category Navigation Bar */}
        <div className="max-w-7xl mx-auto mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs font-bold">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {isEn ? cat.nameEn : cat.name}
            </button>
          ))}
        </div>
      </header>

      {/* Main Magazine Layout */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:py-8 space-y-10">
        
        {/* Magazine Bento Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Huge Cover Story (8 Cols) */}
          <div className="lg:col-span-8 group cursor-pointer relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 min-h-[420px] sm:min-h-[480px] flex flex-col justify-end p-6 sm:p-8 shadow-2xl">
            <img 
              src={newsArticles[0].image}
              alt={isEn ? newsArticles[0].titleEn : newsArticles[0].title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-45 group-hover:opacity-55"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />

            <div className="relative z-10 space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="bg-indigo-600 text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  {isEn ? newsArticles[0].categoryEn : newsArticles[0].category}
                </span>
                <span className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  <span>{isEn ? 'Top Headline' : 'الخبر الرئيسي الأول'}</span>
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight hover:text-indigo-300 transition">
                {isEn ? newsArticles[0].titleEn : newsArticles[0].title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
                {isEn ? newsArticles[0].summaryEn : newsArticles[0].summary}
              </p>

              {/* Author & Meta */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  <img 
                    src={newsArticles[0].authorAvatar} 
                    alt={newsArticles[0].author} 
                    className="w-7 h-7 rounded-full object-cover border border-indigo-500"
                  />
                  <span className="font-bold text-slate-200">
                    {isEn ? newsArticles[0].authorEn : newsArticles[0].author}
                  </span>
                  <span>•</span>
                  <span>{isEn ? newsArticles[0].dateEn : newsArticles[0].date}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{isEn ? newsArticles[0].readTimeEn : newsArticles[0].readTime}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{newsArticles[0].comments}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Editorial Stories Stack (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {newsArticles.slice(1, 3).map((article) => (
              <div 
                key={article.id}
                className="group cursor-pointer rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/80 hover:bg-slate-900 p-4 flex flex-col justify-between transition-all duration-300 shadow-xl flex-1"
              >
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-3 bg-slate-950">
                  <img 
                    src={article.image} 
                    alt={isEn ? article.titleEn : article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur text-[10px] font-bold text-indigo-300 border border-indigo-500/30">
                    {isEn ? article.categoryEn : article.category}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition line-clamp-2 leading-snug">
                    {isEn ? article.titleEn : article.title}
                  </h3>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>{isEn ? article.authorEn : article.author}</span>
                    <span>{isEn ? article.readTimeEn : article.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Magazine Feature: Review Scoring Box Spotlight */}
        <section className="rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-950 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{isEn ? 'TechPress Lab Review Score' : 'مختبر مراجعات TechPress الرسمي'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {isEn ? 'Samsung Galaxy S26 Ultra: The New Computational Photography King' : 'سامسونج جلاكسي S26 ألترا: عملاق التصوير الحسابي والذكاء الاصطناعي'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {isEn
                  ? 'We spent 3 weeks putting the S26 Ultra through intensive camera, thermal, battery, and AI benchmarking tests. Here is our authoritative verdict.'
                  : 'بعد 3 أسابيع من الاختبارات المكثفة للبطارية والكاميرات بدقة 200 ميجابكسل والمعالج تحت الضغط العالي، إليك التقييم النهائي الشامل.'}
              </p>

              {/* Pros and Cons Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                  <ThumbsUp className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{isEn ? 'Unrivaled 10x Optical Periscope' : 'تقريب بصري مذهل بدقة متناهية'}</span>
                </div>
                <div className="flex items-center gap-1.5 text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-lg border border-rose-500/20">
                  <ThumbsDown className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{isEn ? 'Hefty 230g Weight' : 'وزن ثقيل نسبياً عند الحمل'}</span>
                </div>
              </div>
            </div>

            {/* Score Ring Display */}
            <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-slate-900 border border-indigo-500/40 text-center min-w-[140px] shadow-lg">
              <span className="text-4xl font-black text-indigo-400 tracking-tight">9.4</span>
              <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">{isEn ? 'Out of 10' : 'من 10 نقاط'}</span>
              <div className="flex items-center gap-1 mt-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="mt-2 text-[10px] font-black text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                {isEn ? 'Editor’s Choice' : 'اختيار المحرر'}
              </span>
            </div>
          </div>
        </section>

        {/* 2-Column Section: Latest News Grid & Magazine Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Latest News Feed (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-indigo-400" />
                <span>{isEn ? 'Latest Dispatches & Analyses' : 'أحدث المقالات والتحليلات الإخبارية'}</span>
              </h3>
              <span className="text-xs text-indigo-400 font-bold cursor-pointer hover:underline">
                {isEn ? 'View Archive →' : 'عرض الأرشيف ←'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {newsArticles.map((art) => (
                <div 
                  key={art.id}
                  className="group cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 overflow-hidden flex flex-col justify-between shadow-lg transition duration-300"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                    <img 
                      src={art.image} 
                      alt={isEn ? art.titleEn : art.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2 right-2 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur text-[10px] font-bold text-indigo-300 border border-indigo-500/30">
                      {isEn ? art.categoryEn : art.category}
                    </span>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h4 className="font-bold text-sm text-white group-hover:text-indigo-300 transition line-clamp-2 leading-snug mb-1.5">
                        {isEn ? art.titleEn : art.title}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {isEn ? art.summaryEn : art.summary}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                      <span className="font-semibold">{isEn ? art.authorEn : art.author}</span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <Eye className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{art.views}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Magazine Dedicated Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Trending Top 5 Ranked Articles */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl space-y-4">
              <h4 className="text-sm font-black text-white flex items-center gap-2 border-b border-slate-800 pb-2.5">
                <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>{isEn ? 'Top Trending This Week' : 'الأكثر قراءة هذا الأسبوع'}</span>
              </h4>

              <div className="space-y-3">
                {[
                  { rank: 1, title: isEn ? 'OpenAI GPT-5 Architecture leak reveals modular MoE scaling' : 'تسريبات معمارية GPT-5: تفاصيل محركات المعالجة المتعددة' },
                  { rank: 2, title: isEn ? 'Top 10 Linux distributions for enterprise AI development' : 'أفضل 10 توزيعات لينكس لمطوري نماذج الذكاء الاصطناعي' },
                  { rank: 3, title: isEn ? 'Nvidia RTX 5090 real-world thermal & power draw tests' : 'مراجعة بطاقة RTX 5090 واستهلاك الطاقة تحت الضغط' },
                  { rank: 4, title: isEn ? 'Why Flutter and React Native are adopting Rust core' : 'لماذا تتجه أطر الهواتف لاعتماد لغة Rust في النواة' },
                ].map((item) => (
                  <div key={item.rank} className="flex items-start gap-3 group cursor-pointer">
                    <span className="w-6 h-6 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-black text-xs flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition">
                      {item.rank}
                    </span>
                    <p className="text-xs font-semibold text-slate-300 group-hover:text-indigo-300 transition line-clamp-2 leading-snug">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter Subscription Box */}
            <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-b from-indigo-950/60 to-slate-900 p-5 shadow-xl space-y-3 text-center">
              <div className="w-10 h-10 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center mx-auto border border-indigo-500/30">
                <Mail className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-black text-white">
                {isEn ? 'The Daily TechPress Byte' : 'النشرة البريدية اليومية'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isEn ? 'Join 65,000+ tech leaders getting the top news delivered every morning.' : 'انضم لأكثر من 65 ألف متابع تقني واحصل على ملخص الأخبار فجراً.'}
              </p>

              {emailSubscribed ? (
                <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isEn ? 'Subscribed successfully!' : 'تم الاشتراك بنجاح!'}</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <input 
                    type="email" 
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    required
                    placeholder={isEn ? "your.email@company.com" : "بريدك الإلكتروني..."}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-center"
                  />
                  <button 
                    type="submit"
                    className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs shadow-md transition"
                  >
                    {isEn ? 'Subscribe Free' : 'اشتراك مجاني'}
                  </button>
                </form>
              )}
            </div>

            {/* Popular Topics Cloud */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-xl space-y-3">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">
                {isEn ? 'Hot Topics & Tags' : 'الوسوم الأكثر تفاعلاً'}
              </h4>
              <div className="flex flex-wrap gap-1.5 text-xs">
                {['#Gemini2.5', '#Snapdragon', '#Windows12', '#RTX5090', '#CyberSecurity', '#RustLang', '#AI_Ethics'].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-indigo-600/30 text-slate-300 hover:text-indigo-300 cursor-pointer transition border border-slate-700/60">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* Magazine Dedicated Editorial Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-10 px-4 text-slate-400 text-xs mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-2">
            <h5 className="font-black text-white text-sm">TechPress Prime</h5>
            <p className="leading-relaxed">
              {isEn ? 'Independent journalism dedicated to chronicling the rapid evolution of artificial intelligence and consumer technology.' : 'صحافة تقنية مستقلة تواكب التطور المتسارع للذكاء الاصطناعي وتكنولوجيا المستهلك.'}
            </p>
          </div>
          <div>
            <h5 className="font-bold text-white mb-2">{isEn ? 'Sections' : 'الأقسام'}</h5>
            <ul className="space-y-1.5">
              <li>{isEn ? 'Artificial Intelligence' : 'الذكاء الاصطناعي'}</li>
              <li>{isEn ? 'Hardware Benchmarks' : 'اختبارات العتاد'}</li>
              <li>{isEn ? 'Software Reviews' : 'مراجعات البرمجيات'}</li>
              <li>{isEn ? 'Opinion & Essays' : 'مقالات الرأي'}</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-white mb-2">{isEn ? 'Editorial' : 'هيئة التحرير'}</h5>
            <ul className="space-y-1.5">
              <li>{isEn ? 'Ethics & Standards' : 'ميثاق الشرف التحريري'}</li>
              <li>{isEn ? 'Review Methodology' : 'منهجية اختبار الأجهزة'}</li>
              <li>{isEn ? 'Corrections Policy' : 'سياسة التصحيح الفوري'}</li>
              <li>{isEn ? 'Contact Editors' : 'تواصل مع المحررين'}</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-white mb-2">{isEn ? 'Commercial License' : 'ترخيص القالب'}</h5>
            <p className="leading-relaxed mb-3">
              {isEn ? 'TechPress Prime template is available for Blogger XML & WordPress at a unified $9.99 USD.' : 'قالب TechPress Prime متاح لمنصتي بلوجر وووردبريس بسعر موحد 9.99$ فقط.'}
            </p>
            {onBuyNow && (
              <button
                onClick={onBuyNow}
                className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition shadow-lg"
              >
                {isEn ? 'Buy License ($9.99)' : 'شراء ترخيص القالب (9.99$)'}
              </button>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-4 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <p>© 2026 TechPress Prime Magazine. All rights reserved.</p>
          <p>{isEn ? 'Engineered with SEO 100% & Core Web Vitals Optimization' : 'مصمم بتوافق كامل مع معايير السيو وسرعة التصفح القياسية'}</p>
        </div>
      </footer>
    </div>
  );
};
