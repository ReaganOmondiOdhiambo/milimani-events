"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function RotatingPhoneChip({ contacts, className = "", light = false }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!contacts?.length || contacts.length === 1) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % contacts.length);
    }, 4200);

    return () => window.clearInterval(interval);
  }, [contacts]);

  const activeContact = contacts?.[activeIndex];
  if (!activeContact) return null;

  return (
    <a
      href={activeContact.href}
      className={`
        group inline-flex items-center
        rounded-full px-4 py-2.5
        text-sm font-medium
        transition-all duration-300 ease-out
        backdrop-blur
        ${
          light
            ? "bg-white/10 text-white border border-white/15 hover:bg-white/20 hover:shadow-[0_0_20px_rgba(212,175,55,0.25)]"
            : "bg-black/[0.03] text-neutral-800 border border-black/10 hover:bg-black/[0.06] hover:shadow-[0_0_20px_rgba(212,175,55,0.25)]"
        }
        ${className}
      `}
      aria-label={`Call on ${activeContact.number}`}
    >
      <div className="relative h-5 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={activeContact.number}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center whitespace-nowrap"
          >
            {activeContact.number}
          </motion.span>
        </AnimatePresence>
      </div>
    </a>
  );
}