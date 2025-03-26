"use client";
import Image from "next/image";

export function BackgroundSwitcher() {
  // Using only the circuit board background
  const background = {
    src: "/circuit-board-bg.svg",
    alt: "Circuit Board Background",
    overlay: "from-[#111B3E]/30 to-[#111B3E]/50",
    blend: "mix-blend-overlay",
  };

  return (
    <>
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0" data-parallax="0.15">
        <Image
          src={background.src}
          alt={background.alt}
          fill
          className="object-cover transform scale-110 transition-opacity duration-1000"
          style={{
            transform: "translate3d(0, var(--scroll), 0) scale(1.1)",
          }}
          priority
        />
        <div
          className={`absolute inset-0 bg-gradient-to-br ${background.overlay} ${background.blend}`}
        />
      </div>
    </>
  );
}
