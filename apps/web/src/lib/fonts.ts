import { Geist_Mono, Montserrat } from "next/font/google";

// Self-hosted via next/font: font files are downloaded at build time and
// served from /_next/static — no runtime CDN request. Both are variable
// fonts, so every weight the design system uses (400–800 sans, 400–600 mono)
// is covered without layout-shift-prone late loads.
export const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap"
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap"
});
