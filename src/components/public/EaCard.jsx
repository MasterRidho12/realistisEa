import React from 'react';
import { Check, MessageCircle, BarChart3, Layers, Server, ShieldCheck, DollarSign, ExternalLink, Activity } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const EaCard = ({ product, onOpenBacktest }) => {
  const { getWhatsAppLink, trackWaClick } = useData();

  const handleSewaClick = () => {
    trackWaClick(product.name);
    window.open(getWhatsAppLink(product), '_blank');
  };

  // Badge color mapping
  const getBadgeClasses = (color) => {
    switch (color) {
      case 'gold':
      case 'amber':
        return 'text-amber-400 bg-amber-400/10 border-amber-400/40 shadow-[0_0_10px_rgba(234,179,8,0.2)]';
      case 'blue':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/40 shadow-[0_0_10px_rgba(59,130,246,0.2)]';
      case 'emerald':
      case 'green':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.2)]';
      case 'purple':
        return 'text-purple-400 bg-purple-500/10 border-purple-500/40 shadow-[0_0_10px_rgba(168,85,247,0.2)]';
      default:
        return 'text-amber-400 bg-amber-400/10 border-amber-400/40';
    }
  };

  return (
    <div className="relative group bg-[#0D1B16] border border-[#1E382E] hover:border-[#10B981]/50 rounded-2xl p-5 sm:p-6 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_40px_rgba(16,185,129,0.15)] flex flex-col justify-between">
      
      {/* Top Badge (if any) */}
      {product.badgeText && (
        <div className="absolute -top-3.5 right-6 z-10">
          <span className={`inline-block px-3 py-1 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-wider border ${getBadgeClasses(product.badgeColor)}`}>
            {product.badgeText}
          </span>
        </div>
      )}

      {/* Main Content Area: Left Avatar (desktop) & Right Info */}
      <div>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-5">
          
          {/* Avatar / Robot Image Frame */}
          <div className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#081410] border border-[#1E382E] p-2 flex items-center justify-center shadow-inner group-hover:border-[#10B981]/40 transition-colors">
            {/* Emerald ambient glow inside avatar */}
            <div className="absolute inset-0 bg-[#10B981]/10 rounded-2xl blur-sm -z-0" />
            <img
              src={product.image || '/images/ea-rgrowth.png'}
              alt={product.name}
              className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.7)] group-hover:scale-105 transition-transform"
              onError={(e) => {
                e.target.src = '/images/ea-rgrowth.png';
              }}
            />
          </div>

          {/* Title & Pricing */}
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-emerald-400 transition-colors leading-tight">
              {product.name}
            </h3>
            
            {/* Price Tags */}
            <div className="mt-2 space-y-1">
              <div className="text-sm sm:text-base font-bold text-white">
                {product.rentalPrice}
              </div>
              {product.vpsPrice && (
                <div className="text-xs font-medium text-gray-400 flex items-center justify-center sm:justify-start gap-1.5">
                  <Server className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{product.vpsPrice}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 4 Technical Metrics: 2x2 grid on mobile, 4 columns on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-xl bg-[#081410] border border-[#1E382E] mb-5">
          <div className="text-center">
            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider block">Target Profit</span>
            <span className="text-xs sm:text-sm font-extrabold text-[#10B981]">{product.targetProfit || '2-10%/bln'}</span>
          </div>
          <div className="text-center">
            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider block">Maksimal Risiko</span>
            <span className="text-xs sm:text-sm font-extrabold text-white">{product.maxRisk || '2% per trade'}</span>
          </div>
          <div className="text-center">
            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider block">Deposit Minimal</span>
            <span className="text-xs sm:text-sm font-extrabold text-amber-400">{product.minDeposit || '$100'}</span>
          </div>
          <div className="text-center">
            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider block">Platform</span>
            <span className="text-xs sm:text-sm font-extrabold text-white">{product.platform || 'MT4'}</span>
          </div>
        </div>

        {/* Checklist of Features */}
        <div className="space-y-2 mb-6">
          {(product.features || []).map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-300">
              <div className="w-4 h-4 rounded-full bg-[#10B981]/20 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-[#10B981] stroke-[2.5]" />
              </div>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* MQL5 Live Signal Link (if available) */}
      {(product.mql5Url || product.backtestDetails?.mql5Url) && (
        <a
          href={product.mql5Url || product.backtestDetails?.mql5Url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-[#0B241A] hover:bg-[#10B981]/20 text-[#10B981] hover:text-emerald-300 border border-[#10B981]/40 hover:border-[#10B981] font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl transition-all duration-200 shadow-[0_0_12px_rgba(16,185,129,0.15)] mb-3 group/mql"
        >
          <Activity className="w-4 h-4 text-[#10B981] group-hover/mql:animate-pulse" />
          <span>Live Signal MQL5</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-70 ml-0.5" />
        </a>
      )}

      {/* Two Action Buttons: Sewa Sekarang & Laporan Backtest */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#1E382E]">
        <button
          onClick={handleSewaClick}
          className="w-full flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#059669] text-[#06100C] font-bold text-xs sm:text-sm py-3 px-4 rounded-xl transition-all duration-200 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_20px_rgba(16,185,129,0.45)] cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>Sewa Sekarang</span>
        </button>

        <button
          onClick={() => onOpenBacktest(product)}
          className="w-full flex items-center justify-center gap-2 bg-[#0D1B16] hover:bg-[#13271F] text-gray-200 hover:text-white border border-[#1E382E] hover:border-[#10B981]/50 font-semibold text-xs sm:text-sm py-3 px-4 rounded-xl transition-all duration-200 cursor-pointer"
        >
          <BarChart3 className="w-4 h-4 text-emerald-400" />
          <span>Laporan Backtest</span>
        </button>
      </div>

    </div>
  );
};
