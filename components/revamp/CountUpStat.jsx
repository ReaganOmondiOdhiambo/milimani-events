"use client";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TentTree, Trophy, Users, MapPin } from "lucide-react";

const icons = {
  trophy: Trophy,
  users: Users,
  tent: TentTree,
  map: MapPin,
};

export default function CountUpStat({ icon, value, suffix = "", label }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);
  const Icon = icons[icon] ?? Trophy;

  useEffect(() => {
    if (!isInView) return undefined;

    const duration = 1300;
    const start = performance.now();

    const frame = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -6 }}
      className="rounded-[2rem] border border-black/5 bg-white p-6 shadow-card"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-6 text-4xl font-semibold text-ink">
        {count}
        {suffix}
      </p>
      <p className="mt-2 text-sm font-semibold uppercase tracking-[0.22em] text-slate">{label}</p>
    </motion.div>
  );
}
