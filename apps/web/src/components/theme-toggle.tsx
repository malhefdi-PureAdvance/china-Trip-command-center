"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

import { Button, cn } from "@pure-advance/design-system";

export type ThemePreference = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

const storageKey = "pa-command-theme";
const preferences: Array<{ value: ThemePreference; label: string; icon: typeof Sun }> = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor }
];

function getStoredPreference(): ThemePreference {
  if (typeof window === "undefined") {
    return "system";
  }

  const stored = localStorage.getItem(storageKey);
  return stored === "light" || stored === "dark" || stored === "system" ? stored : "system";
}

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") {
    return "dark";
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function resolveTheme(preference: ThemePreference): ResolvedTheme {
  return preference === "system" ? getSystemTheme() : preference;
}

function persistTheme(preference: ThemePreference) {
  const resolved = resolveTheme(preference);
  const root = document.documentElement;

  root.dataset.theme = resolved;
  root.dataset.themePreference = preference;
  root.classList.remove("light", "dark");
  root.classList.add(resolved);
  localStorage.setItem(storageKey, preference);
}

declare global {
  interface Window {
    __setTheme?: (theme: ThemePreference) => void;
  }
}

export function ThemeToggle() {
  const [preference, setPreference] = useState<ThemePreference>(getStoredPreference);

  useEffect(() => {
    persistTheme(preference);
  }, [preference]);

  useEffect(() => {
    window.__setTheme = setPreference;

    const media = window.matchMedia("(prefers-color-scheme: light)");
    const handleSystemChange = () => {
      if (getStoredPreference() === "system") {
        persistTheme("system");
      }
    };

    media.addEventListener("change", handleSystemChange);

    return () => {
      media.removeEventListener("change", handleSystemChange);
      delete window.__setTheme;
    };
  }, []);

  return (
    <div
      className="inline-flex rounded-[var(--pa-radius-control)] border border-[var(--pa-border)] bg-[color-mix(in_srgb,var(--pa-surface)_82%,transparent)] p-1 shadow-[var(--pa-shadow-card)]"
      role="group"
      aria-label="Theme preference"
    >
      {preferences.map((item) => {
        const Icon = item.icon;
        const isActive = preference === item.value;

        return (
          <Button
            key={item.value}
            type="button"
            variant={isActive ? "secondary" : "ghost"}
            size="sm"
            aria-pressed={isActive}
            aria-label={`${item.label} theme`}
            className={cn("h-8 px-2.5", isActive && "text-[var(--pa-foreground)]")}
            onClick={() => {
              setPreference(item.value);
            }}
          >
            <Icon className="size-4" aria-hidden="true" />
            <span className="sr-only sm:not-sr-only sm:text-xs">{item.label}</span>
          </Button>
        );
      })}
    </div>
  );
}
