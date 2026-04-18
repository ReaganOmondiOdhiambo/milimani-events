"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function cloudinaryVideoVariant(src, transform) {
  if (!src?.includes("/video/upload/")) return src;
  return src.replace("/video/upload/", `/video/upload/${transform}/`);
}

export default function HeroVideoSlider({ slides }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const displaySlide = slides[displayIndex];
  const pendingSlide = slides[activeIndex];
  const videoTransform = isSmallScreen ? "q_auto:eco,w_900,c_fill" : "q_auto:good,w_1800,c_fill";
  const displaySrc = cloudinaryVideoVariant(
    displaySlide.src,
    videoTransform,
  );
  const pendingSrc = cloudinaryVideoVariant(
    pendingSlide.src,
    videoTransform,
  );
  const nextSlide = slides[(activeIndex + 1) % slides.length];
  const nextSrc = cloudinaryVideoVariant(
    nextSlide?.src,
    isSmallScreen ? "q_auto:eco,w_900,c_fill" : "q_auto:good,w_1800,c_fill",
  );

  useEffect(() => {
    if (slides.length <= 1) return undefined;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 10000);

    return () => window.clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const updateScreenSize = () => setIsSmallScreen(media.matches);

    updateScreenSize();
    media.addEventListener("change", updateScreenSize);
    return () => media.removeEventListener("change", updateScreenSize);
  }, []);

  useEffect(() => {
    if (!nextSrc) return undefined;

    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "video";
    link.href = nextSrc;
    document.head.appendChild(link);

    return () => {
      link.remove();
    };
  }, [nextSrc]);

  return (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(181,139,86,0.34),transparent_34%),linear-gradient(135deg,#15110f,#2b241f_48%,#101010)]">
      <video
        key={`loader-${pendingSrc}`}
        src={pendingSrc}
        muted
        playsInline
        preload="auto"
        className="hidden"
        onCanPlayThrough={() => setDisplayIndex(activeIndex)}
        onLoadedData={() => setDisplayIndex(activeIndex)}
      />
      <AnimatePresence mode="sync">
        <motion.video
          key={displaySrc}
          src={displaySrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.015 }}
          transition={{ duration: 1.85, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
        />
      </AnimatePresence>
      <div className="hero-overlay absolute inset-0" />
    </div>
  );
}
