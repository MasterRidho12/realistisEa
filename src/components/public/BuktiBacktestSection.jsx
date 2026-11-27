import React from 'react';
import { ShieldCheck, BarChart2, CheckCircle, Database, AlertCircle, FileCheck2 } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const BuktiBacktestSection = () => {
  const { products } = useData();
  const primaryEa = products[0] || {};

  return (
    <section id="backtest" className="py-16 md:py-24 relative border-t border-[#1E382E]/50 bg-[#06100C]">
      
      {/* Background glow */}
      <div className="absolute top-1/3 left-10 w-[400px] h-[400px] bg-[#0B241A]/40 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D1B16] border border-[#1E382E] mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Transparansi Penuh 10 Tahun
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white mb-4">
            BACKTEST & AUDIT HISTORIS
          </h2>

          <p className="text-base text-gray-400 leading-relaxed">
            Kami menguji setiap strategi menggunakan data historis berkualitas 99.90% dari Tickstory yang mencakup periode krisis ekonomi, pandemi, dan inflasi global 2015–2025.
          </p>
        </div>

        {/* 3 Pillars of Realism */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="bg-[#0D1B16] border border-[#1E382E] rounded-2xl p-6 relative overflow-hidden group hover:border-[#10B981]/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center text-[#10B981] mb-4">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Data Historis Tickstory 99.9%</h3>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Bukan data 90% standar MT4 yang sering melompat. Kami menggunakan data spread riil dan eksekusi per milidetik untuk akurasi pengujian tertinggi.
            </p>
          </div>

          <div className="bg-[#0D1B16] border border-[#1E382E] rounded-2xl p-6 relative overflow-hidden group hover:border-[#10B981]/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Proteksi Modal & Strict SL</h3>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-3.5">
              Setiap posisi selalu diproteksi Stop Loss terukur maksimal 2% dari modal dengan eksekusi bersih:
            </p>
            <div className="grid grid-cols-2 gap-2">
              {['No Martingale', 'No Grid Trading', 'No Averaging', 'No Hedging'].map((rule) => (
                <div
                  key={rule}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#06100C]/80 border border-[#1E382E] text-[11px] sm:text-xs font-semibold text-emerald-300"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0D1B16] border border-[#1E382E] rounded-2xl p-6 relative overflow-hidden group hover:border-[#10B981]/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-blue-400/10 border border-blue-400/20 flex items-center justify-center text-blue-400 mb-4">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Laporan Transparan</h3>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Setiap penyewa dapat meminta file laporan MetaTrader HTML / CSV lengkap berisi ribuan eksekusi order historis untuk diverifikasi mandiri.
            </p>
          </div>

        </div>

        {/* Detailed Comparison Banner */}
        <div className="bg-gradient-to-r from-[#0B241A] to-[#0D1B16] border border-[#1E382E] rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
          <div className="space-y-2 text-center lg:text-left">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
              Komparasi Strategi Realistis vs Robot Lain
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Mengapa Target 2-10% Per Bulan Jauh Lebih Aman?
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
              Robot yang menjanjikan profit 50-100% per bulan selalu menggunakan martingale/grid yang pada akhirnya berujung Margin Call (MC) saat tren ekstrem. Algoritma RealistisEA fokus pada ketahanan akun jangka panjang selama bertahun-tahun.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <a
              href="#katalog"
              className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-[#06100C] font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
            >
              <BarChart2 className="w-4 h-4" />
              <span>Pilih Robot Teruji</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
