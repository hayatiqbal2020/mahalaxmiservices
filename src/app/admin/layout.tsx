import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SvgDefs from "@/components/SvgDefs";
import "./admin.css";

export const metadata: Metadata = {
  title: "Admin | Mahalaxmi Services",
  robots: { index: false, follow: false },
};

// The admin area has its own typeface; the public site does not load it.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export default function AdminRoot({ children }: { children: React.ReactNode }) {
  return (
    <div className={`adm ${inter.variable}`}>
      <SvgDefs />
      {children}
    </div>
  );
}
