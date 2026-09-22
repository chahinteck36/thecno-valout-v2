import React, { useState } from 'react';
import { 
  Flame, TrendingUp, Clock, Eye, MessageSquare, Bookmark, 
  Share2, ArrowRight, ArrowLeft, Star, ThumbsUp, Mail, 
  Newspaper, CheckCircle2, ChevronRight, Zap, Copy, Check, 
  Code2, ExternalLink, Compass, Shield
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

export const MagazineTemplate: React.FC<TemplateDesignProps> = ({
  template,
  config,
  isDark = true,
  onToggleDark,
  onBuyNow,
  language = 'ar',
  variant = 'newswire',
}) => {
  const isEn = language === 'en';
  const tid = template.id.toLowerCase();

  const isDevByte = variant === 'devbyte' || tid.includes('devbyte') || tid.includes('blog');
  const isMarketWatch = variant === 'marketwatch' || tid.includes('marketwatch');
  const isDesignPulse = variant === 'designpulse' || tid.includes('designpulse');
  const isNewsWire = !isDevByte && !isMarketWatch && !isDesignPulse;

  const [copiedCode, setCopiedCode] = useState(false);
  const [emailSubscribed, setEmailSubscribed] = useState(false);

  const sampleSnippet = `// Distributed consensus leader election in Rust
pub async fn elect_leader(peers: &[NodeAddr]) -> Result<NodeId, ConsensusError> {
    let term = CURRENT_TERM.fetch_add(1, Ordering::SeqCst);
    let mut votes = 1; // Vote for self
    
    for peer in peers {
        if peer.request_vote(term).await.is_ok() {
            votes += 1;
            if votes > peers.len() / 2 {
                return Ok(CURRENT_NODE_ID);
            }
        }
    }
    Err(ConsensusError::QuorumUnreachable)
}`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(sampleSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // -------------------------------------------------------------
  // VARIANT 1: DEVBYTE DEVELOPER BLOG
  // -------------------------------------------------------------
  if (isDevByte) {
    const articles = isEn ? [
      { title: 'Designing High-Performance Event-Driven Pipelines with Rust and Tokio', read: '8 min read', cat: 'Systems Architecture', date: 'Sept 18, 2026' },
      { title: 'React 19 Server Actions in Production: Mitigating Latency and Hydration Mismatches', read: '6 min read', cat: 'Frontend', date: 'Sept 15, 2026' },
      { title: 'Zero-Allocation Protocol Buffers: Lessons from Scaling to 10M RPS', read: '12 min read', cat: 'Networking', date: 'Sept 10, 2026' },
    ] : [
      { title: 'هندسة خطوط معالجة الأحداث فائقة السرعة باستخدام Rust و Tokio', read: '8 دقائق قراءة', cat: 'هندسة النظم', date: '18 سبتمبر 2026' },
      { title: 'دوال الخادم في React 19 في بيئات الإنتاج: تقليل التأخير وحل مشاكل الترطيب', read: '6 دقائق قراءة', cat: 'تطوير الواجهات', date: '15 سبتمبر 2026' },
      { title: 'بروتوكولات الذاكرة الصفرية: دروس وتجارب معالجة 10 مليون استدعاء في الثانية', read: '12 دقيقة قراءة', cat: 'برمجيات الشبكات', date: '10 سبتمبر 2026' },
    ];

    return (
      <div className={`min-h-full font-mono transition-colors duration-200 ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-900 text-slate-100'}`} dir={isEn ? 'ltr' : 'rtl'}>
        <header className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2 font-bold text-sm">
            <Code2 className="w-5 h-5 text-cyan-400" />
            <span className="font-sans font-black">{isEn ? (template.nameEn || 'DevByte Engineering') : template.name}</span>
          </div>
          <div className="flex items-center gap-3 font-sans text-xs">
            <button onClick={onToggleDark}>{isDark ? '☀️' : '🌙'}</button>
            <button onClick={onBuyNow} className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl">
              {isEn ? 'Buy Theme' : 'شراء القالب'}
            </button>
          </div>
        </header>

        {/* Featured Code Article */}
        <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 font-sans">
          <div className="space-y-4 mb-8">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              DEEP DIVE • 14 MIN READ
            </span>
            <h1 className="text-2xl sm:text-4xl font-black">
              {isEn ? 'Distributed Consensus Internals: Building a Raft Engine from Scratch in Rust' : 'أسرار بروتوكولات الإجماع الموزعة: بناء محرك Raft من الصفر بلغة Rust'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-3xl">
              {isEn ? 'In this deep dive, we walk through log compaction, heartbeat RPCs, and handling split-brain network partitions in distributed clusters.' : 'في هذا المقال العميق، نستكشف تفاصيل ضغط السجلات، ورسائل نبضات القلب، ومعالجة انشطار الشبكة في المصفوفات الموزعة.'}
            </p>
          </div>

          {/* Interactive Code Snippet Box */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 font-mono text-xs overflow-hidden mb-12">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-slate-400 text-[11px]">
              <span>src/consensus/raft_election.rs</span>
              <button onClick={handleCopy} className="flex items-center gap-1 hover:text-white transition">
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? (isEn ? 'Copied!' : 'تم النسخ!') : (isEn ? 'Copy Snippet' : 'نسخ الكود')}</span>
              </button>
            </div>
            <pre className="text-slate-300 overflow-x-auto leading-relaxed" dir="ltr">
              <code>{sampleSnippet}</code>
            </pre>
          </div>

          {/* More Engineering Articles */}
          <div className="space-y-4">
            <h2 className="text-base font-black border-b border-slate-800 pb-3">{isEn ? 'Recent Systems Publications' : 'أحدث المقالات الهندسية'}</h2>
            {articles.map((art, idx) => (
              <div key={idx} className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-slate-700 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] font-mono text-cyan-400 font-bold block mb-1">{art.cat} • {art.read}</span>
                  <h3 className="text-sm font-bold text-slate-200">{art.title}</h3>
                </div>
                <span className="text-xs text-slate-500 font-mono whitespace-nowrap">{art.date}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VARIANT 2: NEWSWIRE HIGH-VOLUME EDITORIAL MAGAZINE
  // -------------------------------------------------------------
  const breakingNews = isEn 
    ? 'BREAKING: Global Central Banks finalize cross-border instantaneous digital settlement protocol standards.'
    : 'عاجل: المصارف المركزية العالمية تعتمد المعيار الموحد للمدفوعات الرقمية الفورية العابرة للحدود.';

  const stories = isEn ? [
    { title: 'The Next Compute Wave: Quantum-Resistant Encryption Becomes Mandatory for Cloud Providers', cat: 'CYBERSECURITY', author: 'David Vance', time: '20m ago', img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80' },
    { title: 'Aerospace Vanguard Announces Maiden Commercial Suborbital Transit Flight', cat: 'AEROSPACE', author: 'Elena Rostova', time: '1h ago', img: 'https://images.unsplash.com/photo-1517976487502-5f79c9489a65?w=600&auto=format&fit=crop&q=80' },
    { title: 'Autonomous Micro-Grids: How Edge Solar is Revolutionizing Remote Infrastructure', cat: 'ENERGY', author: 'Arthur Sterling', time: '3h ago', img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&auto=format&fit=crop&q=80' },
  ] : [
    { title: 'الموجة الحوسبية القادمة: التشفير المقاوم للحوسبة الكمومية يصبح إلزامياً لمزودي السحابة', cat: 'الأمن السيبراني', author: 'ديفيد فانس', time: 'منذ 20 دقيقة', img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80' },
    { title: 'شركات الفضاء العالمية تعلن أولى الرحلات التجارية المدارية العابرة للقارات', cat: 'الفضاء والطيران', author: 'إيلينا روستوفا', time: 'منذ ساعة', img: 'https://images.unsplash.com/photo-1517976487502-5f79c9489a65?w=600&auto=format&fit=crop&q=80' },
    { title: 'الشبكات الكهربائية المستقلة: كيف تغير الطاقة الشمسية الذكية مستقبل البنية التحتية', cat: 'الطاقة والبيئة', author: 'آرثر ستيرلينغ', time: 'منذ 3 ساعات', img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&auto=format&fit=crop&q=80' },
  ];

  return (
    <div className={`min-h-full font-serif transition-colors duration-200 ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`} dir={isEn ? 'ltr' : 'rtl'}>
      {/* Breaking News Ticker */}
      <div className="bg-rose-600 text-white text-xs font-sans font-bold py-2 px-4 flex items-center gap-3">
        <span className="px-2 py-0.5 rounded bg-white text-rose-600 text-[10px] font-black uppercase">LIVE FLASH</span>
        <p className="truncate">{breakingNews}</p>
      </div>

      <header className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Newspaper className="w-6 h-6 text-rose-500" />
          <span className="font-serif text-2xl font-black tracking-tight">{isEn ? (template.nameEn || 'NewsWire Daily') : template.name}</span>
        </div>
        <div className="flex items-center gap-3 font-sans text-xs">
          <button onClick={onToggleDark}>{isDark ? '☀️' : '🌙'}</button>
          <button onClick={onBuyNow} className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl transition">
            {isEn ? 'Acquire Theme' : 'شراء القالب'}
          </button>
        </div>
      </header>

      {/* Main Lead Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-slate-800 pb-12">
          <div className="lg:col-span-7 aspect-[16/10] rounded-3xl overflow-hidden bg-slate-900">
            <img src={stories[0].img} alt="Lead Story" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="lg:col-span-5 space-y-4">
            <span className="font-sans text-xs font-bold text-rose-500 tracking-wider uppercase">{stories[0].cat}</span>
            <h1 className="text-2xl sm:text-4xl font-normal leading-tight">{stories[0].title}</h1>
            <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed">
              {isEn ? 'Global intelligence agencies and enterprise security consortiums publish joint architectural blueprint requiring post-quantum lattice cryptography by 2027.' : 'وكالات الأمن السيبراني العالمية تنشر الإطار المرجعي الإلزامي لاعتماد التشفير المقاوم للكم بحلول 2027 لحماية البنى التحتية الحيوية.'}
            </p>
            <div className="font-sans text-xs text-slate-500 flex items-center gap-4 pt-2">
              <span>By {stories[0].author}</span>
              <span>•</span>
              <span>{stories[0].time}</span>
            </div>
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
          {stories.map((st, i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-slate-900">
                <img src={st.img} alt={st.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <span className="font-sans text-[11px] font-bold text-rose-500 uppercase">{st.cat}</span>
              <h3 className="text-base font-bold leading-snug">{st.title}</h3>
              <p className="font-sans text-xs text-slate-400">{st.time} • By {st.author}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
