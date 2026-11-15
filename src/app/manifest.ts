import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Web app manifest: lets Chrome offer "Install app" / "Add to Home screen".
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} – Fire Safety Solutions`,
    short_name: "Mahalaxmi",
    description:
      "Fire extinguisher sales, refilling, installation and AMC in Ranchi.",
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    lang: "en-IN",
    background_color: "#121214",
    theme_color: "#d7261e",
    categories: ["business", "shopping"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Get a Free Quote", url: "/#contact" },
      { name: "Find the Right Extinguisher", url: "/#finder" },
    ],
  };
}
