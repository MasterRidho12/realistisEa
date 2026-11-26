import React from 'react';
import { ArrowRight, CheckCircle2, TrendingUp, ShieldCheck, Cpu, Activity, BarChart2 } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function HeroSection() {
  const { settings } = useData();
  const hero = settings.hero || {};

  const scrollToKatalog = () => {
    const el = document.getElementById('katalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBacktest = () => {
    const el = document.getElementById('backtest');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] lg:w-[900px] lg:h-[500px] bg-[#0B241A] rounded-full blur-[130px] opacity-70 pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-[350px] h-[350px] bg-[#10B981]/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Kolom Kiri: Teks & CTA */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
            
            {/* Top Sub-Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D1B16] border border-[#1E382E] mb-6 shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                Institutional Algorithmic Strategy
              </span>
            </div>

            {/* Headline Utama */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white leading-[1.15] mb-6">
              {hero.headline1 || 'OTOMATISASI TRADING'}{' '}
              <br className="hidden sm:inline" />
              <span className="text-[#10B981] drop-shadow-[0_0_20px_rgba(16,185,129,0.35)]">
                {hero.headlineHighlight || 'XAUUSD REALISTIS'}
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-xl mb-8 leading-relaxed font-normal">
              {hero.subheadline || 'Jalankan algoritma trading otomatis dengan manajemen risiko teruji 2% per trade untuk pertumbuhan akun jangka panjang.'}
            </p>

            {/* Dua Tombol Sejajar */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-8">
              <button
                onClick={scrollToKatalog}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm md:text-base font-bold bg-[#10B981] text-black hover:bg-[#059669] transition-all duration-200 shadow-emerald-sm hover:shadow-emerald-glow transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Lihat Katalog EA</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={scrollToBacktest}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm md:text-base font-semibold bg-transparent text-gray-200 hover:text-white border border-[#1E382E] hover:border-gray-500 bg-[#0D1B16]/50 hover:bg-[#0D1B16] transition-all duration-200"
              >
                <span>Pelajari Backtest</span>
              </button>
            </div>

            {/* Status Badges di Bawah Tombol */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D1B16] border border-[#1E382E]">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
                <span className="text-xs font-medium text-gray-300">
                  {hero.systemStatus || 'System Status: Online'}
                </span>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D1B16] border border-[#1E382E]">
                <Cpu className="w-3.5 h-3.5 text-[#EAB308]" />
                <span className="text-xs font-medium text-gray-300">
                  {hero.platformSupport || 'MT4 Supported'}
                </span>
              </div>
            </div>

          </div>

          {/* Kolom Kanan: Visual Robot Futuristik & Floating Cards */}
          <div className="lg:col-span-5 relative flex items-center justify-center mt-4 lg:mt-0">
            
            {/* Visual Container */}
            <div className="relative w-full max-w-[420px] lg:max-w-none flex items-center justify-center">
              
              {/* Glowing Background Radial Behind Robot */}
              <div className="absolute w-[280px] sm:w-[360px] h-[280px] sm:h-[360px] bg-gradient-to-tr from-[#10B981]/25 via-[#0B241A] to-transparent rounded-full blur-2xl -z-10" />

              {/* Candlestick Glow Visual Element */}
              <div className="relative rounded-2xl overflow-hidden border border-[#1E382E]/80 bg-[#0D1B16]/60 backdrop-blur-sm p-4 sm:p-6 shadow-2xl group">
                <img
                  src={hero.heroImage || '/images/hero-robot-full.png'}
                  alt="RealistisEA AI Trading Robot"
                  className="w-full h-auto max-h-[360px] sm:max-h-[420px] object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/hero-robot.png';
                  }}
                />

                {/* Subtitle candlestick overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#06100C] via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>

              {/* Floating Card 1: Mini Equity Curve (Top Left on Desktop, Positioned around visual) */}
              <div className="absolute -top-4 -left-4 sm:-left-8 bg-[#0D1B16]/90 backdrop-blur-md border border-[#1E382E] rounded-xl p-3 shadow-xl animate-float-slow z-20 hidden xs:block">
                <div className="flex items-center gap-2 mb-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#10B981]" />
                  <span className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">Equity Curve</span>
                </div>
                {/* SVG Mini Curve */}
                <svg className="w-28 sm:w-32 h-10 overflow-visible" viewBox="0 0 120 40">
                  <defs>
                    <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,35 Q 20,33 40,26 T 80,16 T 110,8 L 120,4 L 120,40 L 0,40 Z"
                    fill="url(#curveGradient)"
                  />
                  <path
                    d="M0,35 Q 20,33 40,26 T 80,16 T 110,8 L 120,4"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="120" cy="4" r="3" fill="#10B981" />
                </svg>
              </div>

              {/* Floating Card 2: Winrate & Drawdown (Bottom Left) */}
              <div className="absolute -bottom-5 -left-2 sm:-left-6 bg-[#0D1B16]/90 backdrop-blur-md border border-[#1E382E] rounded-xl px-3.5 py-2.5 shadow-xl animate-float-delay z-20">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-[10px] text-gray-400 font-medium">Winrate</div>
                    <div className="text-sm font-bold text-[#10B981]">{hero.winrate || '78.4%'}</div>
                  </div>
                  <div className="w-[1px] h-6 bg-[#1E382E]" />
                  <div>
                    <div className="text-[10px] text-gray-400 font-medium">Drawdown</div>
                    <div className="text-sm font-bold text-white">{hero.drawdown || '<15%'}</div>
                  </div>
                </div>
              </div>

              {/* Floating Card 3: Terverifikasi 10 Tahun (Bottom Right) */}
              <div className="absolute -bottom-5 -right-2 sm:-right-4 bg-[#0D1B16]/90 backdrop-blur-md border border-[#1E382E] rounded-full px-3.5 py-2 shadow-xl z-20 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] fill-[#10B981]/20" />
                <span className="text-xs font-bold text-white tracking-wide">
                  Terverifikasi {hero.verifiedYears || '10 Tahun'}
                </span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
