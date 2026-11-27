import React from 'react';
import { useData } from '../../context/DataContext';
import { Server, Zap, Clock, ShieldCheck, Check, MessageCircle, ArrowRight } from 'lucide-react';

export const LayananVpsSection = () => {
  const { settings, getWhatsAppLink, trackWaClick } = useData();
  const vps = settings.vps || {};

  const handleOrderVps = () => {
    trackWaClick('Layanan VPS');
    const phone = settings.contact?.whatsappNumber || '6287774229255';
    const text = `Halo Admin RealistisEA, saya ingin memesan Layanan VPS Trading 24/7 (${vps.price || 'Rp 1,2 jt / tahun'}). Mohon panduan aktivasi server dan setup akun MT4 saya.`;
    window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const defaultSpecs = [
    'Server Khusus Trading Uptime 99.99%',
    'Ultra Low Latency (<1ms ke Broker SG/London)',
    'Auto-Restart MT4 jika Server Mengalami Reboot',
    'Full Setup & Monitoring oleh Tim Teknisi RealistisEA',
    'Bisa Diakses Fleksibel via HP Android / iOS & Laptop',
    'Koneksi Internet Dedicated Fiber Optic Tanpa Putus'
  ];

  const specsList = vps.specs && vps.specs.length > 0 ? vps.specs : defaultSpecs;

  return (
    <section id="vps" className="py-16 md:py-24 relative border-t border-[#1E382E]/50">
      
      {/* Background ambient light */}
      <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-[#10B981]/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D1B16] border border-[#1E382E] mb-3">
            <Server className="w-3.5 h-3.5 text-[#10B981]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Infrastruktur 24/7 Tanpa Henti
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white mb-4">
            LAYANAN VPS TRADING 24/7
          </h2>

          <p className="text-base text-gray-400 leading-relaxed font-normal">
            Jalankan robot trading Anda non-stop sepanjang pasar buka tanpa perlu menyalakan laptop atau khawatir mati lampu dan kuota internet habis.
          </p>
        </div>

        {/* VPS Pricing & Spec Card */}
        <div className="max-w-4xl mx-auto bg-[#0D1B16] border border-[#1E382E] rounded-3xl p-6 sm:p-10 shadow-[0_15px_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Col: Price and Highlight */}
            <div className="lg:col-span-5 text-center lg:text-left space-y-4">
              <span className="inline-block text-xs font-extrabold text-[#10B981] bg-[#10B981]/10 px-3 py-1 rounded-full border border-[#10B981]/30 uppercase tracking-wider">
                Paket Tahunan Hemat
              </span>
              
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {vps.title || 'VPS Forex High-Speed'}
              </h3>

              <div className="pt-2 pb-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#10B981] block">
                  {vps.price || 'Rp 1.200.000 / tahun'}
                </span>
                <span className="text-xs text-gray-400 mt-1 block">
                  Hanya setara ~Rp 100.000 / bulan sudah termasuk maintenance
                </span>
              </div>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Server khusus dioptimalkan untuk eksekusi algoritma MetaTrader dengan kecepatan latensi milidetik ke broker terkemuka.
              </p>

              <div className="pt-3">
                <button
                  onClick={handleOrderVps}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#059669] text-[#06100C] font-bold text-sm px-7 py-3.5 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.35)] cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Pesan VPS via WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Right Col: Feature Checklist */}
            <div className="lg:col-span-7 bg-[#081410] border border-[#1E382E] rounded-2xl p-6 space-y-3.5">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Spesifikasi & Keuntungan Layanan:
              </h4>

              {specsList.map((spec, i) => (
                <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-gray-200">
                  <div className="w-4 h-4 rounded-full bg-[#10B981]/20 border border-[#10B981]/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 text-[#10B981] stroke-[3]" />
                  </div>
                  <span>{spec}</span>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
