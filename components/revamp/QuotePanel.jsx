import { ArrowRight, PhoneCall } from "lucide-react";
import QuoteTrigger from "@/components/revamp/QuoteTrigger";

export default function QuotePanel({ title, description }) {
  return (
    <div className="rounded-[2rem] bg-ink px-6 py-8 text-white shadow-soft sm:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.32em] text-gold">Request a Quote</p>
      <h3 className="mt-4 text-[1.9rem] font-semibold leading-tight">{title}</h3>
      <p className="mt-4 max-w-2xl text-[15px] leading-7 text-white/70 sm:text-base sm:leading-8">{description}</p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <QuoteTrigger
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-sm font-semibold text-white transition hover:bg-accentDeep"
        >
          Request Quote
          <ArrowRight className="h-4 w-4" />
        </QuoteTrigger>
        <a
          href="tel:+254712345001"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-4 text-sm font-semibold text-white transition hover:border-white/30"
        >
          <PhoneCall className="h-4 w-4" />
          +254 712 345 001
        </a>
      </div>
    </div>
  );
}
