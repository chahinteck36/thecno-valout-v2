import React, { useState, useMemo, useEffect } from 'react';
import { StoreTemplate, ThemeLanguage } from '../types';
import { MARKETPLACE_CATEGORIES, MarketplaceCategory } from '../data/categoriesData';
import { TemplateCard } from './TemplateCard';
import { 
  ArrowLeft, ArrowRight, Filter, ArrowUpDown, 
  Layers, Sparkles, Briefcase, Palette, ShoppingBag, 
  Wrench, Target, LayoutDashboard, Newspaper 
} from 'lucide-react';

interface Props {
  categorySlug: string;
  templates: StoreTemplate[];
  onBackToStore: () => void;
  onPreviewTemplate: (template: StoreTemplate) => void;
  onBuyTemplate: (template: StoreTemplate) => void;
  onSelectTemplate: (template: StoreTemplate) => void;
  onSwitchCategory: (slug: string) => void;
  language?: ThemeLanguage;
}

export const CategoryPage: React.FC<Props> = ({
  categorySlug,
  templates,
  onBackToStore,
  onPreviewTemplate,
  onBuyTemplate,
  onSelectTemplate,
  onSwitchCategory,
  language = 'ar',
}) => {
  const isEn = language === 'en';

  const category = useMemo(() => {
    return MARKETPLACE_CATEGORIES.find(c => c.slug === categorySlug) || MARKETPLACE_CATEGORIES[0];
  }, [categorySlug]);

  const [platformFilter, setPlatformFilter] = useState<'all' | 'blogger' | 'wordpress' | 'featured'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');

  // Filter templates belonging to this category
  const categoryTemplates = useMemo(() => {
    return templates.filter(t => {
      if (t.categorySlug !== category.slug) return false;
      if (platformFilter === 'blogger' && t.type !== 'blogger' && t.type !== 'both') return false;
      if (platformFilter === 'wordpress' && t.type !== 'wordpress' && t.type !== 'both') return false;
      if (platformFilter === 'featured' && !t.featured) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [templates, category.slug, platformFilter, sortBy]);

  // Dynamic SEO Structured Data for Category Collection
  useEffect(() => {
    const currentUrl = `https://techvaul-pro.store/templates/category/${category.slug}`;
    const pageTitle = `${isEn ? category.nameEn : category.name} Templates | TechVault-Pro`;
    const metaDesc = isEn ? category.shortDescriptionEn : category.shortDescription;

    document.title = pageTitle;

    let descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute('content', metaDesc);
    }

    const jsonLdId = 'category-structured-data';
    let scriptTag = document.getElementById(jsonLdId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = jsonLdId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const structuredData = {
      "@context": "https://schema.org/",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": `${currentUrl}#collection`,
          "url": currentUrl,
          "name": isEn ? category.nameEn : category.name,
          "description": metaDesc,
          "isPartOf": {
            "@type": "WebSite",
            "name": "TechVault Pro",
            "url": "https://techvaul-pro.store/"
          }
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${currentUrl}#breadcrumbs`,
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": isEn ? "Home" : "الرئيسية",
              "item": "https://techvaul-pro.store/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": isEn ? "Templates Store" : "متجر القوالب",
              "item": "https://techvaul-pro.store/templates"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": isEn ? category.nameEn : category.name,
              "item": currentUrl
            }
          ]
        }
      ]
    };

    scriptTag.text = JSON.stringify(structuredData);

    return () => {
      const tag = document.getElementById(jsonLdId);
      if (tag) tag.remove();
    };
  }, [category, isEn]);

  return (
    <div className="space-y-8 max-w-6xl mx-auto" dir={isEn ? 'ltr' : 'rtl'}>
      
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400">
        <button 
          onClick={onBackToStore}
          className="hover:text-cyan-400 transition font-bold"
        >
          {isEn ? 'All Templates' : 'كافة القوالب'}
        </button>
        <span>/</span>
        <span className="text-slate-200 font-bold">
          {isEn ? category.nameEn : category.name}
        </span>
      </nav>

      {/* Category Hero Banner */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 p-6 sm:p-10 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isEn ? 'CURATED CATEGORY' : 'تصنيف القوالب المتخصص'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {isEn ? category.nameEn : category.name}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {isEn ? category.descriptionEn : category.description}
          </p>

          <div className="pt-2 text-xs text-cyan-300 font-bold flex items-center gap-2">
            <span>{isEn ? `${categoryTemplates.length} Verified Templates Available` : `${categoryTemplates.length} قوالب معتمدة متوفرة`}</span>
            <span className="w-1 h-1 rounded-full bg-cyan-400" />
            <span>{isEn ? 'Unified Price $9.99 USD' : 'سعر موحد 9.99$'}</span>
          </div>
        </div>
      </section>

      {/* Filter and Sorting Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/80 p-3 sm:p-4 rounded-2xl border border-slate-800">
        
        {/* Platform Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
          {[
            { id: 'all', label: isEn ? 'All' : 'الكل' },
            { id: 'blogger', label: isEn ? 'Blogger XML' : 'بلوجر' },
            { id: 'wordpress', label: isEn ? 'WordPress' : 'ووردبريس' },
            { id: 'featured', label: isEn ? 'Featured' : 'المميزة' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setPlatformFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap border ${
                platformFilter === tab.id
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-black shadow-md'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs self-end sm:self-auto">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            aria-label={isEn ? "Sort templates" : "ترتيب القوالب"}
            className="bg-transparent text-slate-200 text-xs font-bold focus:outline-none cursor-pointer"
          >
            <option value="featured" className="bg-slate-900 text-white">{isEn ? 'Featured First' : 'المميزة أولاً'}</option>
            <option value="newest" className="bg-slate-900 text-white">{isEn ? 'Newest' : 'الأحدث'}</option>
            <option value="price-asc" className="bg-slate-900 text-white">{isEn ? 'Price: Low to High' : 'السعر: الأقل'}</option>
            <option value="price-desc" className="bg-slate-900 text-white">{isEn ? 'Price: High to Low' : 'السعر: الأعلى'}</option>
          </select>
        </div>

      </div>

      {/* Templates Grid */}
      {categoryTemplates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {categoryTemplates.map(tmpl => (
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
      ) : (
        <div className="text-center py-16 px-4 bg-slate-900/40 rounded-3xl border border-slate-800">
          <Layers className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <p className="text-sm font-bold text-slate-300">
            {isEn ? 'No templates matched this specific platform filter' : 'لا توجد قوالب تطابق خيار التصفية المحدد في هذا التصنيف'}
          </p>
        </div>
      )}

      {/* Cross-Link Other Categories for SEO Internal Linking */}
      <section className="pt-8 border-t border-slate-800 space-y-4">
        <h3 className="text-sm font-black text-slate-300">
          {isEn ? 'Explore Other Template Categories' : 'استكشف تصنيفات القوالب الأخرى'}
        </h3>
        
        <div className="flex flex-wrap gap-2">
          {MARKETPLACE_CATEGORIES.filter(c => c.slug !== category.slug).map(cat => (
            <button
              key={cat.slug}
              onClick={() => onSwitchCategory(cat.slug)}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 hover:text-cyan-300 transition flex items-center gap-1.5"
            >
              <span>{isEn ? cat.nameEn : cat.name}</span>
            </button>
          ))}
        </div>
      </section>

    </div>
  );
};
