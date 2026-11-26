import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, MessageCircle, Settings, ShieldCheck, ChevronRight, Activity } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function Navbar() {
  const { settings, getWhatsAppLink, trackWaClick } = useData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Katalog EA', href: '#katalog' },
    { label: 'Bukti Backtest', href: '#backtest' },
    { label: 'Layanan VPS', href: '#vps' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Cara Sewa', href: '#carasewa' },
  ];

  const handleNavClick = (href) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWaClick = () => {
    trackWaClick('Navbar CTA');
    window.open(getWhatsAppLink(), '_blank');
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#06100C]/90 backdrop-blur-md border-b border-[#1E382E]/80 shadow-lg' 
        : 'bg-[#06100C]/75 backdrop-blur-sm border-b border-[#1E382E]/40'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo Section */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-[#0D1B16] border border-[#1E382E] flex items-center justify-center p-1.5 shadow-emerald-sm group-hover:border-[#10B981] transition-colors">
              <img 
                src="/images/logo-icon.png" 
                alt="Logo RealistisEA" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2310B981'><path d='M12 2a2 2 0 0 1 2 2v2h4a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4V4a2 2 0 0 1 2-2zm-2 9H8v2h2v-2zm8 0h-2v2h2v-2z'/></svg>";
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center">
                Realistis<span className="text-[#10B981]">EA</span>
              </span>
              <span className="text-[10px] text-gray-400 -mt-1 hidden sm:block tracking-wider uppercase font-medium">
                Algorithmic Forex
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-sm font-medium text-gray-300 hover:text-[#10B981] transition-colors cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* WhatsApp CTA Button (Desktop) */}
            <button
              onClick={handleWaClick}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold bg-[#10B981] text-black hover:bg-[#059669] transition-all shadow-emerald-sm hover:shadow-emerald-glow transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageCircle className="w-4 h-4 fill-black text-[#10B981]" />
              <span>Mulai via WhatsApp</span>
            </button>

            {/* Mobile Compact WA Button */}
            <button
              onClick={handleWaClick}
              className="sm:hidden inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-[#10B981] text-black hover:bg-[#059669] transition-all"
              title="Hubungi via WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-black text-[#10B981]" />
              <span>WA</span>
            </button>

            {/* Admin Portal Shortcut */}
            <Link
              to="/admin"
              className="p-2 rounded-xl text-gray-400 hover:text-white bg-[#0D1B16] hover:bg-[#13271F] border border-[#1E382E] transition-all"
              title="Admin Dashboard"
            >
              <Settings className="w-4 h-4" />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-gray-400 hover:text-white bg-[#0D1B16] border border-[#1E382E] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#10B981]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0D1B16] border-b border-[#1E382E] px-4 pt-3 pb-6 animate-fadeIn shadow-2xl">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-gray-200 hover:bg-[#13271F] hover:text-[#10B981] transition-all"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </a>
            ))}
            
            <div className="pt-3 border-t border-[#1E382E] mt-2">
              <button
                onClick={handleWaClick}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold bg-[#10B981] text-black hover:bg-[#059669] transition-all shadow-emerald-sm"
              >
                <MessageCircle className="w-4 h-4 fill-black text-[#10B981]" />
                <span>Konsultasi via WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
