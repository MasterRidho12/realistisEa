import React, { useState, useEffect } from 'react';
import { X, Upload, Plus, Trash2, Image as ImageIcon, Eye, Check, Server, Shield, Sparkles } from 'lucide-react';

export const ProductFormModal = ({ isOpen, onClose, onSave, productToEdit }) => {
  const isEditing = !!productToEdit;

  const defaultForm = {
    id: '',
    name: '',
    category: 'Breakout',
    badgeText: 'RECOMMENDED',
    badgeColor: 'gold', // 'gold', 'blue', 'emerald', 'purple'
    rentalPrice: 'Rp 255.000 / bln (Min. 12 Bulan)',
    minDuration: '12 Bulan',
    vpsPrice: 'VPS Rp 1,2 jt / tahun',
    targetProfit: '2-10%/bln',
    maxRisk: '2% per trade',
    minDeposit: '$100',
    platform: 'MT4',
    features: [
      'Breakout Strategy',
      'Stop Loss / TP',
      'Trailing Stop Management',
      'Data Backtest 2015-2025 (Tickstory)'
    ],
    image: '/images/ea-rgrowth.png',
    backtestImage: '/images/backtest-rgrowth.png',
    backtestDetails: {
      period: '2015 - 2025 (10 Tahun)',
      initialDeposit: '$100',
      netProfit: '$28,450.00 (+28,350%)',
      profitFactor: '2.42',
      maxDrawdown: '11.8%',
      winRate: '78.4%',
      totalTrades: '2,840 trades',
      modelingQuality: '99.90% Everytick (Tickstory)',
      notes: 'Pengujian Every Tick murni dengan spread riil dan slippage. Tanpa sistem Martingale, Averaging, ataupun Grid berisiko.'
    },
    active: true,
  };

  const [formData, setFormData] = useState(defaultForm);
  const [activeTab, setActiveTab] = useState('basic'); // 'basic', 'features', 'backtest'
  const [newFeatureText, setNewFeatureText] = useState('');

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        ...defaultForm,
        ...productToEdit,
        features: Array.isArray(productToEdit.features) ? [...productToEdit.features] : defaultForm.features,
        backtestDetails: {
          ...defaultForm.backtestDetails,
          ...(productToEdit.backtestDetails || {})
        }
      });
    } else {
      setFormData({
        ...defaultForm,
        id: 'ea-' + Date.now(),
      });
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  // Handle general field changes
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle backtest subfields
  const handleBacktestChange = (subfield, value) => {
    setFormData(prev => ({
      ...prev,
      backtestDetails: {
        ...prev.backtestDetails,
        [subfield]: value
      }
    }));
  };

  // Handle file upload for Product Image (converts to Base64)
  const handleProductImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        alert('Ukuran file maksimal 3MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('image', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle file upload for Backtest Image (converts to Base64)
  const handleBacktestImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        alert('Ukuran file maksimal 4MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('backtestImage', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Checklist feature handlers
  const handleAddFeature = () => {
    if (newFeatureText.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeatureText.trim()]
      }));
      setNewFeatureText('');
    }
  };

  const handleUpdateFeature = (index, val) => {
    setFormData(prev => {
      const updated = [...prev.features];
      updated[index] = val;
      return { ...prev, features: updated };
    });
  };

  const handleRemoveFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, idx) => idx !== index)
    }));
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Nama EA wajib diisi');
      return;
    }
    onSave(formData);
    onClose();
  };

  // Badge styling for preview
  const getBadgeStyle = (color) => {
    switch (color) {
      case 'gold':
      case 'amber':
        return 'text-[#EAB308] bg-[#EAB308]/10 border-[#EAB308]/40';
      case 'blue':
        return 'text-[#3B82F6] bg-[#3B82F6]/10 border-[#3B82F6]/40';
      case 'emerald':
      case 'green':
        return 'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/40';
      case 'purple':
        return 'text-[#A855F7] bg-[#A855F7]/10 border-[#A855F7]/40';
      default:
        return 'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/40';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-6xl bg-[#0D1B16] border border-[#1E382E] rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden my-4 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E382E] bg-[#081410]">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span>{isEditing ? `Edit Produk: ${formData.name || 'EA'}` : 'Tambah Produk EA Baru'}</span>
            </h3>
            <p className="text-xs text-gray-400">
              Perubahan pada form di bawah akan langsung terlihat pada Live Card Preview di sisi kanan.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white bg-[#0D1B16] hover:bg-[#1E382E] rounded-xl border border-[#1E382E] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center px-6 border-b border-[#1E382E] bg-[#0A1612]">
          <button
            type="button"
            onClick={() => setActiveTab('basic')}
            className={`px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'basic'
                ? 'border-[#10B981] text-[#10B981]'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            1. Info Dasar & Metrik
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('features')}
            className={`px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'features'
                ? 'border-[#10B981] text-[#10B981]'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            2. Fitur Checklist ({formData.features?.length || 0})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('backtest')}
            className={`px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'backtest'
                ? 'border-[#10B981] text-[#10B981]'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            3. Laporan Backtest Detail
          </button>
        </div>

        {/* Modal Main Body (2 Columns: Form on Left, Live Preview on Right) */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Form Inputs */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-5">
            
            {/* TAB 1: BASIC INFO & METRICS */}
            {activeTab === 'basic' && (
              <div className="space-y-4">
                
                {/* EA Name & Category */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Nama Produk EA *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="contoh: EA RGrowth (XAUUSD Breakout)"
                      className="w-full bg-[#081410] border border-[#1E382E] focus:border-[#10B981] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Kategori
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleChange('category', e.target.value)}
                      className="w-full bg-[#081410] border border-[#1E382E] focus:border-[#10B981] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white outline-none"
                    >
                      <option value="Breakout">Breakout</option>
                      <option value="Trend Following">Trend Following</option>
                      <option value="Scalping">Scalping</option>
                      <option value="Swing">Swing</option>
                    </select>
                  </div>
                </div>

                {/* Badge Text & Color */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Teks Badge Label (Opsional)
                    </label>
                    <input
                      type="text"
                      value={formData.badgeText || ''}
                      onChange={(e) => handleChange('badgeText', e.target.value)}
                      placeholder="RECOMMENDED / Trend Following / NEW"
                      className="w-full bg-[#081410] border border-[#1E382E] focus:border-[#10B981] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Warna Badge
                    </label>
                    <select
                      value={formData.badgeColor || 'gold'}
                      onChange={(e) => handleChange('badgeColor', e.target.value)}
                      className="w-full bg-[#081410] border border-[#1E382E] focus:border-[#10B981] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white outline-none"
                    >
                      <option value="gold">Emas / Gold (Recommended)</option>
                      <option value="blue">Biru / Blue (Trend Following)</option>
                      <option value="emerald">Hijau / Emerald</option>
                      <option value="purple">Ungu / Purple</option>
                    </select>
                  </div>
                </div>

                {/* Pricing & VPS Add-on */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Harga Sewa & Durasi *
                    </label>
                    <input
                      type="text"
                      value={formData.rentalPrice}
                      onChange={(e) => handleChange('rentalPrice', e.target.value)}
                      placeholder="contoh: Sewa Rp 255.000 / bln (Min. 12 Bulan)"
                      className="w-full bg-[#081410] border border-[#1E382E] focus:border-[#10B981] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Info Add-on VPS
                    </label>
                    <input
                      type="text"
                      value={formData.vpsPrice}
                      onChange={(e) => handleChange('vpsPrice', e.target.value)}
                      placeholder="contoh: VPS Rp 1,2 jt / tahun"
                      className="w-full bg-[#081410] border border-[#1E382E] focus:border-[#10B981] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white outline-none"
                    />
                  </div>
                </div>

                {/* 4 Technical Metrics */}
                <div className="p-4 rounded-2xl bg-[#081410] border border-[#1E382E] space-y-3">
                  <div className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-emerald-400" />
                    <span>4 Metrik Teknis Utama</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">Target Profit</label>
                      <input
                        type="text"
                        value={formData.targetProfit}
                        onChange={(e) => handleChange('targetProfit', e.target.value)}
                        placeholder="2-10%/bln"
                        className="w-full bg-[#0D1B16] border border-[#1E382E] focus:border-[#10B981] rounded-lg p-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">Maksimal Risiko</label>
                      <input
                        type="text"
                        value={formData.maxRisk}
                        onChange={(e) => handleChange('maxRisk', e.target.value)}
                        placeholder="2% per trade"
                        className="w-full bg-[#0D1B16] border border-[#1E382E] focus:border-[#10B981] rounded-lg p-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">Min. Deposit</label>
                      <input
                        type="text"
                        value={formData.minDeposit}
                        onChange={(e) => handleChange('minDeposit', e.target.value)}
                        placeholder="$100"
                        className="w-full bg-[#0D1B16] border border-[#1E382E] focus:border-[#10B981] rounded-lg p-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">Platform</label>
                      <input
                        type="text"
                        value={formData.platform}
                        onChange={(e) => handleChange('platform', e.target.value)}
                        placeholder="MT4"
                        className="w-full bg-[#0D1B16] border border-[#1E382E] focus:border-[#10B981] rounded-lg p-2 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Product Image Upload / URL */}
                <div className="p-4 rounded-2xl bg-[#081410] border border-[#1E382E] space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                      Gambar Avatar Robot EA
                    </label>
                    <span className="text-[10px] text-emerald-400">File Base64 / URL</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {/* Preview Thumbnail */}
                    <div className="w-20 h-20 shrink-0 rounded-xl bg-[#0D1B16] border border-[#1E382E] p-1 flex items-center justify-center overflow-hidden">
                      {formData.image ? (
                        <img src={formData.image} alt="Preview" className="w-full h-full object-contain" />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-gray-500" />
                      )}
                    </div>

                    {/* Inputs */}
                    <div className="flex-1 w-full space-y-2">
                      <div className="flex items-center gap-2">
                        <label className="cursor-pointer bg-[#0D1B16] hover:bg-[#13271F] border border-[#1E382E] hover:border-[#10B981]/50 text-xs font-semibold px-4 py-2 rounded-xl inline-flex items-center gap-2 transition-all">
                          <Upload className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Pilih Gambar dari Perangkat</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleProductImageUpload}
                            className="hidden"
                          />
                        </label>
                      </div>

                      <div className="text-[10px] text-gray-400">
                        Atau masukkan URL / path gambar:
                      </div>
                      <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => handleChange('image', e.target.value)}
                        placeholder="/images/ea-rgrowth.png atau https://..."
                        className="w-full bg-[#0D1B16] border border-[#1E382E] focus:border-[#10B981] rounded-xl px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Active Toggle Switch */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#081410] border border-[#1E382E]">
                  <div>
                    <span className="text-xs font-bold text-white block">Status Katalog Publik</span>
                    <span className="text-[11px] text-gray-400">Tampilkan atau sembunyikan EA ini dari halaman pengunjung.</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.active}
                      onChange={(e) => handleChange('active', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#10B981]"></div>
                  </label>
                </div>

              </div>
            )}

            {/* TAB 2: FEATURES CHECKLIST */}
            {activeTab === 'features' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                    Daftar Poin Fitur Unggulan
                  </label>
                  <span className="text-[11px] text-gray-400">Akan tampil dengan centang hijau pada kartu.</span>
                </div>

                {/* Add new feature input */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newFeatureText}
                    onChange={(e) => setNewFeatureText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddFeature();
                      }
                    }}
                    placeholder="Ketik poin fitur baru (contoh: Breakout London Session)..."
                    className="flex-1 bg-[#081410] border border-[#1E382E] focus:border-[#10B981] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="flex items-center gap-1.5 bg-[#10B981] hover:bg-[#059669] text-[#06100C] font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah</span>
                  </button>
                </div>

                {/* List of existing features */}
                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                  {(formData.features || []).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-[#081410] border border-[#1E382E] p-2 rounded-xl">
                      <div className="w-5 h-5 rounded-full bg-[#10B981]/20 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-[#10B981]" />
                      </div>
                      <input
                        type="text"
                        value={feat}
                        onChange={(e) => handleUpdateFeature(idx, e.target.value)}
                        className="flex-1 bg-transparent text-xs text-white outline-none border-b border-transparent focus:border-[#10B981]"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(idx)}
                        className="p-1.5 text-gray-500 hover:text-red-400 transition-colors"
                        title="Hapus poin ini"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {formData.features?.length === 0 && (
                    <p className="text-xs text-gray-500 italic py-4 text-center">
                      Belum ada poin fitur. Silakan tambahkan poin baru di atas.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: BACKTEST REPORT DETAILS */}
            {activeTab === 'backtest' && (
              <div className="space-y-4">
                
                {/* Backtest Image Upload / URL */}
                <div className="p-4 rounded-2xl bg-[#081410] border border-[#1E382E] space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                      Grafik / Bukti Laporan Backtest (Modal Popup)
                    </label>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-32 h-20 shrink-0 rounded-xl bg-[#0D1B16] border border-[#1E382E] p-1 flex items-center justify-center overflow-hidden">
                      {formData.backtestImage ? (
                        <img src={formData.backtestImage} alt="Backtest Preview" className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-gray-500" />
                      )}
                    </div>

                    <div className="flex-1 w-full space-y-2">
                      <label className="cursor-pointer bg-[#0D1B16] hover:bg-[#13271F] border border-[#1E382E] hover:border-[#10B981]/50 text-xs font-semibold px-4 py-2 rounded-xl inline-flex items-center gap-2 transition-all">
                        <Upload className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Upload Gambar Hasil Uji (.PNG / .JPG)</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleBacktestImageUpload}
                          className="hidden"
                        />
                      </label>
                      <input
                        type="text"
                        value={formData.backtestImage}
                        onChange={(e) => handleChange('backtestImage', e.target.value)}
                        placeholder="Path / URL Gambar Backtest..."
                        className="w-full bg-[#0D1B16] border border-[#1E382E] focus:border-[#10B981] rounded-xl px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Backtest Subfields */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">Periode Uji</label>
                    <input
                      type="text"
                      value={formData.backtestDetails?.period || ''}
                      onChange={(e) => handleBacktestChange('period', e.target.value)}
                      placeholder="2015 - 2025 (10 Tahun)"
                      className="w-full bg-[#081410] border border-[#1E382E] rounded-lg p-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">Modal Awal</label>
                    <input
                      type="text"
                      value={formData.backtestDetails?.initialDeposit || ''}
                      onChange={(e) => handleBacktestChange('initialDeposit', e.target.value)}
                      placeholder="$100"
                      className="w-full bg-[#081410] border border-[#1E382E] rounded-lg p-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">Total Net Profit</label>
                    <input
                      type="text"
                      value={formData.backtestDetails?.netProfit || ''}
                      onChange={(e) => handleBacktestChange('netProfit', e.target.value)}
                      placeholder="+$28,450.00"
                      className="w-full bg-[#081410] border border-[#1E382E] rounded-lg p-2 text-xs text-white text-emerald-400 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">Max Drawdown</label>
                    <input
                      type="text"
                      value={formData.backtestDetails?.maxDrawdown || ''}
                      onChange={(e) => handleBacktestChange('maxDrawdown', e.target.value)}
                      placeholder="11.8%"
                      className="w-full bg-[#081410] border border-[#1E382E] rounded-lg p-2 text-xs text-white text-amber-400 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">Win Rate</label>
                    <input
                      type="text"
                      value={formData.backtestDetails?.winRate || ''}
                      onChange={(e) => handleBacktestChange('winRate', e.target.value)}
                      placeholder="78.4%"
                      className="w-full bg-[#081410] border border-[#1E382E] rounded-lg p-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">Profit Factor</label>
                    <input
                      type="text"
                      value={formData.backtestDetails?.profitFactor || ''}
                      onChange={(e) => handleBacktestChange('profitFactor', e.target.value)}
                      placeholder="2.42"
                      className="w-full bg-[#081410] border border-[#1E382E] rounded-lg p-2 text-xs text-white"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[11px] text-gray-400 mb-1">Kualitas Data Modeling</label>
                    <input
                      type="text"
                      value={formData.backtestDetails?.modelingQuality || ''}
                      onChange={(e) => handleBacktestChange('modelingQuality', e.target.value)}
                      placeholder="99.90% Everytick (Tickstory)"
                      className="w-full bg-[#081410] border border-[#1E382E] rounded-lg p-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">Catatan Transparansi / Strategi</label>
                  <textarea
                    rows="3"
                    value={formData.backtestDetails?.notes || ''}
                    onChange={(e) => handleBacktestChange('notes', e.target.value)}
                    placeholder="Keterangan metodologi pengujian, fixed stop loss, dsb."
                    className="w-full bg-[#081410] border border-[#1E382E] rounded-xl p-3 text-xs text-white outline-none"
                  />
                </div>

              </div>
            )}

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#1E382E] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-full border border-[#1E382E] text-xs font-semibold text-gray-300 hover:text-white bg-[#081410] transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-7 py-2.5 rounded-full bg-[#10B981] hover:bg-[#059669] text-[#06100C] text-xs font-bold transition-all shadow-[0_0_20px_rgba(16,185,129,0.35)] cursor-pointer"
              >
                {isEditing ? 'Simpan Perubahan' : 'Terbitkan EA ke Katalog'}
              </button>
            </div>

          </form>

          {/* Right Column: Real-time Live Card Preview */}
          <div className="lg:col-span-5 bg-[#081410] border border-[#1E382E] rounded-2xl p-4 sm:p-5 flex flex-col">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#1E382E]">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-white">Live Card Preview</span>
              </div>
              <span className="text-[10px] text-gray-400 bg-[#0D1B16] px-2 py-0.5 rounded border border-[#1E382E]">
                Sesuai Tampilan Pengunjung
              </span>
            </div>

            {/* Render Preview Card */}
            <div className="relative bg-[#0D1B16] border border-[#1E382E] rounded-2xl p-5 shadow-2xl flex-1 flex flex-col justify-between">
              
              {/* Floating Badge */}
              {formData.badgeText && (
                <div className="absolute -top-3 right-5">
                  <span className={`inline-block text-[10px] font-extrabold px-3 py-0.5 rounded-full border uppercase tracking-wider ${getBadgeStyle(formData.badgeColor)}`}>
                    {formData.badgeText}
                  </span>
                </div>
              )}

              <div>
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-20 h-20 shrink-0 rounded-2xl bg-[#081410] border border-[#1E382E] p-1.5 flex items-center justify-center overflow-hidden">
                    <img
                      src={formData.image || '/images/ea-rgrowth.png'}
                      alt="Avatar"
                      className="w-full h-full object-contain"
                      onError={(e) => { e.target.src = '/images/ea-rgrowth.png'; }}
                    />
                  </div>

                  <div>
                    <h4 className="text-base sm:text-lg font-extrabold text-white leading-tight mb-1">
                      {formData.name || 'Nama Produk Robot EA'}
                    </h4>
                    <div className="text-xs font-bold text-emerald-400">
                      {formData.rentalPrice || 'Rp 255.000 / bln'}
                    </div>
                    {formData.vpsPrice && (
                      <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-0.5">
                        <Server className="w-3 h-3" />
                        <span>{formData.vpsPrice}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 4 Metrics Preview */}
                <div className="grid grid-cols-4 gap-1 p-2 rounded-xl bg-[#081410] border border-[#1E382E] mb-4 text-center">
                  <div>
                    <span className="text-[9px] text-gray-400 block uppercase">Profit</span>
                    <span className="text-[11px] font-bold text-[#10B981]">{formData.targetProfit || '-'}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-400 block uppercase">Risiko</span>
                    <span className="text-[11px] font-bold text-white">{formData.maxRisk || '-'}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-400 block uppercase">Deposit</span>
                    <span className="text-[11px] font-bold text-white">{formData.minDeposit || '-'}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-400 block uppercase">Platform</span>
                    <span className="text-[11px] font-bold text-amber-400">{formData.platform || 'MT4'}</span>
                  </div>
                </div>

                {/* Features Checklist */}
                <div className="space-y-1.5 mb-4">
                  {(formData.features || []).slice(0, 4).map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] text-gray-300">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#10B981]/20 flex items-center justify-center shrink-0">
                        <Check className="w-2 h-2 text-[#10B981]" />
                      </div>
                      <span className="truncate">{f}</span>
                    </div>
                  ))}
                  {(formData.features?.length || 0) > 4 && (
                    <div className="text-[10px] text-gray-400 italic">
                      +{(formData.features?.length || 0) - 4} fitur lainnya
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons Mockup */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#1E382E]">
                <button
                  type="button"
                  className="bg-[#10B981] text-[#06100C] font-bold text-[11px] py-2 rounded-full text-center"
                >
                  Sewa Sekarang
                </button>
                <button
                  type="button"
                  className="bg-[#081410] text-gray-300 border border-[#1E382E] font-semibold text-[11px] py-2 rounded-full text-center"
                >
                  Laporan Backtest
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
