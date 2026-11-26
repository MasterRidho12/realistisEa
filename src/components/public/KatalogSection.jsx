import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { EaCard } from './EaCard';
import { BacktestModal } from './BacktestModal';
import { SlidersHorizontal, Cpu, Sparkles } from 'lucide-react';

export const KatalogSection = () => {
  const { products } = useData();
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedProductForBacktest, setSelectedProductForBacktest] = useState(null);

  // Active products only
  const activeProducts = products.filter(p => p.active !== false);

  // Categories list
  const categories = ['Semua', 'Breakout', 'Trend Following'];

  const filteredProducts = selectedCategory === 'Semua'
    ? activeProducts
    : activeProducts.filter(p => p.category?.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section id="katalog" className="py-16 md:py-24 relative border-t border-[#1E382E]/50">
      
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#0B241A]/40 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D1B16] border border-[#1E382E] mb-3">
            <Cpu className="w-3.5 h-3.5 text-[#10B981]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Pilihan Algoritma Terbaik
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white mb-4">
            KATALOG EXPERT ADVISOR (EA)
          </h2>

          <p className="text-base text-gray-400 leading-relaxed font-normal">
            Setiap robot dirancang dengan kalkulasi risiko matematis ketat tanpa martingale, didukung data pengujian historis real-tick 10 tahun terakhir.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#10B981] text-[#06100C] shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    : 'bg-[#0D1B16] text-gray-300 hover:text-white border border-[#1E382E] hover:border-[#10B981]/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid: 2 columns on wide screens, 1 on mobile */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <EaCard
                key={product.id}
                product={product}
                onOpenBacktest={(prod) => setSelectedProductForBacktest(prod)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#0D1B16] border border-[#1E382E] rounded-2xl max-w-lg mx-auto">
            <Sparkles className="w-10 h-10 text-gray-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">Belum Ada EA di Kategori Ini</h3>
            <p className="text-xs text-gray-400 mb-4">Silakan pilih kategori 'Semua' atau tambahkan EA baru melalui Admin Dashboard.</p>
            <button
              onClick={() => setSelectedCategory('Semua')}
              className="text-xs font-semibold text-emerald-400 hover:underline"
            >
              Lihat Semua EA &rarr;
            </button>
          </div>
        )}

      </div>

      {/* Backtest Modal */}
      <BacktestModal
        product={selectedProductForBacktest}
        isOpen={!!selectedProductForBacktest}
        onClose={() => setSelectedProductForBacktest(null)}
      />

    </section>
  );
};
