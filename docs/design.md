---
name: Precision CRM & Pipeline Engine
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45464d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#0058be'
  on-secondary: '#ffffff'
  secondary-container: '#2170e4'
  on-secondary-container: '#fefcff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#002113'
  on-tertiary-container: '#009668'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.015em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.005em
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: -0.005em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
  mono-data:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: -0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system embodies a utility-focused, high-velocity aesthetic tailored for sales leads, account executives, and modern operators who prioritize speed, density control, and clarity. Drawing inspiration from keyboard-first developer tools and modern workspace software, it pairs ruthless functional minimalism with refined micro-surfaces.

The visual direction centers on quiet neutral slate foundations, hairline borders, and purposeful, vibrant semantic accents. It eliminates extraneous decorative gradients and loud surfaces in favor of rapid scanning, calm legibility, and effortless data ingestion. The interface inspires confidence, discipline, and flow.

## Colors

The system uses a neutral slate canvas structure overlaid with calibrated semantic state colors:

- **Canvas & Surface System:** 
  - Main background: `#F8FAFC`
  - Elevated surfaces & table cards: `#FFFFFF`
  - Subtle borders & row dividers: `#E2E8F0`
  - Hover states and muted fills: `#F1F5F9`

- **Core Roles:**
  - Primary (`#0F172A`): Deep slate for dominant actions, primary text, high-emphasis icons, and structural focus.
  - Secondary (`#3B82F6`): Precision royal blue used for active pipelines, interactive link elements, selection indicators, and "Contacted / In Progress" statuses.
  - Tertiary (`#10B981`): Balanced emerald reserved for "Completed / Converted" achievements, healthy metrics, and confirmation actions.
  - Neutral (`#64748B`): Slate gray for secondary typography, metadata labels, trailing icons, and deactivated states.

- **Semantic Alert Accents:**
  - Amber (`#F59E0B`): "Pending / Follow-up Needed" notices, impending deadlines, and caution tags.
  - Rose (`#EF4444`): "Overdue" follow-ups, blockers, and destructive actions.

## Typography

The typography relies on Inter for optimal render crispness at low pixel densities and high tabular scanning speeds. JetBrains Mono is designated strictly for tabular financial values, contact timestamps, and pipeline counts.

Heading weights remain restrained at `600` to prevent visual fatigue on data-dense screens. Negative tracking is applied on all sizes 16px and higher to preserve tight editorial clarity. All small labels, table column headers, and status pills utilize uppercase or medium-weight tracking to maximize horizontal scanning accuracy.

## Layout & Spacing

The layout is built for fluid desktop operations utilizing a persistent multi-tier canvas:

- **Sidebar Panel:** Fixed-width 240px navigation shell, collapsible to 64px icon rail.
- **Main Canvas:** Dynamic fluid area expanding with the display, utilizing outer canvas margins of 32px (`margin: 2rem`) to frame data sets.
- **Data Grids & Kanban Boards:** A modular 12-column dynamic grid using 16px gutters (`gutter: 1rem`). In card/board views, columns maintain equal width with horizontal overflow auto-scroll.
- **Density Control:** Table and list items adhere to strict row heights: Compact (36px), Standard (44px), and Spacious (56px). Internal component spacing adheres strictly to the 4px baseline scale (`0.25rem`, `0.5rem`, `1rem`, `1.5rem`, `2.5rem`).

## Elevation & Depth

This design system eschews multi-layered drop shadows in favor of flat structural elevation via hairline boundaries, surface-tone shifts, and directional micro-shadows:

- **Level 0 (App Canvas):** Flat `#F8FAFC`. Zero elevation.
- **Level 1 (Cards, Rows, Inset Panes):** Flat pure white `#FFFFFF` bounded by a 1px solid `#E2E8F0` hairline border. No ambient blur.
- **Level 2 (Hover States, Quick Popovers, Dropdowns):** `#FFFFFF` paired with an ultra-light ambient shadow: `0 4px 6px -1px rgba(15, 23, 42, 0.05), 0 2px 4px -2px rgba(15, 23, 42, 0.05)` and a `#E2E8F0` border.
- **Level 3 (Modal Dialogs, Slide-over Lead Dossiers):** Pure white container with a crisp border, lifted by `0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)` over a 20% opacity neutral slate `#0F172A` backdrop blur.

## Shapes

The design system maintains a refined, architectural "Soft" radius profile (`roundedness: 1`):

- **Inputs, Buttons, Badges, Table Rows:** `0.375rem` (6px) or `0.25rem` (4px). Clean, precise corners that avoid casual pill curves and preserve visual alignment with tabular grid lines.
- **Cards & Data Modules:** `0.5rem` (8px) boundary rounding to frame groups cleanly without disconnecting them from surrounding content.
- **Modal Overlays & Quick-View Flyouts:** `0.75rem` (12px) maximum.
- **Status Indicators:** Micro-dots remain full circles (`rounded-full`), while status badges utilize the standard `0.25rem` soft rectangle.

## Components

### Buttons
- **Primary:** Solid `#0F172A` with `#FFFFFF` text. Minimal `1px` border ring for depth. Interactive hover: `#1E293B`.
- **Secondary / Outline:** Background `#FFFFFF`, border `1px solid #E2E8F0`, text `#0F172A`. Hover: `#F8FAFC`.
- **Ghost / Action:** Transparent background, text `#64748B`. Hover: `#F1F5F9` background and `#0F172A` text.
- **Destructive:** Border and background soft crimson wash `#FEF2F2`, text `#EF4444`. Hover: `#FEE2E2`.

### Status Badges & Chips
- Designed as low-contrast tint backgrounds paired with high-contrast text and a 6px status dot:
  - **Pending / Follow-up:** Background `#FEF3C7`, text `#B45309`, border `#FDE68A`.
  - **In Progress / Contacted:** Background `#EFF6FF`, text `#1D4ED8`, border `#DBEAFE`.
  - **Completed / Converted:** Background `#ECFDF5`, text `#047857`, border `#A7F3D0`.
  - **Overdue / Alert:** Background `#FEF2F2`, text `#B91C1C`, border `#FECACA`.

### Data Tables & Follow-up Lists
- **Table Headers:** `11px` uppercase (`label-sm`), text `#64748B`, tracking `0.04em`, bottom border `1px solid #E2E8F0`, zero background change.
- **Rows:** Alternating hover highlight using `#F8FAFC`. Active inline row border is indicated by a 2px vertical accent bar in `#3B82F6` on the leading cell edge.
- **Separators:** Single horizontal hairline dividers (`#E2E8F0`). No vertical column gridlines.

### Input Fields & Search Bars
- Background `#FFFFFF`, border `1px solid #E2E8F0`, radius `6px`.
- Typography: `14px` (`body-md`), placeholder text `#94A3B8`.
- Focus state: `1px solid #3B82F6` with an additional `3px` focus ring tinted `#3B82F6` at `15%` opacity. Keyboard shortcut badge (e.g., `⌘K`) rendered inline with `10px` mono styling on `#F1F5F9`.

### Form Modals & Flyout Panels
- **Header:** Sticky header with contact/account identifier, quick status switch, and close action.
- **Content:** Divided into fieldsets separated by `#F1F5F9` divider strips with consistent label-above-input alignment and explicit inline validation messaging.