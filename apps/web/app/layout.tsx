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
      className="dark"
      suppressHydrationWarning
    >
      <body data-theme="dark" data-theme-preference="system" suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <div className="min-h-screen">
          <div className="border-b border-[var(--cc-border-faint)] bg-[var(--cc-surface-inset)]">
            <div className="mx-auto flex max-w-5xl items-center gap-3 px-[var(--cc-pad-screen)] py-2 font-mono text-[var(--cc-fs-caption)] text-[var(--cc-text-faint)]">
              <ShieldCheck className="size-4 shrink-0 text-[var(--cc-green)]" aria-hidden="true" />
              <span>Demo-safe scaffold: Hong Kong / Shenzhen Greater Bay Area content only.</span>
            </div>
          </div>
          <AppShell>{children}</AppShell>
        </div>
      </body>
    </html>
  );
}
