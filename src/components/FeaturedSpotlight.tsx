import React from "react";
import { Play, ExternalLink, Award, Film, BookOpen, Layers } from "lucide-react";
import { AnimeItem } from "../data/animeData";
import { ResilientImage } from "./ResilientImage";

interface FeaturedSpotlightProps {
  anime: AnimeItem;
  allAnime: AnimeItem[];
  onSetFeatured: (anime: AnimeItem) => void;
  onWatchTrailer: (anime: AnimeItem) => void;
  onOpenDossier: (anime: AnimeItem) => void;
}

export const FeaturedSpotlight: React.FC<FeaturedSpotlightProps> = ({
  anime,
  allAnime,
  onSetFeatured,
  onWatchTrailer,
  onOpenDossier,
}) => {
  return (
    <section id="featured" className="py-24 relative overflow-hidden">
      {/* Background radial glow tinted with current anime's palette */}
      <div
        className="absolute inset-0 pointer-events-none transition-colors duration-1000"
        style={{
          background: `radial-gradient(60% 60% at 70% 40%, ${anime.palette.primary}18, transparent)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-xs uppercase tracking-widest font-bold"
                style={{ color: anime.palette.secondary }}
              >
                In-Depth Spotlight
              </span>
              <span className="text-white/40 text-xs">·</span>
              <span className="text-white/60 text-xs">{anime.studio}</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide">
              Featured Epic
            </h2>
          </div>

          {/* Quick switcher tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none max-w-full">
            {allAnime.map((item) => {
              const isSelected = item.id === anime.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSetFeatured(item)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    isSelected
                      ? "bg-white text-[#0A0C12] shadow-md"
                      : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Box Container */}
        <div
          className="rounded-3xl glass-panel overflow-hidden border border-white/10 p-6 sm:p-10 transition-all duration-700"
          style={{
            borderTopWidth: "3px",
            borderTopColor: anime.palette.primary,
            boxShadow: `0 20px 50px rgba(0,0,0,0.6), 0 0 32px ${anime.palette.primary}18`,
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Visual Box (5 cols) */}
            <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative group">
              <ResilientImage
                src={anime.posterUrl}
                fallbackSrc={anime.fallbackPosterUrl}
                alt={`${anime.title} Artwork`}
                palette={anime.palette}
                title={anime.title}
                japaneseTitle={anime.japaneseTitle}
                aspectRatioClass="aspect-[16/11]"
                className="group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute bottom-3 left-3 right-3 px-3 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs">
                <span className="text-white/80 font-medium">{anime.studio}</span>
                <span className="text-amber-300 font-semibold">★ {anime.score} Global Rating</span>
              </div>
            </div>

            {/* Info Column (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <span
                  className="text-xs uppercase tracking-widest font-bold"
                  style={{ color: anime.palette.secondary }}
                >
                  {anime.japaneseTitle} · {anime.tagline}
                </span>
                <h3 className="font-display text-4xl sm:text-6xl text-white tracking-wide mt-1 leading-none">
                  {anime.title}
                </h3>
              </div>

              {/* Clean metadata line */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-white/70">
                <span className="font-medium text-white">{anime.episodes}</span>
                <span>·</span>
                <span className="font-medium text-white">{anime.years}</span>
                <span>·</span>
                <span>Licensor: {anime.englishLicensor}</span>
              </div>

              {/* Long synopsis */}
              <p className="text-sm sm:text-base text-white/80 leading-relaxed pt-1">
                {anime.synopsisLong}
              </p>

              {/* Key Story Arcs Pills */}
              <div className="pt-2">
                <p className="text-xs text-white/50 uppercase tracking-wider mb-2 font-medium flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" style={{ color: anime.palette.primary }} />
                  Iconic Highlights
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {anime.highlights.map((h) => (
                    <span
                      key={h}
                      className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/80"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <button
                  onClick={() => onWatchTrailer(anime)}
                  className="px-6 py-3 rounded-full font-semibold text-xs sm:text-sm tracking-wide text-[#10131A] flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all"
                  style={{
                    backgroundColor: anime.palette.primary,
                    boxShadow: `0 0 20px ${anime.palette.primary}50`,
                  }}
                >
                  <Play className="w-4 h-4 fill-current" />
                  Watch Official Trailer
                </button>

                <button
                  onClick={() => onOpenDossier(anime)}
                  className="px-5 py-3 rounded-full font-semibold text-xs sm:text-sm tracking-wide text-white bg-white/10 hover:bg-white/20 border border-white/15 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                >
                  <BookOpen className="w-4 h-4" />
                  Full Dossier & Cast
                </button>

                <a
                  href={anime.officialSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-full text-xs sm:text-sm text-white/70 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  Official Site
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
