# Design System

## Tokens

`packages/design-system/src/tokens.ts` defines dark and light command-center tokens for background, foreground, surfaces, borders, muted text, and accent colors. `theme.css` exposes those values as CSS custom properties and Tailwind theme variables.

Cards use an 8px radius. Controls use a 6px radius.

## Components

Current primitives:

- `Button`: primary, secondary, and ghost variants with standard sizes.
- `Badge`: neutral, cyan, green, amber, and coral tones.
- `Card`, `CardHeader`, `CardTitle`, `CardContent`: operational content containers.

The web app uses lucide icons in navigation and compact controls.

## Tailwind

The web app uses Tailwind CSS v4 through `@tailwindcss/postcss`. `apps/web/app/globals.css` imports the design-system theme and declares source paths for the app and shared UI package.

## Product UI Direction

This is an operational tool, not a marketing site. Screens should stay dense, scannable, and restrained. Use cards for repeated items and dashboards, keep page headers unframed, and avoid decorative-only visuals.
