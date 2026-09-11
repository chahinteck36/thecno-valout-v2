import React, { useState, useMemo } from 'react';
import { StoreTemplate, ThemeConfig, TechAppPost, CategoryInfo, ThemeLanguage } from '../types';
import { BloggerPreview } from './BloggerPreview';
import { TechPressMagazineView } from './templates/TechPressMagazineView';
import { APKPulseGamingView } from './templates/APKPulseGamingView';
import { AIToolsDirectoryView } from './templates/AIToolsDirectoryView';
import { CyberGuardSecurityView } from './templates/CyberGuardSecurityView';
import { DEFAULT_TEMPLATES } from '../data/defaultTemplates';
import { 
  ArrowLeft, ArrowRight, Monitor, Tablet, Smartphone, 
  ShoppingCart, Sparkles, ExternalLink, Sun, Moon,
  ShieldCheck, CheckCircle2, Eye, Layers
} from 'lucide-react';

interface Props {
  template: StoreTemplate;
  onClose: () => void;
  onBuy: (template: StoreTemplate) => void;
  baseConfig: ThemeConfig;
  posts: TechAppPost[];
  categories: CategoryInfo[];
  language: ThemeLanguage;
}

export const TemplateLivePreviewModal: React.FC<Props> = ({
  template: initialTemplate,
  onClose,
  onBuy,
  baseConfig,
  posts,
  categories,
  language,
}) => {
  const isEn = language === 'en';
  const [currentTemplate, setCurrentTemplate] = useState<StoreTemplate>(initialTemplate);
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isDark, setIsDark] = useState<boolean>(true);
  const [activePost, setActivePost] = useState<TechAppPost | null>(null);
  const [viewSource, setViewSource] = useState<'interactive' | 'external'>(
    currentTemplate.previewUrl && (currentTemplate.previewUrl.startsWith('http://') || currentTemplate.previewUrl.startsWith('https://'))
      ? 'external'
      : 'interactive'
  );

  // Derive specialized theme configuration tailored to this specific template
  const templateConfig: ThemeConfig = useMemo(() => {
    let themeColor: ThemeConfig['themeColor'] = 'cyan';
    let fontFamily: ThemeConfig['fontFamily'] = 'Cairo';

    const tid = currentTemplate.id.toLowerCase();
    const cat = (currentTemplate.category || '').toLowerCase();

    if (tid.includes('gaming') || cat.includes('ألعاب') || cat.includes('game')) {
      themeColor = 'emerald';
      fontFamily = 'Alexandria';
    } else if (tid.includes('press') || tid.includes('news') || cat.includes('مجلات') || cat.includes('أخبار')) {
      themeColor = 'indigo';
      fontFamily = 'Tajawal';
    } else if (tid.includes('ai') || tid.includes('tool') || cat.includes('ذكاء') || cat.includes('directory')) {
      themeColor = 'amber';
      fontFamily = 'Cairo';
    } else if (tid.includes('guard') || tid.includes('security') || cat.includes('حماية') || cat.includes('أمن')) {
      themeColor = 'crimson';
      fontFamily = 'Cairo';
    } else {
      themeColor = 'cyan';
      fontFamily = 'Cairo';
    }

    return {
      ...baseConfig,
      siteName: currentTemplate.name,
      siteNameEn: currentTemplate.nameEn || currentTemplate.name,
      siteDescription: currentTemplate.shortDescription,
      siteDescriptionEn: currentTemplate.shortDescriptionEn || currentTemplate.shortDescription,
      themeColor,
      fontFamily,
      language,
    };
  }, [currentTemplate, baseConfig, language]);

  const hasExternalUrl = Boolean(
    currentTemplate.previewUrl && 
    (currentTemplate.previewUrl.startsWith('http://') || currentTemplate.previewUrl.startsWith('https://'))
  );

  const platformBadgeText = 
    currentTemplate.type === 'both' 
      ? (isEn ? 'Blogger & WordPress' : 'بلوجر وووردبريس') 
      : currentTemplate.type === 'blogger' 
      ? (isEn ? 'Blogger XML' : 'قالب بلوجر XML') 
      : (isEn ? 'WordPress Theme' : 'قالب ووردبريس');

  const renderTemplateView = () => {
    const tid = currentTemplate.id.toLowerCase();
    if (tid.includes('techpress') || tid.includes('press')) {
      return (
        <TechPressMagazineView
          config={templateConfig}
          isDark={isDark}
          onToggleDark={() => setIsDark(!isDark)}
          onBuyNow={() => onBuy(currentTemplate)}
          language={language}
        />
      );
    }
    if (tid.includes('gaming') || tid.includes('apkpulse')) {
      return (
        <APKPulseGamingView
          config={templateConfig}
          isDark={isDark}
          onToggleDark={() => setIsDark(!isDark)}
          onBuyNow={() => onBuy(currentTemplate)}
          language={language}
        />
      );
    }
    if (tid.includes('aitools') || tid.includes('directory')) {
      return (
        <AIToolsDirectoryView
          config={templateConfig}
          isDark={isDark}
          onToggleDark={() => setIsDark(!isDark)}
          onBuyNow={() => onBuy(currentTemplate)}
          language={language}
        />
      );
    }
    if (tid.includes('cyberguard') || tid.includes('guard') || tid.includes('security')) {
      return (
        <CyberGuardSecurityView
          config={templateConfig}
          isDark={isDark}
          onToggleDark={() => setIsDark(!isDark)}
          onBuyNow={() => onBuy(currentTemplate)}
          language={language}
        />
      );
    }
    return (
      <BloggerPreview
        posts={posts}
        categories={categories}
        config={templateConfig}
        activePost={activePost}
        onSelectPost={setActivePost}
        isDark={isDark}
        onToggleDark={() => setIsDark(!isDark)}
        deviceMode={deviceMode}
        onChangeDeviceMode={setDeviceMode}
        hideInnerToolbar={true}
      />
    );
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950 flex flex-col overflow-hidden animate-fadeIn"
      dir={isEn ? 'ltr' : 'rtl'}
    >
      {/* Top Floating Control Bar */}
      <header className="flex-shrink-0 bg-slate-900/95 border-b border-slate-800 px-3 sm:px-6 py-2.5 backdrop-blur-md z-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Left / Start: Back to Store Button */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs sm:text-sm font-bold border border-slate-700 transition flex-shrink-0 shadow-sm"
              title={isEn ? "Return to Template Marketplace" : "العودة إلى متجر القوالب"}
            >
              {isEn ? <ArrowLeft className="w-4 h-4 text-cyan-400" /> : <ArrowRight className="w-4 h-4 text-cyan-400" />}
              <span>{isEn ? 'Back to Store' : 'العودة للمتجر'}</span>
            </button>

            {/* Template Title & Badges */}
            <div className="hidden md:flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-white truncate max-w-[260px]">
                  {isEn ? (currentTemplate.nameEn || currentTemplate.name) : currentTemplate.name}
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[10px] font-bold">
                  {platformBadgeText}
                </span>
              </div>
              <span className="text-[11px] text-slate-400 truncate max-w-[300px]">
                {isEn ? (currentTemplate.categoryEn || currentTemplate.category) : currentTemplate.category} • {isEn ? 'Live Interactive Preview' : 'معاينة حية تفاعلية'}
              </span>
            </div>
          </div>

          {/* Center: Template Switcher Pills */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs">
            {DEFAULT_TEMPLATES.map((tmpl) => {
              const isSelected = tmpl.id === currentTemplate.id;
              const shortName = 
                tmpl.id.includes('technoapp') ? 'TechnoApp' :
                tmpl.id.includes('techpress') ? 'TechPress' :
                tmpl.id.includes('apkpulse') ? 'APKPulse' :
                tmpl.id.includes('aitools') ? 'AITools' : 'CyberGuard';
              return (
                <button
                  key={tmpl.id}
                  onClick={() => setCurrentTemplate(tmpl)}
                  className={`px-2.5 py-1.5 rounded-xl font-bold transition ${
                    isSelected 
                      ? 'bg-cyan-500 text-slate-950 font-black shadow-md' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title={isEn ? (tmpl.nameEn || tmpl.name) : tmpl.name}
                >
                  {shortName}
                </button>
              );
            })}
          </div>

          {/* Center / Right: Device Viewport Controls & External Link */}
          <div className="flex items-center gap-1 sm:gap-2">
            
            {/* View Source Switcher if external URL exists */}
            {hasExternalUrl && (
              <div className="hidden sm:flex items-center bg-slate-950 p-0.5 rounded-xl border border-slate-800">
                <button
                  onClick={() => setViewSource('interactive')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition ${
                    viewSource === 'interactive'
                      ? 'bg-slate-800 text-cyan-400 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {isEn ? 'Interactive' : 'تفاعلي'}
                </button>
                <button
                  onClick={() => setViewSource('external')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition ${
                    viewSource === 'external'
                      ? 'bg-slate-800 text-cyan-400 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {isEn ? 'Live URL' : 'رابط حي'}
                </button>
              </div>
            )}

            {/* Device Mode Buttons */}
            <div className="flex items-center bg-slate-950 p-0.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setDeviceMode('desktop')}
                className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                  deviceMode === 'desktop'
                    ? 'bg-slate-800 text-cyan-400 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title={isEn ? "Desktop View" : "شاشة كمبيوتر"}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isEn ? 'Desktop' : 'كمبيوتر'}</span>
              </button>

              <button
                onClick={() => setDeviceMode('tablet')}
                className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                  deviceMode === 'tablet'
                    ? 'bg-slate-800 text-cyan-400 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title={isEn ? "Tablet View" : "شاشة لوحي"}
              >
                <Tablet className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isEn ? 'Tablet' : 'لوحي'}</span>
              </button>

              <button
                onClick={() => setDeviceMode('mobile')}
                className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                  deviceMode === 'mobile'
                    ? 'bg-slate-800 text-cyan-400 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title={isEn ? "Mobile View" : "شاشة هاتف"}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isEn ? 'Mobile' : 'هاتف'}</span>
              </button>
            </div>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition border border-slate-700"
              title={isEn ? "Toggle Theme" : "تبديل المظهر"}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-300" />}
            </button>
          </div>

          {/* Right: Buy Now CTA Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onBuy(currentTemplate)}
              className="flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-emerald-950/40 transition active:scale-95"
            >
              <ShoppingCart className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden sm:inline">{isEn ? 'Buy License' : 'شراء الترخيص'}</span>
              <span className="bg-slate-950/20 px-1.5 py-0.5 rounded text-[11px] font-black">
                ${currentTemplate.price.toFixed(2)}
              </span>
            </button>
          </div>

        </div>
      </header>

      {/* Live Preview Info Ribbon */}
      <div className="bg-slate-900 border-b border-slate-800 py-1.5 px-4 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
        <span className="truncate">
          {isEn
            ? `Live Demo of "${currentTemplate.nameEn || currentTemplate.name}" • Radically unique design, custom typography, & SEO 100%.`
            : `معاينة حية لقالب "${currentTemplate.name}" • تصميم مستقل كلياً وهوية بصرية مخصصة وسيو 100%.`}
        </span>
        <div className="hidden md:inline-flex items-center gap-1 text-[11px] text-emerald-400 font-semibold mr-2 ml-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{isEn ? 'Unified Price: $9.99' : 'سعر موحد: 9.99$'}</span>
        </div>
      </div>

      {/* Main Preview Viewport Area */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-6 bg-slate-950/90 flex flex-col items-center">
        
        {/* If External URL view is selected */}
        {viewSource === 'external' && hasExternalUrl ? (
          <div 
            className={`w-full h-full min-h-[680px] bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 transition-all duration-300 ${
              deviceMode === 'tablet' 
                ? 'max-w-3xl my-2' 
                : deviceMode === 'mobile' 
                ? 'max-w-[400px] my-4 border-4 border-slate-800 rounded-3xl' 
                : 'w-full'
            }`}
          >
            <iframe
              src={currentTemplate.previewUrl}
              title={currentTemplate.name}
              className="w-full h-full border-0 min-h-[700px]"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
        ) : (
          /* Interactive In-App Simulation of the template */
          <div 
            className={`w-full transition-all duration-300 ${
              deviceMode === 'tablet' 
                ? 'max-w-3xl my-2 shadow-2xl rounded-2xl overflow-hidden border border-slate-800' 
                : deviceMode === 'mobile' 
                ? 'max-w-[400px] my-4 shadow-2xl rounded-3xl overflow-hidden border-4 border-slate-800 ring-1 ring-slate-700' 
                : 'w-full max-w-7xl'
            }`}
          >
            {renderTemplateView()}
          </div>
        )}

      </div>

      {/* Floating Bottom Quick Action */}
      <footer className="flex-shrink-0 bg-slate-900/90 border-t border-slate-800 px-4 py-2 text-xs flex items-center justify-between text-slate-400">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{isEn ? 'Immediate instant download upon purchase' : 'تحميل فوري مباشر لكود القالب بعد إتمام الطلب'}</span>
        </div>
        <button
          onClick={onClose}
          className="text-slate-300 hover:text-white font-bold underline cursor-pointer"
        >
          {isEn ? 'Close Preview & Back to Catalog' : 'إغلاق المعاينة والعودة لكتالوج القوالب'}
        </button>
      </footer>
    </div>
  );
};
