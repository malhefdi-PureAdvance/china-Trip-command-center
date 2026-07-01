import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";

import { AppShell } from "@/components/app-shell";

import "./globals.css";

export const metadata: Metadata = {
  title: "China 2026 Command Center",
  description: "Demo-safe command center scaffold for the Hong Kong and Shenzhen corridor."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body>
        <div className="min-h-screen">
          <div className="border-b border-[var(--pa-border)] bg-[color-mix(in_srgb,var(--pa-surface)_88%,transparent)]">
            <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2 text-xs text-[var(--pa-muted)] sm:px-6 lg:px-8">
              <ShieldCheck className="size-4 text-[var(--pa-green)]" aria-hidden="true" />
              <span>Demo-safe scaffold: Hong Kong / Shenzhen Greater Bay Area content only.</span>
            </div>
          </div>
          <AppShell>{children}</AppShell>
        </div>
      </body>
    </html>
  );
}
