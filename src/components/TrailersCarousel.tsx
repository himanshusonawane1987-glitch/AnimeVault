import React, { useRef } from "react";
import { Play, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { AnimeItem } from "../data/animeData";

interface TrailersCarouselProps {
  animeList: AnimeItem[];
  onPlayTrailer: (anime: AnimeItem) => void;
}

export const TrailersCarousel: React.FC<TrailersCarouselProps> = ({
  animeList,
  onPlayTrailer,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const offset = direction === "left" ? -380 : 380;
    scrollContainerRef.current.scrollBy({
      left: offset,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  return (
    <section id="trailers" className="py-24 relative overflow-hidden bg-[#0A0C12] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Carousel Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 reveal-init">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-widest font-bold text-[#F5B301]">
                Cinema Hall
              </span>
              <span className="text-white/40 text-xs">·</span>
              <span className="text-white/60 text-xs">Official Studio Teasers</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide">
              Verified Official Trailers
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              aria-label="Previous trailers"
              className="p-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white transition-all hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Next trailers"
              className="p-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white transition-all hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-white"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Horizontal Carousel */}
        <div
          ref={scrollContainerRef}
          tabIndex={0}
          aria-label="Official trailer reel"
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-thin scrollbar-thumb-white/20 focus:outline-none reveal-init"
        >
          {animeList.map((anime, idx) => (
            <div
              key={anime.id}
              className={`snap-start shrink-0 w-[85vw] sm:w-[380px] rounded-2xl overflow-hidden bg-[#12141C] border border-white/10 group flex flex-col transition-all duration-300 hover:-translate-y-1.5 stagger-${(idx % 4) + 1}`}
              style={{
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              }}
            >
              {/* Facade Thumbnail Box */}
              <div
                onClick={() => onPlayTrailer(anime)}
                className="relative aspect-video w-full bg-black cursor-pointer overflow-hidden"
              >
                <img
                  src={anime.trailer.thumbnailUrl}
                  alt={`${anime.title} Trailer Thumbnail`}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== anime.trailer.fallbackThumbnail) {
                      target.src = anime.trailer.fallbackThumbnail;
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Subtle scrim */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />

                {/* Glass Play Button */}
                <div
                  className="absolute inset-0 m-auto w-14 h-14 rounded-full flex items-center justify-center bg-white/15 backdrop-blur-md border border-white/20 text-white shadow-xl group-hover:scale-115 transition-transform duration-300"
                  style={{
                    boxShadow: `0 0 24px ${anime.palette.primary}66`,
                  }}
                >
                  <Play className="w-6 h-6 fill-current translate-x-0.5" />
                </div>

                {/* Length/Tag Badge */}
                <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[11px] font-semibold text-white/90">
                  Trailer PV
                </div>
              </div>

              {/* Meta Card Body */}
              <div className="p-4 flex flex-col justify-between flex-1 bg-white/[0.02]">
                <div>
                  <p
                    className="text-[11px] font-semibold uppercase tracking-wider mb-0.5"
                    style={{ color: anime.palette.secondary }}
                  >
                    {anime.trailer.channel}
                  </p>
                  <h4 className="font-display text-xl text-white tracking-wide line-clamp-1 group-hover:text-amber-100 transition-colors">
                    {anime.title}
                  </h4>
                  <p className="text-xs text-white/60 line-clamp-2 mt-1">
                    {anime.trailer.title}
                  </p>
                </div>

                <div className="pt-4 mt-2 border-t border-white/5 flex items-center justify-between text-xs">
                  <button
                    onClick={() => onPlayTrailer(anime)}
                    className="font-semibold text-white hover:underline flex items-center gap-1"
                    style={{ color: anime.palette.secondary }}
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Play in Vault
                  </button>

                  <a
                    href={anime.trailer.watchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    YouTube
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer / Privacy Info */}
        <p className="text-xs text-white/50 mt-4 text-center sm:text-left">
          Trailers load strictly on click using privacy-enhanced YouTube embeds (youtube-nocookie). No third-party trackers are triggered until you press play.
        </p>
      </div>
    </section>
  );
};
