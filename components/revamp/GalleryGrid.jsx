"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export default function GalleryGrid({ images }) {
  const [activeImage, setActiveImage] = useState(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
        {images.map((image, index) => (
          <motion.button
            key={image}
            type="button"
            whileHover={{ y: -3 }}
            transition={{ duration: 0.24 }}
            onClick={() => setActiveImage(image)}
            className="group relative overflow-hidden rounded-[0.95rem] text-left shadow-card"
          >
            <div className="relative aspect-[1.05/1] sm:aspect-[1.18/1]">
              <Image
                src={image}
                alt={`Event gallery ${index + 1}`}
                fill
                className="object-cover transition duration-300"
              />
              <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/12" />
              <div className="pointer-events-none absolute inset-x-2 bottom-2 opacity-0 transition duration-300 group-hover:opacity-100 sm:inset-x-4 sm:bottom-4">
                <div className="inline-flex rounded-[0.7rem] bg-white/92 px-3 py-1.5 text-xs font-semibold text-ink shadow-card sm:px-4 sm:py-2 sm:text-sm">
                  View image
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeImage ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/80 p-6"
            onClick={() => setActiveImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              className="max-h-[90vh] max-w-6xl overflow-hidden rounded-[0.95rem]"
            >
              <Image
                src={activeImage}
                alt="Gallery preview"
                width={1800}
                height={1300}
                className="h-auto w-full object-cover"
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
