import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';

const DataContext = createContext();

const AUTH_KEY = 'realistisea_admin_auth_v2';

// ─── Default / Seed Data ────────────────────────────────────────────────────
export const DEFAULT_PRODUCTS = [
  {
    id: 'ea-rgrowth',
    name: 'EA RGrowth (XAUUSD Breakout)',
    category: 'Breakout',
    badge_text: 'RECOMMENDED',
    badge_color: 'gold',
    rental_price: 'Rp 255.000 / bln (Min. 12 Bulan)',
    min_duration: '12 Bulan',
    vps_price: 'VPS Rp 1,2 jt / tahun',
    target_profit: '2-10%/bln',
    max_risk: '2% per trade',
    min_deposit: '$100',
    platform: 'MT4',
    features: [
      'Breakout Strategy',
      'Stop Loss / TP',
      'Trailing Stop Management',
      'Data Backtest 2015-2025 (Tickstory)',
    ],
    image: '/images/ea-rgrowth.png',
    backtest_image: '/images/backtest-rgrowth.png',
    backtest_details: {
      period: '2015 - 2025 (10 Tahun)',
      initialDeposit: '$100',
      netProfit: '$28,450.00 (+28,350%)',
      profitFactor: '2.42',
      maxDrawdown: '11.8%',
      winRate: '78.4%',
      totalTrades: '2,840 trades',
      modelingQuality: '99.90% Everytick (Tickstory)',
      notes:
        'Pengujian Every Tick murni dengan spread riil dan slippage. Tanpa sistem Martingale, Averaging, ataupun Grid berisiko.',
    },
    active: true,
  },
  {
    id: 'ea-trendflow',
    name: 'EA TrendFlow (EURUSD / GBPUSD)',
    category: 'Trend Following',
    badge_text: 'Trend Following',
    badge_color: 'blue',
    rental_price: 'Sewa Rp 200.000 / bln',
    min_duration: '6 Bulan',
    vps_price: 'VPS Rp 1,2 jt / tahun',
    target_profit: '3-8%/bln',
    max_risk: '2% per trade',
    min_deposit: '$100',
    platform: 'MT4',
    features: ['Trend Following', 'Trailing Stop', 'Backtest 2015-2025'],
    image: '/images/ea-trendflow.png',
    backtest_image: '/images/backtest-trendflow.png',
    backtest_details: {
      period: '2015 - 2025 (10 Tahun)',
      initialDeposit: '$100',
      netProfit: '$18,200.00 (+18,100%)',
      profitFactor: '2.15',
      maxDrawdown: '9.4%',
      winRate: '74.2%',
      totalTrades: '3,120 trades',
      modelingQuality: '99.90% Everytick (Tickstory)',
      notes:
        'Algoritma trend following multi-pair dengan trailing stop dinamis. Menghindari sideway market dengan volatility filter.',
    },
    active: true,
  },
];

export const DEFAULT_SETTINGS = {
  hero: {
    headline1: 'OTOMATISASI TRADING',
    headlineHighlight: 'XAUUSD REALISTIS',
    subheadline:
      'Jalankan algoritma trading otomatis dengan manajemen risiko teruji 2% per trade untuk pertumbuhan akun jangka panjang.',
    systemStatus: 'System Status: Online',
    platformSupport: 'MT4 Supported',
    winrate: '78.4%',
    drawdown: '<15%',
    verifiedYears: '10 Tahun',
    heroImage: '/images/hero-robot-clean.png',
  },
  contact: {
    whatsappNumber: '6281234567890',
    waMessageTemplate:
      'Halo Admin RealistisEA, saya tertarik untuk sewa {ea_name} dengan paket {price}. Mohon info aktivasi dan bantuan setup MT4.',
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
  stats: {
    waClicks: 148,
    pageViews: 2180,
  },
};

// ─── Helper: map DB row (snake_case) ↔ app object ────────────────────────────
// DB already uses snake_case, we keep it consistent.
// Legacy camelCase fields are aliased for backward compat with existing components.
const dbToProduct = (row) => ({
  ...row,
  // camelCase aliases for existing components
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
  backtest_details: p.backtestDetails || p.backtest_details || {},
  active: p.active !== undefined ? p.active : true,
});

// ─── Provider ────────────────────────────────────────────────────────────────
export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [dbReady, setDbReady] = useState(false); // true once we confirmed tables exist

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    () => sessionStorage.getItem(AUTH_KEY) === 'true'
  );

  const channelRef = useRef(null);

  // ── Initial load from Supabase ──────────────────────────────────────────
  const loadFromSupabase = useCallback(async () => {
    try {
      // Load products
      const { data: prodRows, error: prodErr } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: true });

      if (prodErr) {
        // Table might not exist yet — use defaults, don't crash
        console.warn('Products table not ready, using defaults:', prodErr.message);
        setProducts(DEFAULT_PRODUCTS.map(dbToProduct));
        setDbReady(false);
      } else {
        if (prodRows.length === 0) {
          // Empty table — seed default data
          await seedDefaults();
        } else {
          setProducts(prodRows.map(dbToProduct));
          setDbReady(true);
        }
      }

      // Load settings
      const { data: settRows, error: settErr } = await supabase
        .from('settings')
        .select('*');

      if (!settErr && settRows && settRows.length > 0) {
        const merged = { ...DEFAULT_SETTINGS };
        settRows.forEach((row) => {
          merged[row.key] = { ...DEFAULT_SETTINGS[row.key], ...row.value };
        });
        setSettings(merged);
        setDbReady(true);
      }
    } catch (err) {
      console.error('Supabase load error:', err);
      setProducts(DEFAULT_PRODUCTS.map(dbToProduct));
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Seed default data to Supabase ──────────────────────────────────────
  const seedDefaults = async () => {
    try {
      const rows = DEFAULT_PRODUCTS.map(productToDb);
      const { error } = await supabase.from('products').insert(rows);
      if (!error) {
        setProducts(DEFAULT_PRODUCTS.map(dbToProduct));

        // Seed settings
        const settingEntries = Object.entries(DEFAULT_SETTINGS).map(([key, value]) => ({
          key,
          value,
          updated_at: new Date().toISOString(),
        }));
        await supabase.from('settings').upsert(settingEntries, { onConflict: 'key' });
        setDbReady(true);
      }
    } catch (err) {
      console.error('Seed error:', err);
    }
  };

  // ── Subscribe to Realtime changes ───────────────────────────────────────
  const subscribeRealtime = useCallback(() => {
    // Clean up any existing channel
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
    }

    channelRef.current = supabase
      .channel('realtime-realistisea')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products' },
        async () => {
          // Re-fetch full product list on any change
          const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: true });
          if (!error && data) {
            setProducts(data.map(dbToProduct));
          }
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'settings' },
        async () => {
          const { data, error } = await supabase.from('settings').select('*');
          if (!error && data && data.length > 0) {
            const merged = { ...DEFAULT_SETTINGS };
            data.forEach((row) => {
              merged[row.key] = { ...DEFAULT_SETTINGS[row.key], ...row.value };
            });
            setSettings(merged);
          }
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log('✅ Realtime connected — changes will sync instantly across all devices');
        }
      });
  }, []);

  useEffect(() => {
    loadFromSupabase();
    subscribeRealtime();

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, [loadFromSupabase, subscribeRealtime]);

  // ── Auth ─────────────────────────────────────────────────────────────────
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

  // ── Product CRUD (Supabase) ───────────────────────────────────────────────
  const addProduct = async (newProduct) => {
    const id = newProduct.id || 'ea-' + Date.now();
    const row = productToDb({ ...newProduct, id });

    if (dbReady) {
      const { error } = await supabase.from('products').insert([row]);
      if (error) {
        console.error('addProduct error:', error);
        // Optimistic fallback
        setProducts((prev) => [dbToProduct(row), ...prev]);
      }
      // Realtime will update state automatically
    } else {
      // DB not ready — update local state only
      setProducts((prev) => [dbToProduct(row), ...prev]);
    }
    return dbToProduct(row);
  };

  const updateProduct = async (id, updatedFields) => {
    const existing = products.find((p) => p.id === id) || {};
    const merged = { ...existing, ...updatedFields };
    const row = productToDb(merged);

    if (dbReady) {
      const { error } = await supabase.from('products').update(row).eq('id', id);
      if (error) {
        console.error('updateProduct error:', error);
        setProducts((prev) => prev.map((p) => (p.id === id ? dbToProduct(row) : p)));
      }
      // Realtime updates state
    } else {
      setProducts((prev) => prev.map((p) => (p.id === id ? dbToProduct(row) : p)));
    }
  };

  const deleteProduct = async (id) => {
    if (dbReady) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) {
        console.error('deleteProduct error:', error);
        setProducts((prev) => prev.filter((p) => p.id !== id));
      }
      // Realtime updates state
    } else {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // ── Settings CRUD ────────────────────────────────────────────────────────
  const updateSettings = async (updatedSettings) => {
    const merged = {
      ...settings,
      ...updatedSettings,
      hero: { ...settings.hero, ...(updatedSettings.hero || {}) },
      contact: { ...settings.contact, ...(updatedSettings.contact || {}) },
      vps: { ...settings.vps, ...(updatedSettings.vps || {}) },
      stats: { ...settings.stats, ...(updatedSettings.stats || {}) },
    };
    setSettings(merged); // Optimistic update

    if (dbReady) {
      const entries = Object.entries(merged)
        .filter(([k]) => ['hero', 'contact', 'vps', 'stats'].includes(k))
        .map(([key, value]) => ({ key, value, updated_at: new Date().toISOString() }));

      const { error } = await supabase
        .from('settings')
        .upsert(entries, { onConflict: 'key' });
      if (error) console.error('updateSettings error:', error);
    }
  };

  // ── WA Click Tracker ─────────────────────────────────────────────────────
  const trackWaClick = async () => {
    const newCount = (settings.stats?.waClicks || 0) + 1;
    await updateSettings({ stats: { ...settings.stats, waClicks: newCount } });
  };

  // ── WhatsApp Link Helper ─────────────────────────────────────────────────
  const getWhatsAppLink = (product = null) => {
    const phone = settings.contact?.whatsappNumber || '6281234567890';
    let text =
      settings.contact?.waMessageTemplate ||
      'Halo Admin RealistisEA, saya tertarik menyewa EA.';
    if (product) {
      text = text
        .replace('{ea_name}', product.name)
        .replace('{price}', product.rentalPrice || product.rental_price || '');
    } else {
      text = text.replace('{ea_name}', 'EA RealistisEA').replace('{price}', 'Paket Pilihan');
    }
    return `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
  };

  // ── Reset to Default ─────────────────────────────────────────────────────
  const resetToDefault = async () => {
    if (dbReady) {
      // Delete all then re-seed
      await supabase.from('products').delete().neq('id', '___none___');
      await seedDefaults();

      const settingEntries = Object.entries(DEFAULT_SETTINGS).map(([key, value]) => ({
        key,
        value,
        updated_at: new Date().toISOString(),
      }));
      await supabase.from('settings').upsert(settingEntries, { onConflict: 'key' });
    }
    setProducts(DEFAULT_PRODUCTS.map(dbToProduct));
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <DataContext.Provider
      value={{
        products,
        settings,
        loading,
        dbReady,
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
