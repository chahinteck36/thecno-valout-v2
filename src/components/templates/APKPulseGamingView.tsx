import React, { useState } from 'react';
import { 
  Gamepad2, Download, Zap, Flame, Star, ShieldCheck, 
  Cpu, HardDrive, Smartphone, CheckCircle2, ChevronRight, 
  ExternalLink, Sparkles, AlertCircle, ShoppingCart, Layers
} from 'lucide-react';
import { ThemeConfig, ThemeLanguage } from '../../types';

interface Props {
  config: ThemeConfig;
  isDark?: boolean;
  onToggleDark?: () => void;
  onBuyNow?: () => void;
  language?: ThemeLanguage;
}

export const APKPulseGamingView: React.FC<Props> = ({
  config,
  isDark = true,
  onToggleDark,
  onBuyNow,
  language = 'ar',
}) => {
  const isEn = language === 'en';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeScreenshot, setActiveScreenshot] = useState<number>(0);

  const games = [
    {
      id: 'game-1',
      title: 'Call of Duty: Warzone Mobile (Mod No Recoil & 120 FPS)',
      titleEn: 'Call of Duty: Warzone Mobile (Mod 120 FPS & Ultra Graphics)',
      category: 'أكشن وباتل رويال',
      categoryEn: 'Action & Battle Royale',
      version: 'v3.10.4',
      size: '1.4 GB',
      rating: 4.9,
      downloads: '580K',
      androidReq: 'Android 10+',
      modFeature: 'فتح معدل 120 إطار + جرافيكس ألترا بدون حرارة',
      modFeatureEn: '120 FPS Unlocked + Ultra Shaders + Anti-Ban v5',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
      apkSize: '95 MB',
      obbSize: '1.3 GB',
    },
    {
      id: 'game-2',
      title: 'Genshin Impact: High-Res Texture Mod Pack (60 FPS Fix)',
      titleEn: 'Genshin Impact: High-Res Texture Mod Pack (60 FPS Fix)',
      category: 'عالم مفتوح وRPG',
      categoryEn: 'Open World RPG',
      version: 'v5.4.0',
      size: '2.8 GB',
      rating: 4.8,
      downloads: '920K',
      androidReq: 'Android 11+',
      modFeature: 'تخفيض استهلاك الرام وسلاسة تامة في القتال',
      modFeatureEn: 'RAM Cache Optimizer + Fast Teleport Mod',
      image: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=800&auto=format&fit=crop&q=80',
      apkSize: '120 MB',
      obbSize: '2.7 GB',
    },
    {
      id: 'game-3',
      title: 'CarX Street Mobile (Mod Unlimited Cash & All Supercars)',
      titleEn: 'CarX Street Mobile (Mod Unlimited Cash & Unlocked Hypercars)',
      category: 'سباقات وسيارات',
      categoryEn: 'Racing & Tuning',
      version: 'v1.6.2',
      size: '1.1 GB',
      rating: 4.9,
      downloads: '340K',
      androidReq: 'Android 10+',
      modFeature: 'أموال ونقاط ترقية لا نهائية لجميع السيارات',
      modFeatureEn: 'Unlimited Money + Free Garage Delivery',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80',
      apkSize: '85 MB',
      obbSize: '1.0 GB',
    },
    {
      id: 'game-4',
      title: 'Minecraft Bedrock 2026 (All Shaders & Texture Packs Free)',
      titleEn: 'Minecraft Bedrock 2026 (Unlocked RTX Ray Tracing Shaders)',
      category: 'بناء ومغامرات',
      categoryEn: 'Sandbox & Adventure',
      version: 'v1.22.10',
      size: '450 MB',
      rating: 5.0,
      downloads: '1.5M',
      androidReq: 'Android 9+',
      modFeature: 'شيدرز واقعية مفعلة لجميع الهواتف المتوسطة',
      modFeatureEn: 'Ultra RTX Realistic Lighting Packs Unlocked',
      image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80',
      apkSize: '450 MB',
      obbSize: 'None',
    },
  ];

  const screenshots = [
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=1200&auto=format&fit=crop&q=80',
  ];

  return (
    <div 
      className="min-h-screen bg-[#05090e] text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950"
      dir={isEn ? 'ltr' : 'rtl'}
    >
      {/* Cyber Emerald Status Bar */}
      <div className="bg-[#020508] border-b border-emerald-950/60 py-2 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400 font-black">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{isEn ? 'SERVER STATUS: ONLINE' : 'حالة الخوادم: نشطة وفائقة السرعة'}</span>
            </span>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="hidden sm:inline text-slate-400">
              {isEn ? 'Daily Mod Scans: 100% Virus-Free' : 'فحص أمني يومي معتمد ضد الحظر'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px]">
            <span>{isEn ? '48,120 Gamers Online' : '48,120 لاعب متصل الآن'}</span>
            <span>⚡ CDN 10 Gbps</span>
          </div>
        </div>
      </div>

      {/* Gaming Header */}
      <header className="border-b border-emerald-900/40 bg-[#080e14]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/20 font-black">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
                <span>APKPulse</span>
                <span className="text-emerald-400">Gaming</span>
              </h1>
              <p className="text-[10px] text-emerald-300/70 font-mono uppercase tracking-wider">
                {isEn ? 'Next-Gen Mobile Gaming Portal & Mod APKs' : 'بوابة ألعاب الهواتف والألعاب المهكرة وملفات OBB'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {onBuyNow && (
              <button
                onClick={onBuyNow}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-xs font-black shadow-lg shadow-emerald-500/30 hover:brightness-110 transition active:scale-95"
              >
                <ShoppingCart className="w-4 h-4 stroke-[2.5]" />
                <span>{isEn ? 'Buy Theme ($9.99)' : 'شراء ترخيص القالب (9.99$)'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Gaming Genre Filter Tabs */}
        <div className="max-w-7xl mx-auto px-4 py-2.5 border-t border-emerald-950/80 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs font-bold">
          {['all', 'action', 'rpg', 'racing', 'emulators'].map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedCategory(genre)}
              className={`px-3.5 py-1.5 rounded-xl transition whitespace-nowrap ${
                selectedCategory === genre
                  ? 'bg-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-emerald-300 hover:bg-emerald-950/40'
              }`}
            >
              {genre === 'all' && (isEn ? 'All Games' : 'جميع الألعاب')}
              {genre === 'action' && (isEn ? 'Action & Shooters' : 'أكشن وإطلاق نار')}
              {genre === 'rpg' && (isEn ? 'Open World RPG' : 'عالم مفتوح وRPG')}
              {genre === 'racing' && (isEn ? 'Racing & Cars' : 'سباقات وسيارات')}
              {genre === 'emulators' && (isEn ? 'PS2 & Switch Emulators' : 'محاكيات PS2 وسويتش')}
            </button>
          ))}
        </div>
      </header>

      {/* Main Gaming Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:py-8 space-y-10">
        
        {/* Neon Game Hero Spotlight */}
        <section className="relative rounded-3xl overflow-hidden border border-emerald-500/40 bg-gradient-to-r from-[#040d12] via-[#07161b] to-[#040d12] p-6 sm:p-10 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black">
                <Sparkles className="w-3.5 h-3.5 fill-current animate-pulse" />
                <span>{isEn ? 'TRENDING GAME OF THE MONTH' : 'لعبة الشهر الأكثر تحميلاً'}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight tracking-tight">
                {isEn ? 'Cyberpunk: Mobile Protocol (Mod Menu 120 FPS + All DLCs Unlocked)' : 'سايبر بانك موبايل: الإصدار الذهبي الشامل (مود 120 إطار + كافة الإضافات)'}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                {isEn
                  ? 'Dive into the neon-lit open city with unlimited credits, unlocked cyberware weapons, zero ads, and ultra ray-tracing enabled for Snapdragon 8 & Dimensity 9000+.'
                  : 'استمتع بعالم السايبر المفتوح مع ترقيات مجانية لكافة الأسلحة والقدرات السيبرانية، مع تفعيل 120 إطاراً في الثانية وسلاسة استثنائية.'}
              </p>

              {/* Mod Highlights Pills */}
              <div className="flex flex-wrap gap-2 pt-1 text-xs">
                <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-lg border border-emerald-500/30 font-bold">
                  ✓ {isEn ? 'Unlimited Cash / Credits' : 'أموال ونقاط شراء غير محدودة'}
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-lg border border-emerald-500/30 font-bold">
                  ✓ {isEn ? '120 FPS Max Unlocked' : 'معدل 120 إطار مفتوح'}
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-lg border border-emerald-500/30 font-bold">
                  ✓ {isEn ? 'Anti-Ban Bypass v5' : 'حماية تامة من الحظر'}
                </span>
              </div>

              {/* Dual Download CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
                <button className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-emerald-500/30 hover:brightness-110 transition active:scale-95">
                  <Download className="w-4 h-4 stroke-[2.5]" />
                  <span>{isEn ? 'Download APK Mod [98 MB]' : 'تحميل ملف APK المود [98 MB]'}</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-xs sm:text-sm border border-emerald-500/30 transition active:scale-95">
                  <HardDrive className="w-4 h-4 text-emerald-400" />
                  <span>{isEn ? 'Download OBB Data [2.1 GB]' : 'تحميل ملفات الداتا OBB [2.1 GB]'}</span>
                </button>
              </div>
            </div>

            {/* Visual Screenshot / Cover */}
            <div className="lg:col-span-5 relative aspect-[16/10] rounded-2xl overflow-hidden border border-emerald-500/40 shadow-2xl group">
              <img 
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80" 
                alt="Cyberpunk Mobile Preview" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono">
                <span className="bg-slate-950/80 backdrop-blur px-2.5 py-1 rounded text-emerald-400 border border-emerald-500/30">
                  GPU: Adreno 740 / Mali-G715
                </span>
                <span className="bg-emerald-500 text-slate-950 px-2.5 py-1 rounded font-black">
                  120 FPS STABLE
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Games Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <Gamepad2 className="w-5 h-5 text-emerald-400" />
              <span>{isEn ? 'Top Trending Modded Games & Ports' : 'أقوى ألعاب الهواتف المهكرة والمعدلة'}</span>
            </h3>
            <span className="text-xs text-emerald-400 font-bold hover:underline cursor-pointer">
              {isEn ? 'View All (140+) →' : 'عرض كافة الألعاب (140+) ←'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {games.map((g) => (
              <div 
                key={g.id}
                className="group rounded-2xl border border-slate-800 hover:border-emerald-500/50 bg-[#091118] p-4 flex flex-col justify-between shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div>
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-3 bg-slate-950">
                    <img 
                      src={g.image} 
                      alt={isEn ? g.titleEn : g.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-slate-950/90 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold text-amber-400 border border-amber-400/30">
                      <Star className="w-3 h-3 fill-current" />
                      <span>{g.rating}</span>
                    </div>
                    <span className="absolute bottom-2 left-2 bg-emerald-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded">
                      {g.version}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-white group-hover:text-emerald-300 transition line-clamp-2 leading-snug mb-2">
                    {isEn ? g.titleEn : g.title}
                  </h4>

                  {/* Mod Feature Badge */}
                  <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-2 mb-3">
                    <p className="text-[11px] text-emerald-300 line-clamp-1 font-semibold">
                      ⚡ {isEn ? g.modFeatureEn : g.modFeature}
                    </p>
                  </div>

                  {/* Specs Pill */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-4">
                    <span>{g.size}</span>
                    <span>{g.androidReq}</span>
                    <span className="text-emerald-400">{g.downloads} DLs</span>
                  </div>
                </div>

                {/* Download Button */}
                <button className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-emerald-500 text-slate-200 hover:text-slate-950 text-xs font-black flex items-center justify-center gap-1.5 transition duration-200 shadow-md">
                  <Download className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Fast Download APK' : 'تحميل سريع ومباشر'}</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Hardware & System Requirements Comparison Matrix */}
        <section className="rounded-3xl border border-slate-800 bg-[#070e14] p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-emerald-400" />
                <span>{isEn ? 'Hardware Compatibility & System Spec Checker' : 'جدول المواصفات التقنية لتشغيل الألعاب الثقيلة'}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {isEn ? 'Check your phone specs before downloading to guarantee 60+ FPS stability.' : 'تأكد من مطابقة مواصفات هاتفك قبل التحميل لضمان تشغيل الألعاب بسلاسة دون تهنيج.'}
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold self-start">
              {isEn ? 'Auto-Tested on 120 Devices' : 'تم اختباره على 120 هاتفاً'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Minimum Specs */}
            <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5 space-y-3">
              <span className="text-xs font-black text-amber-400 uppercase tracking-wider block">
                {isEn ? 'Minimum Specs (30-45 FPS)' : 'المواصفات الدنيا (30-45 إطار)'}
              </span>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>{isEn ? 'CPU: Snapdragon 778G / Helio G99 or higher' : 'المعالج: سنابدراجون 778G أو هيليو G99'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>{isEn ? 'RAM: 6 GB RAM' : 'الرام: 6 جيجابايت'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>{isEn ? 'Free Storage: 8 GB internal UFS' : 'المساحة: 8 جيجابايت تخزين داخلي'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>{isEn ? 'Android OS: Android 10.0' : 'النظام: أندرويد 10 وما فوق'}</span>
                </li>
              </ul>
            </div>

            {/* Recommended Specs */}
            <div className="rounded-2xl bg-emerald-950/20 border border-emerald-500/30 p-5 space-y-3">
              <span className="text-xs font-black text-emerald-400 uppercase tracking-wider block">
                {isEn ? 'Recommended Specs (60-120 FPS Ultra)' : 'المواصفات الموصى بها (60-120 إطار ألترا)'}
              </span>
              <ul className="space-y-2 text-xs text-slate-200">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{isEn ? 'CPU: Snapdragon 8 Gen 2 / 8 Gen 3 / Dimensity 9300' : 'المعالج: سنابدراجون 8 الجيل الثاني أو الثالث'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{isEn ? 'RAM: 12 GB LPDDR5X RAM' : 'الرام: 12 جيجابايت سريعة'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{isEn ? 'Storage: 16 GB UFS 4.0' : 'المساحة: 16 جيجابايت UFS 4.0'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{isEn ? 'Controller: PS5 DualSense / Xbox Wireless Gamepad' : 'يد التحكم: دعم كامل لذراع بلايستيشن وإكس بوكس'}</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

      </main>

      {/* Gaming Dedicated Footer */}
      <footer className="border-t border-emerald-950/80 bg-[#020508] py-8 px-4 text-slate-400 text-xs mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-emerald-400" />
            <span className="font-black text-white">APKPulse Gaming Theme</span>
            <span>•</span>
            <span>{isEn ? 'Unified License $9.99 USD' : 'ترخيص موحد 9.99$ فقط'}</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span>{isEn ? 'Designed for Mobile Gamers' : 'مصمم خصيصاً لمجتمعات اللاعبين ومواقع ألعاب الهواتف'}</span>
            <span>•</span>
            <span>Blogger XML + WordPress Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
