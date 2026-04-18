"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

function HoverVideoCard({ video, index }) {
  const ref = useRef(null);

  const handleEnter = async () => {
    try {
      if (ref.current) {
        ref.current.currentTime = 0;
        await ref.current.play();
      }
    } catch {}
  };

  const handleLeave = () => {
    if (ref.current) {
      ref.current.pause();
      ref.current.currentTime = 0;
    }
  };

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.24 }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3"
    >
      <div className="relative overflow-hidden rounded-[1.6rem]">
        <video
          ref={ref}
          src={video}
          muted
          playsInline
          loop
          preload="metadata"
          className="aspect-[4/3] w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/10 transition duration-300 group-hover:bg-black/20" />
        <div className="pointer-events-none absolute inset-x-4 bottom-4 flex items-center justify-between">
          <div className="rounded-full bg-white/92 px-4 py-2 text-sm font-semibold text-ink shadow-card">
            Clip {index + 1}
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/92 text-ink shadow-card transition duration-300 group-hover:bg-accent group-hover:text-white">
            <Play className="ml-0.5 h-4 w-4 fill-current" />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function VideoShowcaseGrid({ videos }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {videos.map((video, index) => (
        <HoverVideoCard key={video} video={video} index={index} />
      ))}
    </div>
  );
}
