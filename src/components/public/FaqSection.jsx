import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'Apakah pemula yang belum pernah trading bisa menggunakan RealistisEA?',
      a: 'Bisa! RealistisEA dirancang 100% otomatis (Hands-free Trading). Tim kami akan memandu proses instalasi mulai dari pembukaan akun broker hingga robot aktif trading di platform MetaTrader 4 (MT4). Anda tidak perlu memantau grafik chart setiap saat.'
    },
    {
      q: 'Berapa modal awal / minimal deposit yang disarankan?',
      a: 'Minimal modal yang disarankan adalah $100 pada akun Standar atau Micro/Cent. Untuk rasio pertumbuhan yang optimal dengan lot proporsional, modal $200 - $500 sangat direkomendasikan.'
    },
    {
      q: 'Broker mana saja yang didukung oleh RealistisEA?',
      a: 'RealistisEA kompatibel dengan semua broker forex internasional maupun lokal yang mendukung platform MetaTrader 4 (MT4). Sangat direkomendasikan memilih tipe akun ECN / Raw Spread dengan eksekusi market rendah agar entry breakout presisi.'
    },
    {
      q: 'Mengapa RealistisEA tidak menggunakan strategi Martingale atau Grid?',
      a: 'Strategi Martingale (melipatgandakan lot saat posisi rugi) dan Grid tanpa stop loss adalah penyebab utama 95% akun trading mengalami Margin Call (MC) saat pasar trending kuat. RealistisEA berpegang teguh pada prinsip disiplin: setiap posisi memiliki Stop Loss terukur maksimal 2% per trade untuk pertumbuhan jangka panjang.'
    },
    {
      q: 'Apakah saya wajib menyewa Layanan VPS?',
      a: 'Sangat disarankan, tetapi tidak wajib jika Anda memiliki PC/laptop yang dapat menyala terus 24 jam dengan koneksi internet stabil selama hari kerja (Senin - Jumat). Namun untuk kenyamanan dan keamanan eksekusi tanpa jeda, paket VPS Trading kami adalah solusi terbaik.'
    },
    {
      q: 'Bagaimana jika saya ingin mengganti nomor akun MT4 selama masa sewa?',
      a: 'Anda dapat meminta penggantian lisensi nomor akun MT4 maksimal 1 kali per bulan secara gratis dengan menghubungi Customer Support kami melalui WhatsApp.'
    }
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="py-16 md:py-24 relative border-t border-[#1E382E]/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D1B16] border border-[#1E382E] mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#10B981]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Paling Sering Ditanyakan
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white mb-4">
            FREQUENTLY ASKED QUESTIONS
          </h2>

          <p className="text-sm sm:text-base text-gray-400">
            Ketahui lebih dalam mengenai mekanisme sistem sewa, keamanan modal, dan performa teknis RealistisEA.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#0D1B16] border border-[#1E382E] rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-bold text-white hover:text-emerald-400 transition-colors focus:outline-none"
                >
                  <span className="pr-4">{faq.q}</span>
                  <div className={`p-1 rounded-full bg-[#081410] border border-[#1E382E] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-emerald-400 border-emerald-500/40' : 'text-gray-400'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-400 leading-relaxed border-t border-[#1E382E]/40 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
