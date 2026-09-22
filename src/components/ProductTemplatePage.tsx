import React, { useState, useEffect } from 'react';
import { 
  StoreTemplate, ThemeLanguage 
} from '../types';
import { 
  ShoppingCart, Eye, ArrowLeft, ArrowRight, CheckCircle2, 
  Sparkles, ShieldCheck, Download, Zap, RefreshCw, 
  HelpCircle, ChevronDown, ChevronUp, Layers, ExternalLink,
  Code2, Monitor, Smartphone, Globe, Tag, Check
} from 'lucide-react';
import { TemplateCard } from './TemplateCard';

interface Props {
  template: StoreTemplate;
  onBack: () => void;
  onPreview: (template: StoreTemplate) => void;
  onBuy: (template: StoreTemplate) => void;
  onSelectCategory: (categorySlug: string) => void;
  onSelectTemplate: (template: StoreTemplate) => void;
  allTemplates: StoreTemplate[];
  language?: ThemeLanguage;
}

export const ProductTemplatePage: React.FC<Props> = ({
  template,
  onBack,
  onPreview,
  onBuy,
  onSelectCategory,
  onSelectTemplate,
  allTemplates,
  language = 'ar',
}) => {
  const isEn = language === 'en';
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const images = template.previewImages && template.previewImages.length > 0 
    ? template.previewImages 
    : [template.mainImage];

  // Related templates in the same category or with related slugs
  const relatedTemplates = allTemplates
    .filter(t => t.id !== template.id && (t.categorySlug === template.categorySlug || (t.tags && template.tags && t.tags.some(tag => template.tags?.includes(tag)))))
    .slice(0, 3);

  const platformBadge = {
    blogger: isEn ? 'Blogger XML Template' : 'قالب بلوجر XML',
    wordpress: isEn ? 'WordPress Theme ZIP' : 'قالب ووردبريس ZIP',
    both: isEn ? 'Blogger XML & WordPress Theme' : 'بلوجر XML + ووردبريس ZIP',
  }[template.type];

  // Dynamic SEO Structured Data
  useEffect(() => {
    const slug = template.slug || template.id;
    const currentUrl = `https://techvaul-pro.store/templates/${slug}`;
    const pageTitle = `${isEn ? (template.nameEn || template.name) : template.name} | TechVault-Pro`;
    const metaDesc = isEn ? (template.shortDescriptionEn || template.shortDescription) : template.shortDescription;

    document.title = pageTitle;

    // Update Meta Description
    let descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute('content', metaDesc);
    }

    // Insert Product & Breadcrumb JSON-LD
    const jsonLdId = 'product-structured-data';
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
          "@type": "Product",
          "@id": `${currentUrl}#product`,
          "name": isEn ? (template.nameEn || template.name) : template.name,
          "image": images,
          "description": metaDesc,
          "sku": `TV-${template.id.toUpperCase()}`,
          "brand": {
            "@type": "Brand",
            "name": "TechVault Pro"
          },
          "offers": {
            "@type": "Offer",
            "url": currentUrl,
            "priceCurrency": "USD",
            "price": template.price.toFixed(2),
            "priceValidUntil": "2027-12-31",
            "itemCondition": "https://schema.org/NewCondition",
            "availability": "https://schema.org/InStock",
            "hasMerchantReturnPolicy": {
              "@type": "MerchantReturnPolicy",
              "applicableCountry": "US",
              "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
              "merchantReturnDays": 30,
              "returnMethod": "https://schema.org/ReturnByMail",
              "returnFees": "https://schema.org/FreeReturn"
            },
            "shippingDetails": {
              "@type": "OfferShippingDetails",
              "shippingRate": {
                "@type": "MonetaryAmount",
                "value": "0",
                "currency": "USD"
              },
              "shippingDestination": {
                "@type": "DefinedRegion",
                "addressCountry": "US"
              },
              "deliveryTime": {
                "@type": "ShippingDeliveryTime",
                "handlingTime": {
                  "@type": "QuantitativeValue",
                  "minValue": 0,
                  "maxValue": 1,
                  "unitCode": "DAY"
                },
                "transitTime": {
                  "@type": "QuantitativeValue",
                  "minValue": 0,
                  "maxValue": 0,
                  "unitCode": "DAY"
                }
              }
            }
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
              "name": isEn ? (template.categoryEn || template.category) : template.category,
              "item": `https://techvaul-pro.store/templates/category/${template.categorySlug || 'business'}`
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": isEn ? (template.nameEn || template.name) : template.name,
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
  }, [template, isEn]);

  return (
    <article className="space-y-10 max-w-6xl mx-auto" dir={isEn ? 'ltr' : 'rtl'}>
      
      {/* Top Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 flex-wrap">
        <button 
          onClick={onBack}
          className="hover:text-cyan-400 transition font-bold"
        >
          {isEn ? 'Marketplace' : 'المتجر'}
        </button>
        <span>/</span>
        <button 
          onClick={() => onSelectCategory(template.categorySlug || 'business')}
          className="hover:text-cyan-400 transition"
        >
          {isEn ? (template.categoryEn || template.category) : template.category}
        </button>
        <span>/</span>
        <span className="text-slate-200 font-bold truncate max-w-xs">
          {isEn ? (template.nameEn || template.name) : template.name}
        </span>
      </nav>

      {/* Main Product Showcase Header */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Visual Gallery (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl group">
            <img 
              src={images[activeImageIndex] || template.mainImage} 
              alt={isEn ? (template.nameEn || template.name) : template.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            
            {/* Live Preview Floating Button on Image */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end justify-between p-4 sm:p-6 pointer-events-none">
              <span className="px-3 py-1 rounded-xl bg-slate-950/90 text-cyan-300 text-xs font-black border border-cyan-500/30 backdrop-blur pointer-events-auto">
                {platformBadge}
              </span>
              <button
                onClick={() => onPreview(template)}
                className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black shadow-lg shadow-cyan-950 transition active:scale-95"
              >
                <Eye className="w-4 h-4" />
                <span>{isEn ? 'Open Live Demo' : 'معاينة القالب الحية'}</span>
              </button>
            </div>
          </div>

          {/* Thumbnail Gallery */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-24 sm:w-28 aspect-[16/10] rounded-xl overflow-hidden border-2 transition flex-shrink-0 ${
                    activeImageIndex === idx 
                      ? 'border-cyan-400 shadow-md shadow-cyan-950' 
                      : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Title, Pricing & Purchase Card (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur">
          
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-black">
                {isEn ? (template.categoryEn || template.category) : template.category}
              </span>
              {template.version && (
                <span className="text-xs text-slate-400 font-mono bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                  {template.version}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight">
              {isEn ? (template.nameEn || template.name) : template.name}
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              {isEn ? (template.shortDescriptionEn || template.shortDescription) : template.shortDescription}
            </p>
          </div>

          {/* Price Tag with Discount */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-slate-400 font-bold">$</span>
                <span className="text-3xl font-black text-emerald-400 tracking-tight">
                  {template.price.toFixed(2)}
                </span>
                <span className="text-xs text-slate-400 uppercase font-bold">{template.currency}</span>
              </div>
              {template.originalPrice && (
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                  <span className="line-through">${template.originalPrice.toFixed(2)}</span>
                  <span className="text-amber-400 font-bold">{template.discount || '67% OFF'}</span>
                </div>
              )}
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold">
                <Check className="w-3.5 h-3.5" />
                <span>{isEn ? 'Instant Raw Delivery' : 'تسليم رقمي فوري'}</span>
              </span>
              <p className="text-[10px] text-slate-400 mt-1">
                {isEn ? 'XML / ZIP files ready immediately' : 'الملفات متاحة فور إتمام الطلب'}
              </p>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => onBuy(template)}
              className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-sm font-black shadow-xl shadow-emerald-950/40 transition active:scale-[0.98]"
            >
              <ShoppingCart className="w-5 h-5 stroke-[2.5]" />
              <span>{isEn ? `Buy License - $${template.price.toFixed(2)}` : `شراء الترخيص - $${template.price.toFixed(2)}`}</span>
            </button>

            <button
              onClick={() => onPreview(template)}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold transition border border-slate-700 active:scale-[0.98]"
            >
              <Eye className="w-4 h-4 text-cyan-400" />
              <span>{isEn ? 'Launch Interactive Live Demo' : 'معاينة القالب الحية التفاعلية'}</span>
            </button>
          </div>

          {/* Verified Guarantee Checklist */}
          <div className="pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{isEn ? 'Clean, Virus-Free & Validated Source Code' : 'كود برمجي نظيف، آمن ومعتمد 100%'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>{isEn ? '100% Core Web Vitals & Google AdSense Ready' : 'سرعة قياسية وتوافق كامل مع إعلانات Google AdSense'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>{isEn ? 'Lifetime Minor Version Updates & Direct Support' : 'تحديثات مجانية مستمرة ودعم فني عبر واتساب والبريد'}</span>
            </div>
          </div>

        </div>
      </section>

      {/* Technical Specifications Matrix */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2 text-white font-black text-lg">
          <Code2 className="w-5 h-5 text-cyan-400" />
          <h2>{isEn ? 'Technical Specifications & Compatibility' : 'المواصفات الفنية والتوافق البرمجي'}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
          
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            <span className="text-slate-400 block mb-1">{isEn ? 'Platform / Format' : 'المنصة والصيغة'}</span>
            <span className="text-slate-100 font-bold">{template.framework || platformBadge}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            <span className="text-slate-400 block mb-1">{isEn ? 'File Size & Deliverables' : 'حجم الملف والمحتويات'}</span>
            <span className="text-slate-100 font-bold">{template.fileSize || '300 KB XML / 4.0 MB ZIP'}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            <span className="text-slate-400 block mb-1">{isEn ? 'Responsive Support' : 'التوافق مع الشاشات'}</span>
            <span className="text-slate-100 font-bold">{template.responsive || (isEn ? '100% Mobile, Tablet & Desktop' : 'متجاوب 100% مع كافة الشاشات')}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            <span className="text-slate-400 block mb-1">{isEn ? 'Browser Compatibility' : 'توافق المتصفحات'}</span>
            <span className="text-slate-100 font-bold">
              {template.browserSupport ? template.browserSupport.join(', ') : 'Chrome, Firefox, Safari, Edge'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            <span className="text-slate-400 block mb-1">{isEn ? 'License Terms' : 'شروط الترخيص'}</span>
            <span className="text-slate-100 font-bold">{template.license || (isEn ? 'Single Domain Commercial License' : 'ترخيص تجاري لموقع واحد')}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            <span className="text-slate-400 block mb-1">{isEn ? 'Last Updated' : 'تاريخ آخر تحديث'}</span>
            <span className="text-slate-100 font-bold font-mono">{template.lastUpdated || template.updatedAt.slice(0, 10)}</span>
          </div>

        </div>

        {/* Technologies List */}
        {template.technologies && template.technologies.length > 0 && (
          <div className="pt-4 border-t border-slate-800">
            <span className="text-xs text-slate-400 font-bold block mb-2">{isEn ? 'Technologies & Standards:' : 'التقنيات والمعايير المستخدمة:'}</span>
            <div className="flex flex-wrap gap-2">
              {template.technologies.map((tech, i) => (
                <span key={i} className="px-3 py-1 rounded-xl bg-slate-950 text-slate-300 text-xs border border-slate-800">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

      </section>

      {/* Key Features & Description */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Features List (7 cols) */}
        <div className="md:col-span-7 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>{isEn ? 'Key Features & Capabilities' : 'أبرز المميزات والوظائف البرمجية'}</span>
          </h2>

          <div className="space-y-3">
            {((isEn && template.featuresEn) ? template.featuresEn : template.features).map((feat, idx) => (
              <div key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pages Included & License Box (5 cols) */}
        <div className="md:col-span-5 space-y-4">
          
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>{isEn ? 'Pages & Layouts Included' : 'الصفحات والتخطيطات المضمنة'}</span>
            </h3>

            <ul className="space-y-2 text-xs text-slate-300">
              {(template.pagesIncluded || [
                isEn ? 'Homepage Layout' : 'الصفحة الرئيسية',
                isEn ? 'Single Article / Product Page' : 'صفحة المقال / المنتج الفردي',
                isEn ? 'Category & Tag Archives' : 'أرشيف الأقسام والوسوم',
                isEn ? 'Contact & Inquiry Form' : 'نموذج الاتصال والاستفسار',
                isEn ? 'Policy & Terms Page' : 'صفحة السياسات والشروط'
              ]).map((page, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>{page}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-3">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{isEn ? 'Digital Ownership Guarantee' : 'ضمان الشراء والملكية الرقمية'}</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isEn 
                ? 'All templates from TechVault-Pro come with verified source code, zero hidden fees, and lifetime access to minor security updates.'
                : 'كافة قوالب TechVault-Pro تأتي بأكواد مصدرية نظيفة ومفحوصة أمنياً، دون أي اشتراكات خفية، مع إمكانية التخصيص الكامل لبيانات موقعك.'}
            </p>
          </div>

        </div>

      </section>

      {/* Comprehensive Product Description */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-black text-white">
          {isEn ? 'Detailed Overview' : 'نظرة عامة وتفاصيل القالب'}
        </h2>
        <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line space-y-3">
          {isEn ? (template.fullDescriptionEn || template.fullDescription) : template.fullDescription}
        </div>
      </section>

      {/* Product FAQ Accordion */}
      {template.faq && template.faq.length > 0 && (
        <section className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-white font-black text-lg">
            <HelpCircle className="w-5 h-5 text-cyan-400" />
            <h2>{isEn ? 'Frequently Asked Questions' : 'الأسئلة الشائعة حول القالب'}</h2>
          </div>

          <div className="space-y-3">
            {template.faq.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 text-left font-bold text-xs sm:text-sm text-slate-200 hover:text-cyan-300 transition"
                  >
                    <span>{isEn ? item.questionEn : item.question}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-cyan-400" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800/80 pt-3">
                      {isEn ? item.answerEn : item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Related Templates Grid */}
      {relatedTemplates.length > 0 && (
        <section className="space-y-6 pt-6 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-white">
                {isEn ? 'Related Templates You May Like' : 'قوالب مقترحة ذات صلة'}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {isEn ? 'Explore similar themes in the same niche or technology stack' : 'استكشف قوالب احترافية أخرى في نفس التخصص'}
              </p>
            </div>
            <button
              onClick={() => onSelectCategory(template.categorySlug || 'business')}
              className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition"
            >
              {isEn ? 'View All Category →' : 'عرض الكل في التصنيف ←'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedTemplates.map(tmpl => (
              <TemplateCard
                key={tmpl.id}
                template={tmpl}
                onPreview={onPreview}
                onBuy={onBuy}
                onViewDetails={onSelectTemplate}
                language={language}
              />
            ))}
          </div>
        </section>
      )}

    </article>
  );
};
