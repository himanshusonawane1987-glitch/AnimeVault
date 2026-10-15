import React from "react";
import { Sparkles, Play, Compass, ArrowUp } from "lucide-react";

interface FinalCTAProps {
  onRandomPick: () => void;
  onExploreClick: () => void;
  onTrailersClick: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  onRandomPick,
  onExploreClick,
  onTrailersClick,
}) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  return (
    <section id="cta" className="py-24 relative overflow-hidden bg-[#0A0C12] border-t border-white/5">
      {/* Background ambient radial aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[450px] rounded-full blur-3xl opacity-10 bg-[#FF7F1A] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl glass-panel p-8 sm:p-14 text-center max-w-4xl mx-auto border border-white/10 relative overflow-hidden shadow-2xl reveal-init">
          {/* Subtle top edge glow */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-[#F5B301] to-transparent" />

          <div className="inline-flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-[#F5B301]" />
            <span className="text-xs uppercase tracking-widest font-bold text-[#F5B301]">
              Your Vault Journey
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl text-white tracking-wide max-w-2xl mx-auto leading-tight mb-4">
            Eight Monuments of Animation. One Cinematic Archive.
          </h2>

          <p className="text-sm sm:text-base text-white/75 leading-relaxed max-w-xl mx-auto mb-8">
            Whether re-experiencing the summit war of Marineford, walking the neon shadows of Blue Lock, or uncovering the truth behind the Titans—the Vault is always open.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onRandomPick}
              className="px-6 py-3.5 rounded-full font-semibold text-xs sm:text-sm tracking-wide text-[#10131A] bg-gradient-to-r from-[#F5B301] to-[#FF7F1A] flex items-center gap-2 shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              Surprise Anime Pick
            </button>

            <button
              onClick={onExploreClick}
              className="px-6 py-3.5 rounded-full font-semibold text-xs sm:text-sm tracking-wide text-white bg-white/10 hover:bg-white/20 border border-white/15 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
            >
              <Compass className="w-4 h-4" />
              Browse Catalog
            </button>

            <button
              onClick={onTrailersClick}
              className="px-5 py-3.5 rounded-full font-semibold text-xs sm:text-sm tracking-wide text-white/80 hover:text-white flex items-center gap-2 transition-colors"
            >
              <Play className="w-4 h-4" />
              Watch Trailer Reel
            </button>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-center">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              Return to Top of Vault
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
