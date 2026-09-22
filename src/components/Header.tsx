import React, { useState } from 'react';
import { 
  Eye, BookOpen, Settings, Download, 
  FolderArchive, ShoppingCart, Languages, Menu, X,
  Store, Layers
} from 'lucide-react';
import { ThemeConfig, ThemeLanguage } from '../types';
import { t } from '../utils/translations';

export type ActiveTab = 'home' | 'preview' | 'store' | 'guide' | 'admin' | 'product' | 'category';

interface Props {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenCustomizer: () => void;
  onQuickDownloadXml: () => void;
  onQuickDownloadWpZip?: () => void;
  config: ThemeConfig;
  onChangeLanguage?: (lang: ThemeLanguage) => void;
  isDark: boolean;
  onToggleDark: () => void;
  isUnlocked?: boolean;
}

export const Header: React.FC<Props> = ({
  activeTab,
  onSelectTab,
  onOpenCustomizer,
  onQuickDownloadXml,
  onQuickDownloadWpZip,
  config,
  onChangeLanguage,
  isUnlocked = false,
}) => {
  const isEn = config.language === 'en';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs: { id: ActiveTab; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string }[] = [
    { id: 'home', label: t('tabMarketplace', config.language), icon: Store },
    { id: 'store', label: t('tabTemplates', config.language), icon: Layers },
    { id: 'preview', label: t('tabStudio', config.language), icon: Eye },
    { id: 'guide', label: t('tabGuide', config.language), icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 border-b border-slate-800/80 backdrop-blur-xl" dir={isEn ? 'ltr' : 'rtl'}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        
        {/* Main Header Bar */}
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          
          {/* Brand Title & Logo */}
          <div 
            onClick={() => {
              onSelectTab('home');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 sm:gap-3 min-w-0 cursor-pointer group flex-shrink"
            title={isEn ? "Back to TechVault-Pro Marketplace" : "العودة إلى متجر تيك فولت برو"}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-teal-500 to-blue-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-cyan-500/25 overflow-hidden border border-white/10 flex-shrink-0 group-hover:scale-105 transition">
              <img src="/favicon.png" alt="TechVault Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-sm sm:text-base md:text-lg text-white tracking-tight truncate group-hover:text-cyan-400 transition">
                  <span className="text-cyan-400 font-extrabold">TechVault</span>
                  <span className="text-slate-300">-Pro</span>
                </span>
                <span className="px-1.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[9px] font-black hidden lg:inline flex-shrink-0">
                  MARKETPLACE
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 truncate hidden xs:block">
                {isEn ? 'Digital Templates & Assets' : 'متجر القوالب والأصول الرقمية'}
              </p>
            </div>
          </div>

          {/* Navigation Tabs (Desktop & Tablet md+) */}
          <nav className="hidden md:flex items-center gap-1.5 flex-shrink-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectTab(tab.id)}
                  className={`flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold transition flex-shrink-0 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-md shadow-cyan-950'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Language, Customize, Download, Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            
            {/* Language Switcher */}
            {onChangeLanguage && (
              <button
                onClick={() => onChangeLanguage(isEn ? 'ar' : 'en')}
                className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 sm:py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-xl text-[11px] sm:text-xs font-bold transition active:scale-95"
                title={isEn ? "تبديل إلى اللغة العربية" : "Switch to English"}
              >
                <Languages className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-extrabold text-cyan-300">{isEn ? 'EN' : 'عربي'}</span>
              </button>
            )}

            {/* Customizer Button (Desktop lg+) */}
            <button
              onClick={onOpenCustomizer}
              className={`hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition border ${
                isUnlocked 
                  ? 'bg-slate-900 hover:bg-slate-800 text-emerald-300 border-emerald-500/40' 
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700'
              }`}
              title={isUnlocked ? t('licensed', config.language) : t('availableForBuyers', config.language)}
            >
              <Settings className={`w-3.5 h-3.5 ${isUnlocked ? 'text-emerald-400' : 'text-cyan-400'}`} />
              <span className="hidden xl:inline">{t('customizeTheme', config.language)}</span>
            </button>

            {/* WordPress Download Button (Large screens xl+) */}
            {onQuickDownloadWpZip && (
              <button
                onClick={onQuickDownloadWpZip}
                className="hidden xl:flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black rounded-xl text-xs shadow-md transition active:scale-95"
                title={t('downloadWpZip', config.language)}
              >
                <FolderArchive className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>WP ZIP</span>
              </button>
            )}

            {/* Main Action / Buy Button */}
            <button
              onClick={onQuickDownloadXml}
              className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black rounded-xl text-xs shadow-md shadow-emerald-950/40 transition active:scale-95"
              title={t('downloadXml', config.language)}
            >
              {isUnlocked ? (
                <Download className="w-3.5 h-3.5 stroke-[2.5]" />
              ) : (
                <ShoppingCart className="w-3.5 h-3.5 stroke-[2.5]" />
              )}
              <span className="text-[11px] sm:text-xs">
                {isUnlocked ? (isEn ? 'Download' : 'تحميل') : (isEn ? 'Get Theme' : 'شراء')}
              </span>
            </button>

            {/* Mobile Actions Drawer Toggle (Visible only below md) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-1.5 sm:p-2 rounded-xl border transition md:hidden ${
                mobileMenuOpen 
                  ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300' 
                  : 'bg-slate-900 border-slate-700 text-slate-200 hover:text-white'
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

          </div>

        </div>

        {/* Mobile Navigation Segmented Bar (md:hidden) */}
        <div className="md:hidden pb-2 pt-1 border-t border-slate-800/70">
          <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-slate-900/90 border border-slate-800">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    onSelectTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-center gap-1 py-1.5 px-1 rounded-lg text-[11px] font-bold transition whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Expanded Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 px-1 border-t border-slate-800 space-y-2.5 animate-fade-in text-xs">
            
            {/* Quick Tabs Grid */}
            <div className="grid grid-cols-2 gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      onSelectTab(tab.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition ${
                      isActive
                        ? 'bg-cyan-500/10 border-cyan-500 text-cyan-300'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span className="truncate">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Theme Customizer Button */}
            <button
              onClick={() => {
                onOpenCustomizer();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold transition"
            >
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-cyan-400" />
                <span>{t('customizeTheme', config.language)}</span>
              </div>
              <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20 font-bold">
                {isEn ? 'Live Editor' : 'محرر حي'}
              </span>
            </button>

            {/* Quick Direct Downloads in Drawer */}
            {onQuickDownloadWpZip && (
              <button
                onClick={() => {
                  onQuickDownloadWpZip();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-300 font-bold hover:bg-blue-600/30 transition"
              >
                <div className="flex items-center gap-2">
                  <FolderArchive className="w-4 h-4" />
                  <span>{t('downloadWpZip', config.language)}</span>
                </div>
                <span className="text-[10px] bg-blue-500 text-slate-950 px-2 py-0.5 rounded-full font-black">.ZIP</span>
              </button>
            )}

            <button
              onClick={() => {
                onQuickDownloadXml();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 font-bold hover:bg-emerald-600/30 transition"
            >
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span>{t('downloadXml', config.language)}</span>
              </div>
              <span className="text-[10px] bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-full font-black">.XML</span>
            </button>

          </div>
        )}

      </div>
    </header>
  );
};
