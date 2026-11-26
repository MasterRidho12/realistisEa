import React from 'react';
import { useData } from '../../context/DataContext';
import { CheckCircle2, TrendingUp, ShieldCheck, ArrowRight, Activity, Terminal } from 'lucide-react';

export const HeroSection = () => {
  const { settings } = useData();
  const hero = settings.hero || {};

  const scrollToKatalog = (e) => {
    e.preventDefault();
    document.querySelector('#katalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBacktest = (e) => {
    e.preventDefault();
    document.querySelector('#backtest')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24">
      {/* Background radial emerald ambient glow */}
      <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-[#10B981]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-10 left-10 w-[350px] h-[350px] bg-[#0B241A]/50 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
            
            {/* Top Tagline */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0D1B16] border border-[#1E382E] mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Solusi Algoritma Disiplin
              </span>
            </div>

            {/* Big Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white leading-[1.1] mb-6">
              {hero.headline1 || 'OTOMATISASI TRADING'}{' '}
              <span className="block mt-1 text-white">
                XAUUSD{' '}
                <span className="text-[#10B981] drop-shadow-[0_0_25px_rgba(16,185,129,0.4)]">
                  {hero.headlineHighlight ? hero.headlineHighlight.replace('XAUUSD ', '') : 'REALISTIS'}
                </span>
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-gray-400 max-w-xl mb-8 leading-relaxed font-normal">
              {hero.subheadline || 'Jalankan algoritma trading otomatis dengan manajemen risiko teruji 2% per trade untuk pertumbuhan akun jangka panjang.'}
            </p>

            {/* Two Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto mb-8">
              <a
                href="#katalog"
                onClick={scrollToKatalog}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#059669] text-[#06100C] font-bold text-base px-8 py-3.5 rounded-full transition-all duration-300 shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:shadow-[0_0_35px_rgba(16,185,129,0.55)] transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>Lihat Katalog EA</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#backtest"
                onClick={scrollToBacktest}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0D1B16] hover:bg-[#13271F] text-white border border-[#1E382E] hover:border-[#10B981]/50 font-semibold text-base px-7 py-3.5 rounded-full transition-all duration-300 cursor-pointer"
              >
                <span>Pelajari Backtest</span>
              </a>
            </div>

            {/* Status Badges below buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 border-t border-[#1E382E]/60 w-full sm:w-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0D1B16]/80 border border-[#1E382E]">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-gray-200">
                  {hero.systemStatus || 'System Status: Online'}
                </span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0D1B16]/80 border border-[#1E382E]">
                <Terminal className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-xs font-semibold text-gray-200">
                  {hero.platformSupport || 'MT4 Supported'}
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Robot & Floating Glassmorphism Cards */}
          <div className="lg:col-span-5 relative flex items-center justify-center mt-6 lg:mt-0">
            
            {/* Ambient circular backdrop */}
            <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
              
              {/* Radial gradient frame */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#0B241A] via-[#0D1B16] to-[#10B981]/20 border border-[#1E382E] shadow-[0_0_50px_rgba(16,185,129,0.15)] flex items-center justify-center overflow-hidden">
                {/* Background Candlesticks pattern effect */}
                <div className="absolute inset-0 opacity-20 flex justify-around items-end px-6 pb-12 pointer-events-none">
                  <div className="w-2 h-32 bg-emerald-500 rounded-t-sm" />
                  <div className="w-2 h-44 bg-emerald-400 rounded-t-sm" />
                  <div className="w-2 h-24 bg-emerald-600 rounded-t-sm" />
                  <div className="w-2 h-52 bg-emerald-500 rounded-t-sm" />
                  <div className="w-2 h-36 bg-emerald-400 rounded-t-sm" />
                </div>
              </div>

              {/* Main Robot Image */}
              <div className="relative z-10 w-full h-full flex items-center justify-center p-2">
                <img
                  src={hero.heroImage || '/images/hero-robot-clean.png'}
                  alt="RealistisEA AI Trading Robot"
                  className="max-h-[340px] sm:max-h-[380px] object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)] filter transition-transform duration-500 hover:scale-105 rounded-3xl"
                  onError={(e) => {
                    e.target.src = '/images/ea-rgrowth.png';
                  }}
                />
              </div>

              {/* Floating Card 1: Mini Equity Curve (Top-Left) */}
              <div className="absolute -top-3 -left-2 sm:-left-6 z-20 bg-[#0D1B16]/90 backdrop-blur-md border border-[#1E382E] rounded-2xl p-3 shadow-[0_10px_25px_rgba(0,0,0,0.6)] animate-float-slow hover:border-[#10B981]/50 transition-all">
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Equity Curve</span>
                  <span className="inline-flex items-center text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded">
                    +420%
                  </span>
                </div>
                {/* Vector SVG Line Chart */}
                <svg className="w-32 h-10 overflow-visible" viewBox="0 0 120 40">
                  <defs>
                    <linearGradient id="equityGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0 35 Q 20 32, 35 28 T 65 18 T 90 12 T 120 4 L 120 40 L 0 40 Z"
                    fill="url(#equityGrad)"
                  />
                  <path
                    d="M 0 35 Q 20 32, 35 28 T 65 18 T 90 12 T 120 4"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="120" cy="4" r="3.5" fill="#10B981" className="animate-ping" />
                  <circle cx="120" cy="4" r="3" fill="#FFFFFF" />
                </svg>
              </div>

              {/* Floating Card 2: Winrate & Drawdown (Bottom-Left) */}
              <div className="absolute -bottom-4 -left-2 sm:-left-4 z-20 bg-[#0D1B16]/95 backdrop-blur-md border border-[#1E382E] rounded-2xl px-4 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.7)] animate-float-delay hover:border-[#10B981]/50 transition-all">
                <div className="flex items-center gap-4 divide-x divide-[#1E382E]">
                  <div>
                    <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Winrate</div>
                    <div className="text-base sm:text-lg font-extrabold text-[#10B981]">{hero.winrate || '78.4%'}</div>
                  </div>
                  <div className="pl-4">
                    <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Drawdown</div>
                    <div className="text-base sm:text-lg font-extrabold text-white">{hero.drawdown || '<15%'}</div>
                  </div>
                </div>
              </div>

              {/* Floating Card 3: Terverifikasi 10 Tahun (Bottom-Right) */}
              <div className="absolute bottom-2 -right-2 sm:-right-6 z-20 bg-[#0D1B16]/95 backdrop-blur-md border border-[#1E382E] rounded-full px-3.5 py-2 shadow-[0_10px_25px_rgba(0,0,0,0.7)] flex items-center gap-2 hover:border-[#10B981]/60 transition-all">
                <div className="w-5 h-5 rounded-full bg-[#10B981]/20 flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                </div>
                <span className="text-xs font-bold text-white whitespace-nowrap">
                  Terverifikasi {hero.verifiedYears || '10 Tahun'}
                </span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
