export interface MarketplaceCategory {
  slug: string;
  name: string;
  nameEn: string;
  shortDescription: string;
  shortDescriptionEn: string;
  description: string;
  descriptionEn: string;
  iconName: string;
  heroImage: string;
  accentColor: string;
}

export const MARKETPLACE_CATEGORIES: MarketplaceCategory[] = [
  {
    slug: 'business',
    name: 'أعمال وشركات',
    nameEn: 'Business & Corporate',
    shortDescription: 'قوالب مؤسسية راقية للشركات، الاستشارات، ومنصات SaaS B2B.',
    shortDescriptionEn: 'Modern enterprise, consulting, and B2B SaaS web templates built for high authority.',
    description: 'مجموعة مختارة من قوالب الشركات والمؤسسات المتطورة المصممة لتعزيز الهوية التجارية، وتوليد العملاء المحتملين (Lead Generation)، وتسهيل إدارة الخدمات مع سرعة تحميل قياسية وتوافق تام مع محركات البحث.',
    descriptionEn: 'Curated collection of high-performance corporate and enterprise templates engineered for brand credibility, client acquisition, and seamless mobile engagement.',
    iconName: 'Briefcase',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
    accentColor: 'from-blue-500/20 to-cyan-500/10'
  },
  {
    slug: 'portfolio',
    name: 'معارض أعمال وبورتفوليو',
    nameEn: 'Portfolio & Creatives',
    shortDescription: 'تصاميم مخصصة للمطورين والمصممين والمصورين والفنانين المستقلين.',
    shortDescriptionEn: 'Minimalist, visual-first portfolio templates for developers, designers, and creatives.',
    description: 'قوالب بورتفوليو احترافية فائقة الأناقة لعرض المشاريع، دراسات الحالة (Case Studies)، المهارات التقنية، ونماذج التوظيف والعمل الحر مع دعم الوضع المظلم والنهاري وانتقالات سلسة.',
    descriptionEn: 'High-contrast, distraction-free portfolios created to showcase software projects, design case studies, photography galleries, and client testimonials with interactive detail views.',
    iconName: 'Palette',
    heroImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80',
    accentColor: 'from-purple-500/20 to-pink-500/10'
  },
  {
    slug: 'ecommerce',
    name: 'متاجر إلكترونية ومبيعات',
    nameEn: 'E-Commerce & Digital Stores',
    shortDescription: 'قوالب تسوق عالية التحويل للمنتجات الرقمية والمادية والأزياء والتقنية.',
    shortDescriptionEn: 'Conversion-focused storefronts for digital downloads, physical tech, fashion, and retail.',
    description: 'قوالب متاجر سريعة للغاية تركز على رفع معدل التحويل (High CRO)، مع صفحات منتجات متكاملة، فلاتر بحث ذكية، عربات تسوق، وتكامل سريع مع بوابات الدفع مثل PayPal و Stripe.',
    descriptionEn: 'Fast-loading e-commerce and digital marketplace themes featuring modular product grids, responsive galleries, streamlined checkout, and high conversion UX.',
    iconName: 'ShoppingBag',
    heroImage: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&auto=format&fit=crop&q=80',
    accentColor: 'from-emerald-500/20 to-teal-500/10'
  },
  {
    slug: 'services',
    name: 'خدمات محلية ومهنية',
    nameEn: 'Services & Booking',
    shortDescription: 'قوالب للمطاعم، العقارات، العيادات، المقاولات وخدمات الحجز المباشر.',
    shortDescriptionEn: 'Industry-specific templates for restaurants, real estate, healthcare, and rentals.',
    description: 'حلول تصميمية شاملة للأنشطة الخدمية والمهنية تشمل نماذج الحجز السريع، جداول الأسعار، بطاقات الخرائط والمواقع، ومعلومات الاتصال المباشرة عبر واتساب والبريد.',
    descriptionEn: 'Ready-to-deploy web themes for service-oriented businesses featuring instant booking workflows, interactive service menus, location maps, and WhatsApp integration.',
    iconName: 'Wrench',
    heroImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&auto=format&fit=crop&q=80',
    accentColor: 'from-amber-500/20 to-orange-500/10'
  },
  {
    slug: 'landing-pages',
    name: 'صفحات هبوط وتسويق',
    nameEn: 'Landing Pages & SaaS',
    shortDescription: 'صفحات هبوط لإطلاق المنتجات الرقمية والتطبيقات مع تركيز على التحويل الفوري.',
    shortDescriptionEn: 'High-impact landing pages designed for software launches, apps, and pre-orders.',
    description: 'صفحات هبوط تسويقية مصممة وفق أحدث معايير تجربة المستخدم لزيادة الاشتراكات ومبيعات المنتجات البرمجية مع أقسام الأسعار، مميزات المنتج، والأسئلة الشائعة.',
    descriptionEn: 'Targeted single-page and multi-section landing pages built to maximize leads, newsletter signups, and immediate digital product checkout.',
    iconName: 'Target',
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
    accentColor: 'from-indigo-500/20 to-cyan-500/10'
  },
  {
    slug: 'dashboard',
    name: 'لوحات تحكم وإدارة',
    nameEn: 'Dashboards & Admin',
    shortDescription: 'واجهات مستخدم لإدارة البيانات، التحليلات والإحصائيات الحديثة.',
    shortDescriptionEn: 'Clean, data-dense administrative dashboards for SaaS platforms and analytics.',
    description: 'قوالب لوحات تحكم متطورة تجمع بين جمال التصميم وسهولة قراءة الرسوم البيانية والجداول والبطاقات الإحصائية مع قابلية التخصيص الكاملة.',
    descriptionEn: 'Modern UI kits and admin dashboards engineered for SaaS analytics, customer management, revenue metrics, and responsive desktop/mobile supervision.',
    iconName: 'LayoutDashboard',
    heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80',
    accentColor: 'from-violet-500/20 to-purple-500/10'
  },
  {
    slug: 'blog',
    name: 'مدونات ومجلات تقنية',
    nameEn: 'Blog & Magazines',
    shortDescription: 'قوالب إخبارية وتقنية متوافقة مع أدسنس وسرعة قياسية 100/100.',
    shortDescriptionEn: 'Ultra-fast content and magazine themes optimized for Google AdSense and SEO.',
    description: 'قوالب مخصصة لصناع المحتوى والمدونين تركز على سهولة القراءة، أماكن إعلانية عالية النقر (High CTR)، توافق كامل مع معايير السيو والخرائط التلقائية (Sitemap).',
    descriptionEn: 'Editorial-first magazine and multi-category blog themes featuring dedicated AdSense zones, AMP/mobile optimization, and schema-rich article formatting.',
    iconName: 'Newspaper',
    heroImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&auto=format&fit=crop&q=80',
    accentColor: 'from-red-500/20 to-amber-500/10'
  }
];
