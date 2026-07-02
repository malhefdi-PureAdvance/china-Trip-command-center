"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

/**
 * Debounced search box that syncs `q` into the URL so the (server-rendered)
 * target list filters without shipping the dossier data to the client.
 */
export function TargetSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initial = searchParams.get("q") ?? "";
  const [value, setValue] = useState(initial);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  function apply(next: string) {
    const params = new URLSearchParams(
      typeof window === "undefined" ? searchParams.toString() : window.location.search
    );
    if (next.trim()) {
      params.set("q", next.trim());
    } else {
      params.delete("q");
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function onChange(next: string) {
    setValue(next);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      timer.current = null;
      apply(next);
    }, 250);
  }

  return (
    <div className="relative mb-2">
      <Search
        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--cc-text-faint)]"
        aria-hidden="true"
      />
      <input
        type="search"
        inputMode="search"
        enterKeyHint="search"
        aria-label="Search targets"
        placeholder="Search company, area, sector…"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-[var(--cc-r-row)] border border-[var(--cc-border)] bg-[var(--cc-surface-inset)] pl-10 pr-10 text-[13px] text-[var(--cc-text)] outline-none placeholder:text-[var(--cc-text-dim)] focus:border-[var(--cc-cyan-line)] [&::-webkit-search-cancel-button]:hidden"
      />
      {value ? (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => {
            setValue("");
            if (timer.current) {
              clearTimeout(timer.current);
              timer.current = null;
            }
            apply("");
          }}
          className="absolute right-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-[var(--cc-text-faint)] active:translate-y-[calc(-50%+1px)]"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
}
