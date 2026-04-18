"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function cloudinaryVideoVariant(src, transform) {
  if (!src?.includes("/video/upload/")) return src;
  return src.replace("/video/upload/", `/video/upload/${transform}/`);
}

export default function HeroVideoSlider({ slides }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const activeSlide = slides[activeIndex];
  const activeSrc = cloudinaryVideoVariant(
    activeSlide.src,
    isSmallScreen ? "q_auto:eco,w_900,c_fill" : "q_auto:good,w_1800,c_fill",
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
    }, 7200);

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
    <div className="absolute inset-0">
      <AnimatePresence mode="sync">
        <motion.video
          key={activeSrc}
          src={activeSrc}
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
