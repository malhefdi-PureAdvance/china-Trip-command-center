import type { MetadataRoute } from "next";

// Public web-app manifest — static, demo-safe metadata only. No private data.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "China 2026 Command Center",
    short_name: "China 2026",
    description:
      "Demo-safe mission command center for the Hong Kong / Shenzhen Greater Bay Area corridor.",
    id: "/",
    start_url: "/today",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0d1016",
    theme_color: "#0d1016",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      }
    ]
  };
}
