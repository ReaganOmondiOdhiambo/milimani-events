"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, MessageSquareText, Phone, X } from "lucide-react";
import { services } from "@/lib/services";

const QuoteModalContext = createContext(null);
const BUSINESS_WHATSAPP = "254712345001";

const EMPTY_FORM = {
  fullName: "",
  phone: "",
  email: "",
  service: "",
  category: "",
  eventDate: "",
  location: "",
  notes: "",
};

export function useQuoteModal() {
  const context = useContext(QuoteModalContext);

  if (!context) {
    throw new Error("useQuoteModal must be used within QuoteModalProvider");
  }

  return context;
}

export default function QuoteModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const openQuoteModal = (defaults = {}) => {
    const matchedService = services.find((service) => service.name === defaults.service) ?? null;
    const matchedCategory =
      matchedService?.categories.find((category) => category.name === defaults.category)?.name ?? "";

    setForm({
      ...EMPTY_FORM,
      ...defaults,
      service: matchedService?.name ?? defaults.service ?? "",
      category: matchedCategory || defaults.category || "",
    });
    setIsOpen(true);
  };

  const closeQuoteModal = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        closeQuoteModal();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const contextValue = useMemo(
    () => ({
      openQuoteModal,
      closeQuoteModal,
    }),
    [],
  );

  const selectedService = services.find((service) => service.name === form.service) ?? null;
  const categoryOptions = selectedService?.categories ?? [];
  const shouldShowEventDate = selectedService?.slug === "milimani-events" || selectedService?.slug === "milimani-hearse";

  const submitToWhatsApp = (event) => {
    event.preventDefault();

    const lines = [
      "Hello Milimani Events & Lifestyle Hub,",
      "",
      "I would like to request a quote.",
      `Name: ${form.fullName}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email || "Not provided"}`,
      `Service: ${form.service || "General enquiry"}`,
      `Sub Service: ${form.category || "Not specified"}`,
      ...(shouldShowEventDate ? [`Event Date: ${form.eventDate || "Not provided"}`] : []),
      `Location: ${form.location || "Not provided"}`,
      `Notes: ${form.notes || "No extra notes"}`,
    ];

    const message = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${BUSINESS_WHATSAPP}?text=${message}`, "_blank", "noopener,noreferrer");
    closeQuoteModal();
  };

  return (
    <QuoteModalContext.Provider value={contextValue}>
      {children}

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 px-3 py-3 backdrop-blur-sm sm:px-4 sm:py-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeQuoteModal}
          >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-h-[90vh] w-full max-w-[36.5rem] overflow-y-auto rounded-[1rem] bg-white shadow-soft [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:max-h-[86vh] sm:max-w-[38.5rem] sm:rounded-[1.35rem] lg:max-w-[39.5rem]"
            onClick={(event) => event.stopPropagation()}
          >
              <div className="grid lg:grid-cols-[0.86fr_1.14fr]">
                <div className="bg-accent px-4 py-4 text-white sm:px-5 sm:py-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/78">Quick Quote</p>
                  <h3 className="mt-2.5 text-[1.42rem] font-semibold leading-[1.08] sm:mt-3 sm:text-[1.56rem]">
                    Tell us what you need and we will get back to you fast.
                  </h3>
                  <p className="mt-2.5 max-w-xs text-[12px] leading-5 text-white/84 sm:mt-3 sm:text-[13px] sm:leading-6">
                    This request opens directly in our WhatsApp with all the important details already filled in.
                  </p>

                  <div className="mt-4 space-y-2.5 text-[12px] text-white/88 sm:mt-5 sm:space-y-3 sm:text-[13px]">
                    <div className="flex items-center gap-3">
                      <Phone className="h-3.5 w-3.5" />
                      <span>Share the best phone number to reach you on.</span>
                    </div>
                    {shouldShowEventDate ? (
                      <div className="flex items-center gap-3">
                        <CalendarDays className="h-3.5 w-3.5" />
                        <span>Add your event date if you already have one.</span>
                      </div>
                    ) : null}
                    <div className="flex items-center gap-3">
                      <MessageSquareText className="h-3.5 w-3.5" />
                      <span>Tell us the service, category, and any important notes.</span>
                    </div>
                  </div>
                </div>

                <div className="relative px-4 py-4 sm:px-5 sm:py-5">
                  <button
                    type="button"
                    onClick={closeQuoteModal}
                    className="absolute right-3.5 top-3.5 inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/8 bg-white text-ink transition hover:border-black/18 sm:right-4 sm:top-4 sm:h-9 sm:w-9"
                    aria-label="Close quote form"
                  >
                    <X className="h-4 w-4" />
                  </button>

                  <form className="grid gap-2.5 pr-8 pt-2 sm:gap-3 sm:pr-10 sm:pt-5" onSubmit={submitToWhatsApp}>
                    <Field
                      label="Full name"
                      required
                      value={form.fullName}
                      onChange={(value) => setForm((current) => ({ ...current, fullName: value }))}
                      placeholder="Your name"
                    />

                    <Field
                      label="Phone number"
                      required
                      value={form.phone}
                      onChange={(value) => setForm((current) => ({ ...current, phone: value }))}
                      placeholder="+254..."
                    />

                    <Field
                      label="Email"
                      type="email"
                      value={form.email}
                      onChange={(value) => setForm((current) => ({ ...current, email: value }))}
                      placeholder="you@example.com"
                    />

                    <SelectField
                      label="Service"
                      required
                      value={form.service}
                      onChange={(value) =>
                        setForm((current) => ({
                          ...current,
                          service: value,
                          category: "",
                          eventDate: "",
                        }))
                      }
                      options={services.map((service) => service.name)}
                      placeholder="Choose service"
                    />

                    {selectedService ? (
                      <ChipSelector
                        label="Sub service"
                        value={form.category}
                        options={categoryOptions.map((category) => category.name)}
                        onChange={(value) => setForm((current) => ({ ...current, category: value }))}
                      />
                    ) : null}

                    {shouldShowEventDate ? (
                      <Field
                        label="Event date"
                        type="date"
                        value={form.eventDate}
                        onChange={(value) => setForm((current) => ({ ...current, eventDate: value }))}
                      />
                    ) : null}

                    <Field
                      label="Location"
                      value={form.location}
                      onChange={(value) => setForm((current) => ({ ...current, location: value }))}
                      placeholder="Venue or town"
                    />

                    <label className="grid gap-2">
                      <span className="text-sm font-medium text-ink">Notes</span>
                      <textarea
                        value={form.notes}
                        onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))}
                        rows={3}
                        placeholder="Tell us the guest count, setup style, preferred category, or anything else helpful."
                        className="resize-none rounded-[1rem] border border-black/10 bg-[#fcfbfa] px-3.5 py-3 text-sm text-ink outline-none transition placeholder:text-slate/70 focus:border-accent"
                      />
                    </label>

                    <div className="flex flex-col gap-2.5 pt-1 sm:flex-row sm:pt-1.5">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accentDeep"
                      >
                        Send Quote Request
                      </button>
                      <button
                        type="button"
                        onClick={closeQuoteModal}
                        className="inline-flex items-center justify-center rounded-full border border-black/10 px-5 py-3 text-sm font-semibold text-ink transition hover:border-black/20"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </QuoteModalContext.Provider>
  );
}

function Field({ label, onChange, ...props }) {
  return (
    <label className="grid gap-2">
      <span className="text-[13px] font-medium text-ink sm:text-sm">{label}</span>
      <input
        {...props}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-[0.95rem] border border-black/10 bg-[#fcfbfa] px-3.5 py-2.5 text-sm text-ink outline-none transition placeholder:text-slate/70 focus:border-accent sm:rounded-[1rem]"
      />
    </label>
  );
}

function SelectField({ label, onChange, options, placeholder, disabled = false, ...props }) {
  return (
    <label className="grid gap-2">
      <span className="text-[13px] font-medium text-ink sm:text-sm">{label}</span>
      <select
        {...props}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-[0.95rem] border border-black/10 bg-[#fcfbfa] px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-accent disabled:cursor-not-allowed disabled:text-slate sm:rounded-[1rem]"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function ChipSelector({ label, value, options, onChange }) {
  return (
    <div className="grid gap-2">
      <span className="text-[13px] font-medium text-ink sm:text-sm">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isActive = value === option;

          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`rounded-full border px-3 py-1.5 text-[13px] font-medium transition ${
                isActive
                  ? "border-accent bg-accent text-white"
                  : "border-black/10 bg-[#fcfbfa] text-ink hover:border-black/20"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
