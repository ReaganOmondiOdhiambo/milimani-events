"use client";

import { useQuoteModal } from "@/components/revamp/QuoteModalProvider";

export default function QuoteTrigger({
  children,
  className = "",
  service = "",
  category = "",
  notes = "",
  type = "button",
  onClick,
}) {
  const { openQuoteModal } = useQuoteModal();

  return (
    <button
      type={type}
      onClick={() => {
        openQuoteModal({ service, category, notes });
        onClick?.();
      }}
      className={className}
    >
      {children}
    </button>
  );
}
