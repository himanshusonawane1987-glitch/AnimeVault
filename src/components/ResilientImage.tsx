import React, { useState, useEffect } from "react";
import { Palette } from "../data/animeData";

interface ResilientImageProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  palette: Palette;
  title: string;
  japaneseTitle?: string;
  aspectRatioClass?: string;
  isHero?: boolean;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  fallbackSrc,
  alt,
  className = "",
  palette,
  title,
  japaneseTitle,
  aspectRatioClass = "aspect-[2/3]",
  isHero = false,
}) => {
  const [currentSrcIndex, setCurrentSrcIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasAllFailed, setHasAllFailed] = useState<boolean>(false);

  // Build resilient source chain with automatic YouTube hqdefault fallback
  const rawSources = [src, fallbackSrc].filter(Boolean) as string[];
  const sources: string[] = [];

  rawSources.forEach((url) => {
    sources.push(url);
    if (url.includes("maxresdefault.jpg")) {
      const hq = url.replace("maxresdefault.jpg", "hqdefault.jpg");
      if (!sources.includes(hq)) sources.push(hq);
    }
  });

  // Reset when src changes
  useEffect(() => {
    setCurrentSrcIndex(0);
    setIsLoading(true);
    setHasAllFailed(false);
  }, [src, fallbackSrc]);

  const handleError = () => {
    if (currentSrcIndex < sources.length - 1) {
      setCurrentSrcIndex((prev) => prev + 1);
    } else {
      setHasAllFailed(true);
      setIsLoading(false);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div
      className={`relative overflow-hidden w-full ${aspectRatioClass} select-none`}
      style={{
        backgroundColor: palette.deep,
      }}
    >
      {/* CSS-generated Fallback Container (Always ready underneath) */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
        style={{
          background: `radial-gradient(circle at 70% 20%, ${palette.primary}44, transparent 65%), linear-gradient(135deg, ${palette.primary}33 0%, ${palette.deep} 75%)`,
        }}
      >
        {/* Subtle geometric diagonal pattern */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #ffffff 0, #ffffff 2px, transparent 2px, transparent 12px)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center max-w-[85%]">
          {japaneseTitle && (
            <span
              className="text-xs uppercase tracking-widest font-semibold mb-2 opacity-80"
              style={{ color: palette.secondary }}
            >
              {japaneseTitle}
            </span>
          )}
          <span className="font-display text-2xl md:text-3xl font-bold tracking-wider text-white drop-shadow-md">
            {title}
          </span>
          <span
            className="mt-3 text-[11px] uppercase tracking-wider font-medium px-2.5 py-1 rounded border"
            style={{
              borderColor: `${palette.primary}66`,
              color: palette.secondary,
              backgroundColor: `${palette.deep}99`,
            }}
          >
            Vault Visual
          </span>
        </div>
      </div>

      {/* Shimmer loading overlay */}
      {isLoading && !hasAllFailed && (
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden bg-white/[0.04]">
          <div
            className="w-full h-full animate-shimmer"
            style={{
              background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)`,
            }}
          />
        </div>
      )}

      {/* Actual Remote Image */}
      {!hasAllFailed && sources[currentSrcIndex] && (
        <img
          key={sources[currentSrcIndex]}
          src={sources[currentSrcIndex]}
          alt={alt}
          loading={isHero ? "eager" : "lazy"}
          decoding="async"
          referrerPolicy="no-referrer"
          fetchPriority={isHero ? "high" : "auto"}
          onError={handleError}
          onLoad={handleLoad}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ${
            isLoading ? "opacity-0 scale-100" : "opacity-100 scale-100"
          } ${className}`}
        />
      )}
    </div>
  );
};
