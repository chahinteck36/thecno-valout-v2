import React from 'react';
import { StoreTemplate, ThemeConfig, ThemeLanguage } from '../types';
import { CorporateTemplate } from './templates/CorporateTemplate';
import { FinanceTemplate } from './templates/FinanceTemplate';
import { StartupTemplate } from './templates/StartupTemplate';
import { PortfolioTemplate } from './templates/PortfolioTemplate';
import { EcommerceTemplate } from './templates/EcommerceTemplate';
import { ServiceTemplate } from './templates/ServiceTemplate';
import { DashboardTemplate } from './templates/DashboardTemplate';
import { MagazineTemplate } from './templates/MagazineTemplate';
import { LandingTemplate } from './templates/LandingTemplate';
import { BloggerPreview } from './BloggerPreview';

interface TemplateRendererProps {
  template: StoreTemplate;
  config: ThemeConfig;
  isDark: boolean;
  onToggleDark: () => void;
  onBuyNow: () => void;
  language: ThemeLanguage;
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({
  template,
  config,
  isDark,
  onToggleDark,
  onBuyNow,
  language,
}) => {
  // Determine the design engine
  const designKey = template.designKey?.toLowerCase() || '';
  const variant = template.variant?.toLowerCase() || '';
  const tid = template.id.toLowerCase();
  const cat = (template.category || '').toLowerCase();

  // If explicitly flagged as classic blogger or has classic blogger ID
  if (designKey === 'classic' || tid === 'blogger-original' || tid === 'techvault-prime') {
    return (
      <BloggerPreview
        config={config}
        isDark={isDark}
        onToggleDark={onToggleDark}
        onBuyNow={onBuyNow}
        language={language}
      />
    );
  }

  // 1. CORPORATE & CONSULTING
  if (
    designKey === 'corporate' || 
    tid.includes('nova-corp') || 
    tid.includes('apex-consult') || 
    tid.includes('strata-agency') ||
    cat === 'corporate'
  ) {
    return (
      <CorporateTemplate
        template={template}
        config={config}
        isDark={isDark}
        onToggleDark={onToggleDark}
        onBuyNow={onBuyNow}
        language={language}
        variant={variant || (tid.includes('consult') ? 'consulting' : tid.includes('agency') ? 'modern-agency' : 'enterprise')}
      />
    );
  }

  // 2. FINANCE & FINTECH & WEALTH
  if (
    designKey === 'finance' || 
    tid.includes('finora') || 
    tid.includes('crypto') || 
    tid.includes('capital') || 
    tid.includes('wealth') ||
    cat === 'finance'
  ) {
    return (
      <FinanceTemplate
        template={template}
        config={config}
        isDark={isDark}
        onToggleDark={onToggleDark}
        onBuyNow={onBuyNow}
        language={language}
        variant={variant || (tid.includes('crypto') ? 'crypto' : tid.includes('capital') || tid.includes('wealth') ? 'wealth-banking' : 'fintech')}
      />
    );
  }

  // 3. STARTUP & SAAS & TECH
  if (
    designKey === 'startup' || 
    tid.includes('vertex') || 
    tid.includes('synapse') || 
    tid.includes('cloudscale') || 
    cat === 'saas'
  ) {
    return (
      <StartupTemplate
        template={template}
        config={config}
        isDark={isDark}
        onToggleDark={onToggleDark}
        onBuyNow={onBuyNow}
        language={language}
        variant={variant || (tid.includes('synapse') ? 'ai-saas' : tid.includes('cloud') ? 'developer-tools' : 'enterprise-saas')}
      />
    );
  }

  // 4. PORTFOLIO & CREATIVE & PHOTOGRAPHY
  if (
    designKey === 'portfolio' || 
    tid.includes('codecraft') || 
    tid.includes('atelier') || 
    tid.includes('framefolio') || 
    tid.includes('shutter') ||
    cat === 'portfolio'
  ) {
    return (
      <PortfolioTemplate
        template={template}
        config={config}
        isDark={isDark}
        onToggleDark={onToggleDark}
        onBuyNow={onBuyNow}
        language={language}
        variant={variant || (tid.includes('framefolio') || tid.includes('photo') ? 'photography' : tid.includes('atelier') ? 'creative-studio' : 'developer')}
      />
    );
  }

  // 5. E-COMMERCE & DIGITAL ASSETS & RETAIL
  if (
    designKey === 'ecommerce' || 
    tid.includes('cartnova') || 
    tid.includes('digitalnest') || 
    tid.includes('techmart') || 
    tid.includes('volt') ||
    cat === 'ecommerce'
  ) {
    return (
      <EcommerceTemplate
        template={template}
        config={config}
        isDark={isDark}
        onToggleDark={onToggleDark}
        onBuyNow={onBuyNow}
        language={language}
        variant={variant || (tid.includes('digital') ? 'digital-market' : tid.includes('techmart') || tid.includes('volt') ? 'electronics' : 'general-store')}
      />
    );
  }

  // 6. LOCAL SERVICES, LAW FIRM, HOSPITALITY
  if (
    designKey === 'service' || 
    tid.includes('proclean') || 
    tid.includes('legalpoint') || 
    tid.includes('staywise') || 
    cat === 'services'
  ) {
    return (
      <ServiceTemplate
        template={template}
        config={config}
        isDark={isDark}
        onToggleDark={onToggleDark}
        onBuyNow={onBuyNow}
        language={language}
        variant={variant || (tid.includes('legal') ? 'legal-firm' : tid.includes('stay') ? 'hospitality-hotel' : 'cleaning-services')}
      />
    );
  }

  // 7. DASHBOARDS & ADMIN & CRM
  if (
    designKey === 'dashboard' || 
    tid.includes('pulse-admin') || 
    tid.includes('insight-analytics') || 
    tid.includes('finboard') || 
    cat === 'dashboard'
  ) {
    return (
      <DashboardTemplate
        template={template}
        config={config}
        isDark={isDark}
        onToggleDark={onToggleDark}
        onBuyNow={onBuyNow}
        language={language}
        variant={variant || (tid.includes('analytics') || tid.includes('insight') ? 'analytics' : tid.includes('finboard') ? 'finance' : 'crm')}
      />
    );
  }

  // 8. MAGAZINE & NEWS & BLOG
  if (
    designKey === 'magazine' || 
    tid.includes('newswire') || 
    tid.includes('devbyte') || 
    tid.includes('marketwatch') || 
    cat === 'magazine' || 
    cat === 'blog'
  ) {
    return (
      <MagazineTemplate
        template={template}
        config={config}
        isDark={isDark}
        onToggleDark={onToggleDark}
        onBuyNow={onBuyNow}
        language={language}
        variant={variant || (tid.includes('devbyte') ? 'devbyte' : tid.includes('marketwatch') ? 'marketwatch' : 'newswire')}
      />
    );
  }

  // 9. HIGH-CONVERTING LANDING PAGES & PRODUCT LAUNCHES
  if (
    designKey === 'landing' || 
    tid.includes('launch') || 
    tid.includes('landing') || 
    tid.includes('pulse-mobile') || 
    tid.includes('course')
  ) {
    return (
      <LandingTemplate
        template={template}
        config={config}
        isDark={isDark}
        onToggleDark={onToggleDark}
        onBuyNow={onBuyNow}
        language={language}
        variant={variant || (tid.includes('course') ? 'course-education' : tid.includes('pulse-mobile') || tid.includes('app') ? 'mobile-app' : 'product-launch')}
      />
    );
  }

  // Fallback to classic Blogger preview
  return (
    <BloggerPreview
      config={config}
      isDark={isDark}
      onToggleDark={onToggleDark}
      onBuyNow={onBuyNow}
      language={language}
    />
  );
};
