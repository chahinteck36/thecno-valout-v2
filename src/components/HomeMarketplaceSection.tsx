import React, { useState } from 'react';
import { 
  Sparkles, ShoppingCart, Eye, Layers, CheckCircle2, 
  ShieldCheck, ArrowRight, ArrowLeft, Filter, Tag, Zap
} from 'lucide-react';
import { StoreTemplate, ThemeLanguage } from '../types';
import { TemplateCard } from './TemplateCard';

interface Props {
  templates: StoreTemplate[];
  onPreview: (template: StoreTemplate) => void;
  onBuy: (template: StoreTemplate) => void;
  onViewDetails: (template: StoreTemplate) => void;
  onGoToFullStore?: () => void;
  language?: ThemeLanguage;
  isLoading?: boolean;
}

export const HomeMarketplaceSection: React.FC<Props> = ({
  templates,
  onPreview,
  onBuy,
  onViewDetails,
  onGoToFullStore,
  language = 'ar',
  isLoading = false,
}) => {
  const isEn = language === 'en';
  const [platformFilter, setPlatformFilter] = useState<'all' | 'blogger' | 'wordpress'>('all');

  const filteredTemplates = templates.filter((tmpl) => {
    if (platformFilter === 'all') return true;
    if (platformFilter === 'blogger') return tmpl.type === 'blogger' || tmpl.type === 'both';
    if (platformFilter === 'wordpress') return tmpl.type === 'wordpress' || tmpl.type === 'both';
    return true;
  });

  return (
    <section 
      id="premium-templates" 
      className="my-8 sm:my-12 relative"
      dir={isEn ? 'ltr' : 'rtl'}
    >
      {/* Background Subtle Gradient Glow */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-44 bg-gradient-to-r from-cyan-500/10 via-indigo-500/15 to-emerald-500/10 blur-3xl rounded-full pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="bg-gradient-to-b from-slate-900/95 to-slate-950/95 border border-slate-800 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden mb-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-black shadow-inner">
              <Sparkles className="w-3.5 h-3.5 fill-current animate-pulse" />
              <span>{isEn ? 'OFFICIAL STORE PRODUCTS' : 'منتجات المتجر الرسمية'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className="text-emerald-400">{isEn ? 'Unified Price: $9.99' : 'سعر موحد: 9.99$'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              {isEn ? (
                <>Premium <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">Templates</span></>
              ) : (
                <>قوالبنا <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">الاحترافية</span></>
              )}
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {isEn
                ? 'Choose from 5 commercial-grade, radically distinct Blogger & WordPress templates built for maximum speed, 100% SEO, and instant download for just $9.99 each.'
                : 'اختر من بين 5 قوالب بلوجر وووردبريس احترافية بتصاميم مستقلة كلياً وهويات بصرية مخصصة، مع أكواد نظيفة وسيو 100% وتحميل فوري بسعر 9.99$ فقط.'}
            </p>

            {/* Quick Guarantees */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs text-slate-300 font-medium">
              <span className="flex items-center gap-1.5 bg-slate-800/90 px-3 py-1 rounded-xl border border-slate-700/80">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isEn ? '100% Clean Code & Fast' : 'كود سليم وسرعة قياسية'}</span>
              </span>
              <span className="flex items-center gap-1.5 bg-slate-800/90 px-3 py-1 rounded-xl border border-slate-700/80">
                <Tag className="w-3.5 h-3.5 text-cyan-400" />
                <span>{isEn ? 'Unified Price: $9.99 USD' : 'سعر موحد: 9.99$'}</span>
              </span>
              <span className="flex items-center gap-1.5 bg-slate-800/90 px-3 py-1 rounded-xl border border-slate-700/80">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>{isEn ? 'Instant License Delivery' : 'تسليم فوري ومباشر'}</span>
              </span>
            </div>
          </div>

          {/* Platform Filters & Full Store Navigation */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 flex-shrink-0">
            <div className="flex items-center gap-1 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800">
              <button
                onClick={() => setPlatformFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  platformFilter === 'all'
                    ? 'bg-cyan-500 text-slate-950 font-black shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {isEn ? `All (${templates.length})` : `الكل (${templates.length})`}
              </button>
              <button
                onClick={() => setPlatformFilter('blogger')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  platformFilter === 'blogger'
                    ? 'bg-cyan-500 text-slate-950 font-black shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {isEn ? 'Blogger' : 'بلوجر'}
              </button>
              <button
                onClick={() => setPlatformFilter('wordpress')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  platformFilter === 'wordpress'
                    ? 'bg-cyan-500 text-slate-950 font-black shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {isEn ? 'WordPress' : 'ووردبريس'}
              </button>
            </div>

            {onGoToFullStore && (
              <button
                onClick={onGoToFullStore}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white text-xs font-bold border border-slate-700 transition active:scale-95 shadow-sm"
                title={isEn ? "Open the Full Store Page with Detailed Filters" : "فتح صفحة المتجر الكاملة مع الفلاتر والتصنيفات"}
              >
                <span>{isEn ? 'Full Store (/store)' : 'المتجر الكامل (/store)'}</span>
                {isEn ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Templates Grid or Loading State */}
      {isLoading ? (
        <div className="py-16 text-center text-slate-400 flex flex-col items-center justify-center">
          <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-xs font-bold">{isEn ? 'Loading templates from catalog...' : 'جاري تحميل القوالب المعتمدة...'}</p>
        </div>
      ) : filteredTemplates.length === 0 ? (
        <div className="py-12 text-center text-slate-400 bg-slate-900/40 rounded-2xl border border-slate-800 p-8">
          <p className="text-sm font-bold">{isEn ? 'No templates matching filter.' : 'لا توجد قوالب تطابق الفلتر المحدد.'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onPreview={onPreview}
              onBuy={onBuy}
              onViewDetails={onViewDetails}
              language={language}
            />
          ))}
        </div>
      )}
    </section>
  );
};
