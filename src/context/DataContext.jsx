import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { supabase, supabaseConfigured } from '../lib/supabase';

const DataContext = createContext();

const AUTH_KEY = 'realistisea_admin_auth_v2';
const STORAGE_KEY = 'realistisea_data_v2';

// ─── Default / Seed Data ────────────────────────────────────────────────────
export const DEFAULT_PRODUCTS = [
  {
    id: 'ea-rgrowth',
    name: 'EA RGrowth (XAUUSD Breakout)',
    category: 'Breakout',
    badge_text: 'RECOMMENDED',
    badge_color: 'gold',
    badgeText: 'RECOMMENDED',
    badgeColor: 'gold',
    rental_price: 'Rp 255.000 / bln (Min. 12 Bulan)',
    rentalPrice: 'Rp 255.000 / bln (Min. 12 Bulan)',
    min_duration: '12 Bulan',
    minDuration: '12 Bulan',
    vps_price: 'VPS Rp 1,2 jt / tahun',
    vpsPrice: 'VPS Rp 1,2 jt / tahun',
    target_profit: '2-10%/bln',
    targetProfit: '2-10%/bln',
    max_risk: '2% per trade',
    maxRisk: '2% per trade',
    min_deposit: '$100',
    minDeposit: '$100',
    platform: 'MT4 (M30)',
    features: [
      'XAUUSD Breakout Strategy (M30)',
      'Stop Loss / TP Terukur (Max Risk 2%)',
      'Trailing Stop & Volatility Filter',
      'Data Backtest 2015-2025 Tickstory (10 Tahun)',
    ],
    image: '/images/ea-rgrowth.png',
    backtest_image: '/images/backtest-rgrowth.png',
    backtestImage: '/images/backtest-rgrowth.png',
    mql5_url: 'https://www.mql5.com/en/signals/2388343?source=Site+Signals+My',
    mql5Url: 'https://www.mql5.com/en/signals/2388343?source=Site+Signals+My',
    backtest_details: {
      period: '02.01.2015 - 08.01.2025 (10 Tahun - M30)',
      initialDeposit: '$1,000.00',
      netProfit: '$3,020,878.36',
      profitFactor: '4.50',
      maxDrawdown: '5.69% ($51,360)',
      winRate: '96.64%',
      totalTrades: '2,444 trades',
      modelingQuality: '99.90% Everytick (Tickstory)',
      cagr: '107.2%',
      sharpeRatio: '0.25',
      returnDdRatio: '58.82',
      monthlyAvgProfit: '$24,965.94',
      dailyAvgProfit: '$1,164.56',
      averageTrade: '$1,236.04',
      profitInPips: '10,418,320 Pips',
      grossProfit: '$3,884,148.90',
      grossLoss: '-$863,270.54',
      winCount: '2,362 Wins',
      lossCount: '82 Losses',
      sqn: '10.78 (Holy Grail)',
      reportPdf: '/reports/RGrowth_Tickstory_2015-2025.pdf',
      mql5Url: 'https://www.mql5.com/en/signals/2388343?source=Site+Signals+My',
      notes: 'Laporan resmi pengujian Every-Tick 99.90% Tickstory dengan Quant Analyzer periode 2015-2025. Menghasilkan profit bersih $3.020.878,36 dari deposit $1.000 dengan drawdown terkontrol 5.69% dan win rate 96.64% (2.362 Win dari 2.444 Transaksi). Tanpa Martingale, Grid, atau Averaging.',
    },
    backtestDetails: {
      period: '02.01.2015 - 08.01.2025 (10 Tahun - M30)',
      initialDeposit: '$1,000.00',
      netProfit: '$3,020,878.36',
      profitFactor: '4.50',
      maxDrawdown: '5.69% ($51,360)',
      winRate: '96.64%',
      totalTrades: '2,444 trades',
      modelingQuality: '99.90% Everytick (Tickstory)',
      cagr: '107.2%',
      sharpeRatio: '0.25',
      returnDdRatio: '58.82',
      monthlyAvgProfit: '$24,965.94',
      dailyAvgProfit: '$1,164.56',
      averageTrade: '$1,236.04',
      profitInPips: '10,418,320 Pips',
      grossProfit: '$3,884,148.90',
      grossLoss: '-$863,270.54',
      winCount: '2,362 Wins',
      lossCount: '82 Losses',
      sqn: '10.78 (Holy Grail)',
      reportPdf: '/reports/RGrowth_Tickstory_2015-2025.pdf',
      mql5Url: 'https://www.mql5.com/en/signals/2388343?source=Site+Signals+My',
      notes: 'Laporan resmi pengujian Every-Tick 99.90% Tickstory dengan Quant Analyzer periode 2015-2025. Menghasilkan profit bersih $3.020.878,36 dari deposit $1.000 dengan drawdown terkontrol 5.69% dan win rate 96.64% (2.362 Win dari 2.444 Transaksi). Tanpa Martingale, Grid, atau Averaging.',
    },
    active: true,
  },
  {
    id: 'ea-trendflow',
    name: 'EA RNews',
    category: 'News Trading',
    badge_text: 'COMING SOON',
    badge_color: 'purple',
    badgeText: 'COMING SOON',
    badgeColor: 'purple',
    comingSoon: true,
    rental_price: 'Segera Hadir (Dalam Pengembangan)',
    rentalPrice: 'Segera Hadir (Dalam Pengembangan)',
    min_duration: '6 Bulan',
    minDuration: '6 Bulan',
    vps_price: 'VPS Rp 1,2 jt / tahun',
    vpsPrice: 'VPS Rp 1,2 jt / tahun',
    target_profit: 'TBA',
    targetProfit: 'TBA',
    max_risk: '2% per trade',
    maxRisk: '2% per trade',
    min_deposit: '$100',
    minDeposit: '$100',
    platform: 'MT4',
    features: [
      'High-Impact News Strategy',
      'Proteksi Stop Loss & Filter Spread',
      'Sedang Dalam Tahap Pengembangan & Pengujian',
    ],
    image: '/images/ea-trendflow.png',
    backtest_image: '/images/backtest-trendflow.png',
    backtestImage: '/images/backtest-trendflow.png',
    backtest_details: {
      period: '2015 - 2025 (10 Tahun)',
      initialDeposit: '$100',
      netProfit: '$18,200.00 (+18,100%)',
      profitFactor: '2.15',
      maxDrawdown: '9.4%',
      winRate: '74.2%',
      totalTrades: '3,120 trades',
      modelingQuality: '99.90% Everytick (Tickstory)',
      notes: 'Algoritma trend following multi-pair dengan trailing stop dinamis. Menghindari sideway market dengan volatility filter.',
    },
    backtestDetails: {
      period: '2015 - 2025 (10 Tahun)',
      initialDeposit: '$100',
      netProfit: '$18,200.00 (+18,100%)',
      profitFactor: '2.15',
      maxDrawdown: '9.4%',
      winRate: '74.2%',
      totalTrades: '3,120 trades',
      modelingQuality: '99.90% Everytick (Tickstory)',
      notes: 'Algoritma trend following multi-pair dengan trailing stop dinamis. Menghindari sideway market dengan volatility filter.',
    },
    active: true,
  },
];

export const DEFAULT_SETTINGS = {
  hero: {
    headline1: 'OTOMATISASI TRADING',
    headlineHighlight: 'XAUUSD REALISTIS',
    subheadline: 'Jalankan algoritma trading otomatis dengan manajemen risiko teruji 2% per trade untuk pertumbuhan akun jangka panjang.',
    systemStatus: 'System Status: Online',
    platformSupport: 'MT4 Supported',
    winrate: '96.64%',
    drawdown: '5.69%',
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
      'Full Setup & Monitoring oleh Tim Teknisi RealistisEA',
    ],
  },
  stats: { waClicks: 148, pageViews: 2180 },
};

// ─── Helper: DB row (snake_case) → app object (both cases) ──────────────────
const dbToProduct = (row) => ({
  ...row,
  badgeText: row.badge_text,
  badgeColor: row.badge_color,
  rentalPrice: row.rental_price,
  minDuration: row.min_duration,
  vpsPrice: row.vps_price,
  targetProfit: row.target_profit,
  maxRisk: row.max_risk,
  minDeposit: row.min_deposit,
  backtestImage: row.backtest_image,
  backtestDetails: row.backtest_details,
  mql5Url: row.mql5_url || row.backtest_details?.mql5Url || '',
});

const productToDb = (p) => ({
  id: p.id,
  name: p.name,
  category: p.category || '',
  badge_text: p.badgeText || p.badge_text || '',
  badge_color: p.badgeColor || p.badge_color || '',
  rental_price: p.rentalPrice || p.rental_price || '',
  min_duration: p.minDuration || p.min_duration || '',
  vps_price: p.vpsPrice || p.vps_price || '',
  target_profit: p.targetProfit || p.target_profit || '',
  max_risk: p.maxRisk || p.max_risk || '',
  min_deposit: p.minDeposit || p.min_deposit || '',
  platform: p.platform || '',
  image: p.image || '',
  backtest_image: p.backtestImage || p.backtest_image || '',
  features: Array.isArray(p.features) ? p.features : [],
  backtest_details: {
    ...(p.backtestDetails || p.backtest_details || {}),
    mql5Url: p.mql5Url || p.mql5_url || p.backtestDetails?.mql5Url || p.backtest_details?.mql5Url || '',
  },
  active: p.active !== undefined ? p.active : true,
});

// ─── localStorage helpers (fallback when Supabase not configured) ────────────
const lsGetProducts = () => {
  try {
    const s = localStorage.getItem(STORAGE_KEY + '_products');
    return s ? JSON.parse(s) : DEFAULT_PRODUCTS;
  } catch { return DEFAULT_PRODUCTS; }
};
const lsSaveProducts = (arr) => {
  try { localStorage.setItem(STORAGE_KEY + '_products', JSON.stringify(arr)); } catch {}
};
const lsGetSettings = () => {
  try {
    const s = localStorage.getItem(STORAGE_KEY + '_settings');
    return s ? JSON.parse(s) : DEFAULT_SETTINGS;
  } catch { return DEFAULT_SETTINGS; }
};
const lsSaveSettings = (obj) => {
  try { localStorage.setItem(STORAGE_KEY + '_settings', JSON.stringify(obj)); } catch {}
};

// ─── Provider ────────────────────────────────────────────────────────────────
export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [dbReady, setDbReady] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    () => sessionStorage.getItem(AUTH_KEY) === 'true'
  );
  const channelRef = useRef(null);

  // ── Seed default data to Supabase ─────────────────────────────────────────
  const seedDefaults = async () => {
    if (!supabase) return;
    try {
      const rows = DEFAULT_PRODUCTS.map(productToDb);
      const { error } = await supabase.from('products').insert(rows);
      if (!error) {
        setProducts(DEFAULT_PRODUCTS);
        const settingEntries = Object.entries(DEFAULT_SETTINGS).map(([key, value]) => ({
          key, value, updated_at: new Date().toISOString(),
        }));
        await supabase.from('settings').upsert(settingEntries, { onConflict: 'key' });
        setDbReady(true);
      }
    } catch (err) { console.error('Seed error:', err); }
  };

  // ── Load data ─────────────────────────────────────────────────────────────
  const loadData = useCallback(async () => {
    if (!supabaseConfigured || !supabase) {
      // No Supabase config → use localStorage
      console.warn('Supabase not configured. Using localStorage.');
      setProducts(lsGetProducts());
      setSettings(lsGetSettings());
      setLoading(false);
      return;
    }

    try {
      const { data: prodRows, error: prodErr } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: true });

      if (prodErr) {
        console.warn('Supabase products error (table/permission may not be ready):', prodErr.message);
        setProducts(lsGetProducts());
        setDbReady(false);
      } else {
        setDbReady(true);
        if (prodRows.length === 0) {
          await seedDefaults();
        } else {
          setProducts(prodRows.map(dbToProduct));
        }
      }

      const { data: settRows, error: settErr } = await supabase.from('settings').select('*');
      if (!settErr && settRows && settRows.length > 0) {
        const merged = { ...DEFAULT_SETTINGS };
        settRows.forEach((row) => {
          merged[row.key] = { ...DEFAULT_SETTINGS[row.key], ...row.value };
        });
        setSettings(merged);
        setDbReady(true);
      } else {
        setSettings(lsGetSettings());
      }
    } catch (err) {
      console.error('Supabase load error:', err);
      setProducts(lsGetProducts());
      setSettings(lsGetSettings());
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Realtime subscription ─────────────────────────────────────────────────
  const subscribeRealtime = useCallback(() => {
    if (!supabase) return;
    if (channelRef.current) supabase.removeChannel(channelRef.current);

    channelRef.current = supabase
      .channel('realtime-realistisea')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, async () => {
        const { data, error } = await supabase
          .from('products').select('*').order('created_at', { ascending: true });
        if (!error && data) setProducts(data.map(dbToProduct));
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'settings' }, async () => {
        const { data, error } = await supabase.from('settings').select('*');
        if (!error && data && data.length > 0) {
          const merged = { ...DEFAULT_SETTINGS };
          data.forEach((row) => { merged[row.key] = { ...DEFAULT_SETTINGS[row.key], ...row.value }; });
          setSettings(merged);
        }
      })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') console.log('✅ Realtime connected');
      });
  }, []);

  useEffect(() => {
    loadData();
    subscribeRealtime();

    const handleFocus = () => {
      if (document.visibilityState === 'visible') {
        loadData();
      }
    };
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleFocus);
      if (channelRef.current && supabase) supabase.removeChannel(channelRef.current);
    };
  }, [loadData, subscribeRealtime]);

  // ── Auth ──────────────────────────────────────────────────────────────────
  const loginAdmin = (username, password) => {
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

  // ── Product CRUD ──────────────────────────────────────────────────────────
  const addProduct = async (newProduct) => {
    const id = newProduct.id || 'ea-' + Date.now();
    const full = { ...newProduct, id };
    const row = productToDb(full);
    const display = dbToProduct(row);

    if (supabaseConfigured && supabase && dbReady) {
      const { error } = await supabase.from('products').insert([row]);
      if (error) {
        console.error('addProduct error:', error);
        setProducts((prev) => [display, ...prev]);
        lsSaveProducts([display, ...products]);
      }
      // Realtime handles state update
    } else {
      const updated = [display, ...products];
      setProducts(updated);
      lsSaveProducts(updated);
    }
    return display;
  };

  const updateProduct = async (id, updatedFields) => {
    const existing = products.find((p) => p.id === id) || {};
    const merged = { ...existing, ...updatedFields };
    const row = productToDb(merged);
    const display = dbToProduct(row);

    if (supabaseConfigured && supabase && dbReady) {
      const { error } = await supabase.from('products').update(row).eq('id', id);
      if (error) {
        console.error('updateProduct error:', error);
        const updated = products.map((p) => (p.id === id ? display : p));
        setProducts(updated);
        lsSaveProducts(updated);
      }
    } else {
      const updated = products.map((p) => (p.id === id ? display : p));
      setProducts(updated);
      lsSaveProducts(updated);
    }
  };

  const deleteProduct = async (id) => {
    if (supabaseConfigured && supabase && dbReady) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) {
        console.error('deleteProduct error:', error);
        const updated = products.filter((p) => p.id !== id);
        setProducts(updated);
        lsSaveProducts(updated);
      }
    } else {
      const updated = products.filter((p) => p.id !== id);
      setProducts(updated);
      lsSaveProducts(updated);
    }
  };

  // ── Settings ──────────────────────────────────────────────────────────────
  const updateSettings = async (updatedSettings) => {
    const merged = {
      ...settings,
      ...updatedSettings,
      hero: { ...settings.hero, ...(updatedSettings.hero || {}) },
      contact: { ...settings.contact, ...(updatedSettings.contact || {}) },
      vps: { ...settings.vps, ...(updatedSettings.vps || {}) },
      stats: { ...settings.stats, ...(updatedSettings.stats || {}) },
    };
    setSettings(merged);
    lsSaveSettings(merged);

    if (supabaseConfigured && supabase && dbReady) {
      const entries = Object.entries(merged)
        .filter(([k]) => ['hero', 'contact', 'vps', 'stats'].includes(k))
        .map(([key, value]) => ({ key, value, updated_at: new Date().toISOString() }));
      const { error } = await supabase.from('settings').upsert(entries, { onConflict: 'key' });
      if (error) console.error('updateSettings error:', error);
    }
  };

  const trackWaClick = async () => {
    const newCount = (settings.stats?.waClicks || 0) + 1;
    await updateSettings({ stats: { ...settings.stats, waClicks: newCount } });
  };

  const getWhatsAppLink = (product = null) => {
    const phone = settings.contact?.whatsappNumber || '6281234567890';
    let text = settings.contact?.waMessageTemplate || 'Halo Admin RealistisEA, saya tertarik menyewa EA.';
    if (product) {
      text = text.replace('{ea_name}', product.name).replace('{price}', product.rentalPrice || product.rental_price || '');
    } else {
      text = text.replace('{ea_name}', 'EA RealistisEA').replace('{price}', 'Paket Pilihan');
    }
    return `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
  };

  const resetToDefault = async () => {
    if (supabaseConfigured && supabase && dbReady) {
      await supabase.from('products').delete().neq('id', '___none___');
      await seedDefaults();
      const settingEntries = Object.entries(DEFAULT_SETTINGS).map(([key, value]) => ({
        key, value, updated_at: new Date().toISOString(),
      }));
      await supabase.from('settings').upsert(settingEntries, { onConflict: 'key' });
    }
    setProducts(DEFAULT_PRODUCTS);
    setSettings(DEFAULT_SETTINGS);
    lsSaveProducts(DEFAULT_PRODUCTS);
    lsSaveSettings(DEFAULT_SETTINGS);
  };

  return (
    <DataContext.Provider
      value={{
        products,
        settings,
        loading,
        dbReady,
        supabaseConfigured,
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};
