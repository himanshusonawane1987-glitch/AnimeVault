import React, { useState, useEffect, useRef } from "react";
import { Play, BookOpen, ChevronRight, ChevronLeft, Sparkles, ExternalLink, Compass } from "lucide-react";
import { AnimeItem } from "../data/animeData";
import { ResilientImage } from "./ResilientImage";

interface ScrollytellingJourneyProps {
  animeList: AnimeItem[];
  onWatchTrailer: (anime: AnimeItem) => void;
  onOpenDossier: (anime: AnimeItem) => void;
}

export const ScrollytellingJourney: React.FC<ScrollytellingJourneyProps> = ({
  animeList,
  onWatchTrailer,
  onOpenDossier,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Mouse tilt for the 3D showcase
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const activeAnime = animeList[activeChapterIndex] || animeList[0];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalHeight = containerRef.current.offsetHeight - window.innerHeight;

      if (totalHeight <= 0) return;

      // Progress from 0 to 1 within this container
      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalHeight));
      setScrollProgress(progress);

      // Determine which chapter (0 to animeList.length - 1)
      const chapter = Math.min(
        animeList.length - 1,
        Math.floor(progress * animeList.length)
      );
      setActiveChapterIndex(chapter);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [animeList.length]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) / (width / 2);
    const y = (clientY - (top + height / 2)) / (height / 2);
    setTilt({ x: x * 6, y: -y * 6 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const jumpToChapter = (index: number) => {
    if (!containerRef.current) return;
    const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
    const targetScroll =
      containerRef.current.offsetTop + (index / animeList.length) * totalHeight + 10;
    window.scrollTo({
      top: targetScroll,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative min-h-[380vh] bg-[#07090F]"
      aria-label="Cinematic Anime Scrollytelling Odyssey"
    >
      {/* Sticky Viewport Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-4 sm:p-8 lg:p-12">
        {/* Dynamic Multi-layered Atmospheric Lighting */}
        <div
          className="absolute inset-0 pointer-events-none transition-colors duration-1000 ease-out"
          style={{
            background: `radial-gradient(ellipse at 70% 30%, ${activeAnime.palette.primary}22 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, ${activeAnime.palette.secondary}15 0%, transparent 55%), #07090F`,
          }}
        />

        {/* Ambient floating blurred light orb */}
        <div
          className="absolute right-0 top-1/4 w-[45vw] h-[45vw] max-w-[650px] max-h-[650px] rounded-full blur-[120px] pointer-events-none transition-all duration-1000 opacity-20"
          style={{
            backgroundColor: activeAnime.palette.primary,
            transform: `translate3d(${tilt.x * 3}px, ${tilt.y * 3}px, 0)`,
          }}
        />

        {/* Faint Background Japanese Watermark Graphic (Clean, domain-accurate, non-intrusive) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 opacity-[0.035] transition-all duration-700">
          <span className="font-display text-[22vw] leading-none text-white tracking-widest whitespace-nowrap">
            {activeAnime.japaneseTitle}
          </span>
        </div>

        {/* Top Scrollytelling Stage Header & Timeline */}
        <div className="relative z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className="w-2.5 h-2.5 rounded-full animate-ping"
              style={{ backgroundColor: activeAnime.palette.primary }}
            />
            <span className="font-display text-sm tracking-widest uppercase text-white/80">
              The Grand Vault Odyssey
            </span>
            <span className="text-white/40 text-xs">·</span>
            <span
              className="text-xs uppercase tracking-widest font-semibold"
              style={{ color: activeAnime.palette.secondary }}
            >
              Scene {activeChapterIndex + 1} of {animeList.length}
            </span>
          </div>

          {/* Chapter Scrubber Dots */}
          <div
            className="flex items-center gap-1.5 p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
            role="tablist"
            aria-label="Scrollytelling Chapters"
          >
            {animeList.map((anime, idx) => {
              const isCurrent = idx === activeChapterIndex;
              return (
                <button
                  key={anime.id}
                  onClick={() => jumpToChapter(idx)}
                  role="tab"
                  aria-selected={isCurrent}
                  aria-label={`Jump to scene ${idx + 1}: ${anime.title}`}
                  className="group relative p-1 focus-visible:outline-2 focus-visible:outline-white"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                      isCurrent
                        ? "w-7 sm:w-9"
                        : "w-2.5 bg-white/20 group-hover:bg-white/50"
                    }`}
                    style={{
                      backgroundColor: isCurrent ? anime.palette.primary : undefined,
                    }}
                  />
                  {/* Tooltip on hover */}
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-[#10131A] text-[10px] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity border border-white/10 shadow-lg">
                    {anime.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center 3D Cinema Showcase */}
        <div
          className="relative z-10 my-auto py-4 max-w-7xl mx-auto w-full"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: "1200px" }}
        >
          <div
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center transition-transform duration-300 ease-out"
            style={{
              transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Left Narrative Column (6 cols) */}
            <div
              className="lg:col-span-6 space-y-5 transition-all duration-500"
              style={{ transform: "translateZ(30px)" }}
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-xs uppercase tracking-widest font-bold"
                    style={{ color: activeAnime.palette.secondary }}
                  >
                    {activeAnime.studio} · {activeAnime.years}
                  </span>
                  <span className="text-white/40 text-xs">·</span>
                  <span className="text-white/60 text-xs">{activeAnime.episodes}</span>
                </div>

                <p
                  className="text-sm font-semibold tracking-widest uppercase mb-1"
                  style={{ color: activeAnime.palette.secondary }}
                >
                  {activeAnime.japaneseTitle}
                </p>

                <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl text-white tracking-wide leading-[0.95] drop-shadow-lg">
                  {activeAnime.title}
                </h2>
              </div>

              {/* Iconic Quote Callout */}
              {activeAnime.characters[0]?.quote && (
                <div
                  className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md relative overflow-hidden"
                  style={{
                    borderLeftWidth: "3px",
                    borderLeftColor: activeAnime.palette.primary,
                  }}
                >
                  <p className="text-sm sm:text-base italic text-white/90 leading-relaxed font-serif">
                    "{activeAnime.characters[0].quote}"
                  </p>
                  <p
                    className="mt-2 text-xs font-semibold tracking-wider uppercase text-right"
                    style={{ color: activeAnime.palette.secondary }}
                  >
                    — {activeAnime.characters[0].name} ({activeAnime.characters[0].role})
                  </p>
                </div>
              )}

              {/* Story Description */}
              <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">
                {activeAnime.synopsisLong}
              </p>

              {/* Genre Pills */}
              <div className="flex flex-wrap gap-2 text-xs text-white/70">
                {activeAnime.genres.map((g) => (
                  <span
                    key={g}
                    className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10"
                  >
                    {g}
                  </span>
                ))}
              </div>

              {/* Scene Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <button
                  onClick={() => onWatchTrailer(activeAnime)}
                  className="px-6 py-3 rounded-full font-semibold text-xs sm:text-sm tracking-wide text-[#10131A] flex items-center gap-2 shadow-xl hover:scale-105 active:scale-95 transition-all"
                  style={{
                    backgroundColor: activeAnime.palette.primary,
                    boxShadow: `0 0 25px ${activeAnime.palette.primary}66`,
                  }}
                >
                  <Play className="w-4 h-4 fill-current" />
                  Watch Scene Trailer
                </button>

                <button
                  onClick={() => onOpenDossier(activeAnime)}
                  className="px-5 py-3 rounded-full font-semibold text-xs sm:text-sm tracking-wide text-white bg-white/10 hover:bg-white/20 border border-white/15 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 backdrop-blur-sm"
                >
                  <BookOpen className="w-4 h-4" />
                  Inspect Dossier
                </button>

                <a
                  href={activeAnime.officialSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-full text-xs text-white/60 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  Official Portal
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Right 3D Visual Plane (6 cols) */}
            <div
              className="lg:col-span-6 relative flex items-center justify-center"
              style={{ transform: "translateZ(50px)" }}
            >
              <div
                className="relative w-full max-w-lg aspect-[16/11] rounded-3xl overflow-hidden border border-white/15 shadow-2xl glass-panel group"
                style={{
                  boxShadow: `0 30px 70px rgba(0,0,0,0.85), 0 0 45px ${activeAnime.palette.primary}25`,
                }}
              >
                <ResilientImage
                  src={activeAnime.posterUrl}
                  fallbackSrc={activeAnime.fallbackPosterUrl}
                  alt={`${activeAnime.title} Visual`}
                  palette={activeAnime.palette}
                  title={activeAnime.title}
                  japaneseTitle={activeAnime.japaneseTitle}
                  aspectRatioClass="aspect-[16/11]"
                  className="group-hover:scale-106 transition-transform duration-700 ease-out"
                />

                {/* Overlaid Gradient & Quick Play Trigger */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5">
                  <div className="flex items-center justify-between text-xs text-white/90">
                    <span className="font-semibold tracking-wider uppercase text-amber-300">
                      ★ {activeAnime.score} Global Critical Acclaim
                    </span>
                    <button
                      onClick={() => onWatchTrailer(activeAnime)}
                      className="px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center gap-1.5 font-semibold text-white transition-all hover:scale-105"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      Play Video
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Scroll Guide & Chapter Arrow Navigators */}
        <div className="relative z-20 flex items-center justify-between pt-2 border-t border-white/10 text-xs text-white/50">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5B301]" />
            <span className="hidden sm:inline">Scroll down to traverse the 8 cinematic chapters</span>
            <span className="sm:hidden">Scroll to explore scenes</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => jumpToChapter(Math.max(0, activeChapterIndex - 1))}
              disabled={activeChapterIndex === 0}
              aria-label="Previous anime scene"
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 disabled:opacity-30 disabled:pointer-events-none text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono tabular-nums text-white/80">
              {activeChapterIndex + 1} / {animeList.length}
            </span>
            <button
              onClick={() => jumpToChapter(Math.min(animeList.length - 1, activeChapterIndex + 1))}
              disabled={activeChapterIndex === animeList.length - 1}
              aria-label="Next anime scene"
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 disabled:opacity-30 disabled:pointer-events-none text-white transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
