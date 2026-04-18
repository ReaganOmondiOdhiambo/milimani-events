"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import QuoteTrigger from "@/components/revamp/QuoteTrigger";
import RotatingPhoneChip from "@/components/revamp/RotatingPhoneChip";
import { phoneContacts } from "@/lib/site";

const mainLinks = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About us" },
  { href: "/services", label: "Services", dropdown: true },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact us" },
];

export default function NavBar({ logo, services = [], solidOnLoad = false }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solidNav = solidOnLoad || pathname !== "/" || isScrolled;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-4 sm:px-4 lg:px-5">
      <div
        className={`mx-auto flex max-w-[84rem] items-center justify-between rounded-full border px-4 py-3 transition-all duration-500 ${
          solidNav
            ? "border-black/5 bg-white/96 text-ink shadow-soft backdrop-blur-xl"
            : "border-white/10 bg-transparent text-white"
        }`}
      >
        <Link href="/#home" className="flex items-center gap-3">
          <img src={logo} alt="Milimani Events logo" className="h-11 w-11 rounded-full object-cover" />
          <div>
            <p className={`text-[13px] font-semibold uppercase tracking-[0.22em] ${solidNav ? "text-ink" : "text-white/88"}`}>
              Milimani Events
            </p>
        
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {mainLinks.map((link) =>
            link.dropdown ? (
              <div key={link.label} className="group relative">
                <Link
                  href={link.href}
                  className={`inline-flex items-center gap-2 text-sm font-semibold transition ${
                    solidNav ? "text-ink/80 hover:text-ink" : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                  <ChevronDown className="h-4 w-4" />
                </Link>
                <div className="pointer-events-none absolute left-1/2 top-full z-50 w-[19rem] -translate-x-1/2 pt-3 opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                  <div className="overflow-hidden rounded-[0.9rem] bg-accent text-white shadow-soft">
                    <div className="grid gap-px bg-white/10">
                      {services.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          className="bg-accent px-4 py-3 text-[13px] font-medium leading-5 text-white/88 transition hover:bg-accentDeep hover:text-white"
                        >
                          {service.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition ${
                  solidNav ? "text-ink/80 hover:text-ink" : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <RotatingPhoneChip contacts={phoneContacts} light={!solidNav} />
          <QuoteTrigger
            className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accentDeep"
          >
            Get a Quote
          </QuoteTrigger>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <RotatingPhoneChip
            contacts={phoneContacts}
            light={!solidNav}
            className="px-3 py-2 text-[12px] max-[380px]:px-2 max-[380px]:text-[11px]"
          />
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border ${
              solidNav ? "border-black/10 bg-white text-ink" : "border-white/15 bg-white/10 text-white"
            }`}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="mx-auto mt-3 max-w-[84rem] rounded-[2rem] border border-black/5 bg-white p-4 shadow-soft lg:hidden">
          <div className="flex flex-col gap-2">
            {mainLinks.map((link) =>
              link.dropdown ? (
                <div key={link.label} className="rounded-[1.5rem] bg-accent/6 p-3">
                  <Link href={link.href} className="block px-2 py-2 text-sm font-semibold text-ink">
                    Services
                  </Link>
                  <div className="mt-2 grid gap-2">
                    {services.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        onClick={() => setMenuOpen(false)}
                        className="rounded-[1rem] bg-white px-4 py-3 text-sm font-semibold text-ink shadow-card"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-[1.25rem] px-4 py-3 text-sm font-semibold text-ink hover:bg-black/5"
                >
                  {link.label}
                </Link>
              ),
            )}
            {phoneContacts.map((contact) => (
              <a
                key={contact.number}
                href={contact.href}
                className="rounded-[1.25rem] px-4 py-3 text-sm font-semibold text-ink hover:bg-black/5"
              >
                {contact.label}: {contact.number}
              </a>
            ))}
            <QuoteTrigger
              className="rounded-[1.25rem] bg-accent px-4 py-3 text-sm font-semibold text-white"
              type="button"
              onClick={() => setMenuOpen(false)}
            >
              Get a Quote
            </QuoteTrigger>
          </div>
        </div>
      ) : null}
    </header>
  );
}
