import React from 'react';
import { X, CheckCircle2, TrendingUp, ShieldAlert, Award, FileText, MessageCircle, ExternalLink } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const BacktestModal = ({ product, isOpen, onClose }) => {
  const { getWhatsAppLink, trackWaClick } = useData();

  if (!isOpen || !product) return null;

  const details = product.backtestDetails || {
    period: '2015 - 2025 (10 Tahun)',
    initialDeposit: '$100',
    netProfit: '$28,450.00 (+28,350%)',
    profitFactor: '2.42',
    maxDrawdown: '11.8%',
    winRate: '78.4%',
    totalTrades: '2,840 trades',
    modelingQuality: '99.90% Everytick (Tickstory)',
    notes: 'Pengujian Every Tick murni dengan spread riil dan slippage. Tanpa sistem Martingale, Averaging, ataupun Grid berisiko.'
  };

  const handleSewaClick = () => {
    trackWaClick(product.name);
    window.open(getWhatsAppLink(product), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      {/* Modal Dialog Card */}
      <div 
        className="relative w-full max-w-4xl bg-[#0D1B16] border border-[#1E382E] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden my-6 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E382E] bg-[#081410]/90">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Laporan Hasil Backtest Resmi
                </h3>
                {product.badgeText && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${
                    product.badgeColor === 'blue' 
                      ? 'text-blue-400 bg-blue-500/10 border-blue-500/30' 
                      : 'text-amber-400 bg-amber-500/10 border-amber-500/30'
                  }`}>
                    {product.badgeText}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400">
                {product.name} &bull; Periode: {details.period}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white bg-[#0D1B16] hover:bg-[#1E382E] rounded-xl border border-[#1E382E] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Backtest Chart Image Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span className="font-semibold text-gray-300">Kurva Pertumbuhan Ekuitas (Equity Curve)</span>
              <span className="text-emerald-400 font-medium">Tickstory 99.9% Everytick Modeling</span>
            </div>
            <div className="w-full bg-[#081410] border border-[#1E382E] rounded-xl overflow-hidden p-2 shadow-inner">
              <img
                src={product.backtestImage || '/images/backtest-rgrowth.png'}
                alt={`Laporan Backtest ${product.name}`}
                className="w-full h-auto object-contain rounded-lg max-h-[360px] mx-auto"
                onError={(e) => {
                  e.target.src = '/images/backtest-rgrowth.png';
                }}
              />
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              Ringkasan Metrik Pengujian
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-[#081410] border border-[#1E382E] p-3 rounded-xl">
                <span className="text-[11px] text-gray-400 block mb-0.5">Deposit Awal</span>
                <span className="text-sm sm:text-base font-extrabold text-white">{details.initialDeposit}</span>
              </div>
              <div className="bg-[#081410] border border-[#1E382E] p-3 rounded-xl">
                <span className="text-[11px] text-gray-400 block mb-0.5">Total Net Profit</span>
                <span className="text-sm sm:text-base font-extrabold text-[#10B981]">{details.netProfit}</span>
              </div>
              <div className="bg-[#081410] border border-[#1E382E] p-3 rounded-xl">
                <span className="text-[11px] text-gray-400 block mb-0.5">Maximal Drawdown</span>
                <span className="text-sm sm:text-base font-extrabold text-amber-400">{details.maxDrawdown}</span>
              </div>
              <div className="bg-[#081410] border border-[#1E382E] p-3 rounded-xl">
                <span className="text-[11px] text-gray-400 block mb-0.5">Profit Factor</span>
                <span className="text-sm sm:text-base font-extrabold text-white">{details.profitFactor}</span>
              </div>
              <div className="bg-[#081410] border border-[#1E382E] p-3 rounded-xl">
                <span className="text-[11px] text-gray-400 block mb-0.5">Win Rate</span>
                <span className="text-sm sm:text-base font-extrabold text-[#10B981]">{details.winRate}</span>
              </div>
              <div className="bg-[#081410] border border-[#1E382E] p-3 rounded-xl">
                <span className="text-[11px] text-gray-400 block mb-0.5">Total Transaksi</span>
                <span className="text-sm sm:text-base font-extrabold text-white">{details.totalTrades}</span>
              </div>
              <div className="bg-[#081410] border border-[#1E382E] p-3 rounded-xl col-span-2">
                <span className="text-[11px] text-gray-400 block mb-0.5">Kualitas Pemodelan Data</span>
                <span className="text-sm sm:text-base font-extrabold text-emerald-400">{details.modelingQuality}</span>
              </div>
            </div>
          </div>

          {/* Notes & Risk Transparency */}
          <div className="bg-[#0B241A]/50 border border-[#1E382E] p-4 rounded-xl flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs text-gray-300 leading-relaxed">
              <strong className="text-white block mb-0.5">Transparansi Logika Trading:</strong>
              {details.notes || 'Pengujian dilakukan dengan spread mengambang nyata dan fixed stop loss 2% per open posisi. Tidak menggunakan strategi berisiko seperti Martingale, Grid, atau Averaging tanpa batas.'}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-[#1E382E] bg-[#081410]/90 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-gray-400 text-center sm:text-left">
            Butuh file laporan format HTML / CSV? Hubungi tim support kami.
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-gray-300 hover:text-white bg-[#0D1B16] border border-[#1E382E] rounded-full transition-colors"
            >
              Tutup
            </button>
            <button
              onClick={handleSewaClick}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#059669] text-[#06100C] font-bold text-xs px-5 py-2 rounded-full transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Sewa EA Ini via WhatsApp</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
