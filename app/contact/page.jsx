import Image from "next/image";
import { Clock3, Mail, PhoneCall, MapPin } from "lucide-react";
import NavBar from "@/components/revamp/NavBar";
import Reveal from "@/components/revamp/Reveal";
import ContactInquiryForm from "@/components/revamp/ContactInquiryForm";
import { getImageCollection } from "@/lib/media";
import { services } from "@/lib/services";
import { getCloudinarySiteImages } from "@/lib/site-images";

function firstMatch(items, keyword, fallback) {
  return items.find((item) => item.includes(keyword)) ?? fallback;
}

export default async function ContactPage() {
  const localImages = await getImageCollection();
  const cloudinaryImages = await getCloudinarySiteImages();
  const logo = firstMatch(localImages, "logo", localImages[0]);
  const venueImage =
    cloudinaryImages?.services?.["milimani-events"]?.hero?.[0] ??
    cloudinaryImages?.services?.["milimani-events"]?.all?.[0] ??
    localImages[0];

  const contactHighlights = [
    {
      icon: MapPin,
      label: "Branches",
      value: "Nairobi, Kisumu, Busia, Eldoret, Homabay & Kericho",
    },
    {
      icon: PhoneCall,
      label: "Call Us",
      value: "+254 712 345 001",
      href: "tel:+254712345001",
    },
    {
      icon: Mail,
      label: "Email Us",
      value: "quotes@milimanievents.co.ke",
      href: "mailto:quotes@milimanievents.co.ke",
    },
    {
      icon: Clock3,
      label: "Business Hours",
      value: "Mon-Sun: 7:00 a.m. - 7:00 p.m",
    },
  ];

  return (
    <main className="overflow-x-hidden bg-smoke">
      <NavBar logo={logo} services={services} solidOnLoad />

      <section className="px-3 pb-10 pt-28 sm:px-4 lg:px-5 lg:pb-14 lg:pt-32">
        <div className="mx-auto max-w-[84rem]">
          <Reveal>
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="text-balance text-3xl font-semibold leading-[1.08] text-accent sm:text-4xl lg:text-5xl">
                Share your idea. We&apos;ll make it unforgettable.
              </h1>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-4">
            {contactHighlights.map((item, index) => {
              const Icon = item.icon;
              const content = (
                <>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10">
                    <Icon className="h-5 w-5 text-ink" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/65">{item.label}</p>
                    <p className="mt-2 text-base leading-7 text-ink sm:text-[1.05rem]">{item.value}</p>
                  </div>
                </>
              );

              return (
                <Reveal key={item.label} delay={index * 0.04}>
                  {item.href ? (
                    <a href={item.href} className="flex items-start gap-4">
                      {content}
                    </a>
                  ) : (
                    <div className="flex items-start gap-4">{content}</div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-3 pb-14 pt-6 sm:px-4 lg:px-5">
        <div className="mx-auto grid max-w-[84rem] gap-6 lg:grid-cols-[0.98fr_1.02fr]">
          <Reveal className="h-full">
            <div className="h-full rounded-[1.25rem] bg-[#d6b792] px-7 py-8 shadow-soft sm:px-8 sm:py-10">
              <ContactInquiryForm />
            </div>
          </Reveal>

          <Reveal delay={0.06} className="h-full">
            <div className="relative h-full min-h-[34rem] overflow-hidden rounded-[1.25rem] bg-white shadow-soft">
              <Image
                src={venueImage}
                alt="Milimani Events contact"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
