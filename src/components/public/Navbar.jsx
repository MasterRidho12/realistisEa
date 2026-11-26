import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Menu, X, MessageCircle } from 'lucide-react';

export const Navbar = () => {
  const { getWhatsAppLink, trackWaClick } = useData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Katalog EA', href: '#katalog' },
    { label: 'Bukti Backtest', href: '#backtest' },
    { label: 'Layanan VPS', href: '#vps' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Cara Sewa', href: '#cara-sewa' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWaClick = () => {
    trackWaClick('Navbar');
    window.open(getWhatsAppLink(), '_blank');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#06100C]/90 backdrop-blur-md border-b border-[#1E382E]/70 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#0D1B16] border border-[#1E382E] flex items-center justify-center p-1.5 shadow-[0_0_15px_rgba(16,185,129,0.2)] group-hover:border-[#10B981]/50 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all">
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
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-white flex items-center">
                Realistis<span className="text-[#10B981]">EA</span>
              </span>
              <span className="text-[10px] text-gray-400 font-medium -mt-1 tracking-wider uppercase">
                Algo Trading
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm font-medium text-gray-300 hover:text-[#10B981] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#10B981] hover:after:w-full after:transition-all after:duration-300"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right CTA: Pure WhatsApp Pill Button (Zero Admin Indication) */}
          <div className="hidden md:flex items-center">
            <button
              onClick={handleWaClick}
              className="flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-[#06100C] font-bold text-sm px-6 py-2.5 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Mulai via WhatsApp</span>
            </button>
          </div>

          {/* Mobile Actions: WA button + Hamburger Menu */}
          <div className="flex md:hidden items-center gap-2.5">
            <button
              onClick={handleWaClick}
              className="flex items-center gap-1.5 bg-[#10B981] hover:bg-[#059669] text-[#06100C] font-bold text-xs px-3.5 py-1.5 rounded-full transition-all shadow-[0_0_12px_rgba(16,185,129,0.3)]"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WA</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-white bg-[#0D1B16] border border-[#1E382E] rounded-lg focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation (Pure User View) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#081410] border-b border-[#1E382E] px-4 pt-3 pb-6 animate-fadeIn">
          <div className="space-y-2 mb-4">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-200 hover:text-[#10B981] hover:bg-[#0D1B16] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-[#1E382E]">
            <button
              onClick={handleWaClick}
              className="w-full flex items-center justify-center gap-2 bg-[#10B981] text-[#06100C] font-bold py-2.5 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.3)] text-sm"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Hubungi via WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
