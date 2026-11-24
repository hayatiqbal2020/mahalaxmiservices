// Business details, used across the site. Change them here only.
const whatsappNumber = "919304126825"; // country code + number, no "+"
const whatsappBase = `https://wa.me/${whatsappNumber}`;
const fullAddress =
  "Mahmood Gali, Sirat Nagar, Neori Vikas, Ranchi, Jharkhand 835217, India";

export const site = {
  name: "Mahalaxmi Services",
  // Main address. The www. version redirects here (set in Vercel), so links,
  // the sitemap and Google all use this one.
  url: "https://mahalaxmiservices.co.in",
  city: "Ranchi",

  phone: "+91 9304126825",
  telHref: "tel:+919304126825",
  email: "mahalaxmiservices2027@gmail.com",
  mailHref: "mailto:mahalaxmiservices2027@gmail.com",

  // WhatsApp: `whatsappBase` is used when a message is built by a form,
  // `whatsappHref` opens a chat with a ready-made first message.
  whatsappBase,
  whatsappHref: `${whatsappBase}?text=${encodeURIComponent(
    "Hello Mahalaxmi Services, I need a quote for fire extinguishers.",
  )}`,

  addressLine1: "Mahmood Gali, Sirat Nagar, Neori Vikas",
  addressLine2: "Ranchi Jharkhand (India) - 835217",
  street: "Mahmood Gali, Sirat Nagar, Neori Vikas",
  region: "Jharkhand",
  postalCode: "835217",

  // Google Maps, located by address. If you have a Google Business Profile,
  // replace these with the profile's own embed and directions links.
  mapEmbedSrc: `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`,
  directionsHref: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`,

  // Social pages. An icon is shown in the footer only for links filled in here.
  socials: {
    facebook: "",
    instagram: "",
    youtube: "",
    linkedin: "",
  },

  // Where the "Admin Login" button in the footer goes.
  adminLoginHref: "/admin/login",

  // Optional, set in .env.local (see .env.example).
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
  // Google Search Console ownership code for https://mahalaxmiservices.co.in/
  // (property added 25 Nov 2026). Public by design: Google reads it from the
  // page's HTML. Keep it, or Search Console loses access.
  googleVerification:
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
    "E6IIu_s6EUOQUQ3MIZXNjSuoR0dO3S2EuwqTmrWfeq0",
};
