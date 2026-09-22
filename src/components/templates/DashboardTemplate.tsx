import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, BarChart3, DollarSign, LifeBuoy, 
  Settings, ArrowUpRight, ArrowDownRight, Bell, Search, 
  Filter, MoreVertical, Plus, CheckCircle2, AlertCircle, 
  Clock, TrendingUp, ShieldCheck, Mail, ArrowRight, ArrowLeft
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

export const DashboardTemplate: React.FC<TemplateDesignProps> = ({
  template,
  config,
  isDark = true,
  onToggleDark,
  onBuyNow,
  language = 'ar',
  variant = 'crm',
}) => {
  const isEn = language === 'en';
  const tid = template.id.toLowerCase();

  const isAnalytics = variant === 'analytics' || tid.includes('insight') || tid.includes('metrix') || tid.includes('analytics');
  const isFinance = variant === 'finance' || tid.includes('finboard');
  const isSupport = variant === 'support-desk' || tid.includes('support') || tid.includes('desk');
  const isCRM = !isAnalytics && !isFinance && !isSupport;

  // Selected Tab in Dashboard
  const [activeMenu, setActiveMenu] = useState<string>('overview');

  // -------------------------------------------------------------
  // VARIANT 1: PULSE ADMIN CRM DASHBOARD
  // -------------------------------------------------------------
  if (isCRM) {
    const kpis = isEn ? [
      { title: 'Pipeline Value', value: '$4,840,200', change: '+24.8%', up: true },
      { title: 'Active Deals', value: '142 Deals', change: '+12 this week', up: true },
      { title: 'Win Conversion Rate', value: '68.4%', change: '+3.2%', up: true },
      { title: 'Avg. Sales Cycle', value: '18 Days', change: '-4 days faster', up: true },
    ] : [
      { title: 'إجمالي قيمة الصفقات', value: '4,840,200$', change: '+24.8%', up: true },
      { title: 'الصفقات النشطة', value: '142 صفقة', change: '+12 هذا الأسبوع', up: true },
      { title: 'نسبة إغلاق الصفقات', value: '68.4%', change: '+3.2%', up: true },
      { title: 'متوسط دورة البيع', value: '18 يوماً', change: 'أسرع بـ 4 أيام', up: true },
    ];

    const pipelineStages = isEn ? [
      { stage: 'Qualified Leads', count: 48, value: '$1.2M', color: 'bg-cyan-500' },
      { stage: 'Executive Demo', count: 32, value: '$960k', color: 'bg-indigo-500' },
      { stage: 'Proposal & Security', count: 24, value: '$1.4M', color: 'bg-purple-500' },
      { stage: 'Contract Negotiation', count: 18, value: '$820k', color: 'bg-amber-500' },
      { stage: 'Closed-Won (This Mo.)', count: 20, value: '$460k', color: 'bg-emerald-500' },
    ] : [
      { stage: 'العملاء المؤهلون', count: 48, value: '1.2M$', color: 'bg-cyan-500' },
      { stage: 'العرض التقديمي التنفيذي', count: 32, value: '960k$', color: 'bg-indigo-500' },
      { stage: 'دراسة المقترح والأمان', count: 24, value: '1.4M$', color: 'bg-purple-500' },
      { stage: 'المفاوضات والتعاقد', count: 18, value: '820k$', color: 'bg-amber-500' },
      { stage: 'صفقات ناجحة هذا الشهر', count: 20, value: '460k$', color: 'bg-emerald-500' },
    ];

    const deals = [
      { company: 'Stripe Global Enterprise', contact: 'Sarah Jenkins', amount: '$120,000', stage: 'Negotiation', probability: '90%' },
      { company: 'Vanguard Asset Holdings', contact: 'Marcus Vance', amount: '$340,000', stage: 'Proposal', probability: '75%' },
      { company: 'Siemens Logistics EU', contact: 'Klaus Miller', amount: '$85,000', stage: 'Demo Stage', probability: '60%' },
      { company: 'Datadog Cloud Partners', contact: 'Elena Thorne', amount: '$210,000', stage: 'Security Audit', probability: '85%' },
    ];

    return (
      <div className={`min-h-full font-sans transition-colors duration-200 ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'}`} dir={isEn ? 'ltr' : 'rtl'}>
        {/* Top App Bar */}
        <header className={`sticky top-0 z-40 border-b px-4 sm:px-6 h-16 flex items-center justify-between backdrop-blur-md ${isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200'}`}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white font-black">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <span className="font-black text-sm tracking-tight block">
                {isEn ? (template.nameEn || 'Pulse Admin CRM') : template.name}
              </span>
              <span className="text-[10px] text-cyan-400 font-bold block uppercase tracking-wider">
                {isEn ? 'Enterprise Sales Workspace' : 'منظومة إدارة علاقات العملاء والمبيعات'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={onToggleDark} className="p-2 rounded-xl border border-slate-700 text-xs">{isDark ? '☀️' : '🌙'}</button>
            <button onClick={onBuyNow} className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black shadow-lg shadow-cyan-950/40">
              {isEn ? 'Acquire Theme' : 'شراء قالب لوحة التحكم'}
            </button>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map((kpi, idx) => (
              <div key={idx} className={`p-5 rounded-2xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <span className="text-xs text-slate-400 font-bold block mb-1">{kpi.title}</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-black font-mono">{kpi.value}</span>
                  <span className="text-xs font-bold text-emerald-400 flex items-center">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    {kpi.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Pipeline Kanban Summary */}
          <div className={`p-6 rounded-3xl border ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <h2 className="text-base font-black mb-4">{isEn ? 'Sales Pipeline Velocity' : 'مراحل ومسار الصفقات النشطة'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              {pipelineStages.map((st, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-300">{st.stage}</span>
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: st.color.replace('bg-', '') }}></span>
                  </div>
                  <div className="text-lg font-black font-mono text-cyan-400">{st.value}</div>
                  <span className="text-[11px] text-slate-400 block">{st.count} {isEn ? 'Deals' : 'صفقة'}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Deals Table */}
          <div className={`p-6 rounded-3xl border overflow-hidden ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-black">{isEn ? 'Recent High-Value Engagements' : 'أحدث الصفقات والفرص البيعية'}</h2>
              <span className="text-xs text-slate-400 font-semibold">{isEn ? 'Updated Real-Time' : 'محدث لحظياً'}</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs" dir={isEn ? 'ltr' : 'rtl'}>
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="pb-3 font-bold">{isEn ? 'Enterprise' : 'الشركة / العميل'}</th>
                    <th className="pb-3 font-bold">{isEn ? 'Executive Contact' : 'مسؤول التواصل'}</th>
                    <th className="pb-3 font-bold">{isEn ? 'Valuation' : 'القيمة'}</th>
                    <th className="pb-3 font-bold">{isEn ? 'Stage' : 'المرحلة'}</th>
                    <th className="pb-3 font-bold">{isEn ? 'Probability' : 'نسبة الإغلاق'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {deals.map((d, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/20 transition">
                      <td className="py-3 font-bold text-slate-200">{d.company}</td>
                      <td className="py-3 text-slate-400">{d.contact}</td>
                      <td className="py-3 font-mono font-bold text-cyan-400">{d.amount}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">
                          {d.stage}
                        </span>
                      </td>
                      <td className="py-3 font-mono font-bold text-emerald-400">{d.probability}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VARIANT 2: INSIGHT WEB & PRODUCT ANALYTICS
  // -------------------------------------------------------------
  if (isAnalytics) {
    return (
      <div className={`min-h-full font-sans transition-colors duration-200 ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'}`} dir={isEn ? 'ltr' : 'rtl'}>
        <header className="px-6 h-16 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 font-black text-sm">
            <BarChart3 className="w-5 h-5 text-indigo-400" />
            <span>{isEn ? (template.nameEn || 'Insight Analytics') : template.name}</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <button onClick={onToggleDark}>{isDark ? '☀️' : '🌙'}</button>
            <button onClick={onBuyNow} className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-xl">
              {isEn ? 'Purchase Dashboard' : 'شراء القالب'}
            </button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto p-6 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Real-Time Active Users', val: '2,842', delta: '+18%' },
              { label: 'Daily Unique Visitors', val: '148,200', delta: '+22.4%' },
              { label: 'Average Bounce Rate', val: '24.1%', delta: '-3.8%' },
              { label: 'Avg. Session Duration', val: '4m 12s', delta: '+45s' },
            ].map((st, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">{st.label}</span>
                <span className="text-3xl font-black font-mono text-indigo-400 block mb-1">{st.val}</span>
                <span className="text-xs text-emerald-400 font-bold">{st.delta} vs prev period</span>
              </div>
            ))}
          </div>

          {/* Traffic Chart Simulation */}
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800">
            <h3 className="text-sm font-black mb-4">{isEn ? 'Traffic Acquisition Over Time' : 'حركة الزوار والتحويلات عبر الزمن'}</h3>
            <div className="h-44 flex items-end justify-between gap-2 pt-6">
              {[35, 55, 48, 70, 85, 62, 90, 80, 95, 88, 100, 92].map((v, i) => (
                <div key={i} className="w-full flex flex-col items-center gap-2">
                  <div style={{ height: `${v}%` }} className="w-full bg-indigo-500/80 hover:bg-indigo-400 rounded-t-lg transition-all"></div>
                  <span className="text-[10px] text-slate-500 font-mono">0{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VARIANT 3: FINBOARD & SUPPORT DESK
  // -------------------------------------------------------------
  return (
    <div className={`min-h-full font-sans transition-colors duration-200 ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`} dir={isEn ? 'ltr' : 'rtl'}>
      <header className="px-6 h-16 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2 font-black text-sm">
          <LifeBuoy className="w-5 h-5 text-emerald-400" />
          <span>{isEn ? (template.nameEn || 'SupportDesk Admin') : template.name}</span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <button onClick={onToggleDark}>{isDark ? '☀️' : '🌙'}</button>
          <button onClick={onBuyNow} className="px-4 py-2 bg-emerald-500 text-slate-950 font-black rounded-xl">
            {isEn ? 'Acquire Admin' : 'شراء هذا القالب'}
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Open Tickets', val: '34' },
            { label: 'Urgent SLA Escalated', val: '6' },
            { label: 'Awaiting Customer', val: '18' },
            { label: 'Resolved Today', val: '42' },
          ].map((c, i) => (
            <div key={i} className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">{c.label}</span>
              <span className="text-3xl font-black font-mono text-emerald-400">{c.val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
