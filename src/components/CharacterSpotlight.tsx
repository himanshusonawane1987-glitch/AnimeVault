import React, { useState } from "react";
import { Quote, Shield, Play, BookOpen } from "lucide-react";
import { AnimeItem } from "../data/animeData";

interface CharacterSpotlightProps {
  animeList: AnimeItem[];
  onWatchTrailer: (anime: AnimeItem) => void;
  onOpenDossier: (anime: AnimeItem) => void;
}

export const CharacterSpotlight: React.FC<CharacterSpotlightProps> = ({
  animeList,
  onWatchTrailer,
  onOpenDossier,
}) => {
  // Extract primary character for each franchise
  const spotlightCharacters = animeList.map((anime) => ({
    anime,
    character: anime.characters[0],
  }));

  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = spotlightCharacters[activeIndex];
  const { anime, character } = activeItem;

  return (
    <section id="spotlight" className="py-24 relative overflow-hidden bg-[#0A0C12] border-t border-white/5">
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-colors duration-700"
        style={{
          background: `radial-gradient(50% 50% at 50% 50%, ${anime.palette.primary}12, transparent 75%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 reveal-init">
          <div className="inline-flex items-center gap-2 mb-2">
            <span
              className="text-xs uppercase tracking-widest font-bold"
              style={{ color: anime.palette.secondary }}
            >
              Character Archives
            </span>
            <span className="text-white/40 text-xs">·</span>
            <span className="text-white/60 text-xs">Legendary Icons</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide">
            Iconic Characters & Philosophies
          </h2>
          <p className="text-sm text-white/70 mt-2">
            Every hero in the Vault is defined by an unbreakable code and an indelible combat legacy.
          </p>
        </div>

        {/* Character Tab Strip (Functional buttons) */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-6 mb-8 scrollbar-none reveal-init">
          {spotlightCharacters.map((item, idx) => {
            const isCurrent = idx === activeIndex;
            return (
              <button
                key={item.character.name}
                onClick={() => setActiveIndex(idx)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 flex items-center gap-2 border ${
                  isCurrent
                    ? "bg-white text-[#0A0C12] border-white shadow-lg scale-105"
                    : "bg-white/5 border-white/10 text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: item.anime.palette.primary }}
                />
                {item.character.name}
              </button>
            );
          })}
        </div>

        {/* Character Showcase Card */}
        <div
          className="rounded-3xl glass-panel p-6 sm:p-12 relative overflow-hidden transition-all duration-700 border border-white/10 reveal-init"
          style={{
            borderLeftWidth: "4px",
            borderLeftColor: anime.palette.primary,
            boxShadow: `0 24px 60px rgba(0,0,0,0.7), 0 0 35px ${anime.palette.primary}18`,
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Character Info & Quote (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60 mb-1">
                  <span>{anime.title}</span>
                  <span>·</span>
                  <span style={{ color: anime.palette.secondary }}>{anime.studio}</span>
                </div>
                <h3 className="font-display text-4xl sm:text-6xl text-white tracking-wide">
                  {character.name}
                </h3>
                <p
                  className="text-base sm:text-lg font-medium"
                  style={{ color: anime.palette.secondary }}
                >
                  {character.role}
                </p>
              </div>

              {/* Character Quote Banner */}
              {character.quote && (
                <div className="relative p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                  <Quote className="w-8 h-8 text-white/15 absolute -top-3 -left-2" />
                  <p className="text-base sm:text-lg italic text-white/90 leading-relaxed font-serif pl-3">
                    "{character.quote}"
                  </p>
                </div>
              )}

              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                {character.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onWatchTrailer(anime)}
                  className="px-6 py-3 rounded-full font-semibold text-xs sm:text-sm text-[#10131A] flex items-center gap-2 shadow-lg transition-all hover:scale-105 active:scale-95"
                  style={{
                    backgroundColor: anime.palette.primary,
                    boxShadow: `0 0 20px ${anime.palette.primary}50`,
                  }}
                >
                  <Play className="w-4 h-4 fill-current" />
                  Watch {anime.title} Trailer
                </button>

                <button
                  onClick={() => onOpenDossier(anime)}
                  className="px-5 py-3 rounded-full font-semibold text-xs sm:text-sm text-white bg-white/10 hover:bg-white/20 border border-white/15 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                >
                  <BookOpen className="w-4 h-4" />
                  Series Dossier
                </button>
              </div>
            </div>

            {/* Character Graphic / Artistic Emblem (5 cols) */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="relative w-full max-w-sm aspect-square rounded-3xl overflow-hidden flex flex-col items-center justify-center p-8 text-center border border-white/10 shadow-2xl bg-gradient-to-br from-[#12141C] to-[#0A0C12]">
                {/* Radial accent glow */}
                <div
                  className="absolute inset-0 opacity-40 blur-2xl pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${anime.palette.primary}, transparent 70%)`,
                  }}
                />

                <div className="relative z-10 flex flex-col items-center">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-4 border border-white/20 shadow-xl"
                    style={{
                      backgroundColor: `${anime.palette.primary}33`,
                      boxShadow: `0 0 30px ${anime.palette.primary}44`,
                    }}
                  >
                    <Shield className="w-10 h-10" style={{ color: anime.palette.secondary }} />
                  </div>

                  <p
                    className="font-display text-4xl text-white tracking-wider mb-1"
                    style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}
                  >
                    {character.name}
                  </p>
                  <p
                    className="text-xs uppercase tracking-widest font-semibold mb-4"
                    style={{ color: anime.palette.secondary }}
                  >
                    {character.role}
                  </p>

                  <div className="flex flex-wrap justify-center gap-1.5 text-[11px] text-white/70 max-w-xs">
                    {anime.genres.slice(0, 3).map((g) => (
                      <span
                        key={g}
                        className="px-2 py-0.5 rounded bg-white/5 border border-white/10"
                      >
                        {g}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 w-full text-center">
                    <p className="text-xs text-white/50">
                      Primary Licensor: {anime.englishLicensor}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
