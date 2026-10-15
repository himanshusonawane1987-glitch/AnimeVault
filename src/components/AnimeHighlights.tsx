import React, { useState } from "react";
import { Flame, Shield, Zap, Play, Eye, BookOpen } from "lucide-react";
import { ANIME_DATA, AnimeItem } from "../data/animeData";

interface AnimeHighlightsProps {
  onWatchTrailer: (anime: AnimeItem) => void;
  onOpenDossier: (anime: AnimeItem) => void;
}

interface ThemeGroup {
  id: string;
  name: string;
  icon: React.ElementType;
  tagline: string;
  description: string;
  animeIds: string[];
}

export const AnimeHighlights: React.FC<AnimeHighlightsProps> = ({
  onWatchTrailer,
  onOpenDossier,
}) => {
  const themeGroups: ThemeGroup[] = [
    {
      id: "shonen-spirit",
      name: "Indomitable Spirit & Nakama",
      icon: Flame,
      tagline: "Found Families & The Will to Never Yield",
      description: "Generations of anime lovers were shaped by journeys centered on unbreakable camaraderie, passing the torch, and fighting for a world where friends can smile without fear.",
      animeIds: ["one-piece", "naruto-shippuden", "my-hero-academia"],
    },
    {
      id: "dark-supernatural",
      name: "Dark Fantasy & Occult Combat",
      icon: Shield,
      tagline: "Nichirin Blades, Cursed Relics & Tragic Sorcery",
      description: "Visceral battles against primordial evils, grotesque curses, and demonic calamities. Characterized by breathtaking visual effects, haunting soundtracks, and high emotional stakes.",
      animeIds: ["demon-slayer", "jujutsu-kaisen"],
    },
    {
      id: "ego-survival",
      name: "Ruthless Ego & Survival Ascent",
      icon: Zap,
      tagline: "Awakened Sovereignty, Survival & Absolute Drive",
      description: "Characters placed into ruthless environments where only pure hunger, spatial mastery, and evolution beyond physical limits decide who commands destiny.",
      animeIds: ["solo-leveling", "blue-lock", "attack-on-titan"],
    },
  ];

  const [activeThemeId, setActiveThemeId] = useState<string>("shonen-spirit");
  const activeTheme = themeGroups.find((t) => t.id === activeThemeId) || themeGroups[0];
  const highlightedAnime = ANIME_DATA.filter((a) => activeTheme.animeIds.includes(a.id));

  return (
    <section id="highlights" className="py-24 relative overflow-hidden bg-[#0A0C12] border-t border-white/5">
      {/* Background ambient radial aura */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[65vw] h-[350px] rounded-full blur-3xl opacity-10 bg-indigo-600 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 reveal-init">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs uppercase tracking-widest font-bold text-[#F5B301]">
              Thematic Exploration
            </span>
            <span className="text-white/40 text-xs">·</span>
            <span className="text-white/60 text-xs">Core Narrative Pillars</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide">
            Narrative Masterclasses
          </h2>
          <p className="text-sm text-white/70 mt-1">
            Explore how the eight sagas in the Vault interpret timeless archetypes of human courage and ambition.
          </p>
        </div>

        {/* Thematic Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-10 reveal-init">
          {themeGroups.map((group) => {
            const Icon = group.icon;
            const isSelected = group.id === activeThemeId;
            return (
              <button
                key={group.id}
                onClick={() => setActiveThemeId(group.id)}
                className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2.5 transition-all duration-200 border ${
                  isSelected
                    ? "bg-white text-[#0A0C12] border-white shadow-lg"
                    : "bg-white/5 border-white/10 text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? "text-amber-500" : "text-white/50"}`} />
                {group.name}
              </button>
            );
          })}
        </div>

        {/* Theme Description Box */}
        <div className="p-6 sm:p-8 rounded-2xl glass-panel-subtle border border-white/10 mb-8 reveal-init">
          <span className="text-xs uppercase tracking-wider font-semibold text-[#F5B301] block mb-1">
            {activeTheme.tagline}
          </span>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-3xl">
            {activeTheme.description}
          </p>
        </div>

        {/* Anime Showcase Grid for this Theme */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlightedAnime.map((anime, idx) => (
            <div
              key={anime.id}
              className={`rounded-2xl overflow-hidden glass-panel border border-white/10 p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 reveal-init stagger-${idx + 1}`}
              style={{
                borderTopWidth: "3px",
                borderTopColor: anime.palette.primary,
              }}
            >
              <div>
                <div className="relative aspect-video rounded-xl overflow-hidden mb-4 border border-white/10 bg-black">
                  <img
                    src={anime.trailer.thumbnailUrl}
                    alt={anime.title}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-semibold text-white">
                    {anime.studio}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-white/50 mb-1">
                  <span>{anime.years}</span>
                  <span className="text-amber-300 font-semibold">★ {anime.score}</span>
                </div>

                <h3 className="font-display text-2xl text-white tracking-wide mb-1">
                  {anime.title}
                </h3>
                <p className="text-xs text-white/70 line-clamp-2 mb-3">
                  {anime.description}
                </p>

                {anime.characters[0]?.quote && (
                  <p className="text-[11px] italic text-white/60 border-l-2 pl-2 border-white/20 mb-4 line-clamp-2">
                    "{anime.characters[0].quote}"
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2 text-xs">
                <button
                  onClick={() => onWatchTrailer(anime)}
                  className="font-semibold flex items-center gap-1.5 hover:underline"
                  style={{ color: anime.palette.secondary }}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Trailer
                </button>
                <button
                  onClick={() => onOpenDossier(anime)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/80 transition-colors flex items-center gap-1"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Dossier
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
