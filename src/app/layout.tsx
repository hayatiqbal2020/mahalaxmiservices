import type { Metadata, Viewport } from "next";
import { Oswald, Poppins } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import { site } from "@/lib/site";

// Fonts are downloaded at build time and served from this site (no request to Google).
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
});

const title =
  "Mahalaxmi Services | Fire Extinguisher Sales, Refilling & AMC in Ranchi";
const description =
  "Mahalaxmi Services – authorised fire extinguisher dealer in Ranchi, Jharkhand. Supply, installation, refilling, hydro testing, AMC and fire safety training.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title,
    description,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title, description },
  verification: site.googleVerification
    ? { google: site.googleVerification }
    : undefined,
};

// Colours the browser bar on phones and the installed app's title bar.
export const viewport: Viewport = { themeColor: "#d7261e" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable} ${oswald.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
