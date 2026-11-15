import type { Metadata } from "next";
import { Oswald, Poppins } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mahalaxmiservices.co.in"),
  title: "Mahalaxmi Services | Fire Extinguisher Sales, Refilling & AMC",
  description:
    "Mahalaxmi Services – authorised fire extinguisher dealer. Supply, installation, refilling, hydro testing, AMC and fire safety training.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable} ${oswald.variable}`}>
      <body>{children}</body>
    </html>
  );
}
