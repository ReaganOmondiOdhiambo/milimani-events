import NavBar from "@/components/revamp/NavBar";
import Reveal from "@/components/revamp/Reveal";
import SectionIntro from "@/components/revamp/SectionIntro";
import ServiceGalleryBrowser from "@/components/revamp/ServiceGalleryBrowser";
import { getImageCollection } from "@/lib/media";
import { services } from "@/lib/services";
import { getCloudinarySiteImages } from "@/lib/site-images";

function firstMatch(items, keyword, fallback) {
  return items.find((item) => item.includes(keyword)) ?? fallback;
}

export default async function GalleryPage() {
  const localImages = await getImageCollection();
  const cloudinaryImages = await getCloudinarySiteImages();
  const logo = firstMatch(localImages, "logo", localImages[0]);

  const gallerySections = services.map((service) => ({
    slug: service.slug,
    name: service.name,
    description: `Browse recent visuals related to ${service.name.toLowerCase()} and jump into the matching service page when you are ready to enquire.`,
    images: cloudinaryImages?.services?.[service.slug]?.gallery?.slice(0, 12) ?? [],
  }));

  return (
    <main className="overflow-x-hidden bg-smoke">
      <NavBar logo={logo} services={services} solidOnLoad />

      <section className="px-3 pb-12 pt-28 sm:px-4 lg:px-5 lg:pb-16 lg:pt-32">
        <div className="mx-auto max-w-[84rem]">
          <Reveal>
            <SectionIntro
              eyebrow="Gallery"
              title=""
              description=""
            />
          </Reveal>

          <Reveal delay={0.05}>
            <ServiceGalleryBrowser sections={gallerySections.filter((section) => section.images.length)} />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
