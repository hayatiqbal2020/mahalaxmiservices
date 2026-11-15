import { site } from "@/lib/site";

// Business details in the format Google reads for local search and Maps.
export default function BusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    description:
      "Authorised fire extinguisher dealer. Supply, installation, refilling, hydro testing, AMC and fire safety training.",
    url: site.url,
    telephone: site.telHref.replace("tel:", ""),
    email: site.email,
    image: `${site.url}/opengraph-image`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.street,
      addressLocality: site.city,
      addressRegion: site.region,
      postalCode: site.postalCode,
      addressCountry: "IN",
    },
    areaServed: site.city,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:00",
    },
    sameAs: Object.values(site.socials).filter(Boolean),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
