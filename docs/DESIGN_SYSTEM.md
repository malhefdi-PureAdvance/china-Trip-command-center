# Design System

## Source of truth

The command center uses the latest Pure Advance handoff provided at:

```text
/home/malhefdi/repos/Product requirements document/design_handoff_china_2026_companion
```

Primary token source files:

```text
_ds/pure-advance-design-system-788e773b-e340-4afc-9adb-499f73f5eb2f/tokens/colors.css
_ds/pure-advance-design-system-788e773b-e340-4afc-9adb-499f73f5eb2f/tokens/typography.css
_ds/pure-advance-design-system-788e773b-e340-4afc-9adb-499f73f5eb2f/tokens/layout.css
_ds/pure-advance-design-system-788e773b-e340-4afc-9adb-499f73f5eb2f/css/components.css
```

The production app vendors those token values into `packages/design-system/src/theme.css` and `packages/design-system/src/tokens.ts`. App code should consume semantic `--cc-*` variables, not raw hex values.

## Visual principles

1. Neutral charcoal or warm-paper ground, with cyan/teal as the hard-working accent.
2. Purple is brand secondary, not the primary working color.
3. Mono for all data: times, codes, IDs, dates, labels, eyebrows.
4. Exactly one glow per view: the active node only.
5. Elevation is a restrained tokenized system, not loud shadows or frosted glass.
6. Motion is calm: `cubic-bezier(.4,0,.2,1)`, 120-200 ms.

## Core colors

| Role              |      Dark |     Light |
| ----------------- | --------: | --------: |
| Screen background | `#0d1016` | `#f4efe4` |
| Card surface      | `#161b23` | `#ffffff` |
| Inset surface     | `#0e1219` | `#efeae0` |
| Primary text      | `#eef2f7` | `#231f17` |
| Body text         | `#c4ccd6` | `#4b443a` |
| Primary accent    | `#2dd4e8` | `#0b6e80` |
| Brand purple      | `#9a5cff` | `#7A36D9` |
| Green status      | `#22c98f` | `#0a7d4f` |
| Amber status      | `#e8a13a` | `#d98a14` |

## Typography

- Sans: `Montserrat`, then system fallbacks.
- Mono: `Geist Mono`, then system mono fallbacks.
- The source handoff imports Google Fonts for prototypes only. The app does not import runtime CDN fonts. A later offline/PWA pass should self-host `.woff2` assets if exact font rendering is required.

## Geometry

| Role        |  Radius |
| ----------- | ------: |
| Chip        |   `7px` |
| Icon square |  `10px` |
| Tile        |  `12px` |
| Row         |  `13px` |
| Card        |  `14px` |
| Screen      |  `36px` |
| Pill        | `999px` |

Spacing uses an 8px base plus 4px half-step. Screen padding is `18px`; default row gap is `11px`.

## Themes

The app supports three user preferences:

- `light`
- `dark`
- `system`

`system` resolves to a concrete `data-theme="light"` or `data-theme="dark"` value using `prefers-color-scheme`. The resolved theme and preference are stored on both `<html>` and `<body>`:

```html
<html data-theme="dark" data-theme-preference="system">
  <body data-theme="dark" data-theme-preference="system"></body>
</html>
```

The client theme control persists the preference in `localStorage` under `pa-command-theme` and exposes `window.__setTheme()` for Playwright token regression tests.

## Components

Current primitives:

- `Button`: primary, secondary, and ghost variants mapped to the handoff's `.cc-btn` treatment.
- `Badge`: neutral, cyan, green, amber, and caution aliases mapped to `.cc-chip` / `.cc-tag` semantics.
- `Card`, `CardHeader`, `CardTitle`, `CardContent`: card treatment mapped to `.cc-card`.

The web app uses Lucide line icons at 2px stroke, `currentColor`, consistent with the handoff.

## Verification

Design-system changes must include:

- token assertions for light and dark modes,
- a `system` preference assertion,
- mobile viewport overflow checks,
- navigation clickability checks.

Current e2e coverage lives in `apps/web/e2e/theme.spec.ts`.
