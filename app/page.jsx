import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  PhoneCall,
} from "lucide-react";
import NavBar from "@/components/revamp/NavBar";
import HeroVideoSlider from "@/components/revamp/HeroVideoSlider";
import Reveal from "@/components/revamp/Reveal";
import SectionIntro from "@/components/revamp/SectionIntro";
import GalleryGrid from "@/components/revamp/GalleryGrid";
import PremiumMediaCard from "@/components/revamp/PremiumMediaCard";
import CardCarousel from "@/components/revamp/CardCarousel";
import QuoteTrigger from "@/components/revamp/QuoteTrigger";
import { getImageCollection, pickEvery } from "@/lib/media";
import { services } from "@/lib/services";
import { getCloudinarySiteImages } from "@/lib/site-images";
import {
  BriefcaseBusiness,
  CalendarClock,
  MapPin,
} from "lucide-react";

function firstMatch(items, keyword, fallback) {
  return items.find((item) => item.includes(keyword)) ?? fallback;
}


export default async function HomePage() {
  const localImages = await getImageCollection();
  const cloudinaryImages = await getCloudinarySiteImages();
  const heroSlides = [
    {
      src: "https://res.cloudinary.com/dwxm1x2ig/video/upload/v1776328597/milimani-site/download.mp4",
      label: "Milimani Events",
      description: "Tents, chairs, sound, and setup support for polished occasions.",
    },
    {
      src: "https://res.cloudinary.com/dwxm1x2ig/video/upload/v1776328814/milimani-site/Untitled-design-%281%29.mp4",
      label: "Milimani Farm",
      description: "Broilers, eggs, cockrails, and local chicken supply made simple.",
    },
    {
      src: "https://res.cloudinary.com/dwxm1x2ig/video/upload/v1776329225/milimani-site/Untitled-design-%282%29.mp4",
      label: "Milimani Carwash",
      description: "Carwash lifestyle services with bar, kitchen, and water refill convenience.",
    },
    {
      src: "https://res.cloudinary.com/dwxm1x2ig/video/upload/v1776329484/milimani-site/Untitled-design-%283%29.mp4",
      label: "Milimani Hearse",
      description: "Practical transport options for group movement and utility support.",
    },
    {
      src: "https://res.cloudinary.com/dwxm1x2ig/video/upload/v1776329531/milimani-site/Untitled-design-%284%29.mp4",
      label: "Milimani Events",
      description: "Event support that brings tents, seating, sound, and setup into one clear request.",
    },
    {
      src: "https://res.cloudinary.com/dwxm1x2ig/video/upload/v1776329820/milimani-site/Untitled-design-%285%29.mp4",
      label: "Milimani Lifestyle",
      description: "Everyday services, food, carwash, and convenience brought closer to the community.",
    },
    {
      src: "https://res.cloudinary.com/dwxm1x2ig/video/upload/v1776330034/milimani-site/Untitled-design-%286%29.mp4",
      label: "Milimani Transport",
      description: "Reliable vehicle and hearse support for family, event, and group movement needs.",
    },
  ];
  const logo = firstMatch(localImages, "logo", localImages[0]);
  const eventsImages = cloudinaryImages?.services?.["milimani-events"]?.all ?? localImages;
  const eventSoundImages = cloudinaryImages?.services?.["milimani-events"]?.categories?.sounds ?? eventsImages;
  const farmImages = cloudinaryImages?.services?.["milimani-farm"]?.all ?? localImages;
  const broilerImages = cloudinaryImages?.services?.["milimani-farm"]?.categories?.broilers ?? farmImages;
  const eggImages = cloudinaryImages?.services?.["milimani-farm"]?.categories?.eggs ?? farmImages;
  const localChickenImages = cloudinaryImages?.services?.["milimani-farm"]?.categories?.["local-chicken"] ?? farmImages;
  const carwashImages = cloudinaryImages?.services?.["milimani-carwash"]?.all ?? localImages;
  const barImages = cloudinaryImages?.services?.["milimani-carwash"]?.categories?.bar ?? carwashImages;
  const kitchenImages = cloudinaryImages?.services?.["milimani-carwash"]?.categories?.["milimani-kitchen"] ?? carwashImages;
  const hearseImages = cloudinaryImages?.services?.["milimani-hearse"]?.all ?? localImages;
  const busImages = cloudinaryImages?.services?.["milimani-hearse"]?.categories?.["33-seater-bus"] ?? hearseImages;
  const rootImages = cloudinaryImages?.uncategorized ?? localImages;

  const aboutImages = [eventsImages[0], carwashImages[0], farmImages[0]].filter(Boolean);
  const serviceCards = [
    {
      title: "Milimani Events",
      description: "Tents, chairs, sound, and event setup support presented as one clear service hub.",
      image: eventsImages[2] ?? localImages[0],
      href: "/services/milimani-events",
      tag: "Top Pick",
    },
    {
      title: "Milimani Farm",
      description: "Broilers, eggs, cockrails, and local chicken supply made easy to browse and quote.",
      image: farmImages[0] ?? localImages[1],
      href: "/services/milimani-farm",
      tag: "Popular",
    },
    {
      title: "Milimani Carwash",
      description: "Bar, kitchen, and water refill services grouped into one practical lifestyle stop.",
      image: carwashImages[0] ?? rootImages[1] ?? localImages[2],
      href: "/services/milimani-carwash",
      tag: "Featured",
    },
    {
      title: "Milimani Hearse",
      description: "33 seater bus, Nissan 6 seater, and Prado trailer options for transport needs.",
      image: hearseImages[0] ?? localImages[3],
      href: "/services/milimani-hearse",
      tag: "Most Requested",
    },
  ];
  const tentingCards = [
    {
      title: "Sounds",
      description: "Sound hire and playback support for celebrations, launches, and public-facing setups.",
      image: eventSoundImages[0] ?? eventsImages[0] ?? localImages[0],
      href: "/services/milimani-events",
      tag: "Milimani Events",
    },
    {
      title: "Broilers",
      description: "Farm supply for homes, kitchens, and repeat buyers looking for reliable poultry stock.",
      image: broilerImages[1] ?? broilerImages[0] ?? farmImages[0] ?? localImages[1],
      href: "/services/milimani-farm?category=broilers#categories",
      tag: "Milimani Farm",
    },
    {
      title: "Milimani Kitchen",
      description: "Food and refreshment service for people stopping by the carwash and lifestyle hub.",
      image: kitchenImages[0] ?? carwashImages[0] ?? rootImages[1] ?? localImages[2],
      href: "/services/milimani-carwash?category=milimani-kitchen#categories",
      tag: "Milimani Carwash",
    },
    {
      title: "33 Seater Bus",
      description: "Group transport support for movement that needs a clearer capacity option.",
      image: busImages[0] ?? hearseImages[0] ?? localImages[3],
      href: "/services/milimani-hearse?category=33-seater-bus#categories",
      tag: "Milimani Hearse",
    },
    {
      title: "Eggs",
      description: "Everyday and bulk egg supply for homes, institutions, shops, and repeat orders.",
      image: eggImages[0] ?? broilerImages[2] ?? localChickenImages[0] ?? farmImages[0] ?? localImages[4],
      href: "/services/milimani-farm?category=eggs#categories",
      tag: "Milimani Farm",
    },
    {
      title: "Bar",
      description: "A chill stop with drinks and a relaxed social environment while on site.",
      image: barImages[0] ?? carwashImages[0] ?? rootImages[1] ?? localImages[5],
      href: "/services/milimani-carwash?category=bar#categories",
      tag: "Milimani Carwash",
    },
  ];

  const galleryImages = pickEvery(
    [
      ...eventsImages,
      ...farmImages,
      ...carwashImages,
      ...hearseImages,
      ...rootImages,
    ],
    2,
    9,
  );
  const whyChooseUsSteps = [
    {
      step: "Step 1",
      title: "Understand the request",
      description:
        "We begin with the actual need, the service required, and the practical details that shape a useful quote.",
    },
    {
      step: "Step 2",
      title: "Match the right category",
      description:
        "From tents to broilers to transport, we guide clients to the right category without unnecessary back and forth.",
    },
    {
      step: "Step 3",
      title: "Deliver with follow-through",
      description:
        "Once the request is clear, we stay responsive through setup, supply, or transport so the process feels steady.",
    },
  ];
  const whyChooseUsProjects = [
    {
      title: "Milimani Events",
      description:
        "Tents, seating, sound, and practical setup support presented in one clear service flow for polished occasions.",
      image: eventsImages[1] ?? eventsImages[0] ?? localImages[0],
      href: "/services/milimani-events",
      location: "Homabay",
      focus: "Tents, sound, chairs",
      timing: "Fast quote support",
    },
    {
      title: "Milimani Farm",
      description:
        "Broilers, local chicken, and farm supply options organized so clients can identify the right category quickly.",
      image: farmImages[1] ?? farmImages[0] ?? localImages[1],
      href: "/services/milimani-farm",
      location: "Homabay",
      focus: "Broilers, eggs, local chicken",
      timing: "Everyday supply enquiries",
    },
  ];

  return (
    <main className="overflow-x-hidden">
      <NavBar logo={logo} services={services} />

      <section id="home" className="relative min-h-screen overflow-hidden bg-ink text-white">
        <HeroVideoSlider slides={heroSlides} />
        <div className="relative mx-auto flex min-h-screen max-w-[84rem] items-end px-3 pb-16 pt-32 sm:px-4 lg:px-5">
          <div className="max-w-3xl">

            <Reveal delay={0.06}>
              <h1 className="mt-6 text-balance text-4xl font-semibold leading-[0.94] sm:text-5xl lg:text-6xl">
                Everything you need, from <span className="text-accent">events to everyday essentials</span>
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-2xl text-[15px] leading-7 text-white/74 sm:text-base sm:leading-8">
                Discover event hire, farm produce, lifestyle services, and transport options in one
                clear place, with faster enquiries and a smoother quote experience.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <QuoteTrigger
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-semibold text-white transition duration-300 hover:bg-accentDeep"
                >
                  Get a Quote
                  <ArrowRight className="h-4 w-4" />
                </QuoteTrigger>
                <a
                  href="tel:+254712345001"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-7 py-4 text-sm font-semibold text-white transition duration-300 hover:border-white/30 hover:bg-white/15"
                >
                  <PhoneCall className="h-4 w-4" />
                  Call Us
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="about" className="px-3 py-16 sm:px-4 lg:px-5 lg:py-[4.5rem]">
        <div className="soft-grid section-shell mx-auto grid max-w-[84rem] gap-12 rounded-[1.6rem] border border-black/5 px-6 py-10 shadow-soft sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <SectionIntro
              eyebrow="About Us"
              title="We are Milimani  a multi-service business built in Homabay, for the people of Homabay."
              description="Since 2016, we have grown from a single hearse service into a trusted provider of event solutions, farming products, transport services, and lifestyle services. Our goal is simple: to bring essential services closer to the community in a reliable, affordable, and accessible way."
            />
            <p className="mt-8 text-[14px] leading-7 text-slate sm:text-[15px] sm:leading-8">
              Whether it&apos;s supporting events, providing fresh farm products, offering transport
              solutions, or delivering everyday services, we are committed to quality and trust in
              everything we do. We are not just a business — we are part of the community.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative min-h-[30rem]">
              {aboutImages.map((image, index) => (
                <div
                  key={image}
                  className={`absolute overflow-hidden rounded-[2rem] border border-white/60 shadow-card ${
                    index === 0
                      ? "left-0 top-0 h-64 w-[60%] sm:h-72"
                      : index === 1
                        ? "right-0 top-14 h-72 w-[52%] sm:h-80"
                        : "bottom-0 left-20 h-56 w-[58%] sm:h-64"
                  }`}
                >
                  <Image src={image} alt={`About image ${index + 1}`} fill className="object-cover transition duration-700 hover:scale-105" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="services" className="px-3 py-16 sm:px-4 lg:px-5 lg:py-[4.5rem]">
        <div className="mx-auto max-w-[84rem]">
          <Reveal>
            <SectionIntro
              eyebrow="Services"
              title="Signature services, elevated with clearer hierarchy and richer media."
              description="The existing services stay in place, but the cards are upgraded with stronger imagery, hover movement, and a sharper premium feel."
              centered
            />
          </Reveal>
          <div className="mt-10">
            <CardCarousel>
              {serviceCards.map((service, index) => (
                <Reveal
                  key={service.title}
                  delay={index * 0.04}
                  className="min-w-[18.5rem] flex-none snap-start sm:min-w-[20rem] lg:min-w-[22rem]"
                >
                  <PremiumMediaCard
                    image={service.image}
                    title={service.title}
                    description={service.description}
                    href={service.href}
                    tag={service.tag}
                    cta="View Details"
                  />
                </Reveal>
              ))}
            </CardCarousel>
          </div>
        </div>
      </section>

      <section className="px-3 py-16 sm:px-4 lg:px-5 lg:py-[4.5rem]">
        <div className="mx-auto max-w-[84rem] rounded-[1.6rem] bg-gradient-to-br from-[#fff6f2] via-[#fbf1e8] to-[#f8efe8] px-6 py-10 shadow-soft sm:px-8">
          <Reveal>
            <SectionIntro
              eyebrow="Service Highlights"
              title="A rotating look at the offers clients ask about most."
              description="Instead of showing only event setups here, this slider moves through highlights from events, farm supply, carwash, kitchen, and transport."
            />
          </Reveal>
          <div className="mt-10">
            <CardCarousel autoPlay intervalMs={3800}>
              {tentingCards.map((card, index) => (
                <Reveal
                  key={card.title}
                  delay={index * 0.04}
                  className="min-w-[18.5rem] flex-none snap-start sm:min-w-[20rem] lg:min-w-[22rem]"
                >
                  <PremiumMediaCard
                    image={card.image}
                    title={card.title}
                    description={card.description}
                    href={card.href}
                    tag={card.tag}
                    cta="Request Quote"
                  />
                </Reveal>
              ))}
            </CardCarousel>
          </div>
        </div>
      </section>

      <section className="px-3 py-16 sm:px-4 lg:px-5 lg:py-[4.5rem]">
        <div className="mx-auto max-w-[84rem] overflow-hidden rounded-[2rem] border border-[#dfd7cb] bg-[#fbf7f1]">
          <Reveal>
            <div className="relative px-6 pb-9 pt-8 sm:px-8 lg:px-10 lg:pb-11 lg:pt-10">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-xl">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#7f868e]">
                    How We Work
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold leading-tight text-[#12245f] sm:text-[2.55rem]">
                    How We <span className="text-[#e77b2b]">Get It Done</span>
                  </h2>
                </div>
                <Link
                  href="/services"
                  className="inline-flex h-9 items-center justify-center rounded-full border border-[#e6ddcf] bg-white px-4 text-[12px] font-semibold text-[#12245f] transition hover:border-[#e77b2b] hover:text-[#e77b2b]"
                >
                  Learn More
                </Link>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-3 md:gap-8">
                {whyChooseUsSteps.map((item, index) => (
                  <Reveal key={item.title} delay={index * 0.04}>
                    <article className="max-w-sm">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#e77b2b]">
                        {item.step}
                      </p>
                      <h3 className="mt-2 text-[1.02rem] font-semibold leading-snug text-[#12245f]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[13px] leading-6 text-[#7a8088]">
                        {item.description}
                      </p>
                    </article>
                  </Reveal>
                ))}
              </div>

              </div>
          </Reveal>

          <div className="bg-[#12245f] px-6 pb-8 pt-7 text-white sm:px-8 lg:px-10 lg:pb-10">
            <Reveal>
              <div className="text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/55">
                  Why Choose Us
                </p>
                <h3 className="mt-2 text-2xl font-semibold leading-tight sm:text-[2rem]">
                  Our <span className="text-[#e77b2b]">Service Approach</span>
                </h3>
              </div>
            </Reveal>

            <div className="mt-8">
              <Reveal>
                <article className="mx-auto max-w-[58rem] rounded-[1.25rem] bg-[#18306d] p-3.5">
                  <div className="grid gap-3.5">
                    <div className="grid gap-3.5 rounded-[1rem] bg-white/6 p-2.5 md:grid-cols-2">
                      <div className="relative min-h-[16.4rem] overflow-visible rounded-[0.7rem] bg-white/7">
                        <div
                          className="absolute inset-0 overflow-hidden rounded-[0.7rem] bg-[#274389]"
                          style={{ clipPath: "polygon(14% 0, 100% 0, 100% 100%, 0 100%, 0 14%)" }}
                        >
                          <Image
                            src={whyChooseUsProjects[0].image}
                            alt={whyChooseUsProjects[0].title}
                            fill
                            sizes="(max-width: 768px) 100vw, 45vw"
                            className="object-cover"
                          />
                        </div>
                        <span className="absolute left-1.5 top-1.5 h-4 w-4 rounded-full bg-white/9" />
                      </div>

                      <div className="flex flex-col justify-between rounded-[0.7rem] bg-white/4 px-5 py-5 sm:px-6 sm:py-6">
                        <div>
                          <h4 className="text-[1.08rem] font-semibold text-white">{whyChooseUsProjects[0].title}</h4>
                          <p className="mt-2 text-[13px] leading-6 text-white/72">
                            {whyChooseUsProjects[0].description}
                          </p>
                          <div className="mt-4 space-y-2 text-[12px] text-white/78">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-3.5 w-3.5 text-[#e77b2b]" />
                              <span>{whyChooseUsProjects[0].location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <BriefcaseBusiness className="h-3.5 w-3.5 text-[#e77b2b]" />
                              <span>{whyChooseUsProjects[0].focus}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CalendarClock className="h-3.5 w-3.5 text-[#e77b2b]" />
                              <span>{whyChooseUsProjects[0].timing}</span>
                            </div>
                          </div>
                        </div>

                        <Link
                          href={whyChooseUsProjects[0].href}
                          className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#e77b2b] transition hover:text-white"
                        >
                          Learn more
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>

                    <div className="grid gap-3.5 rounded-[1rem] bg-white/6 p-2.5 md:grid-cols-2">
                      <div className="flex flex-col justify-between rounded-[0.7rem] bg-white/4 px-5 py-5 sm:px-6 sm:py-6">
                        <div>
                          <h4 className="text-[1.08rem] font-semibold text-white">{whyChooseUsProjects[1].title}</h4>
                          <p className="mt-2 text-[13px] leading-6 text-white/72">
                            {whyChooseUsProjects[1].description}
                          </p>
                          <div className="mt-4 space-y-2 text-[12px] text-white/78">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-3.5 w-3.5 text-[#e77b2b]" />
                              <span>{whyChooseUsProjects[1].location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <BriefcaseBusiness className="h-3.5 w-3.5 text-[#e77b2b]" />
                              <span>{whyChooseUsProjects[1].focus}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CalendarClock className="h-3.5 w-3.5 text-[#e77b2b]" />
                              <span>{whyChooseUsProjects[1].timing}</span>
                            </div>
                          </div>
                        </div>

                        <Link
                          href={whyChooseUsProjects[1].href}
                          className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#e77b2b] transition hover:text-white"
                        >
                          Learn more
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>

                      <div className="relative min-h-[16.4rem] overflow-visible rounded-[0.7rem] bg-white/7">
                        <div
                          className="absolute inset-0 overflow-hidden rounded-[0.7rem] bg-[#274389]"
                          style={{ clipPath: "polygon(0 0, 86% 0, 100% 14%, 100% 100%, 0 100%)" }}
                        >
                          <Image
                            src={whyChooseUsProjects[1].image}
                            alt={whyChooseUsProjects[1].title}
                            fill
                            sizes="(max-width: 768px) 100vw, 45vw"
                            className="object-cover"
                          />
                        </div>
                        <span className="absolute right-1.5 top-1.5 h-4 w-4 rounded-full bg-white/9" />
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            </div>

            <div className="mt-6 flex justify-center">
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full bg-[#e77b2b] px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[#d66d22]"
              >
                View all services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="px-3 py-16 sm:px-4 lg:px-5 lg:py-[4.5rem]">
        <div className="mx-auto max-w-[84rem]">
          <Reveal>
            <SectionIntro
              eyebrow="Gallery"
              title="A cleaner gallery preview that now leads into service-specific browsing."
              description="Use the full gallery page to explore visuals by Milimani Events, Farm, Carwash, or Hearse instead of browsing one mixed collection only."
              centered
            />
          </Reveal>
          <div className="mt-10">
            <GalleryGrid images={galleryImages} />
          </div>
          <div className="mt-8 flex justify-center">
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center rounded-full border border-black/10 px-5 py-3 text-sm font-semibold text-ink transition hover:border-black/20"
            >
              Open full gallery
            </Link>
          </div>
        </div>
      </section>

      <section className="px-3 pb-10 pt-16 sm:px-4 lg:px-5 lg:pt-[4.5rem]">
        <div className="mx-auto max-w-[84rem] overflow-hidden rounded-[1rem] border border-black/6 bg-[#f6f0ea] text-ink shadow-card">
          <div className="grid gap-6 px-5 py-7 sm:px-8 sm:py-8 lg:grid-cols-[1fr_0.78fr]">
            <Reveal>
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-accent">Contact & Quotes</p>
              <h2 className="mt-3 text-[1.65rem] font-semibold leading-tight sm:text-[1.9rem]">
                Need a direct line to the team?
              </h2>
              <p className="mt-3 max-w-2xl text-[13px] leading-6 text-slate sm:text-[14px] sm:leading-7">
                Visit the contact page for branch details, business hours, and a cleaner enquiry form,
                or open a quick quote request right away.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="rounded-[1rem] border border-black/6 bg-white p-4 text-ink shadow-card">
                <a
                  href="tel:+254712345001"
                  className="mb-3 flex items-center gap-3 rounded-[0.9rem] border border-black/6 bg-[#faf8f6] px-4 py-3 text-sm font-semibold"
                >
                  <PhoneCall className="h-5 w-5 text-accent" />
                  +254 712 345 001
                </a>
                <a
                  href="mailto:quotes@milimanievents.co.ke"
                  className="mb-3 block rounded-[0.9rem] border border-black/6 bg-[#faf8f6] px-4 py-3 text-sm font-semibold"
                >
                  quotes@milimanievents.co.ke
                </a>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-[0.9rem] border border-black/10 px-4 py-3 text-sm font-semibold text-ink transition hover:border-black/20"
                  >
                    Contact Page
                  </Link>
                  <QuoteTrigger
                    className="inline-flex items-center justify-center gap-2 rounded-[0.9rem] bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-accentDeep"
                    service="General Quote Request"
                  >
                    Get a Quote
                    <ArrowRight className="h-4 w-4" />
                  </QuoteTrigger>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

    </main>
  );
}
