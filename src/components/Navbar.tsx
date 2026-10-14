import React, { useState, useEffect } from "react";
import { Sparkles, Menu, X, Compass } from "lucide-react";

interface NavbarProps {
  onRandomPick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onRandomPick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section spy
      const sections = ["home", "journey", "explore", "featured", "trailers", "spotlight", "about"];
      const scrollPosition = window.scrollY + 140;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#home", label: "Home", id: "home" },
    { href: "#journey", label: "Odyssey", id: "journey" },
    { href: "#explore", label: "Explore", id: "explore" },
    { href: "#featured", label: "Featured", id: "featured" },
    { href: "#trailers", label: "Trailers", id: "trailers" },
    { href: "#spotlight", label: "Characters", id: "spotlight" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0A0C12]/85 backdrop-blur-xl border-b border-white/10 shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strict 3-Zone Top Bar Contract */}
        <div className="flex items-center justify-between gap-8 h-12">
          {/* Zone 1: Single text wordmark */}
          <a
            href="#home"
            className="font-display text-2xl sm:text-3xl tracking-widest text-white whitespace-nowrap shrink-0 group focus-visible:outline-2 focus-visible:outline-white"
          >
            ANIME<span className="text-[#F5B301] group-hover:text-[#FF7F1A] transition-colors">VAULT</span>
          </a>

          {/* Zone 2: Clean single-line nav links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors ${
                    isActive ? "text-white font-semibold" : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F5B301] rounded-full animate-in fade-in duration-200" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={onRandomPick}
              className="px-4 py-2 text-xs font-semibold tracking-wider uppercase text-[#10131A] bg-gradient-to-r from-[#F5B301] to-[#FF7F1A] rounded-full hover:shadow-[0_0_20px_rgba(245,179,1,0.4)] transition-all hover:scale-105 whitespace-nowrap shrink-0 flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-white"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Surprise Pick
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onRandomPick}
              aria-label="Random pick"
              className="p-2.5 rounded-full bg-white/5 border border-white/10 text-[#F5B301]"
            >
              <Sparkles className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-2 focus-visible:outline-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#0A0C12]/95 backdrop-blur-2xl animate-in slide-in-from-top duration-300">
          <div className="px-6 py-5 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2.5 text-base font-medium min-h-[44px] flex items-center transition-colors ${
                  activeSection === link.id
                    ? "text-[#F5B301] font-semibold"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-white/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onRandomPick();
                }}
                className="w-full py-3 rounded-xl text-center text-sm font-semibold uppercase tracking-wider text-[#10131A] bg-gradient-to-r from-[#F5B301] to-[#FF7F1A] flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Surprise Anime Pick
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
