# Design System

## Token source of truth

`packages/design-system/src/tokens.ts` defines the Pure Advance command-center token set. `packages/design-system/src/theme.css` exposes those values as CSS custom properties and Tailwind theme variables.

The current foundation uses Pure Advance brand anchors:

| Token role   | Value     |
| ------------ | --------- |
| Midnight     | `#140126` |
| Royal purple | `#7A36D9` |
| Violet       | `#8C37E0` |

The web app consumes semantic CSS variables such as `--pa-background`, `--pa-foreground`, `--pa-surface`, `--pa-primary`, `--pa-border`, and status accents. Product code should use semantic variables, not raw hex values.

## Themes

The app supports three user preferences:

- `light`
- `dark`
- `system`

`system` resolves to a concrete `data-theme="light"` or `data-theme="dark"` value using `prefers-color-scheme`. The resolved theme and preference are stored on the `<html>` element:

```html
<html data-theme="dark" data-theme-preference="system"></html>
```

The client theme control persists the preference in `localStorage` under `pa-command-theme` and exposes `window.__setTheme()` for Playwright token regression tests.

## Shape and density

Cards use an 18px radius. Controls use a 14px radius. Mobile screens should remain dense and scannable: use restrained shadows, clear borders, and avoid large decorative blocks unless they communicate operational status.

## Components

Current primitives:

- `Button`: primary, secondary, and ghost variants with standard sizes.
- `Badge`: neutral, cyan, green, amber, and coral tones with subtle filled backgrounds.
- `Card`, `CardHeader`, `CardTitle`, `CardContent`: operational content containers.

The web app uses lucide icons in navigation and compact controls.

## Tailwind

The web app uses Tailwind CSS v4 through `@tailwindcss/postcss`. `apps/web/app/globals.css` imports the design-system theme and declares source paths for the app and shared UI package.

## Verification

Design-system changes should include:

- token assertions for light and dark modes,
- a `system` preference assertion,
- mobile viewport overflow checks,
- navigation clickability checks.

Current e2e coverage lives in `apps/web/e2e/theme.spec.ts`.

## Product UI Direction

This is an operational tool, not a marketing site. Screens should stay dense, scannable, and restrained. Use cards for repeated items and dashboards, keep page headers unframed, and avoid decorative-only visuals.
