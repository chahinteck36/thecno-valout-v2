import React, { useState } from 'react';
import { 
  X, Eye, ShoppingCart, CheckCircle2, ShieldCheck, 
  Sparkles, Layers, Zap, Clock, Star, ArrowRight, ArrowLeft 
} from 'lucide-react';
import { StoreTemplate, ThemeLanguage } from '../types';

interface Props {
  template: StoreTemplate | null;
  onClose: () => void;
  onPreview: (template: StoreTemplate) => void;
  onBuy: (template: StoreTemplate) => void;
  language?: ThemeLanguage;
  allTemplates?: StoreTemplate[];
  onSelectAnotherTemplate?: (template: StoreTemplate) => void;
}

export const TemplateDetailModal: React.FC<Props> = ({
  template,
  onClose,
  onPreview,
  onBuy,
  language = 'ar',
  allTemplates = [],
  onSelectAnotherTemplate,
}) => {
  const isEn = language === 'en';
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!template) return null;

  const images = template.previewImages && template.previewImages.length > 0 
    ? template.previewImages 
    : [template.mainImage];

  const relatedTemplates = allTemplates
    .filter(t => t.id !== template.id && (t.type === template.type || t.category === template.category))
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6" dir={isEn ? 'ltr' : 'rtl'}>
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl my-8">
        
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 ${isEn ? 'right-4' : 'left-4'} z-10 w-9 h-9 rounded-full bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center border border-slate-700 transition`}
          title={isEn ? "Close" : "إغلاق"}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Media Gallery */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-slate-950 overflow-hidden">
          <img 
            src={images[activeImageIndex] || template.mainImage} 
            alt={template.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/40" />

          {/* Platform Badge & Featured */}
          <div className="absolute top-4 left-4 right-14 flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-black backdrop-blur">
              {template.type === 'both' ? 'Blogger & WordPress' : template.type === 'blogger' ? 'Blogger XML' : 'WordPress Theme'}
            </span>
            <span className="px-3 py-1 rounded-xl bg-slate-800/80 text-slate-300 border border-slate-700 text-xs font-bold backdrop-blur">
              {isEn ? (template.categoryEn || template.category) : template.category}
            </span>
            {template.featured && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-400 text-slate-950 text-xs font-black">
                <Sparkles className="w-3 h-3 fill-current" />
                <span>{isEn ? 'Featured' : 'مميز'}</span>
              </span>
            )}
          </div>

          {/* Gallery Thumbnails */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-14 h-9 sm:w-16 sm:h-10 rounded-lg overflow-hidden border-2 transition flex-shrink-0 ${
                    activeImageIndex === idx ? 'border-cyan-400 shadow-md scale-105' : 'border-slate-700 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-8 space-y-6">
          
          {/* Header Row: Title & Price */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-400 mb-1">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold">{template.rating || 4.9}</span>
                <span className="text-slate-400">({template.reviewsCount || 25} {isEn ? 'verified reviews' : 'تقييم موثق'})</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {isEn ? (template.nameEn || template.name) : template.name}
              </h2>
            </div>

            {/* Price Card */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 p-3 sm:p-0 bg-slate-950 sm:bg-transparent rounded-2xl border sm:border-0 border-slate-800">
              <div className="text-right">
                <span className="text-xs text-slate-400 block">{isEn ? 'Commercial License' : 'ترخيص تجاري شامل'}</span>
                <div className="flex items-baseline gap-1 text-emerald-400">
                  <span className="text-sm font-bold">$</span>
                  <span className="text-2xl sm:text-3xl font-black tracking-tight">{template.price.toFixed(2)}</span>
                  <span className="text-xs font-bold uppercase text-slate-400">{template.currency}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onPreview(template);
              }}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-100 hover:text-white font-bold text-sm border border-slate-700 transition shadow-md"
            >
              <Eye className="w-4 h-4 text-cyan-400" />
              <span>{isEn ? 'Open Live Preview' : 'فتح المعاينة الحية'}</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onBuy(template);
              }}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-sm shadow-xl shadow-emerald-950 transition"
            >
              <ShoppingCart className="w-4 h-4 stroke-[2.5]" />
              <span>{isEn ? 'Buy License ($' + template.price.toFixed(2) + ')' : 'شراء الترخيص (' + template.price.toFixed(2) + ' $)'}</span>
            </button>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-black text-slate-200 uppercase tracking-wider mb-2">
              {isEn ? 'About This Theme' : 'عن القالب والمميزات العامة'}
            </h4>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
              {isEn ? (template.fullDescriptionEn || template.fullDescription) : template.fullDescription}
            </div>
          </div>

          {/* Features Grid */}
          <div>
            <h4 className="text-sm font-black text-slate-200 uppercase tracking-wider mb-3">
              {isEn ? 'Core Features' : 'أبرز مميزات القالب الفنية'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(isEn ? (template.featuresEn || template.features) : template.features).map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/40 border border-slate-800/80 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Requirements & License Guarantee */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs mb-2">
                <Layers className="w-4 h-4" />
                <span>{isEn ? 'System Requirements' : 'متطلبات التشغيل'}</span>
              </div>
              <ul className="space-y-1 text-xs text-slate-400">
                {(template.requirements || []).map((req, idx) => (
                  <li key={idx}>• {req}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>{isEn ? 'License & Support' : 'معلومات الترخيص والدعم'}</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {template.licenseInfo || (isEn 
                  ? 'Lifetime license with free continuous updates and technical support via WhatsApp.' 
                  : 'ترخيص رسمي دائم مع تحديثات مجانية مستمرة ودعم فني مخصص عبر واتساب.')}
              </p>
            </div>
          </div>

          {/* Related Templates */}
          {relatedTemplates.length > 0 && onSelectAnotherTemplate && (
            <div className="pt-4 border-t border-slate-800">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">
                {isEn ? 'You May Also Like' : 'قوالب مقترحة ومشابهة'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedTemplates.map((rel) => (
                  <div 
                    key={rel.id} 
                    onClick={() => onSelectAnotherTemplate(rel)}
                    className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800/60 border border-slate-800 cursor-pointer transition flex items-center gap-3"
                  >
                    <img src={rel.mainImage} alt={rel.name} className="w-12 h-10 object-cover rounded-lg" referrerPolicy="no-referrer" />
                    <div className="min-w-0 flex-1">
                      <h5 className="text-xs font-bold text-white truncate">{rel.name}</h5>
                      <span className="text-[11px] text-emerald-400 font-black">${rel.price.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
