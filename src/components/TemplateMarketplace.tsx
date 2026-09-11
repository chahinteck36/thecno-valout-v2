import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, Sparkles, Zap, ShieldCheck, 
  Layers, ArrowUpDown, CheckCircle, RefreshCw 
} from 'lucide-react';
import { StoreTemplate, ThemeLanguage } from '../types';
import { TemplateCard } from './TemplateCard';

interface Props {
  templates: StoreTemplate[];
  onPreviewTemplate: (template: StoreTemplate) => void;
  onBuyTemplate: (template: StoreTemplate) => void;
  onSelectTemplateDetails: (template: StoreTemplate) => void;
  language?: ThemeLanguage;
  isLoading?: boolean;
}

export const TemplateMarketplace: React.FC<Props> = ({
  templates,
  onPreviewTemplate,
  onBuyTemplate,
  onSelectTemplateDetails,
  language = 'ar',
  isLoading = false,
}) => {
  const isEn = language === 'en';

  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState<'all' | 'blogger' | 'wordpress' | 'featured'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');

  const filteredTemplates = useMemo(() => {
    return templates.filter((t) => {
      // Platform filter
      if (platformFilter === 'blogger' && t.type !== 'blogger' && t.type !== 'both') return false;
      if (platformFilter === 'wordpress' && t.type !== 'wordpress' && t.type !== 'both') return false;
      if (platformFilter === 'featured' && !t.featured) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = t.name.toLowerCase().includes(q) || (t.nameEn && t.nameEn.toLowerCase().includes(q));
        const matchesCat = t.category.toLowerCase().includes(q) || (t.categoryEn && t.categoryEn.toLowerCase().includes(q));
        const matchesDesc = t.shortDescription.toLowerCase().includes(q) || (t.shortDescriptionEn && t.shortDescriptionEn.toLowerCase().includes(q));
        const matchesFeatures = (t.features || []).some(f => f.toLowerCase().includes(q));
        if (!matchesName && !matchesCat && !matchesDesc && !matchesFeatures) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      // Default: featured first then newest
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [templates, platformFilter, searchQuery, sortBy]);

  return (
    <div className="space-y-8" dir={isEn ? 'ltr' : 'rtl'}>
      
      {/* Store Hero Banner */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 p-6 sm:p-10 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 w-fit text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isEn ? 'Official Template Marketplace & Studio' : 'متجر قوالب بلوجر وووردبريس الاحترافي'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-3">
            {isEn 
              ? 'Premium Blogger & WordPress Themes Ready for Monetization' 
              : 'قوالب بلوجر وووردبريس فائقة السرعة جاهزة لتحقيق الأرباح'}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
            {isEn
              ? 'Explore our curated catalog of ultra-optimized tech, download, news, and gaming themes. 100% Core Web Vitals speed, AdSense ready, and full RTL/LTR bilingual support.'
              : 'اختر قالبك التقني المثالي لموقعك مع سرعة فائقة 100/100، توافق كامل مع معايير السيو الحديثة وأماكن إعلانات Google AdSense لزيادة أرباحك وتصدر نتائج البحث.'}
          </p>

          {/* Quick Value Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{isEn ? '100% Core Web Vitals' : 'سرعة فائقة 100%'}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>{isEn ? 'AdSense High CTR' : 'متوافق مع أدسنس'}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>{isEn ? 'Instant Raw XML & ZIP' : 'تحميل فوري XML و ZIP'}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
              <span>{isEn ? 'Lifetime Free Updates' : 'تحديثات مجانية مدى الحياة'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-slate-900/80 p-3 sm:p-4 rounded-2xl border border-slate-800 backdrop-blur">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className={`w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 ${isEn ? 'left-3.5' : 'right-3.5'}`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isEn ? "Search templates by name, niche, or feature..." : "ابحث عن القوالب بالاسم، التصنيف، أو الميزة..."}
            className={`w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 transition focus:outline-none ${
              isEn ? 'pl-10 pr-4' : 'pr-10 pl-4'
            }`}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className={`absolute top-1/2 -translate-y-1/2 ${isEn ? 'right-3' : 'left-3'} text-xs text-slate-400 hover:text-white`}
            >
              ×
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {[
            { id: 'all', label: isEn ? 'All' : 'الكل' },
            { id: 'blogger', label: isEn ? 'Blogger XML' : 'بلوجر' },
            { id: 'wordpress', label: isEn ? 'WordPress' : 'ووردبريس' },
            { id: 'featured', label: isEn ? 'Featured' : 'المميزة' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setPlatformFilter(tab.id as any)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap border ${
                platformFilter === tab.id
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-black shadow-md shadow-cyan-950'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            aria-label={isEn ? "Sort templates" : "ترتيب القوالب"}
            className="bg-transparent text-slate-200 text-xs font-bold focus:outline-none cursor-pointer"
          >
            <option value="featured" className="bg-slate-900 text-white">{isEn ? 'Featured First' : 'المميزة أولاً'}</option>
            <option value="newest" className="bg-slate-900 text-white">{isEn ? 'Newest' : 'الأحدث'}</option>
            <option value="price-asc" className="bg-slate-900 text-white">{isEn ? 'Price: Low to High' : 'السعر: من الأقل للأعلى'}</option>
            <option value="price-desc" className="bg-slate-900 text-white">{isEn ? 'Price: High to Low' : 'السعر: من الأعلى للأقل'}</option>
          </select>
        </div>

      </div>

      {/* Templates Grid */}
      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredTemplates.map((tmpl) => (
            <TemplateCard
              key={tmpl.id}
              template={tmpl}
              onPreview={onPreviewTemplate}
              onBuy={onBuyTemplate}
              onViewDetails={onSelectTemplateDetails}
              language={language}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 bg-slate-900/40 rounded-3xl border border-slate-800/80">
          <Layers className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-300 mb-1">
            {isEn ? 'No templates matched your search or filters' : 'لم نجد أي قوالب تطابق خيارات البحث'}
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            {isEn ? 'Try adjusting your keywords or clearing the platform filter.' : 'جرب تغيير كلمات البحث أو إعادة ضبط خيارات التصفية.'}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setPlatformFilter('all');
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-cyan-300 transition"
          >
            {isEn ? 'Reset Filters' : 'إعادة تعيين الفلاتر'}
          </button>
        </div>
      )}

    </div>
  );
};
