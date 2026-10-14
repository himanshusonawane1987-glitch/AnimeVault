import React, { useEffect, useRef } from "react";
import { X, ExternalLink, Play, Film, Calendar, Star, Users, Award, ShieldCheck } from "lucide-react";
import { AnimeItem } from "../data/animeData";
import { ResilientImage } from "./ResilientImage";

interface DetailModalProps {
  anime: AnimeItem | null;
  isOpen: boolean;
  onClose: () => void;
  onWatchTrailer: (anime: AnimeItem) => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  anime,
  isOpen,
  onClose,
  onWatchTrailer,
}) => {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setTimeout(() => closeBtnRef.current?.focus(), 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !anime) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-[#0F1118] text-white shadow-2xl"
        style={{
          boxShadow: `0 20px 60px rgba(0,0,0,0.85), 0 0 40px ${anime.palette.primary}20`,
        }}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <span
              className="font-display text-xs uppercase tracking-widest px-2 py-0.5 rounded"
              style={{
                backgroundColor: `${anime.palette.primary}25`,
                color: anime.palette.secondary,
              }}
            >
              Franchise Dossier
            </span>
            <span className="text-white/40 text-xs">·</span>
            <span className="text-white/70 text-xs">{anime.studio}</span>
          </div>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close details"
            className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Header Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
            <div className="sm:col-span-1 rounded-xl overflow-hidden border border-white/10 shadow-lg">
              <ResilientImage
                src={anime.posterUrl}
                fallbackSrc={anime.fallbackPosterUrl}
                alt={`${anime.title} poster`}
                palette={anime.palette}
                title={anime.title}
                japaneseTitle={anime.japaneseTitle}
                aspectRatioClass="aspect-[2/3]"
              />
            </div>

            <div className="sm:col-span-2 space-y-3">
              <div>
                <p
                  className="text-xs uppercase tracking-widest font-semibold"
                  style={{ color: anime.palette.secondary }}
                >
                  {anime.japaneseTitle}
                </p>
                <h2
                  id="detail-title"
                  className="font-display text-3xl sm:text-4xl text-white tracking-wide"
                >
                  {anime.title}
                </h2>
              </div>

              {/* Clean unboxed metadata with dot separators */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-white/70">
                <span className="flex items-center gap-1 text-white font-medium">
                  <Film className="w-3.5 h-3.5 text-white/60" />
                  {anime.episodes}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1 text-white font-medium">
                  <Calendar className="w-3.5 h-3.5 text-white/60" />
                  {anime.years}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1 text-amber-300 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                  {anime.score} Score
                </span>
              </div>

              {/* Genres as clean inline list */}
              <div className="flex flex-wrap gap-1.5 pt-1 text-xs text-white/60">
                {anime.genres.map((g, idx) => (
                  <span
                    key={g}
                    className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/80"
                  >
                    {g}
                  </span>
                ))}
              </div>

              <p className="text-sm text-white/80 leading-relaxed pt-2">
                {anime.synopsisLong}
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 pt-3">
                <button
                  onClick={() => {
                    onClose();
                    onWatchTrailer(anime);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold shadow-md transition-transform hover:scale-105"
                  style={{
                    backgroundColor: anime.palette.primary,
                    color: "#10131A",
                  }}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Play Official Trailer
                </button>
                <a
                  href={anime.officialSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-white transition-colors"
                >
                  Official Site
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Key Characters Section */}
          <div className="border-t border-white/10 pt-5">
            <h4 className="font-display text-lg tracking-wide text-white mb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-white/60" />
              Key Characters & Voices
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {anime.characters.map((char) => (
                <div
                  key={char.name}
                  className="p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-colors"
                >
                  <p className="font-semibold text-sm text-white">{char.name}</p>
                  <p
                    className="text-[11px] font-medium mb-1.5"
                    style={{ color: anime.palette.secondary }}
                  >
                    {char.role}
                  </p>
                  <p className="text-xs text-white/70 line-clamp-3">
                    {char.description}
                  </p>
                  {char.quote && (
                    <p className="mt-2 text-[11px] italic text-white/50 border-l-2 pl-2 border-white/20">
                      "{char.quote}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Highlights & Trivia */}
          <div className="border-t border-white/10 pt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <h5 className="text-xs uppercase tracking-wider font-semibold text-white/90 mb-2 flex items-center gap-1.5">
                <Award className="w-4 h-4" style={{ color: anime.palette.primary }} />
                Story Arcs & Highlights
              </h5>
              <ul className="text-xs text-white/70 space-y-1.5 list-disc list-inside">
                {anime.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <h5 className="text-xs uppercase tracking-wider font-semibold text-white/90 mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" style={{ color: anime.palette.secondary }} />
                Production Notes
              </h5>
              <p className="text-xs text-white/70 leading-relaxed">
                {anime.trivia}
              </p>
              <div className="mt-2.5 pt-2 border-t border-white/5 text-[11px] text-white/50">
                Licensor: {anime.englishLicensor}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
