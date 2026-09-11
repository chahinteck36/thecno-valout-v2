import React, { useState, useEffect } from 'react';
import { 
  Lock, Mail, Key, LogOut, LayoutDashboard, Layers, 
  ShoppingBag, Settings, Plus, Edit2, Trash2, CheckCircle2, 
  AlertCircle, ExternalLink, Eye, EyeOff, Sparkles, DollarSign, 
  Clock, RefreshCw, X, ShieldAlert, Check, ChevronDown
} from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { StoreTemplate, StoreOrder, OrderStatus, TemplatePlatformType, TemplateStatus, ThemeLanguage } from '../types';
import { 
  fetchTemplatesFromDb, 
  saveTemplateToDb, 
  deleteTemplateFromDb, 
  fetchOrdersFromDb, 
  updateOrderStatusInDb 
} from '../lib/storeService';

interface Props {
  onCloseAdmin: () => void;
  language?: ThemeLanguage;
}

export const AdminPortal: React.FC<Props> = ({ onCloseAdmin, language = 'ar' }) => {
  const isEn = language === 'en';
  const { user, isAdmin, loading: authLoading, error: authError, loginWithEmail, logout } = useAuth();

  // Login form state
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isSubmittingLogin, setIsSubmittingLogin] = useState(false);
  const [localLoginError, setLocalLoginError] = useState<string | null>(null);

  // Admin tabs: 'dashboard' | 'templates' | 'orders' | 'settings'
  const [activeAdminTab, setActiveAdminTab] = useState<'dashboard' | 'templates' | 'orders' | 'settings'>('dashboard');

  // Data states
  const [templates, setTemplates] = useState<StoreTemplate[]>([]);
  const [orders, setOrders] = useState<StoreOrder[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);
  const [actionErrorMsg, setActionErrorMsg] = useState<string | null>(null);

  // Template Modal Form (Add / Edit)
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<StoreTemplate | null>(null);
  const [formTemplateId, setFormTemplateId] = useState('');
  const [formName, setFormName] = useState('');
  const [formNameEn, setFormNameEn] = useState('');
  const [formType, setFormType] = useState<TemplatePlatformType>('both');
  const [formCategory, setFormCategory] = useState('');
  const [formPrice, setFormPrice] = useState<number>(9.99);
  const [formStatus, setFormStatus] = useState<TemplateStatus>('published');
  const [formFeatured, setFormFeatured] = useState<boolean>(false);
  const [formMainImage, setFormMainImage] = useState('');
  const [formPreviewUrl, setFormPreviewUrl] = useState('');
  const [formShortDesc, setFormShortDesc] = useState('');
  const [formFullDesc, setFormFullDesc] = useState('');
  const [formFeaturesText, setFormFeaturesText] = useState('');
  const [formRequirementsText, setFormRequirementsText] = useState('');
  const [formLicenseInfo, setFormLicenseInfo] = useState('');

  // Orders Filter
  const [ordersStatusFilter, setOrdersStatusFilter] = useState<'all' | OrderStatus>('all');
  const [ordersSearch, setOrdersSearch] = useState('');

  // Load Data when Admin is Authenticated
  useEffect(() => {
    if (isAdmin) {
      loadAdminData();
    }
  }, [isAdmin]);

  const loadAdminData = async () => {
    setIsLoadingData(true);
    setActionErrorMsg(null);
    try {
      const [fetchedTemplates, fetchedOrders] = await Promise.all([
        fetchTemplatesFromDb(),
        fetchOrdersFromDb()
      ]);
      setTemplates(fetchedTemplates);
      setOrders(fetchedOrders);
    } catch (err: any) {
      console.error('Error fetching admin data:', err);
      setActionErrorMsg(err.message || 'تعذر تحميل بعض البيانات من قاعدة البيانات.');
    } finally {
      setIsLoadingData(false);
    }
  };

  const showNotification = (msg: string, isError = false) => {
    if (isError) {
      setActionErrorMsg(msg);
      setTimeout(() => setActionErrorMsg(null), 5000);
    } else {
      setActionSuccessMsg(msg);
      setTimeout(() => setActionSuccessMsg(null), 4000);
    }
  };

  // Handle Login Submit
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalLoginError(null);
    if (!emailInput || !passwordInput) {
      setLocalLoginError(isEn ? 'Please fill in both email and password' : 'يرجى إدخال البريد الإلكتروني وكلمة المرور');
      return;
    }
    setIsSubmittingLogin(true);
    try {
      await loginWithEmail(emailInput, passwordInput);
      setEmailInput('');
      setPasswordInput('');
    } catch (err: any) {
      setLocalLoginError(err.message || 'بيانات الدخول غير صحيحة');
    } finally {
      setIsSubmittingLogin(false);
    }
  };

  // Template Form Open for Add
  const handleOpenAddTemplate = () => {
    setEditingTemplate(null);
    setFormTemplateId(`template-${Date.now().toString(36)}`);
    setFormName('');
    setFormNameEn('');
    setFormType('both');
    setFormCategory('تطبيقات وبرامج');
    setFormPrice(9.99);
    setFormStatus('published');
    setFormFeatured(false);
    setFormMainImage('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80');
    setFormPreviewUrl('/preview/technoapp-pro');
    setFormShortDesc('');
    setFormFullDesc('');
    setFormFeaturesText('توليد وتصدير فوري لكود XML لبلوجر وحزمة ووردبريس\nمؤقت تحميل تنازلي ذكي مضاد للروبوتات\nوضع ليلي ونهاري انسيابي بنقرة واحدة');
    setFormRequirementsText('حساب بلوجر مجاني أو استضافة ووردبريس عادية\nلا يحتاج خبرة برمجية');
    setFormLicenseInfo('ترخيص رسمي دائم مدى الحياة مع تحديثات مجانية.');
    setIsTemplateModalOpen(true);
  };

  // Template Form Open for Edit
  const handleOpenEditTemplate = (tmpl: StoreTemplate) => {
    setEditingTemplate(tmpl);
    setFormTemplateId(tmpl.id);
    setFormName(tmpl.name);
    setFormNameEn(tmpl.nameEn || '');
    setFormType(tmpl.type);
    setFormCategory(tmpl.category);
    setFormPrice(tmpl.price);
    setFormStatus(tmpl.status);
    setFormFeatured(tmpl.featured);
    setFormMainImage(tmpl.mainImage);
    setFormPreviewUrl(tmpl.previewUrl);
    setFormShortDesc(tmpl.shortDescription);
    setFormFullDesc(tmpl.fullDescription);
    setFormFeaturesText((tmpl.features || []).join('\n'));
    setFormRequirementsText((tmpl.requirements || []).join('\n'));
    setFormLicenseInfo(tmpl.licenseInfo);
    setIsTemplateModalOpen(true);
  };

  // Save Template
  const handleSaveTemplate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formTemplateId.trim()) {
      showNotification(isEn ? 'Template Name and ID are required' : 'اسم القالب والمعرف مطلوبان', true);
      return;
    }

    const featuresArray = formFeaturesText.split('\n').map(s => s.trim()).filter(Boolean);
    const requirementsArray = formRequirementsText.split('\n').map(s => s.trim()).filter(Boolean);

    const newOrUpdated: StoreTemplate = {
      id: formTemplateId.trim(),
      name: formName.trim(),
      nameEn: formNameEn.trim() || formName.trim(),
      type: formType,
      category: formCategory.trim() || 'تطبيقات وبرامج',
      shortDescription: formShortDesc.trim(),
      fullDescription: formFullDesc.trim(),
      mainImage: formMainImage.trim(),
      previewImages: editingTemplate?.previewImages || [formMainImage.trim()],
      previewUrl: formPreviewUrl.trim() || '/preview/technoapp-pro',
      price: Number(formPrice) || 9.99,
      currency: 'USD',
      status: formStatus,
      featured: formFeatured,
      features: featuresArray,
      requirements: requirementsArray,
      licenseInfo: formLicenseInfo.trim(),
      salesCount: editingTemplate?.salesCount || 0,
      rating: editingTemplate?.rating || 4.9,
      reviewsCount: editingTemplate?.reviewsCount || 1,
      createdAt: editingTemplate?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await saveTemplateToDb(newOrUpdated);
      setIsTemplateModalOpen(false);
      showNotification(isEn ? 'Template saved successfully!' : 'تم حفظ بيانات القالب وتحديثها بنجاح!');
      await loadAdminData();
    } catch (err: any) {
      showNotification(err.message || 'فشل في حفظ القالب في Firestore', true);
    }
  };

  // Delete Template
  const handleDeleteTemplate = async (templateId: string, templateName: string) => {
    const confirmMsg = isEn 
      ? `Are you sure you want to delete "${templateName}"?` 
      : `هل أنت متأكد من حذف القالب "${templateName}"؟`;
    if (!window.confirm(confirmMsg)) return;

    try {
      await deleteTemplateFromDb(templateId);
      showNotification(isEn ? 'Template deleted successfully' : 'تم حذف القالب بنجاح');
      await loadAdminData();
    } catch (err: any) {
      showNotification(err.message || 'فشل حذف القالب', true);
    }
  };

  // Toggle Publish Status
  const handleToggleStatus = async (tmpl: StoreTemplate) => {
    const nextStatus: TemplateStatus = tmpl.status === 'published' ? 'hidden' : 'published';
    try {
      await saveTemplateToDb({ ...tmpl, status: nextStatus });
      showNotification(nextStatus === 'published' ? 'تم نشر القالب للزوار' : 'تم إخفاء القالب من المتجر');
      await loadAdminData();
    } catch (err: any) {
      showNotification(err.message || 'تعذر تغيير حالة القالب', true);
    }
  };

  // Toggle Featured
  const handleToggleFeatured = async (tmpl: StoreTemplate) => {
    try {
      await saveTemplateToDb({ ...tmpl, featured: !tmpl.featured });
      showNotification(tmpl.featured ? 'تمت إزالة التمييز' : 'تم تمييز القالب بنجاح');
      await loadAdminData();
    } catch (err: any) {
      showNotification(err.message || 'تعذر تغيير حالة التمييز', true);
    }
  };

  // Change Order Status
  const handleUpdateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await updateOrderStatusInDb(orderId, newStatus);
      showNotification(isEn ? `Order status updated to ${newStatus}` : `تم تحديث حالة الطلب إلى: ${newStatus}`);
      await loadAdminData();
    } catch (err: any) {
      showNotification(err.message || 'فشل تحديث حالة الطلب', true);
    }
  };

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    if (ordersStatusFilter !== 'all' && o.status !== ordersStatusFilter) return false;
    if (ordersSearch.trim()) {
      const q = ordersSearch.toLowerCase().trim();
      return (
        o.orderId.toLowerCase().includes(q) ||
        o.customerEmail.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.templateName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Calculate Metrics
  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter(o => o.status === 'pending').length;
  const completedOrdersCount = orders.filter(o => o.status === 'completed' || o.status === 'confirmed').length;
  const totalRevenue = orders
    .filter(o => o.status === 'completed' || o.status === 'confirmed')
    .reduce((acc, curr) => acc + (curr.price || 0), 0);

  // If Auth loading
  if (authLoading) {
    return (
      <div className="flex items-center justify-center p-12 text-center text-slate-300">
        <RefreshCw className="w-8 h-8 animate-spin text-cyan-400 mx-auto mb-3" />
        <p className="text-sm font-bold">جاري التحقق من أمان الجلسة والصلاحيات...</p>
      </div>
    );
  }

  // If Not Logged In -> Show Firebase Auth Login Form
  if (!user) {
    return (
      <div className="max-w-md mx-auto my-8 p-6 sm:p-8 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl" dir={isEn ? 'ltr' : 'rtl'}>
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto mb-3 shadow-lg">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-black text-white">
            {isEn ? 'TechVault Pro Admin Portal' : 'لوحة تحكم TechVault Pro'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {isEn 
              ? 'Secure management system powered by Firebase Authentication' 
              : 'تسجيل دخول آمن لإدارة القوالب، الأسعار والطلبات عبر Firebase'}
          </p>
        </div>

        {(localLoginError || authError) && (
          <div className="flex items-start gap-2.5 p-3.5 mb-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{localLoginError || authError}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              {isEn ? 'Admin Email Address' : 'البريد الإلكتروني للإدارة'}
            </label>
            <div className="relative">
              <Mail className={`w-4 h-4 text-slate-500 absolute top-1/2 -translate-y-1/2 ${isEn ? 'left-3' : 'right-3'}`} />
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="gmouhamed36@gmail.com"
                required
                className={`w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none transition ${
                  isEn ? 'pl-9 pr-3' : 'pr-9 pl-3'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              {isEn ? 'Password' : 'كلمة المرور'}
            </label>
            <div className="relative">
              <Key className={`w-4 h-4 text-slate-500 absolute top-1/2 -translate-y-1/2 ${isEn ? 'left-3' : 'right-3'}`} />
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                required
                className={`w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none transition ${
                  isEn ? 'pl-9 pr-3' : 'pr-9 pl-3'
                }`}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmittingLogin}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-cyan-950 transition disabled:opacity-60"
          >
            {isSubmittingLogin ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>{isEn ? 'Signing in...' : 'جاري التحقق وتسجيل الدخول...'}</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>{isEn ? 'Sign In to Admin Portal' : 'تسجيل الدخول إلى لوحة التحكم'}</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-800 text-center">
          <button
            onClick={onCloseAdmin}
            className="text-xs text-slate-400 hover:text-white transition"
          >
            {isEn ? '← Back to Store' : '← العودة إلى المتجر'}
          </button>
        </div>
      </div>
    );
  }

  // If Authenticated but NOT an Admin -> Access Denied Protected Route Screen
  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto my-8 p-6 sm:p-8 bg-slate-900 border border-rose-500/30 rounded-3xl shadow-2xl text-center" dir={isEn ? 'ltr' : 'rtl'}>
        <div className="w-14 h-14 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto mb-4 shadow-lg">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-black text-white">
          {isEn ? 'Access Denied' : 'تم رفض الوصول'}
        </h2>
        <p className="text-xs text-rose-300 mt-2 font-medium">
          {isEn 
            ? `Your account (${user?.email || 'User'}) does not have administrator privileges.`
            : `حسابك (${user?.email || 'المستخدم'}) لا يملك صلاحيات المسؤول للوصول إلى لوحة التحكم.`}
        </p>
        <p className="text-[11px] text-slate-400 mt-2">
          {isEn 
            ? 'Please sign in with an authorized administrator account.' 
            : 'يرجى تسجيل الدخول باستخدام حساب مسؤول معتمد.'}
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={logout}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-bold transition flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>{isEn ? 'Sign Out / Switch Account' : 'تسجيل الخروج / تبديل الحساب'}</span>
          </button>
          <button
            onClick={onCloseAdmin}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition"
          >
            {isEn ? 'Back to Store' : 'العودة إلى المتجر'}
          </button>
        </div>
      </div>
    );
  }

  // When Authenticated & Authorized Admin -> Full Professional Admin Dashboard
  return (
    <div className="space-y-6" dir={isEn ? 'ltr' : 'rtl'}>
      
      {/* Top Admin Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-white">
                {isEn ? 'Admin Dashboard' : 'لوحة تحكم TechVault Pro'}
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold">
                Firebase Active
              </span>
            </div>
            <p className="text-xs text-slate-400 truncate">
              {user.email}
            </p>
          </div>
        </div>

        {/* Tab Switcher & Logout */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'dashboard', label: isEn ? 'Overview' : 'نظرة عامة', icon: LayoutDashboard },
            { id: 'templates', label: isEn ? 'Templates' : 'إدارة القوالب', icon: Layers },
            { id: 'orders', label: isEn ? 'Orders' : 'الطلبات والمبيعات', icon: ShoppingBag },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeAdminTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveAdminTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap border ${
                  isActive 
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-black shadow-md' 
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}

          <button
            onClick={logout}
            className="flex items-center gap-1 px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold transition whitespace-nowrap"
            title={isEn ? "Logout" : "تسجيل الخروج"}
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isEn ? 'Logout' : 'خروج'}</span>
          </button>
        </div>
      </div>

      {/* Action Notification Banners */}
      {actionSuccessMsg && (
        <div className="flex items-center gap-2 p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{actionSuccessMsg}</span>
        </div>
      )}
      {actionErrorMsg && (
        <div className="flex items-center gap-2 p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-bold animate-in fade-in duration-200">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{actionErrorMsg}</span>
        </div>
      )}

      {/* TAB 1: DASHBOARD OVERVIEW */}
      {activeAdminTab === 'dashboard' && (
        <div className="space-y-6">
          
          {/* Key Metrics Bento Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Metric 1: Total Templates */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>{isEn ? 'Total Templates' : 'إجمالي القوالب'}</span>
                <Layers className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">{templates.length}</div>
              <div className="text-[11px] text-cyan-400 mt-1">
                {templates.filter(t => t.status === 'published').length} {isEn ? 'Published in store' : 'منشور بالمتجر'}
              </div>
            </div>

            {/* Metric 2: Total Orders */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>{isEn ? 'Total Orders' : 'إجمالي الطلبات'}</span>
                <ShoppingBag className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">{totalOrdersCount}</div>
              <div className="text-[11px] text-blue-400 mt-1">
                {isEn ? 'Received via WhatsApp/PayPal' : 'طلبات واتساب وباي بال'}
              </div>
            </div>

            {/* Metric 3: Pending Orders */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>{isEn ? 'Pending Orders' : 'طلبات بانتظار التأكيد'}</span>
                <Clock className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-400">{pendingOrdersCount}</div>
              <div className="text-[11px] text-amber-400/80 mt-1">
                {isEn ? 'Requires activation code' : 'تحتاج إرسال كود التفعيل'}
              </div>
            </div>

            {/* Metric 4: Total Revenue */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>{isEn ? 'Total Revenue' : 'إجمالي المبيعات'}</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                ${totalRevenue.toFixed(2)}
              </div>
              <div className="text-[11px] text-emerald-400/80 mt-1">
                {completedOrdersCount} {isEn ? 'confirmed orders' : 'طلب مؤكد'}
              </div>
            </div>

          </div>

          {/* Quick Actions & Recent Orders Table */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left 2 Cols: Recent Orders */}
            <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-black text-white">
                  {isEn ? 'Recent Purchase Orders' : 'أحدث طلبات الشراء'}
                </h3>
                <button
                  onClick={() => setActiveAdminTab('orders')}
                  className="text-xs text-cyan-400 hover:underline font-bold"
                >
                  {isEn ? 'View All →' : 'عرض الكل ←'}
                </button>
              </div>

              {orders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="p-2.5 font-bold">Order ID</th>
                        <th className="p-2.5 font-bold">{isEn ? 'Customer' : 'العميل'}</th>
                        <th className="p-2.5 font-bold">{isEn ? 'Template' : 'القالب'}</th>
                        <th className="p-2.5 font-bold">{isEn ? 'Price' : 'السعر'}</th>
                        <th className="p-2.5 font-bold">{isEn ? 'Status' : 'الحالة'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {orders.slice(0, 5).map((ord) => (
                        <tr key={ord.orderId} className="hover:bg-slate-800/40">
                          <td className="p-2.5 font-mono text-slate-300 font-bold">{ord.orderId}</td>
                          <td className="p-2.5 text-slate-200">
                            <div>{ord.customerName}</div>
                            <div className="text-[10px] text-slate-500">{ord.customerEmail}</div>
                          </td>
                          <td className="p-2.5 text-slate-300">{ord.templateName}</td>
                          <td className="p-2.5 font-black text-emerald-400">${ord.price.toFixed(2)}</td>
                          <td className="p-2.5">
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                              ord.status === 'confirmed' || ord.status === 'completed'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : ord.status === 'pending'
                                ? 'bg-amber-500/20 text-amber-400'
                                : 'bg-rose-500/20 text-rose-400'
                            }`}>
                              {ord.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-xs text-slate-500 py-6 text-center">
                  {isEn ? 'No orders recorded yet.' : 'لا توجد طلبات مسجلة حتى الآن.'}
                </p>
              )}
            </div>

            {/* Right Col: Quick Actions */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-4">
              <h3 className="text-sm font-black text-white">
                {isEn ? 'Quick Management Actions' : 'إجراءات سريعة'}
              </h3>
              
              <button
                onClick={handleOpenAddTemplate}
                className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs shadow-md transition"
              >
                <Plus className="w-4 h-4" />
                <span>{isEn ? 'Add New Template' : 'إضافة قالب جديد'}</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('templates')}
                className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition"
              >
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>{isEn ? 'Manage All Templates' : 'تعديل وحذف القوالب'}</span>
              </button>

              <button
                onClick={loadAdminData}
                className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs font-bold border border-slate-800 transition"
              >
                <RefreshCw className={`w-4 h-4 ${isLoadingData ? 'animate-spin text-cyan-400' : ''}`} />
                <span>{isEn ? 'Sync with Firestore' : 'مزامنة وتحديث فوري'}</span>
              </button>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: TEMPLATES MANAGEMENT */}
      {activeAdminTab === 'templates' && (
        <div className="space-y-4">
          
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-base font-black text-white">
              {isEn ? 'Templates Catalog Management' : 'إدارة قوالب المتجر'} ({templates.length})
            </h3>
            <button
              onClick={handleOpenAddTemplate}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-black shadow-md transition"
            >
              <Plus className="w-4 h-4" />
              <span>{isEn ? 'Add Template' : 'إضافة قالب جديد'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((tmpl) => (
              <div 
                key={tmpl.id}
                className="flex flex-col justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition shadow-lg"
              >
                <div>
                  {/* Template Image with Status Tags */}
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-3 bg-slate-950">
                    <img src={tmpl.mainImage} alt={tmpl.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute top-2 right-2 flex items-center gap-1">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                        tmpl.status === 'published' ? 'bg-emerald-500/80 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {tmpl.status}
                      </span>
                      {tmpl.featured && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 text-[10px] font-black">
                          ★ Featured
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Category */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span>{tmpl.type.toUpperCase()}</span>
                    <span>{tmpl.category}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white line-clamp-1 mb-1">{tmpl.name}</h4>
                  <div className="text-base font-black text-emerald-400 mb-3">${tmpl.price.toFixed(2)} USD</div>
                </div>

                {/* Actions Toolbar */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-1.5 text-xs">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleToggleStatus(tmpl)}
                      className={`p-1.5 rounded-lg border transition ${
                        tmpl.status === 'published' 
                          ? 'bg-slate-800 text-emerald-400 border-emerald-500/30 hover:bg-slate-700' 
                          : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                      }`}
                      title={tmpl.status === 'published' ? "إخفاء القالب" : "نشر القالب"}
                    >
                      {tmpl.status === 'published' ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => handleToggleFeatured(tmpl)}
                      className={`p-1.5 rounded-lg border transition ${
                        tmpl.featured 
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 hover:bg-amber-500/30' 
                          : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                      }`}
                      title={tmpl.featured ? "إلغاء التمييز" : "تمييز القالب"}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEditTemplate(tmpl)}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold border border-slate-700 transition"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>{isEn ? 'Edit' : 'تعديل'}</span>
                    </button>

                    <button
                      onClick={() => handleDeleteTemplate(tmpl.id, tmpl.name)}
                      className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition"
                      title={isEn ? "Delete" : "حذف"}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 3: ORDERS MANAGEMENT */}
      {activeAdminTab === 'orders' && (
        <div className="space-y-4">
          
          {/* Orders Filter Toolbar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900 border border-slate-800">
            <input
              type="text"
              value={ordersSearch}
              onChange={(e) => setOrdersSearch(e.target.value)}
              placeholder={isEn ? "Search orders by ID, email, or customer..." : "ابحث برقم الطلب، البريد، أو اسم العميل..."}
              className="bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none flex-1"
            />

            <div className="flex items-center gap-1 overflow-x-auto">
              {(['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setOrdersStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition capitalize ${
                    ordersStatusFilter === st
                      ? 'bg-cyan-500 text-slate-950 font-black shadow-md'
                      : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Orders Table */}
          <div className="overflow-x-auto rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3 font-bold">Order ID</th>
                  <th className="p-3 font-bold">{isEn ? 'Date' : 'التاريخ'}</th>
                  <th className="p-3 font-bold">{isEn ? 'Customer' : 'العميل'}</th>
                  <th className="p-3 font-bold">{isEn ? 'Template' : 'القالب'}</th>
                  <th className="p-3 font-bold">{isEn ? 'Price' : 'السعر'}</th>
                  <th className="p-3 font-bold">{isEn ? 'Payment' : 'الدفع'}</th>
                  <th className="p-3 font-bold">{isEn ? 'Status' : 'الحالة'}</th>
                  <th className="p-3 font-bold">{isEn ? 'Actions' : 'الإجراء'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((ord) => (
                    <tr key={ord.orderId} className="hover:bg-slate-800/40">
                      <td className="p-3 font-mono text-cyan-300 font-bold">{ord.orderId}</td>
                      <td className="p-3 text-slate-400 whitespace-nowrap">
                        {new Date(ord.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-3 text-slate-200">
                        <div className="font-bold">{ord.customerName}</div>
                        <div className="text-[10px] text-slate-400">{ord.customerEmail}</div>
                        {ord.customerPhone && (
                          <div className="text-[10px] text-emerald-400 font-mono">{ord.customerPhone}</div>
                        )}
                      </td>
                      <td className="p-3 text-slate-300">
                        <div>{ord.templateName}</div>
                        <span className="text-[10px] text-slate-500 uppercase">{ord.templateType}</span>
                      </td>
                      <td className="p-3 font-black text-emerald-400 whitespace-nowrap">
                        ${ord.price.toFixed(2)}
                      </td>
                      <td className="p-3 text-slate-400 uppercase font-mono text-[10px]">
                        {ord.paymentMethod}
                      </td>
                      <td className="p-3">
                        <select
                          value={ord.status}
                          onChange={(e) => handleUpdateOrderStatus(ord.orderId, e.target.value as OrderStatus)}
                          aria-label={isEn ? "Update order status" : "تحديث حالة الطلب"}
                          className={`px-2 py-1 rounded-lg text-xs font-bold border focus:outline-none cursor-pointer ${
                            ord.status === 'confirmed' || ord.status === 'completed'
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                              : ord.status === 'pending'
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                              : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                          }`}
                        >
                          <option value="pending" className="bg-slate-900 text-amber-300">Pending</option>
                          <option value="confirmed" className="bg-slate-900 text-blue-300">Confirmed</option>
                          <option value="completed" className="bg-slate-900 text-emerald-300">Completed</option>
                          <option value="cancelled" className="bg-slate-900 text-rose-300">Cancelled</option>
                        </select>
                      </td>
                      <td className="p-3">
                        {ord.notes && (
                          <span className="text-[10px] text-slate-400 line-clamp-1" title={ord.notes}>
                            {ord.notes}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-slate-500">
                      {isEn ? 'No orders found.' : 'لا توجد طلبات تطابق الفلتر الحالي.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* MODAL: ADD / EDIT TEMPLATE */}
      {isTemplateModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6" dir={isEn ? 'ltr' : 'rtl'}>
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
            <button
              onClick={() => setIsTemplateModalOpen(false)}
              className={`absolute top-4 ${isEn ? 'right-4' : 'left-4'} w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center`}
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-black text-white mb-4">
              {editingTemplate ? (isEn ? 'Edit Template' : 'تعديل بيانات القالب') : (isEn ? 'Add New Template' : 'إضافة قالب جديد')}
            </h3>

            <form onSubmit={handleSaveTemplate} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">{isEn ? 'Template ID' : 'معرّف القالب الفريد'}</label>
                  <input
                    type="text"
                    value={formTemplateId}
                    onChange={(e) => setFormTemplateId(e.target.value)}
                    required
                    disabled={!!editingTemplate}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">{isEn ? 'Platform Type' : 'نوع المنصة'}</label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value as TemplatePlatformType)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none cursor-pointer"
                  >
                    <option value="both">Blogger & WordPress (كلاهما)</option>
                    <option value="blogger">Blogger Only (بلوجر فقط)</option>
                    <option value="wordpress">WordPress Only (ووردبريس فقط)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">{isEn ? 'Template Name (Arabic)' : 'اسم القالب (بالعربية)'}</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  required
                  placeholder="TechnoApp Pro - قالب تطبيقات وبرامج تقنية"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">{isEn ? 'Category' : 'التصنيف'}</label>
                  <input
                    type="text"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    placeholder="تطبيقات وبرامج"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">{isEn ? 'Price (USD)' : 'السعر بالدولار ($)'}</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formPrice}
                    onChange={(e) => setFormPrice(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">{isEn ? 'Status' : 'حالة النشر'}</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as TemplateStatus)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                  >
                    <option value="published">منشور للزوار (Published)</option>
                    <option value="draft">مسودة (Draft)</option>
                    <option value="hidden">مخفي (Hidden)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">{isEn ? 'Main Cover Image URL' : 'رابط الصورة الرئيسية'}</label>
                <input
                  type="url"
                  value={formMainImage}
                  onChange={(e) => setFormMainImage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">{isEn ? 'Live Demo / Preview URL' : 'رابط المعاينة / الديمو'}</label>
                <input
                  type="text"
                  value={formPreviewUrl}
                  onChange={(e) => setFormPreviewUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">{isEn ? 'Short Description' : 'الوصف القصير'}</label>
                <textarea
                  rows={2}
                  value={formShortDesc}
                  onChange={(e) => setFormShortDesc(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">{isEn ? 'Features (One per line)' : 'المميزات (كل ميزة بسطر)'}</label>
                <textarea
                  rows={3}
                  value={formFeaturesText}
                  onChange={(e) => setFormFeaturesText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredCheck"
                  checked={formFeatured}
                  onChange={(e) => setFormFeatured(e.target.checked)}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-0 cursor-pointer"
                />
                <label htmlFor="featuredCheck" className="text-xs font-bold text-slate-300 cursor-pointer">
                  {isEn ? 'Mark as Featured Theme' : 'تمييز القالب في الصفحة الرئيسية'}
                </label>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsTemplateModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
                >
                  {isEn ? 'Cancel' : 'إلغاء'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-black shadow-lg"
                >
                  {isEn ? 'Save Template' : 'حفظ القالب'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
