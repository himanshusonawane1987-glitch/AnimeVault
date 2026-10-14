import React, { useState, useEffect, useRef } from "react";
import { Play, Compass, ChevronRight, ChevronLeft, Star, ArrowDown } from "lucide-react";
import { AnimeItem } from "../data/animeData";
import { ResilientImage } from "./ResilientImage";

interface HeroSectionProps {
  animeList: AnimeItem[];
  onExploreClick: () => void;
  onWatchTrailer: (anime: AnimeItem) => void;
  onSelectAnime: (anime: AnimeItem) => void;
  onStartOdyssey: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  animeList,
  onExploreClick,
  onWatchTrailer,
  onSelectAnime,
  onStartOdyssey,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const currentAnime = animeList[currentIndex] || animeList[0];

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Scroll listener for hero parallax and scale
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-advance hero carousel
  useEffect(() => {
    if (isPaused) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % animeList.length);
    }, 7500);

    return () => clearInterval(timer);
  }, [isPaused, animeList.length]);

  // Canvas particle embers effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || window.innerWidth < 768) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.8,
      speedY: Math.random() * 0.45 + 0.2,
      speedX: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.6 + 0.2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += Math.sin(p.y / 35) * 0.35 + p.speedX;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.fillStyle = currentAnime.palette.secondary;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentAnime.palette.secondary]);

  // Calculate subtle scroll parallax transforms
  const isReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const heroParallax = !isReducedMotion ? Math.min(250, scrollY * 0.25) : 0;
  const panelParallax = !isReducedMotion ? Math.min(180, scrollY * -0.15) : 0;
  const heroOpacity = !isReducedMotion ? Math.max(0.2, 1 - scrollY / 700) : 1;

  return (
    <section
      id="home"
      aria-label="Featured Series Hero"
      className="relative min-h-screen flex items-end overflow-hidden pb-16 pt-24"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Banner with Ken Burns Zoom & Smooth Scroll Scaling */}
      <div
        className="absolute inset-0 z-0 overflow-hidden transition-transform duration-100 ease-out"
        style={{
          transform: `translate3d(0, ${heroParallax}px, 0)`,
          opacity: heroOpacity,
        }}
      >
        {animeList.map((anime, idx) => {
          const isSelected = idx === currentIndex;
          return (
            <div
              key={anime.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isSelected ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <div className="w-full h-full animate-kenburns scale-105">
                <ResilientImage
                  src={anime.heroBannerUrl || anime.posterUrl}
                  fallbackSrc={anime.posterUrl}
                  alt={anime.title}
                  palette={anime.palette}
                  title={anime.title}
                  japaneseTitle={anime.japaneseTitle}
                  aspectRatioClass="h-full w-full"
                  isHero={true}
                />
              </div>
            </div>
          );
        })}

        {/* Cinematic Multi-level Gradient Scrim */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#0A0C12] via-[#0A0C12]/75 to-transparent pointer-events-none" />
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-[#0A0C12]/95 via-[#0A0C12]/55 to-transparent pointer-events-none" />

        {/* Ambient Glowing Orbs */}
        <div
          className="absolute -left-20 bottom-10 w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] rounded-full blur-[90px] opacity-25 pointer-events-none transition-colors duration-1000"
          style={{ backgroundColor: currentAnime.palette.primary }}
        />
        <div
          className="absolute -right-20 top-20 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full blur-[100px] opacity-15 pointer-events-none transition-colors duration-1000"
          style={{ backgroundColor: currentAnime.palette.secondary }}
        />

        {/* Lightweight Ember Canvas */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 z-20 pointer-events-none w-full h-full"
        />
      </div>

      {/* Hero Content Container with Smooth Parallax Float */}
      <div
        className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
        style={{ transform: `translate3d(0, ${panelParallax}px, 0)` }}
      >
        <div className="max-w-2xl">
          {/* Glass Panel */}
          <div
            className="p-6 sm:p-10 rounded-3xl glass-panel relative overflow-hidden transition-all duration-700"
            style={{
              borderColor: `${currentAnime.palette.primary}40`,
              boxShadow: `0 24px 60px rgba(0,0,0,0.7), 0 0 32px ${currentAnime.palette.primary}18`,
            }}
          >
            {/* Top Eyebrow Tag */}
            <div className="flex items-center gap-2 mb-3">
              <span
                className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-white/10"
                style={{ color: currentAnime.palette.secondary }}
              >
                {currentAnime.tagline}
              </span>
              <span className="text-white/40 text-xs">·</span>
              <span className="text-white/70 text-xs flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {currentAnime.score} Score
              </span>
            </div>

            {/* Japanese Subtitle */}
            <p
              className="text-sm font-semibold tracking-widest uppercase mb-1 transition-colors duration-500"
              style={{ color: currentAnime.palette.secondary }}
            >
              {currentAnime.japaneseTitle}
            </p>

            {/* Title */}
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-white mb-4 drop-shadow-md">
              {currentAnime.title}
            </h1>

            {/* Synopsis */}
            <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-8 max-w-xl">
              {currentAnime.description}
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={() => onWatchTrailer(currentAnime)}
                className="px-6 py-3.5 rounded-full font-semibold text-sm tracking-wide text-[#10131A] flex items-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
                style={{
                  backgroundColor: currentAnime.palette.primary,
                  boxShadow: `0 0 24px ${currentAnime.palette.primary}66`,
                }}
              >
                <Play className="w-4 h-4 fill-current" />
                Watch Official Trailer
              </button>

              <button
                onClick={onStartOdyssey}
                className="px-5 py-3.5 rounded-full font-semibold text-sm tracking-wide text-white bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-md flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Begin Odyssey
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreClick}
                className="px-4 py-3.5 text-xs text-white/70 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Compass className="w-4 h-4 text-white/50" />
                All 8 Series
              </button>
            </div>

            {/* Navigation Dots and Arrow Switchers */}
            <div className="flex items-center justify-between pt-8 mt-6 border-t border-white/10">
              <div
                className="flex items-center gap-2"
                role="group"
                aria-label="Featured Series Selector"
              >
                {animeList.map((anime, idx) => {
                  const isCurrent = idx === currentIndex;
                  return (
                    <button
                      key={anime.id}
                      onClick={() => setCurrentIndex(idx)}
                      aria-label={`Select ${anime.title}`}
                      aria-current={isCurrent}
                      className="group p-1.5 focus-visible:outline-2 focus-visible:outline-white"
                    >
                      <span
                        className={`block h-1.5 rounded-full transition-all duration-400 ${
                          isCurrent
                            ? "w-8"
                            : "w-2.5 bg-white/25 group-hover:bg-white/50"
                        }`}
                        style={{
                          backgroundColor: isCurrent ? currentAnime.palette.primary : undefined,
                        }}
                      />
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() =>
                    setCurrentIndex(
                      (prev) => (prev - 1 + animeList.length) % animeList.length
                    )
                  }
                  aria-label="Previous anime banner"
                  className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    setCurrentIndex((prev) => (prev + 1) % animeList.length)
                  }
                  aria-label="Next anime banner"
                  className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Apple-style Scroll Down Indicator */}
        <div className="pt-8 flex items-center justify-center pointer-events-none">
          <div className="flex flex-col items-center gap-2 text-white/40 text-xs font-medium tracking-widest uppercase">
            <span>Scroll To Experience</span>
            <ArrowDown className="w-4 h-4 animate-bounce text-[#F5B301]" />
          </div>
        </div>
      </div>
    </section>
  );
};
