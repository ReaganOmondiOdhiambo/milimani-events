import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Facebook, Instagram, Linkedin, Music2 } from "lucide-react";
import QuoteTrigger from "@/components/revamp/QuoteTrigger";
import { getImageCollection } from "@/lib/media";
import { branches, contactEmail, phoneContacts, socialLinks } from "@/lib/site";

function firstMatch(items, keyword, fallback) {
  return items.find((item) => item.includes(keyword)) ?? fallback;
}

const iconMap = {
  Instagram,
  Facebook,
  TikTok: Music2,
  LinkedIn: Linkedin,
};

export default async function SiteFooter() {
  const allImages = await getImageCollection();
  const logo = firstMatch(allImages, "logo", allImages[0]);

  return (
    <footer className="px-3 pb-6 pt-6 sm:px-4 lg:px-5">
      <div className="mx-auto max-w-[84rem] rounded-[1.1rem] bg-black px-5 py-5 text-white shadow-soft sm:px-6 sm:py-6">
        <div className="border-b border-white/10 pb-5">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <div className="inline-flex items-center gap-4 border-t border-white/10 pt-3">
                <Image
                  src={logo}
                  alt="Milimani Events logo"
                  width={220}
                  height={86}
                  className="h-auto w-[8.5rem] object-contain sm:w-[9.5rem]"
                />
              </div>

              <div className="mt-5 max-w-md">
                <h2 className="text-[1.9rem] font-semibold leading-tight sm:text-[2.1rem]">
                  Let&apos;s Create Something Unforgettable
                </h2>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <QuoteTrigger className="inline-flex items-center justify-center rounded-[0.65rem] bg-white px-4 py-2.5 text-sm font-semibold text-accent transition hover:bg-white/92">
                    Request a Quote
                  </QuoteTrigger>
                  <a href={phoneContacts[0].href} className="inline-flex items-center gap-2.5 text-white">
                    <span className="text-[10px] uppercase tracking-[0.16em] text-gold">Call Us</span>
                    <span className="text-[1.25rem] leading-none">{phoneContacts[0].number}</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:justify-self-end">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold">Our Branches</p>
              <div className="mt-3 flex flex-col gap-1.5 text-[0.98rem] text-white/96 sm:text-[1.02rem]">
                {branches.map((branch) => (
                  <span key={branch}>{branch}</span>
                ))}
              </div>
              <a href={`mailto:${contactEmail}`} className="mt-4 inline-block text-[13px] text-white/70 hover:text-white">
                {contactEmail}
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-b border-white/10 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-[14px] font-medium">
            <Link href="/">Home</Link>
            <Link href="/#about">About us</Link>
            <Link href="/services">Services</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/contact">Contact us</Link>
          </div>

          <div className="flex items-center gap-4 text-gold">
            {socialLinks.map((item) => {
              const Icon = iconMap[item.label];
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="transition hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-4 text-[12px] text-white/72 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span>{"\u00A9"} 2026 Milimani Events & Lifestyle Hub. All rights reserved.</span>
            <span>Terms</span>
          </div>
          <a
            href="#top"
            className="inline-flex items-center justify-center rounded-full border border-white/12 p-2 text-gold transition hover:border-white/25 hover:text-white"
          >
            <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
