import type { Metadata, Viewport } from "next";
import { ShieldCheck } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { ServiceWorkerRegister } from "@/components/sw-register";
import { geistMono, montserrat } from "@/lib/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "China 2026 Command Center",
  description: "Public app-safe command center for the Hong Kong and Shenzhen corridor.",
  applicationName: "China 2026 Command Center",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "China 2026",
    statusBarStyle: "black-translucent"
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/icons/apple-touch-icon.png"
  },
  formatDetection: { telephone: false }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4efe4" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1016" }
  ]
};

const themeBootScript = `
(function () {
  try {
    var preference = localStorage.getItem("pa-command-theme") || "system";
    var resolved = preference === "system"
      ? (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark")
      : preference;
    if (resolved !== "light" && resolved !== "dark") resolved = "dark";
    var root = document.documentElement;
    root.dataset.theme = resolved;
    root.dataset.themePreference = preference;
    root.classList.remove("light", "dark");
    root.classList.add(resolved);
    if (document.body) {
      document.body.dataset.theme = resolved;
      document.body.dataset.themePreference = preference;
    }
  } catch (_) {}
})();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      data-theme-preference="system"
      className={`dark ${montserrat.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body data-theme="dark" data-theme-preference="system" suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <ServiceWorkerRegister />
        <div className="min-h-screen">
          <div className="border-b border-[var(--cc-border-faint)]">
            <div className="mx-auto flex max-w-5xl items-center gap-2 px-[var(--cc-pad-screen)] py-1.5 font-mono text-[10px] leading-4 text-[var(--cc-text-faint)] sm:gap-3 sm:py-2 sm:text-[var(--cc-fs-caption)]">
              <ShieldCheck
                className="size-3.5 shrink-0 text-[var(--cc-green)] sm:size-4"
                aria-hidden="true"
              />
              <span className="sm:hidden">App-safe HK / Shenzhen ops</span>
              <span className="hidden sm:inline">
                Public app-safe: Hong Kong / Shenzhen Greater Bay Area mission data only.
              </span>
            </div>
          </div>
          <AppShell>{children}</AppShell>
        </div>
      </body>
    </html>
  );
}
