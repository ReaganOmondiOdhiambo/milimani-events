"use client";

import { useState } from "react";
import { services } from "@/lib/services";

const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  city: "",
  service: "",
  message: "",
};

export default function ContactInquiryForm() {
  const [form, setForm] = useState(INITIAL_FORM);

  const updateField = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const message = encodeURIComponent(
      [
        "Hello Milimani Events & Lifestyle Hub,",
        "",
        "I would like to get in touch.",
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Phone: ${form.phone}`,
        `City: ${form.city || "Not provided"}`,
        `Service: ${form.service || "General enquiry"}`,
        `Message: ${form.message}`,
      ].join("\n"),
    );

    window.open(`https://wa.me/254712345001?text=${message}`, "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div>
        <h2 className="text-[1.95rem] font-semibold leading-tight text-ink sm:text-[2.2rem]">
          How Can We Help You?
        </h2>
        <p className="mt-4 max-w-xl text-[14px] leading-7 text-ink/80 sm:text-[15px] sm:leading-8">
          Have a question? Share the details here and our team will follow up with the right next step.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Your name"
          placeholder="e.g. John Smith"
          value={form.name}
          onChange={(value) => updateField("name", value)}
          required
        />
        <Field
          label="Email address"
          type="email"
          placeholder="e.g. john@youremail.com"
          value={form.email}
          onChange={(value) => updateField("email", value)}
          required
        />
        <Field
          label="Phone number"
          placeholder="e.g. +254 700 000 000"
          value={form.phone}
          onChange={(value) => updateField("phone", value)}
          required
        />
        <Field
          label="City"
          placeholder="e.g. Nairobi"
          value={form.city}
          onChange={(value) => updateField("city", value)}
        />
        <SelectField
          label="Service"
          value={form.service}
          onChange={(value) => updateField("service", value)}
          options={services.map((service) => service.name)}
        />
      </div>

      <label className="grid gap-2.5">
        <span className="text-sm font-semibold text-accent">Message</span>
        <textarea
          rows={6}
          required
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
          placeholder="Tell us about your event, service needs, or the kind of support you are looking for."
          className="resize-none rounded-[1.4rem] border border-white/55 bg-white px-5 py-4 text-[15px] text-ink outline-none transition placeholder:text-accent/75 focus:border-accent"
        />
      </label>

      <button
        type="submit"
        className="inline-flex w-fit items-center justify-center rounded-[0.9rem] bg-accent px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-accentDeep"
      >
        Send
      </button>
    </form>
  );
}

function Field({ label, onChange, ...props }) {
  return (
    <label className="grid gap-2.5">
      <span className="text-sm font-semibold text-accent">{label}</span>
      <input
        {...props}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-[1rem] border border-white/55 bg-white px-4 py-3.5 text-[14px] text-ink outline-none transition placeholder:text-accent/75 focus:border-accent sm:text-[15px]"
      />
    </label>
  );
}

function SelectField({ label, onChange, options, ...props }) {
  return (
    <label className="grid gap-2.5">
      <span className="text-sm font-semibold text-accent">{label}</span>
      <select
        {...props}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-[1rem] border border-white/55 bg-white px-4 py-3.5 text-[14px] text-ink outline-none transition focus:border-accent sm:text-[15px]"
      >
        <option value="">Choose service</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
