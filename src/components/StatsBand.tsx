import React, { useEffect, useRef, useState } from "react";
import { GLOBAL_STATS } from "../data/animeData";

export const StatsBand: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="py-16 relative border-y border-white/10 bg-[#0E1017]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {GLOBAL_STATS.map((stat, idx) => (
            <div
              key={stat.label}
              className={`text-center p-4 transition-all duration-700 ${
                hasAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="font-display text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight tabular-nums mb-1 bg-gradient-to-r from-white via-white to-[#F5B301] bg-clip-text text-transparent">
                {stat.value}
              </div>
              <p className="text-sm font-semibold text-white/90 mb-0.5">
                {stat.label}
              </p>
              <p className="text-xs text-white/50">{stat.sublabel}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
