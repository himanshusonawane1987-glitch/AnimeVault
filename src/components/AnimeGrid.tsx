import React, { useState, useMemo } from "react";
import { Search, Filter, X } from "lucide-react";
import { AnimeItem } from "../data/animeData";
import { AnimeCard } from "./AnimeCard";

interface AnimeGridProps {
  animeList: AnimeItem[];
  onSelectAnime: (anime: AnimeItem) => void;
  onWatchTrailer: (anime: AnimeItem) => void;
  onSetFeatured: (anime: AnimeItem) => void;
}

export const AnimeGrid: React.FC<AnimeGridProps> = ({
  animeList,
  onSelectAnime,
  onWatchTrailer,
  onSetFeatured,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudio, setSelectedStudio] = useState<string>("All");

  // Extract unique studios for filter bar
  const studios = useMemo(() => {
    const list = Array.from(new Set(animeList.map((a) => a.studio)));
    return ["All", ...list];
  }, [animeList]);

  // Filter items
  const filteredAnime = useMemo(() => {
    return animeList.filter((anime) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        anime.title.toLowerCase().includes(q) ||
        anime.japaneseTitle.toLowerCase().includes(q) ||
        anime.genres.some((g) => g.toLowerCase().includes(q)) ||
        anime.studio.toLowerCase().includes(q);

      const matchesStudio =
        selectedStudio === "All" || anime.studio === selectedStudio;

      return matchesSearch && matchesStudio;
    });
  }, [animeList, searchQuery, selectedStudio]);

  return (
    <section id="explore" className="py-24 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-[140px] bg-red-950/15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header & Search Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-widest font-bold text-[#F5B301]">
                Discovery Catalog
              </span>
              <span className="text-white/40 text-xs">·</span>
              <span className="text-white/60 text-xs">8 Legendary Franchises</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide">
              Eight Series To Start With
            </h2>
            <p className="text-sm text-white/70 max-w-xl mt-1">
              Explore key visuals, studio signatures, and official trailers verified straight from primary licensors.
            </p>
          </div>

          {/* Search Input */}
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 text-white/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, studio, or genre..."
              className="w-full pl-10 pr-10 py-2.5 rounded-full text-xs sm:text-sm bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#F5B301] focus:bg-white/10 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/50 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Studio Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none text-xs">
          <span className="text-white/50 font-medium whitespace-nowrap flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" />
            Studio:
          </span>
          {studios.map((studio) => {
            const isSelected = selectedStudio === studio;
            return (
              <button
                key={studio}
                onClick={() => setSelectedStudio(studio)}
                className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all duration-200 font-medium ${
                  isSelected
                    ? "bg-white text-[#0A0C12] shadow-sm font-semibold"
                    : "bg-white/5 text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {studio}
              </button>
            );
          })}
        </div>

        {/* Anime Cards Grid with Staggered Entrance and 3D Cards */}
        {filteredAnime.length === 0 ? (
          <div className="text-center py-20 rounded-2xl border border-white/10 bg-white/[0.02]">
            <p className="text-white/60 text-sm">
              No anime matched "{searchQuery}". Try searching for Naruto, Jujutsu Kaisen, or MAPPA.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedStudio("All");
              }}
              className="mt-4 px-4 py-2 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredAnime.map((anime) => (
              <AnimeCard
                key={anime.id}
                anime={anime}
                onSelectAnime={onSelectAnime}
                onWatchTrailer={onWatchTrailer}
                onSetFeatured={onSetFeatured}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
