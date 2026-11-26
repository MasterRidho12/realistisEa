import React from 'react';
import { MousePointerClick, MessageSquareText, MonitorCheck, ArrowRight } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const CaraSewaSection = () => {
  const { getWhatsAppLink, trackWaClick } = useData();

  const steps = [
    {
      number: '01',
      title: 'Pilih EA di Katalog',
      description: 'Pilih algoritma yang sesuai dengan target profit dan instrumen favorit Anda (XAUUSD Breakout atau Trend Following EUR/GBP).',
      icon: MousePointerClick,
    },
    {
      number: '02',
      title: 'Konfirmasi via WhatsApp',
      description: 'Klik tombol "Sewa Sekarang". Chat otomatis akan terhubung dengan CS kami untuk konfirmasi paket durasi dan pembayaran aman.',
      icon: MessageSquareText,
    },
    {
      number: '03',
      title: 'Instalasi & Setup MT4 Dibantu',
      description: 'Tim teknis kami akan memandu atau membantu remote setup file EA dan preset parameter ke MT4/VPS Anda hingga robot siap trading.',
      icon: MonitorCheck,
    },
  ];

  const handleStart = () => {
    trackWaClick('Cara Sewa CTA');
    window.open(getWhatsAppLink(), '_blank');
  };

  return (
    <section id="cara-sewa" className="py-16 md:py-24 relative bg-[#081410]/50 border-t border-[#1E382E]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D1B16] border border-[#1E382E] mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Proses Cepat & Mudah
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white mb-4">
            3 LANGKAH MUDAH MEMULAI
          </h2>

          <p className="text-base text-gray-400 leading-relaxed font-normal">
            Tanpa instalasi rumit. Dalam waktu kurang dari 30 menit, akun trading Anda sudah terotomatisasi secara disiplin.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.number}
                className="bg-[#0D1B16] border border-[#1E382E] hover:border-[#10B981]/50 rounded-2xl p-7 relative transition-all duration-300 hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group"
              >
                {/* Step Number Top Accent */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#081410] border border-[#1E382E] flex items-center justify-center text-[#10B981] group-hover:bg-[#10B981]/15 group-hover:border-[#10B981]/40 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-extrabold text-[#1E382E] group-hover:text-[#10B981]/30 transition-colors">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}

        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-14 bg-gradient-to-r from-[#0D1B16] via-[#0B241A] to-[#0D1B16] border border-[#1E382E] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h4 className="text-lg sm:text-xl font-bold text-white mb-1">
              Punya Pertanyaan Khusus Mengenai Akun Trading Anda?
            </h4>
            <p className="text-xs sm:text-sm text-gray-400">
              Konsultasikan gratis dengan tim teknis kami via WhatsApp sebelum memutuskan untuk menyewa.
            </p>
          </div>

          <button
            onClick={handleStart}
            className="shrink-0 flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-[#06100C] font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition-all duration-200 shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer"
          >
            <span>Konsultasi Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
