import React from "react";
import { Sparkles, Film, Compass, Flame } from "lucide-react";
import { ANIME_DATA, AnimeItem } from "../data/animeData";

interface CinematicIntroProps {
  onSelectAnime: (anime: AnimeItem) => void;
  onExploreClick: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({
  onSelectAnime,
  onExploreClick,
}) => {
  const pillars = [
    {
      icon: Film,
      title: "Mastery of Sakuga",
      description: "From ufotable's breathing choreographies and MAPPA's cursed domain expanses to Toei's boundless Grand Line voyages, modern anime represents the pinnacle of hand-drawn digital fusion.",
      tag: "8 Prestigious Studios",
    },
    {
      icon: Flame,
      title: "Indomitable Philosophies",
      description: "Every protagonist in the Vault is propelled by an inviolable code—whether it is Naruto's nindo, Luffy's vow of freedom, or Jinwoo's solitary ascent from the weakest to the monarch.",
      tag: "Unforgettable Codes",
    },
    {
      icon: Compass,
      title: "Curated Preservation",
      description: "An ad-free, non-commercial cinematic haven engineered to explore key visuals, verified trailers, and official studio archives with zero algorithmic noise.",
      tag: "Verified Licensors",
    },
  ];

  return (
    <section id="intro" className="py-24 relative overflow-hidden bg-[#0A0C12] border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[400px] rounded-full blur-3xl opacity-10 bg-amber-500 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Intro Header with Reveal Class */}
        <div className="max-w-3xl mx-auto text-center mb-16 reveal-init">
          <div className="inline-flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-[#F5B301]" />
            <span className="text-xs uppercase tracking-widest font-bold text-[#F5B301]">
              Prologue · The Pantheon
            </span>
            <span className="text-white/40 text-xs">·</span>
            <span className="text-white/60 text-xs">Eight Landmark Sagas</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl text-white tracking-wide leading-tight">
            Where Legends Awaken
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/75 leading-relaxed max-w-2xl mx-auto">
            AnimeVault curates eight titan franchises that redefined global storytelling. Each series represents hundreds of animator hours, iconic voice acting performances, and emotional milestones that resonate across generations.
          </p>
        </div>

        {/* 3 Pillars Grid with Staggered Reveals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className={`p-7 rounded-2xl glass-panel relative overflow-hidden transition-all duration-300 hover:-translate-y-1 reveal-init stagger-${idx + 1}`}
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#F5B301] mb-5 shadow-inner">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#F5B301]/80 block mb-1">
                  {pillar.tag}
                </span>
                <h3 className="font-display text-2xl text-white tracking-wide mb-2.5">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* 8 Series Thumbnail Strip */}
        <div className="reveal-init">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase tracking-wider font-semibold text-white/50">
              Traverse the Vault Pantheon
            </span>
            <button
              onClick={onExploreClick}
              className="text-xs font-semibold text-[#F5B301] hover:underline"
            >
              Browse Full Catalog →
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {ANIME_DATA.map((anime) => (
              <button
                key={anime.id}
                onClick={() => onSelectAnime(anime)}
                className="group relative rounded-xl overflow-hidden aspect-[3/4] bg-[#12141C] border border-white/10 hover:border-white/30 transition-all hover:scale-105 focus-visible:outline-2 focus-visible:outline-white"
              >
                <img
                  src={anime.posterUrl}
                  alt={anime.title}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-2.5 text-left">
                  <span className="font-display text-sm text-white tracking-wide leading-tight line-clamp-1 group-hover:text-[#F5B301] transition-colors">
                    {anime.title}
                  </span>
                  <span className="text-[10px] text-white/60 line-clamp-1">
                    {anime.studio}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
