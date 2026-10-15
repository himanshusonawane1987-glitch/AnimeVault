/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ANIME_DATA, AnimeItem } from "./data/animeData";
import { ScrollProgressBar } from "./components/ScrollProgressBar";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { CinematicIntro } from "./components/CinematicIntro";
import { ScrollytellingJourney } from "./components/ScrollytellingJourney";
import { AnimeHighlights } from "./components/AnimeHighlights";
import { AnimeGrid } from "./components/AnimeGrid";
import { TrailersCarousel } from "./components/TrailersCarousel";
import { CharacterSpotlight } from "./components/CharacterSpotlight";
import { StatsBand } from "./components/StatsBand";
import { FinalCTA } from "./components/FinalCTA";
import { AboutSection, Footer } from "./components/AboutAndFooter";
import { TrailerModal } from "./components/TrailerModal";
import { DetailModal } from "./components/DetailModal";
import { useScrollReveal } from "./hooks/useScrollReveal";

export default function App() {
  const [trailerAnime, setTrailerAnime] = useState<AnimeItem | null>(null);
  const [detailAnime, setDetailAnime] = useState<AnimeItem | null>(null);

  // Initialize viewport scroll reveals
  useScrollReveal();

  const handleRandomPick = () => {
    const randomIndex = Math.floor(Math.random() * ANIME_DATA.length);
    const pick = ANIME_DATA[randomIndex];
    setDetailAnime(pick);
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

  const handleExploreClick = () => {
    const el = document.getElementById("explore");
    if (el) {
      el.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    }
  };

  const handleTrailersClick = () => {
    const el = document.getElementById("trailers");
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
      {/* 1. Apple-style Top Reading Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* 2. Fixed Sticky Glass Navbar with Top Bar Contract */}
      <Navbar onRandomPick={handleRandomPick} />

      {/* Main Content Flow — Coherent, non-duplicated narrative architecture */}
      <main className="flex-1">
        {/* Hero Section: The Opening Gate */}
        <HeroSection
          animeList={ANIME_DATA}
          onExploreClick={handleExploreClick}
          onWatchTrailer={(anime) => setTrailerAnime(anime)}
          onSelectAnime={(anime) => setDetailAnime(anime)}
          onStartOdyssey={handleStartOdyssey}
        />

        {/* Global Metric Statistics Band */}
        <StatsBand />

        {/* Cinematic Introduction: Prologue & The Three Pillars */}
        <CinematicIntro
          onSelectAnime={(anime: AnimeItem) => setDetailAnime(anime)}
          onExploreClick={handleExploreClick}
        />

        {/* The Grand Odyssey: Dual Scroll-Driven & Automatic Scrollytelling Stage */}
        <ScrollytellingJourney
          animeList={ANIME_DATA}
          onWatchTrailer={(anime: AnimeItem) => setTrailerAnime(anime)}
          onOpenDossier={(anime: AnimeItem) => setDetailAnime(anime)}
        />

        {/* Thematic Highlights: Shonen, Dark Fantasy, Ego Survival */}
        <AnimeHighlights
          onWatchTrailer={(anime: AnimeItem) => setTrailerAnime(anime)}
          onOpenDossier={(anime: AnimeItem) => setDetailAnime(anime)}
        />

        {/* Explore 8 Series Grid with 3D Perspective Cards & Live Filters */}
        <AnimeGrid
          animeList={ANIME_DATA}
          onSelectAnime={(anime: AnimeItem) => setDetailAnime(anime)}
          onWatchTrailer={(anime: AnimeItem) => setTrailerAnime(anime)}
          onSetFeatured={(anime: AnimeItem) => setDetailAnime(anime)}
        />

        {/* Official Trailers Reel (Horizontal Snap Carousel) */}
        <TrailersCarousel
          animeList={ANIME_DATA}
          onPlayTrailer={(anime) => setTrailerAnime(anime)}
        />

        {/* Character Archives & Philosophies */}
        <CharacterSpotlight
          animeList={ANIME_DATA}
          onWatchTrailer={(anime) => setTrailerAnime(anime)}
          onOpenDossier={(anime) => setDetailAnime(anime)}
        />

        {/* Final Call to Action */}
        <FinalCTA
          onRandomPick={handleRandomPick}
          onExploreClick={handleExploreClick}
          onTrailersClick={handleTrailersClick}
        />

        {/* About & Studio Transparency */}
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
