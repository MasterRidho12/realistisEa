import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

const STORAGE_KEY = 'realistisea_data_v2';
const AUTH_KEY = 'realistisea_admin_auth_v2';

const DEFAULT_PRODUCTS = [
  {
    id: 'ea-rgrowth',
    name: 'EA RGrowth (XAUUSD Breakout)',
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
  },
  {
    id: 'ea-trendflow',
    name: 'EA TrendFlow (EURUSD / GBPUSD)',
    category: 'Trend Following',
    badgeText: 'Trend Following',
    badgeColor: 'blue',
    rentalPrice: 'Sewa Rp 200.000 / bln',
    minDuration: '6 Bulan',
    vpsPrice: 'VPS Rp 1,2 jt / tahun',
    targetProfit: '3-8%/bln',
    maxRisk: '2% per trade',
    minDeposit: '$100',
    platform: 'MT4',
    features: [
      'Trend Following',
      'Trailing Stop',
      'Backtest 2015-2025'
    ],
    image: '/images/ea-trendflow.png',
    backtestImage: '/images/backtest-trendflow.png',
    backtestDetails: {
      period: '2015 - 2025 (10 Tahun)',
      initialDeposit: '$100',
      netProfit: '$18,200.00 (+18,100%)',
      profitFactor: '2.15',
      maxDrawdown: '9.4%',
      winRate: '74.2%',
      totalTrades: '3,120 trades',
      modelingQuality: '99.90% Everytick (Tickstory)',
      notes: 'Algoritma trend following multi-pair dengan trailing stop dinamis. Menghindari sideway market dengan volatility filter.'
    },
    active: true,
  }
];

const DEFAULT_SETTINGS = {
  hero: {
    headline1: 'OTOMATISASI TRADING',
    headlineHighlight: 'XAUUSD REALISTIS',
    subheadline: 'Jalankan algoritma trading otomatis dengan manajemen risiko teruji 2% per trade untuk pertumbuhan akun jangka panjang.',
    systemStatus: 'System Status: Online',
    platformSupport: 'MT4 Supported',
    winrate: '78.4%',
    drawdown: '<15%',
    verifiedYears: '10 Tahun',
    heroImage: '/images/hero-robot-clean.png',
  },
  contact: {
    whatsappNumber: '6281234567890',
    waMessageTemplate: 'Halo Admin RealistisEA, saya tertarik untuk sewa {ea_name} dengan paket {price}. Mohon info aktivasi dan bantuan setup MT4.',
  },
  vps: {
    title: 'Layanan VPS Trading 24/7',
    price: 'Rp 1.200.000 / tahun',
    specs: [
      'Server Khusus Trading Uptime 99.99%',
      'Ultra Low Latency (<1ms ke Broker SG/London)',
      'Auto-Restart MT4 jika Server Mengalami Reboot',
      'Full Setup & Monitoring oleh Tim Teknisi RealistisEA'
    ]
  },
  stats: {
    waClicks: 148,
    pageViews: 2180,
  }
};

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_products');
      return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
    } catch (e) {
      return DEFAULT_PRODUCTS;
    }
  });

  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_settings');
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch (e) {
      return DEFAULT_SETTINGS;
    }
  });

  // Auth in sessionStorage
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY + '_products', JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to localStorage', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY + '_settings', JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings to localStorage', e);
    }
  }, [settings]);

  // Auth Login / Logout
  const loginAdmin = (username, password) => {
    // Accepts username 'admin' (or any username) with password 'admin123'
    if (password === 'admin123') {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem(AUTH_KEY, 'true');
      sessionStorage.setItem(AUTH_KEY + '_user', username || 'admin');
      return { success: true };
    }
    return { success: false, message: 'Password salah! Gunakan password: admin123' };
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem(AUTH_KEY + '_user');
  };

  // Product CRUD
  const addProduct = (newProduct) => {
    const id = newProduct.id || 'ea-' + Date.now();
    const product = { ...newProduct, id };
    setProducts(prev => [product, ...prev]);
    return product;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Update Settings
  const updateSettings = (updatedSettings) => {
    setSettings(prev => ({
      ...prev,
      ...updatedSettings,
      hero: { ...prev.hero, ...(updatedSettings.hero || {}) },
      contact: { ...prev.contact, ...(updatedSettings.contact || {}) },
      vps: { ...prev.vps, ...(updatedSettings.vps || {}) },
      stats: { ...prev.stats, ...(updatedSettings.stats || {}) },
    }));
  };

  // Click tracker
  const trackWaClick = (eaName = 'General') => {
    setSettings(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        waClicks: (prev.stats?.waClicks || 0) + 1
      }
    }));
  };

  // Helper for WhatsApp link
  const getWhatsAppLink = (product = null) => {
    const phone = settings.contact?.whatsappNumber || '6281234567890';
    let text = settings.contact?.waMessageTemplate || 'Halo Admin RealistisEA, saya tertarik menyewa EA.';
    if (product) {
      text = text
        .replace('{ea_name}', product.name)
        .replace('{price}', product.rentalPrice);
    } else {
      text = text
        .replace('{ea_name}', 'EA RealistisEA')
        .replace('{price}', 'Paket Pilihan');
    }
    return `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
  };

  // Reset Data to Default
  const resetToDefault = () => {
    setProducts(DEFAULT_PRODUCTS);
    setSettings(DEFAULT_SETTINGS);
    localStorage.removeItem(STORAGE_KEY + '_products');
    localStorage.removeItem(STORAGE_KEY + '_settings');
  };

  return (
    <DataContext.Provider value={{
      products,
      settings,
      isAdminLoggedIn,
      loginAdmin,
      logoutAdmin,
      addProduct,
      updateProduct,
      deleteProduct,
      updateSettings,
      trackWaClick,
      getWhatsAppLink,
      resetToDefault,
      DEFAULT_PRODUCTS,
      DEFAULT_SETTINGS,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
