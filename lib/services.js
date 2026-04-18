export const services = [
  {
    slug: "milimani-events",
    name: "Milimani Events",
    shortName: "Events",
    heroTitle: "Milimani Events",
    heroDescription:
      "Professional event support for tenting, seating, sound, and full setup coordination for celebrations, gatherings, and branded occasions.",
    blurb:
      "This page groups the core event hire items clients ask for most often, so they can see the available categories clearly and request the right quote faster.",
    mediaHint: "EVENTS-TENTS",
    categories: [
      {
        name: "Sounds",
        description: "Sound support for events that need clear music playback, speeches, announcements, and a smoother guest experience.",
        meta: "Best for parties, ceremonies, launches, and social events",
      },
      {
        name: "System",
        description: "Structured event setup support covering the essential technical and practical items needed to run a clean occasion.",
        meta: "Suitable for organized indoor and outdoor setups",
      },
      {
        name: "Tents",
        description: "Tent options for weddings, functions, public gatherings, and weather cover, with practical setup guidance included.",
        meta: "Available for both intimate and large-capacity events",
      },
      {
        name: "Chairs",
        description: "Chair hire for guest seating across weddings, conferences, private parties, and formal event layouts.",
        meta: "Good for banquets, ceremonies, meetings, and receptions",
      },
    ],
  },
  {
    slug: "milimani-farm",
    name: "Milimani Farm",
    shortName: "Farm",
    heroTitle: "Milimani Farm",
    heroDescription:
      "Fresh poultry supply for homes, kitchens, resellers, and repeat buyers looking for reliable stock and clear category options.",
    blurb:
      "Clients should be able to land here, understand the poultry lines available, and request supply pricing without confusion.",
    mediaHint: "CHICKEN-BUSINESS",
    categories: [
      {
        name: "Broilers",
        description: "Broiler supply for households, butcheries, food businesses, and event kitchens needing steady poultry stock.",
        meta: "Popular for food service, resale, and larger kitchen demand",
      },
      {
        name: "Eggs",
        description: "Egg supply for homes, shops, institutions, and businesses looking for dependable everyday or bulk delivery.",
        meta: "Suitable for domestic, retail, and institution orders",
      },
      {
        name: "Cockrails",
        description: "Cockrail stock for buyers looking for mature birds for resale, kitchen use, or routine supply planning.",
        meta: "Useful for mixed poultry demand and repeat buyers",
      },
      {
        name: "Local Chicken",
        description: "Local chicken supply for clients who prefer traditional poultry options for homes, restaurants, and special occasions.",
        meta: "Well suited for premium meals and culturally specific demand",
      },
    ],
  },
  {
    slug: "milimani-carwash",
    name: "Milimani Carwash",
    shortName: "Carwash",
    heroTitle: "Milimani Carwash",
    heroDescription:
      "A practical lifestyle stop that brings together wash services, refreshment options, kitchen support, and water refill convenience.",
    blurb:
      "This page should help visitors quickly understand the different services available at the location and choose the one they need most.",
    mediaHint: "HAVING-FUN",
    categories: [
      {
        name: "Bar",
        description: "A relaxed bar setup for guests looking to unwind, meet, or enjoy refreshments while on site.",
        meta: "Ideal for a chill stop, waiting guests, and social hangouts",
      },
      {
        name: "Milimani Kitchen",
        description: "Kitchen and food service support for takeaway meals, practical refreshment, and convenient dining on location.",
        meta: "Works for quick meals, snacks, and casual food orders",
      },
      {
        name: "Water Refill",
        description: "Water refill service for clients looking for an easy and dependable place to top up household or business supply.",
        meta: "Useful for routine refill stops and repeat local demand",
      },
    ],
  },
  {
    slug: "milimani-hearse",
    name: "Milimani Hearse",
    shortName: "Hearse & Transport",
    heroTitle: "Milimani Hearse & Transport",
    heroDescription:
      "Transport options for group movement and practical event logistics, presented clearly so customers can choose the right vehicle type.",
    blurb:
      "This page keeps the available transport categories simple, visible, and easy to quote based on passenger count or use case.",
    mediaHint: "CAR-RENTAL",
    categories: [
      {
        name: "33 Seater Bus",
        description: "A larger transport option for group movement, organized guest transfers, and coordinated travel arrangements.",
        meta: "Best for event guests, staff movement, and medium-size group travel",
      },
      {
        name: "Nissan 6 Seater",
        description: "A smaller passenger option for family movement, private transfers, and practical point-to-point transport.",
        meta: "Good for smaller groups and executive-style movement",
      },
      {
        name: "Prado Trailer",
        description: "A stronger utility option for movement that needs more carrying support or practical transport flexibility.",
        meta: "Suitable for support logistics, mixed-use trips, and heavier movement needs",
      },
    ],
  },
];

export function slugifyCategory(name) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getServiceBySlug(slug) {
  return services.find((service) => service.slug === slug);
}
