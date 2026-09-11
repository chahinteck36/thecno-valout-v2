import React, { useState } from 'react';
import { 
  ShieldCheck, ShieldAlert, Lock, Key, Download, CheckCircle2, 
  AlertTriangle, RefreshCw, Star, ExternalLink, ShoppingCart, 
  Terminal, Server, Eye, FileCheck
} from 'lucide-react';
import { ThemeConfig, ThemeLanguage } from '../../types';

interface Props {
  config: ThemeConfig;
  isDark?: boolean;
  onToggleDark?: () => void;
  onBuyNow?: () => void;
  language?: ThemeLanguage;
}

export const CyberGuardSecurityView: React.FC<Props> = ({
  config,
  isDark = true,
  onToggleDark,
  onBuyNow,
  language = 'ar',
}) => {
  const isEn = language === 'en';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const securityProducts = [
    {
      id: 'sec-1',
      name: 'CyberGuard Total Security 2026',
      nameEn: 'CyberGuard Total Security 2026',
      category: 'antivirus',
      tagline: 'منظومة الحماية الشاملة لمكافحة الفيروسات، برامج الفدية، ومحاولات التصيد المصرفي في الوقت الفعلي.',
      taglineEn: 'Real-time multi-layered defense against zero-day malware, ransomware encryption, and phishing attacks.',
      protectionScore: '99.99%',
      testCert: 'AV-TEST Certified Top Product',
      version: 'v26.4.1',
      sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      size: '185 MB',
      rating: 4.9,
      downloads: '1.2M',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'sec-2',
      name: 'IronClad WireGuard VPN Pro',
      nameEn: 'IronClad WireGuard VPN Pro',
      category: 'vpn',
      tagline: 'شبكة VPN عسكرية مشفرة ببروتوكول WireGuard مع خوادم 10Gbps بدون تسجيل للسجلات (No-Logs).',
      taglineEn: 'Military-grade ChaCha20 encryption VPN with 10Gbps RAM-only servers and verified No-Logs audit.',
      protectionScore: 'Zero-Logs',
      testCert: 'PwC Audited No-Logs',
      version: 'v5.8.0',
      sha256: '9f83c605ae7a0c04f4e462c71c02545873cd9fa596b6cee3b3ec6e504c56eb20',
      size: '42 MB',
      rating: 5.0,
      downloads: '850K',
      image: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'sec-3',
      name: 'Anti-Ransomware Shield Pro',
      nameEn: 'Anti-Ransomware Shield Pro',
      category: 'ransomware',
      tagline: 'حارس النسخ الاحتياطي اللحظي الذي يمنع تشفير ملفاتك ويعيدها تلقائياً عند استشعار أي سلوك مريب.',
      taglineEn: 'Instant kernel-level file rollback engine that stops ransomware encryption dead in its tracks.',
      protectionScore: '100% Rollback',
      testCert: 'MRG Effitas Certified',
      version: 'v3.2.9',
      sha256: '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b',
      size: '64 MB',
      rating: 4.8,
      downloads: '410K',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'sec-4',
      name: 'PrivacyVault Password Manager',
      nameEn: 'PrivacyVault Password Manager',
      category: 'privacy',
      tagline: 'خزنة كلمات المرور المشفرة بتقنية Zero-Knowledge مع فحص مستمر لتسريبات الدارك ويب.',
      taglineEn: 'Zero-Knowledge 256-bit encrypted credential vault with automated dark web leak scanning.',
      protectionScore: 'AES-256 GCM',
      testCert: 'SOC2 Type II Compliant',
      version: 'v4.1.2',
      sha256: 'd4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35',
      size: '35 MB',
      rating: 4.9,
      downloads: '620K',
      image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <div 
      className="min-h-screen bg-[#070508] text-slate-100 font-sans selection:bg-rose-600 selection:text-white"
      dir={isEn ? 'ltr' : 'rtl'}
    >
      {/* Cybersecurity DEFCON Threat Gauge Status Bar */}
      <div className="bg-[#040205] border-b border-rose-950/60 py-2 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-rose-400 font-black">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <span>{isEn ? 'GLOBAL THREAT LEVEL: ELEVATED (DEFCON 3)' : 'مستوى التهديد السيبراني العالمي: مرتفع (DEFCON 3)'}</span>
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="hidden sm:inline text-slate-400 font-mono text-[11px]">
              {isEn ? 'Zero-Days Monitored: 14 Active' : 'الثغرات النشطة المراقبة: 14 ثغرة'}
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px]">
            <span className="text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isEn ? 'SHA-256 Verified' : 'مفحوص وموثق التشفير'}</span>
            </span>
          </div>
        </div>
      </div>

      {/* CyberGuard Crimson Header */}
      <header className="border-b border-rose-950/60 bg-[#0c080e]/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-600 to-red-500 flex items-center justify-center text-white shadow-lg shadow-rose-600/30 font-black">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
                <span>CyberGuard</span>
                <span className="text-rose-500">Pro</span>
              </h1>
              <p className="text-[10px] text-rose-300/70 font-mono uppercase tracking-wider">
                {isEn ? 'Enterprise Antivirus, Endpoint Defense & Privacy Portal' : 'البوابة الأمنية لمكافحة الفيروسات وحماية الخصوصية الرقمية'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {onBuyNow && (
              <button
                onClick={onBuyNow}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-xs font-black shadow-lg shadow-emerald-500/20 hover:brightness-110 transition active:scale-95"
              >
                <ShoppingCart className="w-4 h-4 stroke-[2.5]" />
                <span>{isEn ? 'Buy Theme ($9.99)' : 'شراء ترخيص القالب (9.99$)'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Security Category Tabs */}
        <div className="max-w-7xl mx-auto px-4 py-2 border-t border-rose-950/60 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs font-bold">
          {['all', 'antivirus', 'vpn', 'ransomware', 'privacy'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl transition whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-rose-600 text-white font-black shadow-lg shadow-rose-600/30'
                  : 'text-slate-400 hover:text-rose-300 hover:bg-rose-950/40'
              }`}
            >
              {cat === 'all' && (isEn ? 'All Security Software' : 'كافة برامج الحماية')}
              {cat === 'antivirus' && (isEn ? 'Antivirus & EDR' : 'مكافحة الفيروسات')}
              {cat === 'vpn' && (isEn ? 'Encrypted VPNs' : 'شبكات VPN المشفرة')}
              {cat === 'ransomware' && (isEn ? 'Ransomware Rollback' : 'حماية الفدية')}
              {cat === 'privacy' && (isEn ? 'Password & Privacy' : 'كلمات المرور والخصوصية')}
            </button>
          ))}
        </div>
      </header>

      {/* Main Cybersecurity Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:py-10 space-y-10">
        
        {/* Threat Interception Hero Section */}
        <section className="rounded-3xl border border-rose-900/50 bg-gradient-to-r from-[#12060b] via-[#1a080f] to-[#12060b] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-black">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>{isEn ? 'ZERO-DAY EXPLOIT MITIGATION ENGINE' : 'درع التصدي للثغرات الصفرية 2026'}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight tracking-tight">
                {isEn 
                  ? 'Military-Grade Cybersecurity & Privacy Suite for Windows & Android'
                  : 'منظومة الحماية والأمان السيبراني المتطورة لويندوز وأندرويد'}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                {isEn
                  ? 'Neutralize trojans, keyloggers, and cryptominers before execution with AI behavioral heuristics. Download packages independently audited and cryptographic hash-verified.'
                  : 'تأمين كامل لأجهزتك من برمجيات التجسس وفيروسات الفدية مع فحص سلوكي استباقي وشهادات فحص معتمدة من مختبرات الأمان العالمية.'}
              </p>

              {/* Security Metrics Pills */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="rounded-xl bg-slate-900/80 border border-rose-950 p-3 text-center">
                  <span className="text-xl sm:text-2xl font-black text-rose-500 font-mono">99.99%</span>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase mt-0.5">{isEn ? 'Block Rate' : 'نسبة حجب التهديدات'}</span>
                </div>
                <div className="rounded-xl bg-slate-900/80 border border-rose-950 p-3 text-center">
                  <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">0.02s</span>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase mt-0.5">{isEn ? 'Response Time' : 'سرعة الاستجابة'}</span>
                </div>
                <div className="rounded-xl bg-slate-900/80 border border-rose-950 p-3 text-center">
                  <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono">0%</span>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase mt-0.5">{isEn ? 'False Alarms' : 'إنذارات خاطئة'}</span>
                </div>
              </div>
            </div>

            {/* Live Security Radar Display */}
            <div className="lg:col-span-5 rounded-2xl border border-rose-900/60 bg-slate-950/80 p-5 space-y-3 font-mono text-xs shadow-2xl">
              <div className="flex items-center justify-between border-b border-rose-950/80 pb-2 text-rose-400">
                <span className="flex items-center gap-1.5 font-bold">
                  <Terminal className="w-4 h-4" />
                  <span>CORE INTEGRITY MONITOR</span>
                </span>
                <span className="text-emerald-400 animate-pulse">LIVE</span>
              </div>

              <div className="space-y-1.5 text-slate-400 text-[11px]">
                <p className="text-slate-300">&gt; Scanning kernel hooks... <span className="text-emerald-400 font-bold">PASSED</span></p>
                <p className="text-slate-300">&gt; Memory injection shield... <span className="text-emerald-400 font-bold">ACTIVE</span></p>
                <p className="text-slate-300">&gt; DNS leak &amp; WebRTC audit... <span className="text-emerald-400 font-bold">SECURED</span></p>
                <p className="text-slate-300">&gt; VirusTotal Hash matches... <span className="text-emerald-400 font-bold">100% CLEAN</span></p>
              </div>

              <div className="pt-2 border-t border-rose-950/80">
                <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-500 hover:from-rose-500 hover:to-red-400 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-rose-900/40 transition">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{isEn ? 'Run Instant Deep Security Scan' : 'بدء الفحص الأمني الاستباقي'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Security Products Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-rose-500" />
              <span>{isEn ? 'Verified Security Suites & Antivirus Software' : 'برمجيات الأمان ومكافحة الفيروسات المعتمدة'}</span>
            </h3>
            <span className="text-xs text-rose-400 font-bold">
              {isEn ? 'All Downloads Hash-Signed' : 'جميع الملفات مفحوصة وموقعة رقمياً'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {securityProducts.map((prod) => (
              <div 
                key={prod.id}
                className="rounded-2xl border border-slate-800 hover:border-rose-600/50 bg-[#0d0910] p-5 flex flex-col justify-between shadow-xl transition-all duration-300 space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className="text-[10px] font-black uppercase text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                        {prod.testCert}
                      </span>
                      <h4 className="font-bold text-white text-base mt-1.5">
                        {isEn ? prod.nameEn : prod.name}
                      </h4>
                    </div>

                    <div className="flex flex-col items-end flex-shrink-0">
                      <span className="text-xs font-mono font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                        {prod.protectionScore}
                      </span>
                      <span className="text-[10px] text-slate-500 mt-1">{prod.version}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-3">
                    {isEn ? prod.taglineEn : prod.tagline}
                  </p>

                  {/* Cryptographic SHA-256 Checksum Display */}
                  <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 font-mono text-[10px] text-slate-400 flex items-center justify-between gap-2 overflow-hidden">
                    <span className="text-rose-400 flex-shrink-0 font-bold">SHA-256:</span>
                    <span className="truncate">{prod.sha256}</span>
                    <FileCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  </div>
                </div>

                {/* Specs & Download CTA */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-400 font-mono">
                    <span>{prod.size}</span>
                    <span className="mx-1.5">•</span>
                    <span>{prod.downloads} DLs</span>
                  </div>

                  <button className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-md shadow-rose-900/30">
                    <Download className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Verified Download' : 'تحميل آمن ومعتمد'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Security Comparison Table: Free vs Pro Suite vs Enterprise Shield */}
        <section className="rounded-3xl border border-slate-800 bg-[#09060b] p-6 sm:p-8 space-y-5">
          <div>
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-rose-500" />
              <span>{isEn ? 'Security Tier Protection Matrix' : 'جدول مقارنة مستويات الحماية السيبرانية'}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {isEn ? 'Compare protection modules across editions to select your ideal shield.' : 'قارن بين مزايا الإصدارات لاختيار الحزمة الأنسب لاحتياجات أمان أجهزتك.'}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left rtl:text-right border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase">
                  <th className="py-3 px-4">{isEn ? 'Security Module' : 'ميزة الحماية'}</th>
                  <th className="py-3 px-4 text-center">{isEn ? 'Free Edition' : 'الإصدار المجاني'}</th>
                  <th className="py-3 px-4 text-center text-rose-400">{isEn ? 'CyberGuard Pro Suite' : 'حزمة Pro الشاملة'}</th>
                  <th className="py-3 px-4 text-center text-amber-400">{isEn ? 'Ultimate Enterprise' : 'حزمة الشركات'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 font-medium">
                <tr>
                  <td className="py-3 px-4 font-bold text-white">{isEn ? 'Real-Time Heuristic Antivirus Engine' : 'محرك فحص الفيروسات في الوقت الفعلي'}</td>
                  <td className="py-3 px-4 text-center text-emerald-400 font-bold">✓</td>
                  <td className="py-3 px-4 text-center text-emerald-400 font-bold">✓</td>
                  <td className="py-3 px-4 text-center text-emerald-400 font-bold">✓</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">{isEn ? 'Anti-Ransomware File Rollback' : 'استعادة الملفات المشفرة تلقائياً'}</td>
                  <td className="py-3 px-4 text-center text-slate-600">✕</td>
                  <td className="py-3 px-4 text-center text-emerald-400 font-bold">✓</td>
                  <td className="py-3 px-4 text-center text-emerald-400 font-bold">✓</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">{isEn ? 'Unlimited WireGuard Encrypted VPN' : 'شبكة VPN غير محدودة ببروتوكول WireGuard'}</td>
                  <td className="py-3 px-4 text-center text-slate-600">✕</td>
                  <td className="py-3 px-4 text-center text-emerald-400 font-bold">✓</td>
                  <td className="py-3 px-4 text-center text-emerald-400 font-bold">✓</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">{isEn ? 'Dark Web Identity & Password Breach Monitor' : 'مراقبة تسريبات الدارك ويب وحسابات البريد'}</td>
                  <td className="py-3 px-4 text-center text-slate-600">✕</td>
                  <td className="py-3 px-4 text-center text-emerald-400 font-bold">✓</td>
                  <td className="py-3 px-4 text-center text-emerald-400 font-bold">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </main>

      {/* CyberGuard Dedicated Footer */}
      <footer className="border-t border-rose-950/80 bg-[#030104] py-8 px-4 text-slate-400 text-xs mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-rose-500" />
            <span className="font-black text-white">CyberGuard Pro Software Theme</span>
            <span>•</span>
            <span className="text-emerald-400 font-bold">{isEn ? 'Unified Price: $9.99 USD' : 'سعر موحد: 9.99$ فقط'}</span>
          </div>

          <p className="text-slate-500 text-[11px]">
            {isEn ? 'Blogger XML & WordPress Dual Platform Theme. Zero Malware Guarantee.' : 'متوافق مع بلوجر وووردبريس. كود نظيف وتصميم أمني عالي الاحترافية.'}
          </p>
        </div>
      </footer>
    </div>
  );
};
