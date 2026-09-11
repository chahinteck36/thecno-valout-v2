export type PlatformType = 'android' | 'windows' | 'ios' | 'mac' | 'linux' | 'web';
export type ThemeLanguage = 'en' | 'ar';

export interface DownloadLink {
  id: string;
  provider: 'direct' | 'mediafire' | 'drive' | 'mega' | 'telegram' | 'playstore' | 'appstore' | 'custom';
  title: string;
  titleEn?: string;
  url: string;
  size?: string;
  version?: string;
  fastServer?: boolean;
}

export interface TechAppPost {
  id: string;
  title: string;
  titleEn?: string;
  slug: string;
  category: string;
  categoryEn?: string;
  categorySlug: string;
  platform: PlatformType[];
  version: string;
  developer: string;
  size: string;
  rating: number;
  reviewsCount: number;
  downloadsCount: string;
  updatedDate: string;
  updatedDateEn?: string;
  isFeatured?: boolean;
  isTopDownload?: boolean;
  iconUrl: string;
  coverImage: string;
  summary: string;
  summaryEn?: string;
  description: string;
  descriptionEn?: string;
  features: string[];
  featuresEn?: string[];
  whatsNew: string[];
  whatsNewEn?: string[];
  techSpecs: {
    requiresAndroid?: string;
    requiresWindows?: string;
    ram?: string;
    license: string;
    licenseEn?: string;
    packageId?: string;
    virusTotalUrl?: string;
    virusScanSafe: boolean;
  };
  screenshots: string[];
  downloadLinks: DownloadLink[];
  tags: string[];
  tagsEn?: string[];
  viewsCount: number;
}

export interface CategoryInfo {
  id: string;
  name: string;
  nameEn?: string;
  slug: string;
  icon: string;
  count: number;
  color: string;
  description: string;
  descriptionEn?: string;
}

export type ThemeColor = 'cyan' | 'emerald' | 'indigo' | 'amber' | 'crimson';
export type ThemeFont = 'Cairo' | 'Tajawal' | 'IBM Plex Sans Arabic' | 'Almarai' | 'Changa' | 'Alexandria' | 'Readex Pro';
export type ThemeFontEn = 'Inter' | 'Outfit' | 'Plus Jakarta Sans' | 'Poppins' | 'Roboto' | 'Space Grotesk';

export interface ThemeConfig {
  language: ThemeLanguage;
  siteName: string;
  siteNameEn?: string;
  siteDescription: string;
  siteDescriptionEn?: string;
  logoUrl?: string;
  themeColor: ThemeColor;
  fontFamily: ThemeFont;
  fontFamilyEn?: ThemeFontEn;
  enableDarkMode: boolean;
  enableDownloadTimer: boolean;
  timerDuration: number;
  enableBreakingTicker: boolean;
  enableRelatedPosts: boolean;
  enableTableOfContents: boolean;
  enableVirusTotalBadge: boolean;
  enableAdPlacements: boolean;
  telegramChannelUrl: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    youtube?: string;
    telegram?: string;
    whatsapp?: string;
    instagram?: string;
    tiktok?: string;
    github?: string;
  };
  adSettings: {
    headerBannerCode?: string;
    inArticleTopCode?: string;
    inArticleBottomCode?: string;
    sidebarStickyCode?: string;
  };
  paypalSettings?: {
    paypalEmail: string;
    priceUsd: number;
    currency: string;
  };
  whatsappSettings?: {
    sellerPhone: string;
    sellerName?: string;
    allowWhatsAppOrder: boolean;
  };
}

export type TemplatePlatformType = 'blogger' | 'wordpress' | 'both';
export type TemplateStatus = 'published' | 'draft' | 'hidden';
export type OrderStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface StoreTemplate {
  id: string;
  name: string;
  nameEn?: string;
  type: TemplatePlatformType;
  category: string;
  categoryEn?: string;
  shortDescription: string;
  shortDescriptionEn?: string;
  fullDescription: string;
  fullDescriptionEn?: string;
  mainImage: string;
  previewImages: string[];
  previewUrl: string;
  price: number;
  currency: string;
  status: TemplateStatus;
  featured: boolean;
  features: string[];
  featuresEn?: string[];
  requirements: string[];
  licenseInfo: string;
  salesCount?: number;
  rating?: number;
  reviewsCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface StoreOrder {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  templateId: string;
  templateName: string;
  templateType: string;
  price: number;
  currency: string;
  paymentMethod: 'paypal' | 'whatsapp' | 'manual';
  notes?: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}


