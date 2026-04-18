import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PremiumMediaCard({
  image,
  title,
  description,
  href = "#contact",
  tag = "Featured",
  cta = "View Details",
  className = "",
}) {
  return (
    <Link
      href={href}
      className={`group relative block min-h-[24rem] overflow-hidden rounded-[0.95rem] shadow-card transition duration-300 ${className}`}
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition duration-500"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,15,17,0.08),rgba(15,15,17,0.26)_42%,rgba(15,15,17,0.84))] transition duration-300 group-hover:bg-[linear-gradient(180deg,rgba(15,15,17,0.18),rgba(15,15,17,0.42)_42%,rgba(15,15,17,0.92))]" />

      <div className="absolute left-5 top-5 rounded-full bg-white/92 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-ink shadow-card">
        {tag}
      </div>

      <div className="absolute inset-x-5 bottom-5">
        <div className="rounded-[0.75rem] bg-white/10 p-4 backdrop-blur-sm">
          <p className="max-w-[15rem] truncate text-[1.35rem] font-semibold leading-tight text-white sm:text-[1.5rem]">
            {title}
          </p>
          <p
            className="mt-2 max-w-[17rem] overflow-hidden text-[13px] leading-5 text-white/78 sm:text-sm sm:leading-6"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {description}
          </p>
          <div className="mt-4">
            <span className="inline-flex items-center gap-2 rounded-[0.7rem] bg-white px-4 py-3 text-[13px] font-semibold text-ink shadow-card transition duration-300 group-hover:bg-accent group-hover:text-white sm:text-sm">
              {cta}
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
