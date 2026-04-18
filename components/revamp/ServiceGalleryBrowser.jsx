"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import GalleryGrid from "@/components/revamp/GalleryGrid";

export default function ServiceGalleryBrowser({ sections }) {
  const [activeSlug, setActiveSlug] = useState(sections[0]?.slug ?? "");

  const activeSection = useMemo(
    () => sections.find((section) => section.slug === activeSlug) ?? sections[0],
    [activeSlug, sections],
  );

  if (!activeSection) return null;

  return (
    <div className="mt-10">
      <div className="flex flex-wrap gap-2.5">
        {sections.map((section) => {
          const isActive = section.slug === activeSection.slug;

          return (
            <button
              key={section.slug}
              type="button"
              onClick={() => setActiveSlug(section.slug)}
              className={`rounded-full border px-4 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "border-accent bg-accent text-white"
                  : "border-black/10 bg-white text-ink hover:border-black/20"
              }`}
            >
              {section.name}
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
            {activeSection.name} Gallery
          </p>
          <p className="mt-2 max-w-2xl text-[15px] leading-7 text-slate">
            {activeSection.description}
          </p>
        </div>
        <Link
          href={`/services/${activeSection.slug}`}
          className="inline-flex items-center justify-center rounded-full border border-black/10 px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-black/20"
        >
          View service page
        </Link>
      </div>

      <div className="mt-8">
        <GalleryGrid images={activeSection.images} />
      </div>
    </div>
  );
}
