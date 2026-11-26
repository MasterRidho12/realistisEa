import React from 'react';
import { useData } from '../../context/DataContext';
import { MessageCircle, AlertTriangle, ArrowUp, Headphones } from 'lucide-react';

export const Footer = () => {
  const { getWhatsAppLink, trackWaClick } = useData();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWaContact = () => {
    trackWaClick('Footer');
    window.open(getWhatsAppLink(), '_blank');
  };

  return (
    <footer className="bg-[#040B08] border-t border-[#1E382E] text-gray-400 text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#1E382E]/70">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0D1B16] border border-[#1E382E] flex items-center justify-center p-1.5 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <img 
                  src="/images/logo-icon.png" 
                  alt="RealistisEA Logo" 
                  className="w-full h-full object-contain rounded-lg"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `<span class="text-emerald-400 font-bold text-lg">R</span>`;
                  }}
                />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Realistis<span className="text-[#10B981]">EA</span>
              </span>
            </div>

            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Platform penyewaan robot trading (Expert Advisor) Forex & XAUUSD yang memprioritaskan keamanan modal dan manajemen risiko terukur 2% per trade.
            </p>

            <div className="pt-1">
              <button
                onClick={handleWaContact}
                className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-[#06100C] font-bold text-xs px-4 py-2 rounded-full transition-all shadow-[0_0_12px_rgba(16,185,129,0.3)] cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>Chat Admin WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#katalog" className="hover:text-emerald-400 transition-colors">Katalog EA Lengkap</a>
              </li>
              <li>
                <a href="#backtest" className="hover:text-emerald-400 transition-colors">Bukti Backtest 10 Tahun</a>
              </li>
              <li>
                <a href="#vps" className="hover:text-emerald-400 transition-colors">Layanan Cloud VPS Trading</a>
              </li>
              <li>
                <a href="#cara-sewa" className="hover:text-emerald-400 transition-colors">Panduan Cara Sewa</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-emerald-400 transition-colors">Tanya Jawab (FAQ)</a>
              </li>
            </ul>
          </div>

          {/* Platform & Support Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Platform & Dukungan
            </h4>
            <p className="text-gray-400 text-xs leading-relaxed">
              Kompatibel penuh dengan MetaTrader 4 (MT4) Build 1420+ di PC, Laptop, atau Windows Cloud Server.
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0D1B16] border border-[#1E382E] text-gray-300 text-xs">
                <Headphones className="w-4 h-4 text-emerald-400" />
                <span>Bantuan Setup & Panduan Lengkap</span>
              </div>
            </div>
          </div>

        </div>

        {/* Risk Disclosure Section */}
        <div className="pt-8 pb-6 border-b border-[#1E382E]/50">
          <div className="bg-[#081410] border border-[#1E382E] rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                Peringatan Risiko Penting (Risk Disclosure)
              </span>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Trading instrumen Forex, Emas (XAUUSD), dan CFD melibatkan risiko kerugian finansial yang signifikan karena leverage. Kinerja historis dari pengujian backtest di masa lalu tidak menjamin atau merefleksikan hasil yang sama persis di masa depan. Gunakan modal risiko dingin yang siap Anda tanggung. RealistisEA adalah penyedia piranti lunak algoritma otomatisasi dan bukan merupakan pengelola dana investasi / pialang berjangka.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright and Scroll to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-gray-500 text-center sm:text-left">
            &copy; {new Date().getFullYear()} RealistisEA. All rights reserved. Hak Cipta Dilindungi Undang-Undang.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-gray-400 hover:text-emerald-400 transition-colors text-[11px] cursor-pointer"
          >
            <span>Kembali ke atas</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
