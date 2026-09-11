import React from 'react';
import { 
  Eye, ShoppingCart, Sparkles, CheckCircle2, 
  ExternalLink, Layers, Star 
} from 'lucide-react';
import { StoreTemplate, ThemeLanguage } from '../types';

interface Props {
  template: StoreTemplate;
  onPreview: (template: StoreTemplate) => void;
  onBuy: (template: StoreTemplate) => void;
  onViewDetails: (template: StoreTemplate) => void;
  language?: ThemeLanguage;
}

export const TemplateCard: React.FC<Props> = ({
  template,
  onPreview,
  onBuy,
  onViewDetails,
  language = 'ar',
}) => {
  const isEn = language === 'en';

  const typeLabel = {
    blogger: isEn ? 'Blogger XML' : 'قالب بلوجر',
    wordpress: isEn ? 'WordPress Theme' : 'قالب ووردبريس',
    both: isEn ? 'Blogger & WordPress' : 'بلوجر + ووردبريس',
  }[template.type];

  const typeBadgeColor = {
    blogger: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    wordpress: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    both: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
  }[template.type];

  return (
    <div className="group flex flex-col bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-cyan-950/40">
      
      {/* Card Header Media */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
        <img 
          src={template.mainImage} 
          alt={isEn ? (template.nameEn || template.name) : template.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 pointer-events-none">
          <span className={`px-2.5 py-1 rounded-lg text-xs font-black border backdrop-blur-md shadow-md ${typeBadgeColor}`}>
            {typeLabel}
          </span>
          
          {template.featured && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-xs font-black shadow-lg">
              <Sparkles className="w-3 h-3 fill-current" />
              <span>{isEn ? 'Featured' : 'مميز'}</span>
            </span>
          )}
        </div>

        {/* Bottom Price Tag on Media */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300 bg-slate-950/80 px-2 py-0.5 rounded-md backdrop-blur border border-slate-800">
            {isEn ? (template.categoryEn || template.category) : template.category}
          </span>
          <div className="flex items-baseline gap-1 px-3 py-1 rounded-xl bg-slate-950/90 border border-emerald-500/30 text-emerald-400 backdrop-blur shadow-lg">
            <span className="text-xs font-semibold">$</span>
            <span className="text-lg font-black tracking-tight">{template.price.toFixed(2)}</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase">{template.currency}</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating and Sales Count */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-slate-200">{template.rating || 4.9}</span>
              <span className="text-[11px]">({template.reviewsCount || 25})</span>
            </div>
            {template.salesCount && (
              <span className="text-[11px] text-slate-400">
                {isEn ? `${template.salesCount}+ Sales` : `${template.salesCount}+ عملية شراء`}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 
            onClick={() => onViewDetails(template)}
            className="text-base sm:text-lg font-black text-white hover:text-cyan-300 transition cursor-pointer line-clamp-2 leading-snug mb-2"
          >
            {isEn ? (template.nameEn || template.name) : template.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed mb-4">
            {isEn ? (template.shortDescriptionEn || template.shortDescription) : template.shortDescription}
          </p>

          {/* Key Feature Bullets */}
          <div className="space-y-1.5 mb-5">
            {(template.features || []).slice(0, 3).map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="line-clamp-1">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-slate-800 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {/* Preview Button */}
            <button
              onClick={() => onPreview(template)}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold transition border border-slate-700 active:scale-95"
              title={isEn ? "Live Interactive Preview" : "معاينة حية للقالب"}
            >
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isEn ? 'Live Preview' : 'معاينة حية'}</span>
            </button>

            {/* Details Button */}
            <button
              onClick={() => onViewDetails(template)}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/90 text-slate-300 hover:text-white text-xs font-bold transition border border-slate-700/80 active:scale-95"
              title={isEn ? "View Template Features & Specs" : "عرض مواصفات ومميزات القالب"}
            >
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              <span>{isEn ? 'View Details' : 'التفاصيل'}</span>
            </button>
          </div>

          {/* Buy Button */}
          <button
            onClick={() => onBuy(template)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-black shadow-lg shadow-emerald-950/40 transition active:scale-[0.98]"
            title={isEn ? "Purchase License for $9.99" : "شراء الترخيص بـ 9.99$"}
          >
            <ShoppingCart className="w-4 h-4 stroke-[2.5]" />
            <span>{isEn ? `Buy Now - $${template.price.toFixed(2)}` : `شراء الترخيص - $${template.price.toFixed(2)}`}</span>
          </button>
        </div>

      </div>

    </div>
  );
};
