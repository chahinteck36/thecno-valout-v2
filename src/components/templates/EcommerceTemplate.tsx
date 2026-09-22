import React, { useState } from 'react';
import { 
  ShoppingCart, Heart, Eye, Star, Search, ShieldCheck, 
  Truck, ArrowRight, ArrowLeft, Check, Sparkles, Filter, 
  Clock, Tag, X, ChevronRight, Download, Package
} from 'lucide-react';
import { StoreTemplate, ThemeConfig, ThemeLanguage } from '../../types';

export interface TemplateDesignProps {
  template: StoreTemplate;
  config: ThemeConfig;
  isDark: boolean;
  onToggleDark: () => void;
  onBuyNow: () => void;
  language: ThemeLanguage;
  variant?: string;
}

export const EcommerceTemplate: React.FC<TemplateDesignProps> = ({
  template,
  config,
  isDark = true,
  onToggleDark,
  onBuyNow,
  language = 'ar',
  variant = 'general-store',
}) => {
  const isEn = language === 'en';
  const tid = template.id.toLowerCase();

  const isDigital = variant === 'digital-market' || tid.includes('digital') || tid.includes('pixelvault');
  const isElectronics = variant === 'electronics' || tid.includes('techmart') || tid.includes('volt');
  const isGeneralStore = !isDigital && !isElectronics;

  // Cart State
  const [cartItems, setCartItems] = useState<{ id: string; name: string; price: number; img: string }[]>([
    { id: 'item-1', name: isEn ? 'SonicWave Pro Headphones' : 'سماعات سونيك ويف برو اللاسلكية', price: 189, img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80' }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleAddToCart = (product: { id: string; name: string; price: number; img: string }) => {
    setCartItems(prev => [...prev, product]);
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  // Products Data based on store variant
  const products = isElectronics ? [
    { id: 'el-1', name: isEn ? 'ProBook Max M3 16"' : 'حاسوب بروبوك ماكس M3 شاشة 16 بوصة', category: 'laptops', price: 2199, oldPrice: 2499, rating: 4.9, reviews: 312, specs: ['Apple M3 Max', '36GB RAM', '1TB NVMe', 'Liquid Retina XDR'], img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80' },
    { id: 'el-2', name: isEn ? 'UltraLens Alpha 4K Drone' : 'طائرة درون ألترا لينز تصوير سينمائي 4K', category: 'drones', price: 849, oldPrice: 999, rating: 4.8, reviews: 184, specs: ['4K/60fps HDR', '42 Mins Flight', '15km Range', 'Omni Sensing'], img: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&auto=format&fit=crop&q=80' },
    { id: 'el-3', name: isEn ? 'Acoustic Studio ANC Buds' : 'سماعات الأذن اللاسلكية عازلة للضوضاء', category: 'audio', price: 229, oldPrice: 279, rating: 4.7, reviews: 520, specs: ['Active Noise Cancel', '38h Playback', 'Spatial Audio', 'IPX4 Water'], img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80' },
    { id: 'el-4', name: isEn ? 'Onyx Pro Titanium Watch' : 'ساعة ذكية تيتانيوم مقاومة للغوص', category: 'wearables', price: 449, oldPrice: 520, rating: 4.9, reviews: 275, specs: ['Sapphire Glass', 'Dual-Freq GPS', 'ECG Sensor', '14-Day Battery'], img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80' },
  ] : isDigital ? [
    { id: 'dg-1', name: isEn ? 'Nova UI: Enterprise Design System' : 'نظام تصميم نوفا للشركات الكبرى (Figma)', category: 'ui-kits', price: 68, oldPrice: 99, rating: 5.0, reviews: 89, specs: ['800+ Components', 'Dark/Light Auto', 'React 19 Ready', 'Lifetime Updates'], img: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80' },
    { id: 'dg-2', name: isEn ? 'CyberSpace 3D Blender Asset Kit' : 'حزمة مجسمات الفضاء ثلاثية الأبعاد بليندر', category: '3d-models', price: 49, oldPrice: 79, rating: 4.9, reviews: 64, specs: ['4K PBR Textures', 'Rigged & Animated', 'Cycles & Eevee', 'GLTF Included'], img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80' },
    { id: 'dg-3', name: isEn ? 'SaaS Boilerplate Turbo Stack' : 'قالب سارس البرمجي المتكامل للتطوير السريع', category: 'code', price: 129, oldPrice: 199, rating: 4.8, reviews: 142, specs: ['Next.js 15 & TS', 'Stripe Subscriptions', 'Supabase Auth', 'Tailwind v4'], img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80' },
    { id: 'dg-4', name: isEn ? 'MonoGrotesk Editorial Font Family' : 'عائلة خطوط مونوغروتسك التحريرية الفاخرة', category: 'typography', price: 39, oldPrice: 59, rating: 4.9, reviews: 78, specs: ['18 Font Weights', 'Variable TTF/WOFF2', 'Latin & Arabic Support', 'Commercial License'], img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80' },
  ] : [
    { id: 'gn-1', name: isEn ? 'Minimalist Leather Backpack' : 'حقيبة ظهر كلاسيكية من الجلد الطبيعي الفاخر', category: 'accessories', price: 149, oldPrice: 199, rating: 4.8, reviews: 128, specs: ['Full Grain Leather', 'Laptop 16" Sleeve', 'Water Repellent', 'Handcrafted'], img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80' },
    { id: 'gn-2', name: isEn ? 'Artisan Ceramic Pour-Over Set' : 'مجموعة تحضير القهوة الخزفية المصنوعة يدوياً', category: 'home', price: 64, oldPrice: 85, rating: 4.9, reviews: 96, specs: ['Matte Ceramic', 'Includes 100 Filters', 'Heat Retention', 'Dishwasher Safe'], img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80' },
    { id: 'gn-3', name: isEn ? 'Organic Linen Oversized Shirt' : 'قميص كتان عضوي مريح ومناسب لكافة الفصول', category: 'apparel', price: 79, oldPrice: 110, rating: 4.7, reviews: 204, specs: ['100% French Linen', 'Pre-Washed Softness', 'Breathable Weave', 'Sustainable Dye'], img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80' },
    { id: 'gn-4', name: isEn ? 'Nordic Oak Ambient Desk Lamp' : 'مصباح مكتب دافئ من خشب البلوط والزجاج', category: 'home', price: 119, oldPrice: 160, rating: 4.9, reviews: 155, specs: ['Solid White Oak', 'Touch Dimming', 'Warm 2700K Glow', 'USB-C Powered'], img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80' },
  ];

  return (
    <div 
      className={`min-h-full font-sans transition-colors duration-200 ${
        isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
      dir={isEn ? 'ltr' : 'rtl'}
    >
      {/* Announcement Marquee Bar */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-slate-950 text-xs font-black py-2 px-4 text-center">
        <span>
          {isEn ? '⚡ FLASH SALE: Get 25% OFF with code VAULT25 — Worldwide Express Shipping on all orders!' : '⚡ تخفيضات كبرى: احصل على خصم 25% مع كود VAULT25 — شحن سريع وتنزيل فوري لكافة المنتجات!'}
        </span>
      </div>

      {/* Main E-Commerce Navigation */}
      <header className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors ${
        isDark ? 'bg-slate-950/90 border-slate-800' : 'bg-white/90 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 font-black shadow-md shadow-amber-950/40">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <span className="font-black text-base tracking-tight block">
                {isEn ? (template.nameEn || 'CartNova Store') : template.name}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-amber-500 font-bold block">
                {isDigital ? 'Digital Asset Marketplace' : isElectronics ? 'Electronics & Hardware Megastore' : 'Modern Lifestyle & Commerce'}
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center max-w-sm w-full mx-6">
            <div className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs ${
              isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}>
              <Search className="w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder={isEn ? "Search catalog, specs, brands..." : "ابحث في الكتالوج، المواصفات، العلامات..."}
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={onToggleDark} className="p-2 rounded-xl border border-slate-800 text-xs">
              {isDark ? '☀️' : '🌙'}
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white transition"
            >
              <ShoppingCart className="w-4 h-4" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
            <button
              onClick={onBuyNow}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shadow-lg shadow-amber-950/40 transition active:scale-95"
            >
              {isEn ? 'Buy Theme' : 'شراء القالب'}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Promo Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="relative rounded-3xl overflow-hidden aspect-[21/9] min-h-[280px] bg-slate-900 border border-slate-800 flex items-center">
          <img 
            src={products[0].img} 
            alt="Hero Spotlight" 
            className="absolute inset-0 w-full h-full object-cover opacity-35" 
            referrerPolicy="no-referrer" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
          
          <div className="relative z-10 p-8 sm:p-12 max-w-xl">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500 text-slate-950 inline-block mb-3">
              {isEn ? 'FEATURED SPOTLIGHT' : 'العرض الاستثنائي'}
            </span>
            <h1 className="text-2xl sm:text-4xl font-black mb-3">
              {products[0].name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
              {isEn ? 'Engineered with precision materials and unmatched fidelity. Claim launch pricing before inventory concludes.' : 'صممت بأعلى معايير الجودة لتوفير تجربة استثنائية. استفد من سعر الإطلاق قبل نفاد الكمية.'}
            </p>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => handleAddToCart(products[0])}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition active:scale-95"
              >
                {isEn ? `Add to Bag • $${products[0].price}` : `إضافة للسلة • $${products[0].price}`}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Catalog Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-xl sm:text-2xl font-black">
              {isEn ? 'Featured Catalog & Releases' : 'تشكيلة المنتجات المميزة'}
            </h2>
            <p className="text-xs text-slate-400">{isEn ? 'All items verified and backed by money-back guarantee' : 'جميع المنتجات مضمونة مع شحن سريع وضمان استرجاع'}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((prod) => (
            <div 
              key={prod.id}
              className={`rounded-3xl border overflow-hidden flex flex-col justify-between transition-all ${
                isDark ? 'bg-slate-900/40 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              <div>
                <div className="relative aspect-square overflow-hidden bg-slate-950">
                  <img src={prod.img} alt={prod.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" referrerPolicy="no-referrer" />
                  <span className="absolute top-3 left-3 px-2 py-1 rounded-md text-[10px] font-black bg-rose-500 text-white">
                    SALE
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-1 text-amber-400 text-xs">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-bold text-slate-300">{prod.rating}</span>
                    <span className="text-[10px] text-slate-500">({prod.reviews})</span>
                  </div>

                  <h3 className="font-bold text-sm leading-snug line-clamp-2">{prod.name}</h3>

                  <div className="flex flex-wrap gap-1">
                    {prod.specs.slice(0, 2).map((s, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-800/40 mt-3 flex items-center justify-between">
                <div>
                  <span className="text-base font-black font-mono text-amber-400">${prod.price}</span>
                  <span className="text-xs text-slate-500 line-through ml-2 font-mono">${prod.oldPrice}</span>
                </div>
                <button
                  onClick={() => handleAddToCart(prod)}
                  className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 transition active:scale-95"
                  title="Add to Cart"
                >
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cart Drawer Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-end" dir={isEn ? 'ltr' : 'rtl'}>
          <div className={`w-full max-w-md h-full flex flex-col justify-between p-6 ${isDark ? 'bg-slate-900 border-l border-slate-800' : 'bg-white border-l border-slate-200'}`}>
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-black">{isEn ? 'Your Shopping Bag' : 'سلة التسوق'}</h3>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  {isEn ? 'Your cart is currently empty.' : 'سلة المشتريات فارغة حالياً.'}
                </div>
              ) : (
                <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
                  {cartItems.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
                      <div className="flex items-center gap-3">
                        <img src={item.img} alt={item.name} className="w-12 h-12 object-cover rounded-xl" />
                        <div>
                          <h4 className="text-xs font-bold line-clamp-1">{item.name}</h4>
                          <span className="text-xs font-mono font-bold text-amber-400">${item.price}</span>
                        </div>
                      </div>
                      <button onClick={() => handleRemoveFromCart(idx)} className="text-xs text-rose-400 hover:text-rose-300 font-bold">
                        {isEn ? 'Remove' : 'حذف'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-slate-800 space-y-4">
              <div className="flex items-center justify-between text-sm font-bold">
                <span>{isEn ? 'Subtotal' : 'المجموع الفرعي'}:</span>
                <span className="font-mono text-amber-400 text-lg">${cartTotal}</span>
              </div>
              <button
                onClick={onBuyNow}
                className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shadow-lg shadow-amber-950/40 transition active:scale-95"
              >
                {isEn ? 'Proceed to Secure Checkout' : 'إتمام الطلب والدفع الآمن'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className={`py-12 border-t text-xs ${isDark ? 'bg-slate-950 border-slate-900 text-slate-500' : 'bg-white border-slate-200 text-slate-600'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4 text-amber-400" />
            <span className="font-bold text-slate-300">CartNova E-Commerce & Retail Marketplace Theme</span>
          </div>
          <p>© 2026 TechVault Pro Marketplace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
