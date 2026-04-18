import { readFile } from "fs/promises";
import path from "path";
import { slugifyCategory } from "@/lib/services";

const CLOUDINARY_MAP_PATH = path.join(process.cwd(), "cloudinary-image-map.json");

function unique(items) {
  return [...new Set(items.filter(Boolean))];
}

function toEntries(groupedSection) {
  if (!groupedSection || typeof groupedSection !== "object") return [];
  return Object.values(groupedSection).flatMap((items) => items ?? []);
}

function toUrls(groupedSection) {
  return unique(sortByNewestUpload(toEntries(groupedSection)).map((item) => item.secure_url));
}

function getSubfolderUrls(grouped, topLevel, subfolder) {
  return unique(sortByNewestUpload(grouped?.[topLevel]?.[subfolder] ?? []).map((item) => item.secure_url));
}

function getTopLevelUrls(grouped, topLevel) {
  return toUrls(grouped?.[topLevel]);
}

function getRootUrls(grouped) {
  return unique(
    Object.entries(grouped ?? {})
      .filter(([topLevel, section]) => topLevel.includes(".") && section?.ROOT)
      .flatMap(([, section]) => section.ROOT.map((item) => item.secure_url)),
  );
}

function uploadVersion(item) {
  const match = item?.secure_url?.match(/\/v(\d+)\//);
  return match ? Number(match[1]) : 0;
}

function sortByNewestUpload(items) {
  return [...items].sort((a, b) => {
    const versionDiff = uploadVersion(b) - uploadVersion(a);
    if (versionDiff !== 0) return versionDiff;
    return (a.file_name ?? "").localeCompare(b.file_name ?? "");
  });
}

function rotate(items, offset) {
  if (!items.length) return items;
  const normalizedOffset = offset % items.length;
  return unique([...items.slice(normalizedOffset), ...items.slice(0, normalizedOffset)]);
}

function buildServiceImageBuckets(grouped) {
  const eventsSound = getSubfolderUrls(grouped, "MILIMANI-EVENTS", "SOUND");
  const eventsTents = getSubfolderUrls(grouped, "MILIMANI-EVENTS", "TENTS");
  const uploadedChairImages = unique([
    ...getSubfolderUrls(grouped, "MILIMANI-EVENTS", "CHAIRS"),
    ...getSubfolderUrls(grouped, "MILIMANI-EVENTS", "CHAIR"),
    ...getSubfolderUrls(grouped, "MILIMANI-EVENTS", "SEATING"),
  ]);
  const eventsChairs = uploadedChairImages.length ? uploadedChairImages : rotate(eventsTents, 2);
  const eventsVehicles = getSubfolderUrls(grouped, "MILIMANI-EVENTS", "VEHICLES");
  const eventsAll = unique([...eventsSound, ...eventsTents, ...eventsChairs, ...eventsVehicles]);

  const farmBroilers = getSubfolderUrls(grouped, "MILIMANI-FARM-IMAGES", "BROILERS");
  const farmEggs = getSubfolderUrls(grouped, "MILIMANI-FARM-IMAGES", "EGGS");
  const farmLocalChicken = getSubfolderUrls(grouped, "MILIMANI-FARM-IMAGES", "LOCAL-CHICKEN");
  const farmAll = unique([...farmBroilers, ...farmEggs, ...farmLocalChicken]);

  const carwashMain = getSubfolderUrls(grouped, "MILIMANI-CARWASH", "CARWASH");
  const carwashBar = getSubfolderUrls(grouped, "MILIMANI-CARWASH", "MILIMANI-BAR");
  const carwashBarbershop = getSubfolderUrls(grouped, "MILIMANI-CARWASH", "MILIMANI-BARBER-SHOP");
  const carwashKitchen = getSubfolderUrls(grouped, "MILIMANI-CARWASH", "MILIMANI-KITCHEN");
  const carwashAll = unique([...carwashMain, ...carwashBar, ...carwashBarbershop, ...carwashKitchen]);

  const hearseBus = getSubfolderUrls(grouped, "MILIMANI-HEARSE", "33-SEATER");
  const hearseMain = getSubfolderUrls(grouped, "MILIMANI-HEARSE", "MAIN-PHOTOS-HEARSE-PAGE");
  const hearseNissan = getSubfolderUrls(grouped, "MILIMANI-HEARSE", "NISSAN-6-SEATER");
  const hearsePrado = getSubfolderUrls(grouped, "MILIMANI-HEARSE", "PRADO-TRAILER/PRADO");
  const hearseTrailer = getSubfolderUrls(grouped, "MILIMANI-HEARSE", "PRADO-TRAILER/TRAILER");
  const hearseLoose = unique(
    Object.entries(grouped?.["MILIMANI-HEARSE"] ?? {})
      .filter(([subfolder]) => subfolder.endsWith(".jpg"))
      .flatMap(([, items]) => items.map((item) => item.secure_url)),
  );
  const hearseAll = unique([
    ...hearseMain,
    ...hearseBus,
    ...hearseNissan,
    ...hearsePrado,
    ...hearseTrailer,
    ...hearseLoose,
  ]);

  return {
    "milimani-events": {
      all: eventsAll,
      hero: unique([...eventsTents, ...eventsVehicles, ...eventsSound]),
      gallery: eventsAll,
      categories: {
        [slugifyCategory("Sounds")]: eventsSound,
        [slugifyCategory("System")]: unique([...eventsVehicles, ...eventsTents]),
        [slugifyCategory("Tents")]: eventsTents,
        [slugifyCategory("Chairs")]: eventsChairs,
      },
    },
    "milimani-farm": {
      all: farmAll,
      hero: unique([...farmBroilers, ...farmEggs, ...farmLocalChicken]),
      gallery: farmAll,
      categories: {
        [slugifyCategory("Broilers")]: farmBroilers,
        [slugifyCategory("Eggs")]: farmEggs,
        [slugifyCategory("Cockrails")]: farmLocalChicken,
        [slugifyCategory("Local Chicken")]: farmLocalChicken,
      },
    },
    "milimani-carwash": {
      all: carwashAll,
      hero: unique([...carwashBar, ...carwashKitchen, ...carwashMain]),
      gallery: carwashAll,
      categories: {
        [slugifyCategory("Bar")]: carwashBar,
        [slugifyCategory("Milimani Kitchen")]: carwashKitchen,
        [slugifyCategory("Water Refill")]: carwashMain,
      },
      extras: {
        barbershop: carwashBarbershop,
      },
    },
    "milimani-hearse": {
      all: hearseAll,
      hero: unique([...hearseMain, ...hearseBus, ...hearseNissan, ...hearsePrado]),
      gallery: hearseAll,
      categories: {
        [slugifyCategory("33 Seater Bus")]: hearseBus,
        [slugifyCategory("Nissan 6 Seater")]: hearseNissan,
        [slugifyCategory("Prado Trailer")]: unique([...hearsePrado, ...hearseTrailer]),
      },
    },
  };
}

export async function getCloudinarySiteImages() {
  try {
    const raw = await readFile(CLOUDINARY_MAP_PATH, "utf8");
    const parsed = JSON.parse(raw);
    const grouped = parsed?.grouped ?? {};
    const services = buildServiceImageBuckets(grouped);
    const uncategorized = getRootUrls(grouped);
    const all = unique([
      ...uncategorized,
      ...getTopLevelUrls(grouped, "MILIMANI-EVENTS"),
      ...getTopLevelUrls(grouped, "MILIMANI-FARM-IMAGES"),
      ...getTopLevelUrls(grouped, "MILIMANI-CARWASH"),
      ...getTopLevelUrls(grouped, "MILIMANI-HEARSE"),
    ]);

    return {
      all,
      uncategorized,
      services,
    };
  } catch {
    return null;
  }
}
