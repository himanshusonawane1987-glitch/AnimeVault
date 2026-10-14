import React, { useEffect, useRef, useState } from "react";
import { X, ExternalLink, Play, AlertCircle } from "lucide-react";
import { AnimeItem } from "../data/animeData";

interface TrailerModalProps {
  anime: AnimeItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TrailerModal: React.FC<TrailerModalProps> = ({
  anime,
  isOpen,
  onClose,
}) => {
  const [iframeError, setIframeError] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setIframeError(false);
      setIframeLoaded(false);
      return;
    }

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus close button on open
    setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    // Timeout safety net for blocked iframes
    const timer = setTimeout(() => {
      if (!iframeLoaded) {
        // We do not force error if it's just slow, but keep fallback button visible
      }
    }, 5000);

    // Handle ESC key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, iframeLoaded, onClose]);

  if (!isOpen || !anime) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0F1118]"
        style={{
          boxShadow: `0 20px 50px rgba(0,0,0,0.8), 0 0 40px ${anime.palette.primary}22`,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.03]">
          <div className="flex items-center gap-3">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: anime.palette.primary }}
            />
            <div>
              <h3
                id="modal-title"
                className="font-display text-xl sm:text-2xl text-white tracking-wide"
              >
                {anime.title} — Official Trailer
              </h3>
              <p className="text-xs text-white/60">
                Official Publisher Channel: <span className="text-white/80 font-medium">{anime.trailer.channel}</span>
              </p>
            </div>
          </div>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close trailer modal"
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player / Fallback Box */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
          {iframeError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#12141C] to-[#0A0C12]">
              <AlertCircle className="w-12 h-12 text-amber-400 mb-3" />
              <h4 className="font-display text-2xl text-white mb-2">
                Embedded Player Unavailable
              </h4>
              <p className="text-sm text-white/70 max-w-md mb-6">
                The YouTube embed could not be rendered in this browser frame. You can watch the full official trailer directly on YouTube.
              </p>
              <a
                href={anime.trailer.watchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-transform hover:scale-105"
                style={{
                  backgroundColor: anime.palette.primary,
                  color: "#10131A",
                }}
              >
                <Play className="w-4 h-4 fill-current" />
                Open on YouTube ({anime.trailer.channel})
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ) : (
            <>
              {/* Privacy-enhanced YouTube embed */}
              <iframe
                src={`${anime.trailer.embedUrl}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`}
                title={`${anime.title} official trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                onLoad={() => setIframeLoaded(true)}
                onError={() => setIframeError(true)}
                className="absolute inset-0 w-full h-full border-0"
              />
            </>
          )}
        </div>

        {/* Footer Meta */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-3.5 bg-white/[0.02] border-t border-white/5 text-xs text-white/60">
          <div className="flex items-center gap-2">
            <span>Video ID: {anime.trailer.videoId}</span>
            <span>·</span>
            <span>Privacy-Enhanced Embed (youtube-nocookie.com)</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={anime.trailer.watchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-white/80 hover:text-white transition-colors"
            >
              Watch on YouTube
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href={anime.officialSite}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-white/80 hover:text-white transition-colors"
            >
              Official Website
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
