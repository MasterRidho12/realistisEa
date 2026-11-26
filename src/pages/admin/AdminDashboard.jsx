import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { ProductFormModal } from '../../components/admin/ProductFormModal';
import { 
  LayoutDashboard, 
  Layers, 
  Settings, 
  LogOut, 
  ExternalLink, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  TrendingUp, 
  MessageCircle, 
  Users, 
  Server, 
  ShieldCheck, 
  RefreshCcw, 
  Save, 
  Upload,
  AlertTriangle,
  Search,
  Sparkles,
  Sliders
} from 'lucide-react';

export const AdminDashboard = () => {
  const { 
    products, 
    settings, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    updateSettings, 
    resetToDefault, 
    logoutAdmin 
  } = useData();

  const navigate = useNavigate();

  // Tab navigation: 'overview', 'catalog', 'settings'
  const [activeTab, setActiveTab] = useState('overview');

  // Search in catalog
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  // Success toast notification state
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Local settings form state
  const [settingsForm, setSettingsForm] = useState(() => ({
    contact: {
      whatsappNumber: settings.contact?.whatsappNumber || '6281234567890',
      waMessageTemplate: settings.contact?.waMessageTemplate || 'Halo Admin RealistisEA, saya tertarik untuk sewa {ea_name} dengan paket {price}. Mohon info aktivasi dan bantuan setup MT4.',
    },
    hero: {
      headline1: settings.hero?.headline1 || 'OTOMATISASI TRADING',
      headlineHighlight: settings.hero?.headlineHighlight || 'XAUUSD REALISTIS',
      subheadline: settings.hero?.subheadline || 'Jalankan algoritma trading otomatis dengan manajemen risiko teruji 2% per trade untuk pertumbuhan akun jangka panjang.',
      winrate: settings.hero?.winrate || '78.4%',
      drawdown: settings.hero?.drawdown || '<15%',
      verifiedYears: settings.hero?.verifiedYears || '10 Tahun',
      heroImage: settings.hero?.heroImage || '/images/hero-robot-full.png',
      systemStatus: settings.hero?.systemStatus || 'System Status: Online',
      platformSupport: settings.hero?.platformSupport || 'MT4 Supported',
    },
    vps: {
      title: settings.vps?.title || 'Layanan VPS Trading 24/7',
      price: settings.vps?.price || 'Rp 1.200.000 / tahun',
      specs: settings.vps?.specs || [
        'Server Khusus Trading Uptime 99.99%',
        'Ultra Low Latency (<1ms ke Broker SG/London)',
        'Auto-Restart MT4 jika Server Mengalami Reboot',
        'Full Setup & Monitoring oleh Tim Teknisi RealistisEA'
      ]
    }
  }));

  const handleLogout = () => {
    logoutAdmin();
    navigate('/');
  };

  // Product actions
  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsProductModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (formData) => {
    if (editingProduct) {
      updateProduct(formData.id, formData);
      showToast(`Produk "${formData.name}" berhasil diperbarui!`);
    } else {
      addProduct(formData);
      showToast(`Produk "${formData.name}" berhasil ditambahkan ke katalog!`);
    }
  };

  const handleConfirmDelete = (id) => {
    deleteProduct(id);
    setDeleteConfirmId(null);
    showToast('Produk berhasil dihapus!');
  };

  const handleToggleProductActive = (product) => {
    const newStatus = !product.active;
    updateProduct(product.id, { active: newStatus });
    showToast(`Status "${product.name}" diubah menjadi ${newStatus ? 'Aktif' : 'Tersembunyi'}`);
  };

  // Settings Save
  const handleSaveSettings = (e) => {
    e.preventDefault();
    updateSettings(settingsForm);
    showToast('Pengaturan website & WhatsApp berhasil disimpan!');
  };

  // Reset confirmation
  const handleResetData = () => {
    resetToDefault();
    setResetConfirmOpen(false);
    showToast('Semua data berhasil direset ke data bawaan!');
  };

  // Upload hero image to base64
  const handleHeroImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettingsForm(prev => ({
          ...prev,
          hero: { ...prev.hero, heroImage: reader.result }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Filtered products for catalog search
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#06100C] text-white flex flex-col md:flex-row font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#10B981] text-[#06100C] font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-[0_10px_30px_rgba(16,185,129,0.4)] flex items-center gap-2.5 animate-bounce">
          <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#081410] border-r border-[#1E382E] flex flex-col justify-between shrink-0">
        <div>
          {/* Sidebar Brand */}
          <div className="p-6 border-b border-[#1E382E] flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#0D1B16] border border-[#1E382E] flex items-center justify-center p-1 shadow-[0_0_12px_rgba(16,185,129,0.3)]">
              <img src="/images/logo-icon.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-white block">
                Realistis<span className="text-[#10B981]">EA</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold tracking-wider uppercase block -mt-1">
                Admin Panel CMS
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1.5">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-[#10B981] text-[#06100C] shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  : 'text-gray-300 hover:text-white hover:bg-[#0D1B16]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Ringkasan Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('catalog')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'catalog'
                  ? 'bg-[#10B981] text-[#06100C] shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  : 'text-gray-300 hover:text-white hover:bg-[#0D1B16]'
              }`}
            >
              <Layers className="w-4 h-4" />
              <div className="flex-1 flex items-center justify-between">
                <span>Kelola Katalog EA</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${activeTab === 'catalog' ? 'bg-[#06100C] text-emerald-400' : 'bg-[#0D1B16] text-gray-400'}`}>
                  {products.length}
                </span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-[#10B981] text-[#06100C] shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  : 'text-gray-300 hover:text-white hover:bg-[#0D1B16]'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Pengaturan Website</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Bottom Actions */}
        <div className="p-4 border-t border-[#1E382E] space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-[#0D1B16] hover:bg-[#13271F] border border-[#1E382E] hover:border-emerald-500/40 text-gray-300 hover:text-white py-2.5 rounded-xl text-xs font-semibold transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
            <span>Buka Website Publik</span>
          </a>

          <button
            onClick={logoutAdmin}
            className="w-full flex items-center justify-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content View */}
      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        
        {/* Top Header Bar */}
        <header className="h-16 px-6 bg-[#081410]/80 border-b border-[#1E382E] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-sm sm:text-base font-bold text-white capitalize">
              {activeTab === 'overview' && 'Ringkasan & Metrik Performa'}
              {activeTab === 'catalog' && 'Manajemen Katalog Expert Advisor (EA)'}
              {activeTab === 'settings' && 'Pengaturan Konten Hero, WhatsApp & VPS'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D1B16] border border-[#1E382E]">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-[11px] font-semibold text-gray-300">Sistem Online & Sinkron</span>
            </div>

            <Link
              to="/"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#10B981] hover:bg-[#059669] text-[#06100C] text-xs font-bold transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Buka Web</span>
            </Link>
          </div>
        </header>

        {/* Tab Contents */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fadeIn max-w-6xl">
              
              {/* Stat Cards 4 Column */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="bg-[#0D1B16] border border-[#1E382E] p-5 rounded-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-gray-400">Total EA Aktif</span>
                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                      <Layers className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-extrabold text-white">
                    {products.filter(p => p.active !== false).length}{' '}
                    <span className="text-xs font-normal text-gray-400">/ {products.length} total</span>
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-1">Siap disewa pengunjung</div>
                </div>

                <div className="bg-[#0D1B16] border border-[#1E382E] p-5 rounded-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-gray-400">Total Klik WhatsApp</span>
                    <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-extrabold text-white">
                    {settings.stats?.waClicks || 148}
                  </div>
                  <div className="text-[11px] text-gray-400 mt-1">Lead sewa terkonfirmasi</div>
                </div>

                <div className="bg-[#0D1B16] border border-[#1E382E] p-5 rounded-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-gray-400">Estimasi Kunjungan Web</span>
                    <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-extrabold text-white">
                    {settings.stats?.pageViews || 2180}
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-1">+14.2% minggu ini</div>
                </div>

                <div className="bg-[#0D1B16] border border-[#1E382E] p-5 rounded-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-gray-400">Status Server MT4</span>
                    <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                      <Server className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-extrabold text-[#10B981]">
                    99.99%
                  </div>
                  <div className="text-[11px] text-gray-400 mt-1">Uptime server terjamin</div>
                </div>

              </div>

              {/* Quick Actions & Recent EAs */}
              <div className="bg-[#0D1B16] border border-[#1E382E] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-base font-bold text-white">Daftar Ringkas Produk EA</h3>
                    <p className="text-xs text-gray-400">Kelola status publikasi dan lakukan edit cepat.</p>
                  </div>

                  <button
                    onClick={handleOpenAddModal}
                    className="flex items-center gap-1.5 bg-[#10B981] hover:bg-[#059669] text-[#06100C] font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah EA Baru</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {products.map((prod) => (
                    <div
                      key={prod.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-[#081410] border border-[#1E382E] rounded-xl gap-4 hover:border-[#10B981]/40 transition-colors"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-xl bg-[#0D1B16] border border-[#1E382E] p-1 shrink-0 flex items-center justify-center">
                          <img
                            src={prod.image || '/images/ea-rgrowth.png'}
                            alt={prod.name}
                            className="w-full h-full object-contain"
                            onError={(e) => { e.target.src = '/images/ea-rgrowth.png'; }}
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-white">{prod.name}</h4>
                            {prod.badgeText && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full border border-amber-500/40 text-amber-400 bg-amber-500/10">
                                {prod.badgeText}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-emerald-400 mt-0.5">
                            {prod.rentalPrice} &bull; <span className="text-gray-400">{prod.platform}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        <button
                          onClick={() => handleToggleProductActive(prod)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                            prod.active !== false
                              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                              : 'bg-gray-800 text-gray-400 border border-gray-700'
                          }`}
                        >
                          {prod.active !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                          <span>{prod.active !== false ? 'Aktif' : 'Tersembunyi'}</span>
                        </button>

                        <button
                          onClick={() => handleOpenEditModal(prod)}
                          className="p-2 text-gray-400 hover:text-white bg-[#0D1B16] hover:bg-[#13271F] border border-[#1E382E] rounded-lg transition-colors"
                          title="Edit EA ini"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: CATALOG MANAGEMENT (CRUD) */}
          {activeTab === 'catalog' && (
            <div className="space-y-6 animate-fadeIn max-w-6xl">
              
              {/* Header with Search and Add Button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0D1B16] border border-[#1E382E] p-4 rounded-2xl">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari nama atau kategori EA..."
                    className="w-full bg-[#081410] border border-[#1E382E] focus:border-[#10B981] rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-white outline-none"
                  />
                </div>

                <button
                  onClick={handleOpenAddModal}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#059669] text-[#06100C] font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Tambah EA Baru</span>
                </button>
              </div>

              {/* Products Table */}
              <div className="bg-[#0D1B16] border border-[#1E382E] rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#081410] border-b border-[#1E382E] text-gray-400 uppercase text-[11px] font-semibold tracking-wider">
                      <tr>
                        <th className="py-3.5 px-4">Produk EA</th>
                        <th className="py-3.5 px-4">Kategori / Badge</th>
                        <th className="py-3.5 px-4">Harga Sewa</th>
                        <th className="py-3.5 px-4">Metrik (Target / Risiko)</th>
                        <th className="py-3.5 px-4 text-center">Status</th>
                        <th className="py-3.5 px-4 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1E382E]">
                      {filteredProducts.map((prod) => (
                        <tr key={prod.id} className="hover:bg-[#081410]/50 transition-colors">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-xl bg-[#081410] border border-[#1E382E] p-1 shrink-0 flex items-center justify-center">
                                <img
                                  src={prod.image || '/images/ea-rgrowth.png'}
                                  alt={prod.name}
                                  className="w-full h-full object-contain"
                                  onError={(e) => { e.target.src = '/images/ea-rgrowth.png'; }}
                                />
                              </div>
                              <div>
                                <span className="font-bold text-white block text-sm">{prod.name}</span>
                                <span className="text-[11px] text-gray-400">ID: {prod.id}</span>
                              </div>
                            </div>
                          </td>

                          <td className="py-4 px-4">
                            <div className="space-y-1">
                              <span className="text-xs text-gray-300 block">{prod.category || 'Breakout'}</span>
                              {prod.badgeText && (
                                <span className="inline-block text-[10px] px-2 py-0.5 rounded-full border border-amber-500/40 text-amber-400 bg-amber-500/10">
                                  {prod.badgeText}
                                </span>
                              )}
                            </div>
                          </td>

                          <td className="py-4 px-4">
                            <div className="text-xs font-bold text-emerald-400">
                              {prod.rentalPrice}
                            </div>
                            {prod.vpsPrice && (
                              <div className="text-[11px] text-gray-400">
                                {prod.vpsPrice}
                              </div>
                            )}
                          </td>

                          <td className="py-4 px-4">
                            <div className="text-xs text-gray-300">
                              <span className="text-emerald-400 font-semibold">{prod.targetProfit || '2-10%'}</span> / {prod.maxRisk || '2%'}
                            </div>
                            <div className="text-[11px] text-gray-400">
                              Min. Depo: {prod.minDeposit || '$100'} ({prod.platform || 'MT4'})
                            </div>
                          </td>

                          <td className="py-4 px-4 text-center">
                            <button
                              onClick={() => handleToggleProductActive(prod)}
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold cursor-pointer ${
                                prod.active !== false
                                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                  : 'bg-gray-800 text-gray-400 border border-gray-700'
                              }`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${prod.active !== false ? 'bg-emerald-400' : 'bg-gray-500'}`} />
                              <span>{prod.active !== false ? 'Aktif' : 'Disembunyikan'}</span>
                            </button>
                          </td>

                          <td className="py-4 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleOpenEditModal(prod)}
                                className="p-2 text-gray-300 hover:text-white bg-[#081410] hover:bg-[#1E382E] border border-[#1E382E] rounded-xl transition-colors cursor-pointer"
                                title="Edit EA"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => setDeleteConfirmId(prod.id)}
                                className="p-2 text-gray-400 hover:text-red-400 bg-[#081410] hover:bg-red-500/10 border border-[#1E382E] hover:border-red-500/40 rounded-xl transition-colors cursor-pointer"
                                title="Hapus EA"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredProducts.length === 0 && (
                  <div className="text-center py-12 text-gray-400 text-xs sm:text-sm">
                    Tidak ada produk EA yang cocok dengan pencarian.
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 3: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-8 animate-fadeIn max-w-4xl">
              
              <form onSubmit={handleSaveSettings} className="space-y-6">
                
                {/* 1. WHATSAPP & CONTACT SETTINGS */}
                <div className="bg-[#0D1B16] border border-[#1E382E] rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-2.5 pb-2 border-b border-[#1E382E]">
                    <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">Integrasi WhatsApp & Pesan Otomatis</h3>
                      <p className="text-xs text-gray-400">Atur nomor CS tujuan dan template pesan saat tombol sewa diklik.</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Nomor WhatsApp Admin (Gunakan format 628xxx tanpa tanda plus / spasi)
                      </label>
                      <input
                        type="text"
                        value={settingsForm.contact.whatsappNumber}
                        onChange={(e) => setSettingsForm({
                          ...settingsForm,
                          contact: { ...settingsForm.contact, whatsappNumber: e.target.value }
                        })}
                        placeholder="Contoh: 6281234567890"
                        className="w-full bg-[#081410] border border-[#1E382E] focus:border-[#10B981] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Template Pesan Otomatis WhatsApp (Gunakan tag <code className="text-emerald-400">{'{ea_name}'}</code> dan <code className="text-emerald-400">{'{price}'}</code>)
                      </label>
                      <textarea
                        rows="3"
                        value={settingsForm.contact.waMessageTemplate}
                        onChange={(e) => setSettingsForm({
                          ...settingsForm,
                          contact: { ...settingsForm.contact, waMessageTemplate: e.target.value }
                        })}
                        className="w-full bg-[#081410] border border-[#1E382E] focus:border-[#10B981] rounded-xl p-3 text-xs sm:text-sm text-white outline-none"
                      />
                      <span className="text-[11px] text-gray-500">
                        Pesan ini akan otomatis mengisi chat WhatsApp calon penyewa saat mereka menekan tombol "Sewa Sekarang".
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. HERO SECTION SETTINGS */}
                <div className="bg-[#0D1B16] border border-[#1E382E] rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-2.5 pb-2 border-b border-[#1E382E]">
                    <div className="p-2 rounded-xl bg-blue-500/15 text-blue-400">
                      <Sliders className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">Pengaturan Hero Section</h3>
                      <p className="text-xs text-gray-400">Kelola headline teks dan angka statistik floating card.</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Headline Utama (Baris 1)</label>
                        <input
                          type="text"
                          value={settingsForm.hero.headline1}
                          onChange={(e) => setSettingsForm({
                            ...settingsForm,
                            hero: { ...settingsForm.hero, headline1: e.target.value }
                          })}
                          className="w-full bg-[#081410] border border-[#1E382E] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Headline Highlight (Baris 2 Hijau)</label>
                        <input
                          type="text"
                          value={settingsForm.hero.headlineHighlight}
                          onChange={(e) => setSettingsForm({
                            ...settingsForm,
                            hero: { ...settingsForm.hero, headlineHighlight: e.target.value }
                          })}
                          className="w-full bg-[#081410] border border-[#1E382E] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Sub-headline Hero</label>
                      <textarea
                        rows="2"
                        value={settingsForm.hero.subheadline}
                        onChange={(e) => setSettingsForm({
                          ...settingsForm,
                          hero: { ...settingsForm.hero, subheadline: e.target.value }
                        })}
                        className="w-full bg-[#081410] border border-[#1E382E] rounded-xl p-3 text-xs sm:text-sm text-white"
                      />
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      <div>
                        <label className="block text-[11px] text-gray-400 mb-1">Winrate Metrik</label>
                        <input
                          type="text"
                          value={settingsForm.hero.winrate}
                          onChange={(e) => setSettingsForm({
                            ...settingsForm,
                            hero: { ...settingsForm.hero, winrate: e.target.value }
                          })}
                          className="w-full bg-[#081410] border border-[#1E382E] rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-gray-400 mb-1">Drawdown Metrik</label>
                        <input
                          type="text"
                          value={settingsForm.hero.drawdown}
                          onChange={(e) => setSettingsForm({
                            ...settingsForm,
                            hero: { ...settingsForm.hero, drawdown: e.target.value }
                          })}
                          className="w-full bg-[#081410] border border-[#1E382E] rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-gray-400 mb-1">Verifikasi Tahun</label>
                        <input
                          type="text"
                          value={settingsForm.hero.verifiedYears}
                          onChange={(e) => setSettingsForm({
                            ...settingsForm,
                            hero: { ...settingsForm.hero, verifiedYears: e.target.value }
                          })}
                          className="w-full bg-[#081410] border border-[#1E382E] rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                    </div>

                    {/* Hero Image */}
                    <div className="pt-2">
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Gambar Utama Robot Hero</label>
                      <div className="flex items-center gap-3">
                        <label className="cursor-pointer bg-[#081410] hover:bg-[#13271F] border border-[#1E382E] px-4 py-2 rounded-xl text-xs font-semibold text-emerald-400 flex items-center gap-2">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Ganti Gambar Hero (Upload)</span>
                          <input type="file" accept="image/*" onChange={handleHeroImageUpload} className="hidden" />
                        </label>
                        <input
                          type="text"
                          value={settingsForm.hero.heroImage}
                          onChange={(e) => setSettingsForm({
                            ...settingsForm,
                            hero: { ...settingsForm.hero, heroImage: e.target.value }
                          })}
                          className="flex-1 bg-[#081410] border border-[#1E382E] rounded-xl px-3 py-2 text-xs text-white"
                          placeholder="/images/hero-robot-full.png"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. VPS SETTINGS */}
                <div className="bg-[#0D1B16] border border-[#1E382E] rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-2.5 pb-2 border-b border-[#1E382E]">
                    <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400">
                      <Server className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">Pengaturan Layanan VPS Trading</h3>
                      <p className="text-xs text-gray-400">Perbarui harga paket VPS dan spesifikasi server.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Judul Layanan VPS</label>
                      <input
                        type="text"
                        value={settingsForm.vps.title}
                        onChange={(e) => setSettingsForm({
                          ...settingsForm,
                          vps: { ...settingsForm.vps, title: e.target.value }
                        })}
                        className="w-full bg-[#081410] border border-[#1E382E] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Harga VPS per Tahun</label>
                      <input
                        type="text"
                        value={settingsForm.vps.price}
                        onChange={(e) => setSettingsForm({
                          ...settingsForm,
                          vps: { ...settingsForm.vps, price: e.target.value }
                        })}
                        className="w-full bg-[#081410] border border-[#1E382E] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-[#06100C] font-bold text-xs sm:text-sm px-7 py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.35)] cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan Semua Pengaturan</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setResetConfirmOpen(true)}
                    className="flex items-center gap-2 text-gray-400 hover:text-red-400 text-xs transition-colors cursor-pointer"
                  >
                    <RefreshCcw className="w-3.5 h-3.5" />
                    <span>Reset ke Data Default</span>
                  </button>
                </div>

              </form>

            </div>
          )}

        </div>

      </main>

      {/* Product Form Modal (Add / Edit) */}
      <ProductFormModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSave={handleSaveProduct}
        productToEdit={editingProduct}
      />

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-sm bg-[#0D1B16] border border-[#1E382E] rounded-2xl p-6 text-center shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center mx-auto mb-4 border border-red-500/20">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Hapus Produk Ini?</h3>
            <p className="text-xs text-gray-400 mb-6 leading-relaxed">
              Tindakan ini akan menghapus produk dari katalog publik. Anda dapat menambahkan kembali kapan saja.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="py-2.5 rounded-xl border border-[#1E382E] text-xs font-semibold text-gray-300 hover:text-white bg-[#081410]"
              >
                Batal
              </button>
              <button
                onClick={() => handleConfirmDelete(deleteConfirmId)}
                className="py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-lg"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {resetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-sm bg-[#0D1B16] border border-[#1E382E] rounded-2xl p-6 text-center shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-4 border border-amber-500/20">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Reset ke Data Default?</h3>
            <p className="text-xs text-gray-400 mb-6 leading-relaxed">
              Semua perubahan produk dan pengaturan website akan dikembalikan ke data awal bawaan sistem.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setResetConfirmOpen(false)}
                className="py-2.5 rounded-xl border border-[#1E382E] text-xs font-semibold text-gray-300 hover:text-white bg-[#081410]"
              >
                Batal
              </button>
              <button
                onClick={handleResetData}
                className="py-2.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-[#06100C] text-xs font-bold shadow-lg"
              >
                Ya, Reset
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
