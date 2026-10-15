import React from "react";
import { ExternalLink, ShieldCheck, Heart } from "lucide-react";
import { ANIME_DATA } from "../data/animeData";

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#0A0C12] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl glass-panel p-8 sm:p-12 border border-white/10 max-w-4xl mx-auto reveal-init">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs uppercase tracking-widest font-bold text-[#F5B301]">
              About AnimeVault
            </span>
            <span className="text-white/40 text-xs">·</span>
            <span className="text-white/60 text-xs">Fan-Made Discovery Space</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide mb-4">
            Curated Discovery & Preservation
          </h2>

          <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-6">
            AnimeVault is an unofficial, non-commercial showcase celebrating eight monumental series that shaped modern animation culture. Browse high-resolution key visuals, jump to each franchise's verified official portal, and stream official trailers directly on the publishers' authentic YouTube channels.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-white/10 text-xs text-white/70">
            <div>
              <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Verified Sources Only
              </h4>
              <p className="leading-relaxed">
                All external references link strictly to official studio domains, authenticated YouTube channels (TOHO animation, VIZ Media, Aniplex, Crunchyroll, Toei Animation), and licensor hubs.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400" />
                Respect for Artists & Studios
              </h4>
              <p className="leading-relaxed">
                All titles, characters, logos, and audiovisual materials remain the exclusive intellectual property of their respective creators and production committees.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  return (
    <footer className="border-t border-white/10 py-16 bg-[#08090E] text-white/60 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Brand & Disclaimer (7 cols) */}
          <div className="md:col-span-7 space-y-4">
            <button
              onClick={scrollToTop}
              className="font-display text-3xl tracking-widest text-white text-left focus:outline-none"
            >
              ANIME<span className="text-[#F5B301]">VAULT</span>
            </button>
            <p className="max-w-xl text-white/60 leading-relaxed text-xs">
              Unofficial fan discovery project. All titles, artwork, characters, and trailers belong to their respective copyright holders (Studio Pierrot, ufotable, MAPPA, Wit Studio, Toei Animation, A-1 Pictures, 8bit, Studio Bones, Shueisha, and Kodansha). Not affiliated with or endorsed by any studio, licensor, or streaming platform.
            </p>
          </div>

          {/* Quick Nav (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <p className="font-semibold uppercase tracking-wider text-white text-xs">
              Navigation
            </p>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#intro" className="hover:text-white transition-colors">
                  Prologue
                </a>
              </li>
              <li>
                <a href="#journey" className="hover:text-white transition-colors">
                  Odyssey
                </a>
              </li>
              <li>
                <a href="#highlights" className="hover:text-white transition-colors">
                  Themes
                </a>
              </li>
              <li>
                <a href="#explore" className="hover:text-white transition-colors">
                  Explore Series
                </a>
              </li>
              <li>
                <a href="#trailers" className="hover:text-white transition-colors">
                  Trailers
                </a>
              </li>
              <li>
                <a href="#spotlight" className="hover:text-white transition-colors">
                  Characters
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Official Portals (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <p className="font-semibold uppercase tracking-wider text-white text-xs">
              Official Franchises
            </p>
            <ul className="space-y-1.5">
              {ANIME_DATA.slice(0, 6).map((anime) => (
                <li key={anime.id}>
                  <a
                    href={anime.officialSite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                  >
                    {anime.title}
                    <ExternalLink className="w-3 h-3 text-white/40" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/40">
          <p>© {new Date().getFullYear()} AnimeVault Fan Project · Crafted for anime connoisseurs.</p>
          <div className="flex items-center gap-4">
            <a href="#home" onClick={scrollToTop} className="hover:text-white transition-colors">
              Back to Top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
