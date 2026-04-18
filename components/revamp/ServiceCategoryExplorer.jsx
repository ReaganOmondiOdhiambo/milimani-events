"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import QuoteTrigger from "@/components/revamp/QuoteTrigger";
import { slugifyCategory } from "@/lib/services";

export default function ServiceCategoryExplorer({
  categories,
  images,
  fallbackImage,
  serviceName,
  serviceSlug,
  activeCategorySlug,
}) {
  const resolvedIndex = Math.max(
    0,
    categories.findIndex((category) => slugifyCategory(category.name) === activeCategorySlug),
  );
  const [activeIndex, setActiveIndex] = useState(resolvedIndex);

  useEffect(() => {
    setActiveIndex(resolvedIndex);
  }, [resolvedIndex]);

  const activeCategory = categories[activeIndex];
  const activeImage = useMemo(
    () => images[activeIndex] ?? fallbackImage,
    [activeIndex, fallbackImage, images],
  );

  return (
    <div className="mt-12">
      <div className="overflow-x-auto pb-3">
        <div className="flex min-w-max gap-3">
          {categories.map((category, index) => {
            const isActive = index === activeIndex;
            const categorySlug = slugifyCategory(category.name);

            return (
              <Link
                key={category.name}
                href={`/services/${serviceSlug}?category=${categorySlug}#categories`}
                className={`rounded-full border px-4 py-3 text-left text-sm font-medium transition ${
                  isActive
                    ? "border-accent bg-accent text-white shadow-card"
                    : "border-black/10 bg-white text-ink hover:border-black/20 hover:bg-black/[0.02]"
                }`}
              >
                {category.name}
              </Link>
            );
          })}
        </div>
      </div>

      <div id="categories" className="mt-8 overflow-hidden rounded-[2rem] border border-black/6 bg-white shadow-card">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-0 lg:grid-cols-[0.85fr_1.15fr]"
          >
            <div className="flex flex-col justify-between bg-[#fffaf6] px-6 py-8 sm:px-8 sm:py-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Category</p>
                <h3 className="mt-4 max-w-lg text-[1.9rem] font-semibold leading-tight text-ink sm:text-[2.2rem]">
                  {activeCategory.name}
                </h3>
                <p className="mt-5 max-w-xl text-[15px] leading-7 text-slate sm:text-base sm:leading-8">
                  {activeCategory.description}
                </p>
              </div>

              <div className="mt-8 space-y-5">
                <div className="inline-flex items-center gap-3 rounded-full bg-black/[0.03] px-4 py-3 text-sm text-slate">
                  <Check className="h-4 w-4 text-accent" />
                  <span>{activeCategory.meta}</span>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <QuoteTrigger
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accentDeep"
                    service={serviceName}
                    category={activeCategory.name}
                    notes={`Interested category: ${activeCategory.name}`}
                  >
                    Request Quote
                    <ArrowRight className="h-4 w-4" />
                  </QuoteTrigger>
                  <a
                    href="tel:+254712345001"
                    className="inline-flex items-center justify-center rounded-full border border-black/10 px-5 py-3 text-sm font-semibold text-ink transition hover:border-black/20"
                  >
                    Call Us
                  </a>
                </div>
              </div>
            </div>

            <div className="relative min-h-[22rem] bg-sand sm:min-h-[28rem]">
              <Image
                src={activeImage}
                alt={`${serviceName} - ${activeCategory.name}`}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
