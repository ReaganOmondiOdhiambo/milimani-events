import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import NavBar from "@/components/revamp/NavBar";
import Reveal from "@/components/revamp/Reveal";
import SectionIntro from "@/components/revamp/SectionIntro";
import { getImageCollection } from "@/lib/media";
import { services, slugifyCategory } from "@/lib/services";

function firstMatch(items, keyword, fallback) {
  return items.find((item) => item.includes(keyword)) ?? fallback;
}

export default async function ServicesIndexPage() {
  const allImages = await getImageCollection();
  const logo = firstMatch(allImages, "logo", allImages[0]);

  return (
    <main className="bg-smoke">
      <NavBar logo={logo} services={services} />
      <section className="px-3 pb-16 pt-32 sm:px-4 lg:px-5">
        <div className="mx-auto max-w-[84rem]">
          <Reveal>
            <SectionIntro
              eyebrow="All Services"
              title="Choose the service page that matches the quote request you need."
              description="Each service below also shows its subcategories, so a visitor can jump directly to the exact thing they need."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.slug} delay={index * 0.04}>
                <article className="rounded-[1.25rem] border border-black/5 bg-white p-6 shadow-card">
                  <Link href={`/services/${service.slug}`} className="block transition hover:opacity-90">
                    <p className="text-xl font-semibold text-ink">{service.name}</p>
                    <p className="mt-3 text-sm leading-7 text-slate">{service.blurb}</p>
                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                      Explore service
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </Link>

                  <div className="mt-6 border-t border-black/6 pt-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate">
                      Categories
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {service.categories.map((category) => {
                        const categorySlug = slugifyCategory(category.name);

                        return (
                          <Link
                            key={category.name}
                            href={`/services/${service.slug}?category=${categorySlug}#categories`}
                            className="inline-flex rounded-full border border-black/10 bg-[#faf8f6] px-3 py-2 text-sm font-medium text-ink transition hover:border-accent hover:text-accent"
                          >
                            {category.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
