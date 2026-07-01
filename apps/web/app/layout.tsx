import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";

import { AppShell } from "@/components/app-shell";

import "./globals.css";

export const metadata: Metadata = {
  title: "China 2026 Command Center",
  description: "Demo-safe command center scaffold for the Hong Kong and Shenzhen corridor."
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
  } catch (_) {}
})();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      data-theme-preference="system"
      className="dark"
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <div className="min-h-screen">
          <div className="border-b border-[var(--pa-border)] bg-[color-mix(in_srgb,var(--pa-surface)_88%,transparent)] backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 text-xs font-medium text-[var(--pa-muted)] sm:px-6 lg:px-8">
              <ShieldCheck className="size-4 shrink-0 text-[var(--pa-green)]" aria-hidden="true" />
              <span>Demo-safe scaffold: Hong Kong / Shenzhen Greater Bay Area content only.</span>
            </div>
          </div>
          <AppShell>{children}</AppShell>
        </div>
      </body>
    </html>
  );
}
