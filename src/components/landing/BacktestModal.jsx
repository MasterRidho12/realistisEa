import React from 'react';
import { X, CheckCircle, BarChart3, TrendingUp, AlertCircle, MessageCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function BacktestModal({ product, isOpen, onClose }) {
  const { getWhatsAppLink, trackWaClick } = useData();

  if (!isOpen || !product) return null;

  const details = product.backtestDetails || {
    period: '2015 - 2025 (10 Tahun)',
    initialDeposit: '$100',
    netProfit: '$28,450.00',
    profitFactor: '2.42',
    maxDrawdown: '11.8%',
    winRate: '78.4%',
    totalTrades: '2,840 trades',
    modelingQuality: '99.90% Everytick (Tickstory)',
    notes: 'Pengujian Every Tick murni dengan spread riil dan simulasi slippage. Tanpa Martingale atau Grid berbahaya.'
  };

  const handleWaContact = () => {
    trackWaClick(`BacktestModal_${product.name}`);
    window.open(getWhatsAppLink(product), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-[#0D1B16] border border-[#1E382E] rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E382E] bg-[#081410]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-[#10B981]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Laporan Backtest:</span>
                <span className="text-[#10B981]">{product.name}</span>
              </h3>
              <p className="text-xs text-gray-400">Data Uji Historis 10 Tahun (Tickstory Modeling 99.9%)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#1E382E] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Modal */}
        <div className="p-4 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Gambar Grafik Kurva Backtest */}
          <div className="rounded-xl overflow-hidden border border-[#1E382E] bg-[#06100C] p-2">
            <div className="flex items-center justify-between px-3 py-1.5 mb-1 text-xs text-gray-400 border-b border-[#1E382E]">
              <span className="font-semibold text-gray-300">Kurva Pertumbuhan Akun (Equity Curve)</span>
              <span className="text-[#10B981] font-mono">10 Years Simulation</span>
            </div>
            <img
              src={product.backtestImage || '/images/backtest-rgrowth.png'}
              alt={`Backtest report chart for ${product.name}`}
              className="w-full h-auto max-h-[300px] object-contain rounded-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/backtest-rgrowth.png';
              }}
            />
          </div>

          {/* Grid 6 Metrik Performa Kunci */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-[#081410] border border-[#1E382E] rounded-xl p-3">
              <div className="text-[11px] text-gray-400 font-medium">Deposit Awal</div>
              <div className="text-base font-bold text-white mt-0.5">{details.initialDeposit || '$100'}</div>
            </div>

            <div className="bg-[#081410] border border-[#1E382E] rounded-xl p-3">
              <div className="text-[11px] text-gray-400 font-medium">Total Net Profit</div>
              <div className="text-base font-bold text-[#10B981] mt-0.5">{details.netProfit || '$28,450'}</div>
            </div>

            <div className="bg-[#081410] border border-[#1E382E] rounded-xl p-3">
              <div className="text-[11px] text-gray-400 font-medium">Maksimal Drawdown</div>
              <div className="text-base font-bold text-amber-400 mt-0.5">{details.maxDrawdown || '<15%'}</div>
            </div>

            <div className="bg-[#081410] border border-[#1E382E] rounded-xl p-3">
              <div className="text-[11px] text-gray-400 font-medium">Win Rate</div>
              <div className="text-base font-bold text-white mt-0.5">{details.winRate || '78.4%'}</div>
            </div>

            <div className="bg-[#081410] border border-[#1E382E] rounded-xl p-3">
              <div className="text-[11px] text-gray-400 font-medium">Profit Factor</div>
              <div className="text-base font-bold text-emerald-400 mt-0.5">{details.profitFactor || '2.42'}</div>
            </div>

            <div className="bg-[#081410] border border-[#1E382E] rounded-xl p-3">
              <div className="text-[11px] text-gray-400 font-medium">Modeling Quality</div>
              <div className="text-base font-bold text-[#3B82F6] mt-0.5">99.90% Everytick</div>
            </div>
          </div>

          {/* Catatan Transparansi & Keamanan */}
          <div className="bg-[#081410]/80 border border-[#1E382E] rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-200">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              <span>Standar Pengujian Realistis (Anti-Overfitting)</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              {details.notes || 'Pengujian dilakukan menggunakan data Every Tick Tickstory dengan spread riil pasar. EA ini menerapkan Fixed Stop Loss dan Trailing Stop otomatis di setiap posisi terbuka, sepenuhnya bebas dari teknik berbahaya seperti Martingale, Grid Averaging, atau Hedging tanpa batas.'}
            </p>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-[#1E382E] bg-[#081410] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-gray-400 text-center sm:text-left">
            Butuh laporan detail HTML MetaTrader 4? Hubungi tim support kami.
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:text-white bg-[#0D1B16] border border-[#1E382E] hover:border-gray-500 transition-colors"
            >
              Tutup
            </button>
            <button
              onClick={handleWaContact}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl text-xs font-bold bg-[#10B981] text-black hover:bg-[#059669] transition-all shadow-emerald-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Sewa EA Ini via WhatsApp</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
