/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ANIME_DATA, AnimeItem } from "./data/animeData";
import { ScrollProgressBar } from "./components/ScrollProgressBar";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { ScrollytellingJourney } from "./components/ScrollytellingJourney";
import { AnimeGrid } from "./components/AnimeGrid";
import { FeaturedSpotlight } from "./components/FeaturedSpotlight";
import { TrailersCarousel } from "./components/TrailersCarousel";
import { CharacterSpotlight } from "./components/CharacterSpotlight";
import { StatsBand } from "./components/StatsBand";
import { AboutSection, Footer } from "./components/AboutAndFooter";
import { TrailerModal } from "./components/TrailerModal";
import { DetailModal } from "./components/DetailModal";

export default function App() {
  const [trailerAnime, setTrailerAnime] = useState<AnimeItem | null>(null);
  const [detailAnime, setDetailAnime] = useState<AnimeItem | null>(null);
  const [featuredAnime, setFeaturedAnime] = useState<AnimeItem>(
    ANIME_DATA.find((a) => a.id === "jujutsu-kaisen") || ANIME_DATA[0]
  );

  const handleRandomPick = () => {
    const randomIndex = Math.floor(Math.random() * ANIME_DATA.length);
    const pick = ANIME_DATA[randomIndex];
    setFeaturedAnime(pick);

    // Scroll smoothly to featured section or odyssey
    const el = document.getElementById("featured");
    if (el) {
      el.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    }
  };

  const handleStartOdyssey = () => {
    const el = document.getElementById("journey");
    if (el) {
      el.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0C12] text-[#F4F6FB] flex flex-col relative selection:bg-[#FF7F1A]/30 selection:text-white">
      {/* Apple-style Top Reading Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Fixed Sticky Glass Navbar with Top Bar Contract */}
      <Navbar onRandomPick={handleRandomPick} />

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* 1. Cinematic Opening Hero with multi-layer depth & scroll coordinator */}
        <HeroSection
          animeList={ANIME_DATA}
          onExploreClick={() => {
            const el = document.getElementById("explore");
            el?.scrollIntoView({
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "auto"
                : "smooth",
            });
          }}
          onWatchTrailer={(anime) => setTrailerAnime(anime)}
          onSelectAnime={(anime) => setDetailAnime(anime)}
          onStartOdyssey={handleStartOdyssey}
        />

        {/* 2. Global Metric Statistics Band */}
        <StatsBand />

        {/* 3. The Grand Vault Odyssey: Cinematic 3D Scrollytelling Experience */}
        <ScrollytellingJourney
          animeList={ANIME_DATA}
          onWatchTrailer={(anime) => setTrailerAnime(anime)}
          onOpenDossier={(anime) => setDetailAnime(anime)}
        />

        {/* 4. Explore 8 Series Grid with 3D Perspective Cards & Live Filters */}
        <AnimeGrid
          animeList={ANIME_DATA}
          onSelectAnime={(anime) => setDetailAnime(anime)}
          onWatchTrailer={(anime) => setTrailerAnime(anime)}
          onSetFeatured={(anime) => {
            setFeaturedAnime(anime);
            document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" });
          }}
        />

        {/* 5. In-Depth Featured Epic Spotlight */}
        <FeaturedSpotlight
          anime={featuredAnime}
          allAnime={ANIME_DATA}
          onSetFeatured={(anime) => setFeaturedAnime(anime)}
          onWatchTrailer={(anime) => setTrailerAnime(anime)}
          onOpenDossier={(anime) => setDetailAnime(anime)}
        />

        {/* 6. Official Trailers Reel (Horizontal Snap Carousel) */}
        <TrailersCarousel
          animeList={ANIME_DATA}
          onPlayTrailer={(anime) => setTrailerAnime(anime)}
        />

        {/* 7. Character Spotlight & Philosophical Archives */}
        <CharacterSpotlight
          animeList={ANIME_DATA}
          onWatchTrailer={(anime) => setTrailerAnime(anime)}
          onOpenDossier={(anime) => setDetailAnime(anime)}
        />

        {/* 8. Studio Transparency & Preservation Notes */}
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Official Trailer Modal (Privacy-Enhanced YouTube Facade) */}
      <TrailerModal
        anime={trailerAnime}
        isOpen={trailerAnime !== null}
        onClose={() => setTrailerAnime(null)}
      />

      {/* Deep Franchise Dossier Modal */}
      <DetailModal
        anime={detailAnime}
        isOpen={detailAnime !== null}
        onClose={() => setDetailAnime(null)}
        onWatchTrailer={(anime) => setTrailerAnime(anime)}
      />
    </div>
  );
}
