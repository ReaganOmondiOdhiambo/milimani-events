export default function SectionIntro({ eyebrow, title, description, centered = false }) {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="text-xs font-bold uppercase tracking-[0.35em] text-accent">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-semibold leading-tight text-ink sm:text-4xl">{title}</h2>
      <p className="mt-4 text-[15px] leading-7 text-slate sm:text-base sm:leading-8">{description}</p>
    </div>
  );
}
