import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import NavBar from "@/components/revamp/NavBar";
import Reveal from "@/components/revamp/Reveal";
import QuotePanel from "@/components/revamp/QuotePanel";
import { getImageCollection, getVideoCollection } from "@/lib/media";
import { getServiceBySlug, services, slugifyCategory } from "@/lib/services";
import ServiceCategoryExplorer from "@/components/revamp/ServiceCategoryExplorer";
import QuoteTrigger from "@/components/revamp/QuoteTrigger";
import { getCloudinarySiteImages } from "@/lib/site-images";

function firstMatch(items, keyword, fallback) {
  return items.find((item) => item.includes(keyword)) ?? fallback;
}

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export default async function ServicePage({ params, searchParams }) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const localImages = await getImageCollection();
  const cloudinaryImages = await getCloudinarySiteImages();
  const allVideos = await getVideoCollection();
  const logo = firstMatch(localImages, "logo", localImages[0]);
  const serviceImageSet = cloudinaryImages?.services?.[service.slug];
  const serviceImages = serviceImageSet?.all?.length ? serviceImageSet.all : localImages;
  const heroImage = serviceImageSet?.hero?.[0] ?? serviceImages[0] ?? localImages[0];
  const heroVideo = firstMatch(allVideos, "09.59", allVideos[0]);
  const activeCategorySlug = service.categories.some(
    (category) => slugifyCategory(category.name) === searchParams?.category,
  )
    ? searchParams.category
    : slugifyCategory(service.categories[0].name);
  const categoryImages = service.categories.map((category, index) => {
    const categorySlug = slugifyCategory(category.name);
    return serviceImageSet?.categories?.[categorySlug]?.[0] ?? serviceImages[index] ?? heroImage;
  });

  return (
    <main className="overflow-x-hidden bg-smoke">
      <NavBar logo={logo} services={services} solidOnLoad />

      <section className="px-3 pb-10 pt-28 sm:px-4 lg:px-5 lg:pb-14 lg:pt-32">
        <div className="mx-auto max-w-[84rem]">
          <div className="grid gap-6 lg:grid-cols-[0.96fr_1.04fr] lg:items-stretch">
            <Reveal className="h-full">
              <div className="flex h-[26rem] flex-col justify-between rounded-[2.5rem] bg-accent px-8 py-8 text-white shadow-soft sm:h-[28rem] sm:px-10 sm:py-10 lg:h-[32rem]">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.34em] text-white/86">Service</p>
                  <h1 className="mt-6 max-w-xl text-4xl font-semibold leading-[0.96] sm:text-5xl lg:text-[3.9rem]">
                    {service.heroTitle}
                  </h1>
                  <p className="mt-6 max-w-2xl text-[15px] leading-7 text-white/86 sm:text-base sm:leading-8">
                    {service.heroDescription}
                  </p>
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <QuoteTrigger
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#b58b56] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#a67b48]"
                    service={service.name}
                  >
                    Request a Quote
                    <ArrowRight className="h-4 w-4" />
                  </QuoteTrigger>
                  <a
                    href="tel:+254712345001"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/22 px-6 py-4 text-sm font-semibold text-white transition hover:border-white/40"
                  >
                    Call Us
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.06} className="h-full">
              <div className="relative h-[26rem] overflow-hidden rounded-[2.5rem] bg-white shadow-soft sm:h-[28rem] lg:h-[32rem]">
                {heroVideo ? (
                  <video
                    src={heroVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover opacity-16"
                  />
                ) : null}
                <Image
                  src={heroImage}
                  alt={service.name}
                  width={1600}
                  height={1200}
                  className="relative h-full w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="px-3 py-14 sm:px-4 lg:px-5 lg:py-20">
        <div className="mx-auto max-w-[84rem]">
          <div className="grid gap-10 border-b border-black/8 pb-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <Reveal>
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.35em] text-accent">What We Do</p>
                <h2 className="mt-5 text-3xl font-semibold leading-[1.02] text-accent sm:text-4xl">
                  Clean service options that make the next step obvious.
                </h2>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <p className="max-w-2xl text-base leading-8 text-ink">
                {service.blurb} If you already know what you need, you can jump straight into the right category below and request a quote without digging through too much information.
              </p>
            </Reveal>
          </div>

          <Reveal>
            <ServiceCategoryExplorer
              categories={service.categories}
              images={categoryImages}
              fallbackImage={heroImage}
              serviceName={service.name}
              serviceSlug={service.slug}
              activeCategorySlug={activeCategorySlug}
            />
          </Reveal>
        </div>
      </section>

      <section id="quote" className="px-3 pb-12 pt-4 sm:px-4 lg:px-5">
        <div className="mx-auto max-w-[84rem]">
          <Reveal>
            <QuotePanel
              title={`Ready to book ${service.shortName.toLowerCase()} support?`}
              description="Share the event type, date, guest count, location, and preferred category, and we will respond with a tailored quotation."
            />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
