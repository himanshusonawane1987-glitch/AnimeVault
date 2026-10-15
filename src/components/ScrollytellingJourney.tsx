import React, { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, BookOpen, ChevronRight, ChevronLeft, ExternalLink, Sparkles, Compass } from "lucide-react";
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
  const activeChapterRef = useRef(0);
  activeChapterRef.current = activeChapterIndex;

  // Auto-progression state
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [timerProgress, setTimerProgress] = useState(0);

  // Cached layout metrics
  const metricsRef = useRef({ top: 0, height: 0, scrollable: 0 });
  const isUserScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mouse tilt for the 3D showcase (desktop only)
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const activeAnime = animeList[activeChapterIndex] || animeList[0];

  // Measure and cache container geometry
  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const top = window.scrollY + rect.top;
      const height = containerRef.current.offsetHeight;
      const scrollable = Math.max(1, height - window.innerHeight);
      metricsRef.current = { top, height, scrollable };
    };

    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, [animeList.length]);

  // Handle manual scroll mapping
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      // Mark as user scrolling to pause timer fighting
      isUserScrollingRef.current = true;
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isUserScrollingRef.current = false;
      }, 2500);

      if (!ticking) {
        requestAnimationFrame(() => {
          const { top, scrollable } = metricsRef.current;
          if (scrollable <= 0) {
            ticking = false;
            return;
          }

          const currentScroll = window.scrollY - top;
          if (currentScroll >= 0 && currentScroll <= scrollable) {
            const progress = Math.max(0, Math.min(1, currentScroll / scrollable));
            const targetIndex = Math.min(
              animeList.length - 1,
              Math.floor(progress * animeList.length)
            );

            if (targetIndex !== activeChapterRef.current) {
              setActiveChapterIndex(targetIndex);
              setTimerProgress(0);
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [animeList.length]);

  // Automatic Scene Progression Timer (Paused on scroll, hover, tab hidden, or reduced-motion)
  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced || !isAutoPlaying || isHovered) {
      return;
    }

    const duration = 7000; // 7 seconds per scene
    const intervalTime = 100;
    const step = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      // Don't auto advance if user is actively scrolling through this section
      if (isUserScrollingRef.current || document.hidden) return;

      setTimerProgress((prev) => {
        if (prev >= 100) {
          setActiveChapterIndex((curr) => (curr + 1) % animeList.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isAutoPlaying, isHovered, animeList.length]);

  // Reset timer progress when chapter changes manually
  const selectChapter = useCallback((index: number) => {
    setActiveChapterIndex(index);
    setTimerProgress(0);
  }, []);

  const jumpToChapter = (index: number) => {
    selectChapter(index);
    if (!containerRef.current) return;
    const { top, scrollable } = metricsRef.current;
    const targetScroll = top + (index / animeList.length) * scrollable + 15;
    window.scrollTo({
      top: targetScroll,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  // Pointer 3D tilt (Desktop only)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.innerWidth < 1024) return;
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) / (width / 2);
    const y = (clientY - (top + height / 2)) / (height / 2);
    setTilt({ x: x * 4.5, y: -y * 4.5 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative min-h-[260vh] bg-[#0A0C12]"
      aria-label="Cinematic Anime Scrollytelling Odyssey"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Sticky Viewport Stage — Zero black gaps, seamless background blending */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-4 sm:p-8 lg:p-12">
        {/* Dynamic Multi-layered Atmospheric Lighting */}
        <div
          className="absolute inset-0 pointer-events-none transition-colors duration-1000 ease-out"
          style={{
            background: `radial-gradient(ellipse at 75% 35%, ${activeAnime.palette.primary}20 0%, transparent 65%), radial-gradient(ellipse at 25% 75%, ${activeAnime.palette.secondary}14 0%, transparent 60%), #0A0C12`,
          }}
        />

        {/* Ambient floating blurred light orb */}
        <div
          className="absolute right-10 top-1/4 w-72 h-72 rounded-full blur-3xl pointer-events-none transition-all duration-1000 opacity-20"
          style={{
            backgroundColor: activeAnime.palette.primary,
            transform: `translate3d(${tilt.x * 2}px, ${tilt.y * 2}px, 0)`,
          }}
        />

        {/* Faint Background Japanese Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 opacity-[0.035] transition-all duration-700">
          <span className="font-display text-[20vw] leading-none text-white tracking-widest whitespace-nowrap">
            {activeAnime.japaneseTitle}
          </span>
        </div>

        {/* Top Scrollytelling Stage Header & Timeline */}
        <div className="relative z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{
                backgroundColor: activeAnime.palette.primary,
                boxShadow: `0 0 10px ${activeAnime.palette.primary}`,
              }}
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

            {/* Auto-Play Toggle Control */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              aria-label={isAutoPlaying ? "Pause automatic presentation" : "Play automatic presentation"}
              className="ml-2 px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-[11px] font-semibold text-white/80 hover:text-white flex items-center gap-1.5 transition-colors focus-visible:outline-2 focus-visible:outline-white"
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-3 h-3 text-[#F5B301]" />
                  <span>Auto Playing</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-white/60 fill-current" />
                  <span>Auto Paused</span>
                </>
              )}
            </button>
          </div>

          {/* Chapter Scrubber Dots & Timer Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
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
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-[#10131A] text-[10px] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity border border-white/10 shadow-lg">
                      {anime.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Center 3D Cinema Showcase with Controlled Zoom & No Distortion */}
        <div
          className="relative z-10 my-auto py-4 max-w-7xl mx-auto w-full"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: "1000px" }}
        >
          <div
            key={activeAnime.id}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center transition-all duration-500 ease-out animate-in fade-in"
            style={{
              transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Left Narrative Column (6 cols) */}
            <div
              className="lg:col-span-6 space-y-4 sm:space-y-5"
              style={{ transform: "translateZ(20px)" }}
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
                  className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md relative overflow-hidden"
                  style={{
                    borderLeftWidth: "3px",
                    borderLeftColor: activeAnime.palette.primary,
                  }}
                >
                  <p className="text-sm sm:text-base italic text-white/90 leading-relaxed font-serif">
                    "{activeAnime.characters[0].quote}"
                  </p>
                  <p
                    className="mt-1.5 text-xs font-semibold tracking-wider uppercase text-right"
                    style={{ color: activeAnime.palette.secondary }}
                  >
                    — {activeAnime.characters[0].name} ({activeAnime.characters[0].role})
                  </p>
                </div>
              )}

              {/* Story Description */}
              <p className="text-xs sm:text-sm md:text-base text-white/80 leading-relaxed max-w-xl">
                {activeAnime.synopsisLong}
              </p>

              {/* Genre Pills */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 text-xs text-white/70">
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
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onWatchTrailer(activeAnime)}
                  className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold text-xs sm:text-sm tracking-wide text-[#10131A] flex items-center gap-2 shadow-xl hover:scale-105 active:scale-95 transition-all"
                  style={{
                    backgroundColor: activeAnime.palette.primary,
                    boxShadow: `0 0 20px ${activeAnime.palette.primary}66`,
                  }}
                >
                  <Play className="w-4 h-4 fill-current" />
                  Watch Scene Trailer
                </button>

                <button
                  onClick={() => onOpenDossier(activeAnime)}
                  className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-full font-semibold text-xs sm:text-sm tracking-wide text-white bg-white/10 hover:bg-white/20 border border-white/15 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 backdrop-blur-sm"
                >
                  <BookOpen className="w-4 h-4" />
                  Inspect Dossier
                </button>

                <a
                  href={activeAnime.officialSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-full text-xs text-white/60 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  Official Portal
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Right 3D Visual Plane (6 cols) — Responsive 16:9 frame, NO extreme zoom */}
            <div
              className="lg:col-span-6 relative flex items-center justify-center"
              style={{ transform: "translateZ(35px)" }}
            >
              <div
                className="relative w-full max-w-lg aspect-video sm:aspect-[16/10] rounded-3xl overflow-hidden border border-white/15 shadow-2xl glass-panel group"
                style={{
                  boxShadow: `0 25px 60px rgba(0,0,0,0.8), 0 0 35px ${activeAnime.palette.primary}22`,
                }}
              >
                <ResilientImage
                  src={activeAnime.posterUrl}
                  fallbackSrc={activeAnime.fallbackPosterUrl}
                  alt={`${activeAnime.title} Visual`}
                  palette={activeAnime.palette}
                  title={activeAnime.title}
                  japaneseTitle={activeAnime.japaneseTitle}
                  aspectRatioClass="h-full w-full"
                  className="transition-transform duration-700 ease-out group-hover:scale-103"
                />

                {/* Overlaid Gradient & Quick Play Trigger */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex flex-col justify-end p-4 sm:p-5">
                  <div className="flex items-center justify-between text-xs text-white/90">
                    <span className="font-semibold tracking-wider uppercase text-amber-300">
                      ★ {activeAnime.score} Critical Acclaim
                    </span>
                    <button
                      onClick={() => onWatchTrailer(activeAnime)}
                      className="px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md flex items-center gap-1.5 font-semibold text-white transition-all hover:scale-105"
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

        {/* Bottom Scene Progression Indicator Line & Navigators */}
        <div className="relative z-20 flex flex-col gap-2 pt-2 border-t border-white/10 text-xs text-white/50">
          {/* Subtle Scene Duration Progress Line */}
          {isAutoPlaying && !isHovered && (
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#F5B301] to-[#FF7F1A] transition-all duration-100 ease-linear rounded-full"
                style={{ width: `${timerProgress}%` }}
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5B301]" />
              <span className="hidden sm:inline">
                Scroll naturally or let scenes tour automatically
              </span>
              <span className="sm:hidden">Auto tour active</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  jumpToChapter(
                    (activeChapterIndex - 1 + animeList.length) % animeList.length
                  )
                }
                aria-label="Previous anime scene"
                className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-mono tabular-nums text-white/80 font-medium">
                {activeChapterIndex + 1} / {animeList.length}
              </span>
              <button
                onClick={() =>
                  jumpToChapter((activeChapterIndex + 1) % animeList.length)
                }
                aria-label="Next anime scene"
                className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
