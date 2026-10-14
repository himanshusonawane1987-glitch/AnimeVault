import React, { useEffect, useState } from "react";

export const ScrollProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min(100, Math.max(0, (scrollY / docHeight) * 100)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-white/5"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page reading progress"
    >
      <div
        className="h-full bg-gradient-to-r from-[#FF7F1A] via-[#F5B301] to-[#00CFFF] transition-all duration-150 ease-out shadow-[0_0_8px_rgba(245,179,1,0.6)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
