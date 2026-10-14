import React, { useState, useRef } from "react";
import { Play, Eye } from "lucide-react";
import { AnimeItem } from "../data/animeData";
import { ResilientImage } from "./ResilientImage";

interface AnimeCardProps {
  anime: AnimeItem;
  onSelectAnime: (anime: AnimeItem) => void;
  onWatchTrailer: (anime: AnimeItem) => void;
  onSetFeatured: (anime: AnimeItem) => void;
}

export const AnimeCard: React.FC<AnimeCardProps> = ({
  anime,
  onSelectAnime,
  onWatchTrailer,
  onSetFeatured,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, sheenX: 50, sheenY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Max 7 deg tilt for pleasant 3D depth without text distortion
    const rotateX = ((y - centerY) / centerY) * -6.5;
    const rotateY = ((x - centerX) / centerX) * 6.5;

    const sheenX = (x / rect.width) * 100;
    const sheenY = (y / rect.height) * 100;

    setTilt({ rotateX, rotateY, sheenX, sheenY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0, sheenX: 50, sheenY: 50 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative rounded-2xl overflow-hidden bg-[#12141C] border border-white/10 flex flex-col transition-all duration-300 ${anime.hoverFxClass}`}
      style={{
        borderTopWidth: "3px",
        borderTopColor: anime.palette.primary,
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateY(-8px)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)",
        transformStyle: "preserve-3d",
        boxShadow: isHovered
          ? `0 20px 40px rgba(0,0,0,0.7), 0 0 28px ${anime.palette.primary}40`
          : "0 8px 24px rgba(0,0,0,0.5)",
      }}
    >
      {/* 3D Dynamic Sheen Highlight */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none z-30 opacity-25 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${tilt.sheenX}% ${tilt.sheenY}%, rgba(255,255,255,0.4) 0%, transparent 65%)`,
          }}
        />
      )}

      {/* Poster Box */}
      <div className="relative aspect-[2/3] overflow-hidden select-none">
        <ResilientImage
          src={anime.posterUrl}
          fallbackSrc={anime.fallbackPosterUrl}
          alt={`${anime.title} Key Visual`}
          palette={anime.palette}
          title={anime.title}
          japaneseTitle={anime.japaneseTitle}
          aspectRatioClass="aspect-[2/3]"
          className="group-hover:scale-106 transition-transform duration-700 ease-out"
        />

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C12] via-[#0A0C12]/50 to-transparent pointer-events-none" />

        {/* Top Score Badge */}
        <div className="absolute top-3 right-3 z-10 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-semibold text-amber-300">
          ★ {anime.score}
        </div>

        {/* Card Bottom Info Overlay */}
        <div
          className="absolute inset-x-0 bottom-0 p-4 z-20 flex flex-col justify-end"
          style={{ transform: "translateZ(25px)" }}
        >
          <p
            className="text-[11px] font-semibold uppercase tracking-wider mb-0.5"
            style={{ color: anime.palette.secondary }}
          >
            {anime.japaneseTitle}
          </p>
          <h3 className="font-display text-2xl text-white tracking-wide leading-tight group-hover:text-amber-100 transition-colors">
            {anime.title}
          </h3>

          {/* Unboxed Metadata with dot separator (Zero-Pill discipline) */}
          <div className="flex items-center gap-2 text-xs text-white/60 mt-1 mb-3">
            <span>{anime.studio}</span>
            <span>·</span>
            <span>{anime.episodes}</span>
          </div>

          {/* Action buttons inside card */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => onWatchTrailer(anime)}
              aria-label={`Watch trailer for ${anime.title}`}
              className="py-2 px-2 rounded-lg bg-white/10 hover:bg-white/25 border border-white/15 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors focus-visible:outline-2 focus-visible:outline-white"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Trailer
            </button>

            <button
              onClick={() => onSelectAnime(anime)}
              aria-label={`View dossier for ${anime.title}`}
              className="py-2 px-2 rounded-lg bg-white/10 hover:bg-white/25 border border-white/15 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors focus-visible:outline-2 focus-visible:outline-white"
            >
              <Eye className="w-3.5 h-3.5" />
              Dossier
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
