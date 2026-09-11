import React, { useState, useEffect, Suspense, lazy } from 'react';
import { TechAppPost, ThemeConfig, StoreTemplate } from './types';
import { MOCK_POSTS, CATEGORIES_DATA, DEFAULT_THEME_CONFIG } from './data/mockPosts';
import { Header, ActiveTab } from './components/Header';
import { BloggerPreview } from './components/BloggerPreview';
import { fetchPublishedTemplatesFromDb } from './lib/storeService';
import { HomeMarketplaceSection } from './components/HomeMarketplaceSection';

// Code-split heavy modals, admin portal, and non-critical tabs
const InstallGuide = lazy(() => import('./components/InstallGuide').then(m => ({ default: m.InstallGuide })));
const AdminPortal = lazy(() => import('./components/AdminPortal').then(m => ({ default: m.AdminPortal })));
const ThemeCustomizerModal = lazy(() => import('./components/ThemeCustomizerModal').then(m => ({ default: m.ThemeCustomizerModal })));
const PayPalCheckoutModal = lazy(() => import('./components/PayPalCheckoutModal').then(m => ({ default: m.PayPalCheckoutModal })));
const TemplateMarketplace = lazy(() => import('./components/TemplateMarketplace').then(m => ({ default: m.TemplateMarketplace })));
const TemplateDetailModal = lazy(() => import('./components/TemplateDetailModal').then(m => ({ default: m.TemplateDetailModal })));
const TemplateLivePreviewModal = lazy(() => import('./components/TemplateLivePreviewModal').then(m => ({ default: m.TemplateLivePreviewModal })));

const getInitialTab = (): ActiveTab => {
  if (typeof window === 'undefined') return 'preview';
  const path = window.location.pathname.toLowerCase().replace(/\/+$/, '');
  if (path === '/admin') return 'admin';
  if (path === '/store') return 'store';
  if (path === '/guide') return 'guide';
  return 'preview';
};

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>(getInitialTab);
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(DEFAULT_THEME_CONFIG);
  const [posts, setPosts] = useState<TechAppPost[]>(MOCK_POSTS);
  const [activePost, setActivePost] = useState<TechAppPost | null>(null);
  const [isDark, setIsDark] = useState(true);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Store & Templates State
  const [storeTemplates, setStoreTemplates] = useState<StoreTemplate[]>([]);
  const [isLoadingStoreTemplates, setIsLoadingStoreTemplates] = useState(false);
  const [selectedStoreTemplate, setSelectedStoreTemplate] = useState<StoreTemplate | null>(null);
  const [detailModalTemplate, setDetailModalTemplate] = useState<StoreTemplate | null>(null);
  const [previewingTemplate, setPreviewingTemplate] = useState<StoreTemplate | null>(null);

  // Load published templates from Firestore (with automatic fallback to local defaults)
  const loadStoreTemplates = async () => {
    setIsLoadingStoreTemplates(true);
    try {
      const templates = await fetchPublishedTemplatesFromDb();
      setStoreTemplates(templates);
    } catch (err) {
      console.warn('Could not load templates from Firestore:', err);
    } finally {
      setIsLoadingStoreTemplates(false);
    }
  };

  useEffect(() => {
    loadStoreTemplates();
  }, []);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase().replace(/\/+$/, '');
      if (path === '/admin') {
        setActiveTab('admin');
      } else if (path === '/store') {
        setActiveTab('store');
      } else if (path === '/guide') {
        setActiveTab('guide');
      } else {
        setActiveTab('preview');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    if (tab !== 'preview') {
      setActivePost(null);
    }
    const targetPath = tab === 'admin' ? '/admin' : tab === 'store' ? '/store' : tab === 'guide' ? '/guide' : '/';
    if (typeof window !== 'undefined' && window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
  };

  // Payment & License State with LocalStorage Persistence
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    try {
      return localStorage.getItem('technoapp_licensed') === 'true';
    } catch {
      return false;
    }
  });
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [pendingDownloadType, setPendingDownloadType] = useState<'blogger' | 'wordpress'>('blogger');

  // Actual execution of Blogger XML download (Dynamic code-split)
  const executeBloggerXmlDownload = async () => {
    try {
      const { generateBloggerXml } = await import('./utils/bloggerXmlGenerator');
      const xmlCode = generateBloggerXml(themeConfig);
      const blob = new Blob([xmlCode], { type: 'application/xml;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `TechnoApp_Pro_Blogger_Theme_2026.xml`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) {
      console.error('Error generating Blogger XML:', err);
    }
  };

  // Actual execution of WordPress ZIP download (Dynamic code-split)
  const executeWordPressZipDownload = async () => {
    try {
      const { createWordPressThemeZip } = await import('./utils/wordPressThemeGenerator');
      const zipBlob = await createWordPressThemeZip(themeConfig);
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `TechnoApp_Pro_WordPress_Theme_2026.zip`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) {
      console.error('Error creating WordPress ZIP:', err);
    }
  };

  // Demo content XML download execution
  const executeDemoContentDownload = () => {
    const link = document.createElement('a');
    link.href = '/blogger-demo-content.xml';
    link.setAttribute('download', 'blogger-demo-content.xml');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Quick download theme.xml (Blogger) - Intercepted with PayPal Checkout
  const handleQuickDownloadXml = () => {
    if (!isUnlocked) {
      setSelectedStoreTemplate(null);
      setPendingDownloadType('blogger');
      setIsCheckoutModalOpen(true);
      return;
    }
    executeBloggerXmlDownload();
  };

  // Quick download WordPress Theme ZIP - Intercepted with PayPal Checkout
  const handleQuickDownloadWpZip = () => {
    if (!isUnlocked) {
      setSelectedStoreTemplate(null);
      setPendingDownloadType('wordpress');
      setIsCheckoutModalOpen(true);
      return;
    }
    executeWordPressZipDownload();
  };

  // Template action handlers
  const handlePreviewTemplate = (template: StoreTemplate) => {
    // Open dedicated interactive live preview modal without leaving the store or resetting to home page
    setPreviewingTemplate(template);
  };

  const handleBuyTemplate = (template: StoreTemplate) => {
    setSelectedStoreTemplate(template);
    setPendingDownloadType(template.type === 'blogger' ? 'blogger' : 'wordpress');
    setIsCheckoutModalOpen(true);
  };

  const handleSelectTemplateDetails = (template: StoreTemplate) => {
    setDetailModalTemplate(template);
  };

  // Callback when PayPal payment succeeds or license key is valid
  const handlePaymentSuccess = () => {
    setIsUnlocked(true);
    setIsCheckoutModalOpen(false);

    // Auto-trigger the pending download immediately
    if (pendingDownloadType === 'wordpress') {
      executeWordPressZipDownload();
    } else {
      executeBloggerXmlDownload();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 overflow-x-hidden">
      
      {/* Main Studio Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onQuickDownloadXml={handleQuickDownloadXml}
        onQuickDownloadWpZip={handleQuickDownloadWpZip}
        config={themeConfig}
        onChangeLanguage={(lang) => setThemeConfig({ ...themeConfig, language: lang })}
        isDark={isDark}
        onToggleDark={() => setIsDark(!isDark)}
        isUnlocked={isUnlocked}
      />

      {/* Main Studio Viewport */}
      <main className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-3 sm:py-6">
        
        {activeTab === 'preview' && (
          <BloggerPreview
            posts={posts}
            categories={CATEGORIES_DATA}
            config={themeConfig}
            activePost={activePost}
            onSelectPost={(p) => setActivePost(p)}
            isDark={isDark}
            onToggleDark={() => setIsDark(!isDark)}
            deviceMode={deviceMode}
            onChangeDeviceMode={setDeviceMode}
            hideInnerToolbar={false}
            templatesSection={
              <HomeMarketplaceSection
                templates={storeTemplates}
                onPreview={handlePreviewTemplate}
                onBuy={handleBuyTemplate}
                onViewDetails={handleSelectTemplateDetails}
                onGoToFullStore={() => handleSelectTab('store')}
                language={themeConfig.language}
                isLoading={isLoadingStoreTemplates}
              />
            }
          />
        )}

        {activeTab === 'store' && (
          <Suspense fallback={
            <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center">
              <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mb-3"></div>
              <p className="text-sm font-bold">{themeConfig.language === 'en' ? 'Loading templates store...' : 'جاري تحميل متجر القوالب الاحترافية...'}</p>
            </div>
          }>
            <TemplateMarketplace
              templates={storeTemplates}
              onPreviewTemplate={handlePreviewTemplate}
              onBuyTemplate={handleBuyTemplate}
              onSelectTemplateDetails={handleSelectTemplateDetails}
              language={themeConfig.language}
              isLoading={isLoadingStoreTemplates}
            />
          </Suspense>
        )}

        {activeTab === 'guide' && (
          <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading guide...</div>}>
            <InstallGuide
              onGoToPreview={() => handleSelectTab('preview')}
              onDownloadDemoContent={executeDemoContentDownload}
              onDownloadWpZip={handleQuickDownloadWpZip}
              onDownloadXml={handleQuickDownloadXml}
              language={themeConfig.language}
            />
          </Suspense>
        )}

        {activeTab === 'admin' && (
          <Suspense fallback={
            <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center">
              <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mb-3"></div>
              <p className="text-sm font-bold">جاري تحميل لوحة التحكم الآمنة...</p>
            </div>
          }>
            <AdminPortal
              onCloseAdmin={() => handleSelectTab('preview')}
              language={themeConfig.language}
            />
          </Suspense>
        )}

      </main>

      {/* Template Detail Modal */}
      {detailModalTemplate && (
        <Suspense fallback={null}>
          <TemplateDetailModal
            template={detailModalTemplate}
            onClose={() => setDetailModalTemplate(null)}
            onPreview={handlePreviewTemplate}
            onBuy={(tmpl) => {
              setDetailModalTemplate(null);
              handleBuyTemplate(tmpl);
            }}
            language={themeConfig.language}
            allTemplates={storeTemplates}
            onSelectAnotherTemplate={(tmpl) => setDetailModalTemplate(tmpl)}
          />
        </Suspense>
      )}

      {/* Live Interactive Template Preview Modal */}
      {previewingTemplate && (
        <Suspense fallback={
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur flex items-center justify-center">
            <div className="w-10 h-10 border-3 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <TemplateLivePreviewModal
            template={previewingTemplate}
            onClose={() => setPreviewingTemplate(null)}
            onBuy={(tmpl) => {
              setPreviewingTemplate(null);
              handleBuyTemplate(tmpl);
            }}
            baseConfig={themeConfig}
            posts={posts}
            categories={CATEGORIES_DATA}
            language={themeConfig.language}
          />
        </Suspense>
      )}

      {/* Theme Customizer Modal */}
      {isCustomizerOpen && (
        <Suspense fallback={null}>
          <ThemeCustomizerModal
            isOpen={isCustomizerOpen}
            onClose={() => setIsCustomizerOpen(false)}
            config={themeConfig}
            onChangeConfig={setThemeConfig}
            isUnlocked={isUnlocked}
            onRequestUnlock={() => {
              setSelectedStoreTemplate(null);
              setPendingDownloadType('blogger');
              setIsCheckoutModalOpen(true);
            }}
          />
        </Suspense>
      )}

      {/* PayPal & WhatsApp Checkout Modal */}
      {isCheckoutModalOpen && (
        <Suspense fallback={null}>
          <PayPalCheckoutModal
            isOpen={isCheckoutModalOpen}
            onClose={() => {
              setIsCheckoutModalOpen(false);
              setSelectedStoreTemplate(null);
            }}
            onPaymentSuccess={handlePaymentSuccess}
            themeType={pendingDownloadType}
            price={selectedStoreTemplate?.price || themeConfig.paypalSettings?.priceUsd || 9.99}
            paypalEmail={themeConfig.paypalSettings?.paypalEmail || "chahinteck36@gmail.com"}
            sellerWhatsAppPhone={themeConfig.whatsappSettings?.sellerPhone || "+213563710494"}
            language={themeConfig.language}
            selectedTemplate={selectedStoreTemplate}
          />
        </Suspense>
      )}

    </div>
  );
}
