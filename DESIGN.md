---
name: Academic Professionalism
colors:
  surface: "#fff7fd"
  surface-dim: "#e3d6e5"
  surface-bright: "#fff7fd"
  surface-container-lowest: "#ffffff"
  surface-container-low: "#fdefff"
  surface-container: "#f7eaf9"
  surface-container-high: "#f1e4f3"
  surface-container-highest: "#ebdeee"
  on-surface: "#201924"
  on-surface-variant: "#4e4354"
  inverse-surface: "#352e39"
  inverse-on-surface: "#faedfc"
  outline: "#807386"
  outline-variant: "#d1c1d7"
  surface-tint: "#8e10db"
  primary: "#8900d4"
  on-primary: "#ffffff"
  primary-container: "#a435f0"
  on-primary-container: "#fff5fe"
  inverse-primary: "#e2b6ff"
  secondary: "#5d5e61"
  on-secondary: "#ffffff"
  secondary-container: "#e2e2e5"
  on-secondary-container: "#636467"
  tertiary: "#7f4f00"
  on-tertiary: "#ffffff"
  tertiary-container: "#a06500"
  on-tertiary-container: "#fff7f1"
  error: "#ba1a1a"
  on-error: "#ffffff"
  error-container: "#ffdad6"
  on-error-container: "#93000a"
  primary-fixed: "#f3daff"
  primary-fixed-dim: "#e2b6ff"
  on-primary-fixed: "#2f004d"
  on-primary-fixed-variant: "#6d00ab"
  secondary-fixed: "#e2e2e5"
  secondary-fixed-dim: "#c6c6c9"
  on-secondary-fixed: "#1a1c1e"
  on-secondary-fixed-variant: "#454749"
  tertiary-fixed: "#ffddb8"
  tertiary-fixed-dim: "#ffb95f"
  on-tertiary-fixed: "#2a1700"
  on-tertiary-fixed-variant: "#653e00"
  background: "#fff7fd"
  on-background: "#201924"
  surface-variant: "#ebdeee"
typography:
  display-lg:
    fontFamily: Public Sans
    fontSize: 48px
    fontWeight: "700"
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Public Sans
    fontSize: 32px
    fontWeight: "700"
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Public Sans
    fontSize: 24px
    fontWeight: "700"
    lineHeight: 32px
  headline-sm:
    fontFamily: Public Sans
    fontSize: 19px
    fontWeight: "700"
    lineHeight: 24px
  body-lg:
    fontFamily: Public Sans
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 24px
  body-md:
    fontFamily: Public Sans
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 20px
  label-lg:
    fontFamily: Public Sans
    fontSize: 14px
    fontWeight: "700"
    lineHeight: 16px
  label-sm:
    fontFamily: Public Sans
    fontSize: 12px
    fontWeight: "700"
    lineHeight: 14px
  headline-lg-mobile:
    fontFamily: Public Sans
    fontSize: 28px
    fontWeight: "700"
    lineHeight: 36px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  container-max: 1340px
  gutter: 24px
---

## Brand & Style

This design system is built on the pillars of **Academic Excellence, Professional Trust, and Functional Clarity.** It is designed for adult learners and professionals who value efficiency and institutional reliability over decorative trends.

The aesthetic follows a **Corporate Minimalism** style. It prioritizes content density and legibility through high-contrast interfaces, generous whitespace to reduce cognitive load, and a rigorous structural grid. The emotional response should be one of "serious intent"—the UI disappears to let the educational content lead, providing a workspace that feels stable, authoritative, and focused.

## Colors

The palette is dominated by **Deep Indigo** as the primary action color, signifying creativity and modern education. **Dark Slate** serves as the primary ink for text and structural secondary elements, ensuring maximum contrast and accessibility.

- **Primary (#a435f0):** Reserved for primary calls to action, active states, and brand-critical highlights.
- **Secondary/Text (#2d2f31):** Used for all primary body text, headings, and dark-themed components like headers or footers.
- **Neutral/Borders (#d1d7dc):** Used for structural containment. Thin, crisp lines separate modules without adding visual weight.
- **Background (#ffffff):** The canvas remains pure white to maintain an "academic paper" feel, while **#f7f9fa** is used for secondary surface tiers to distinguish between content sections.

## Typography

**Public Sans** is utilized across all levels for its institutional clarity and neutral tone. It provides excellent legibility at small sizes (labels/captions) while remaining authoritative in large, bold headings.

- **Headings:** Always use `fontWeight: 700`. Large headings use slight negative letter-spacing to feel more cohesive and professional.
- **Body:** Standard body text is 16px to ensure accessibility for long-form reading. 14px is used for secondary metadata or sidebars.
- **Hierarchy:** Use color (Dark Slate vs. Medium Gray) in tandem with font weight to create clear information hierarchies.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy for desktop to maintain optimal line lengths for reading.

- **Grid:** 12-column grid with a max-width of 1340px.
- **Rhythm:** An 8px base unit drives all padding and margins.
- **Desktop:** 24px gutters and 48px page margins.
- **Tablet:** 16px gutters and 24px page margins.
- **Mobile:** 16px margins, fluid 1-column layout.
- **Alignment:** Consistent left-alignment is mandatory for all text-heavy content to aid the scanning patterns of students.

## Elevation & Depth

This design system avoids heavy shadows and complex gradients, favoring **Flat Tonal Layers** and **Low-Contrast Outlines**.

- **Level 0:** Main page background (#ffffff).
- **Level 1:** Secondary content areas or "cards" using a 1px solid border (#d1d7dc). No shadow.
- **Interactive:** Hover states on cards may use a very subtle, tight ambient shadow (4px blur, 0.05 opacity) to indicate interactivity without breaking the flat aesthetic.
- **Overlays:** Modals and dropdowns use a sharp 1px border with a medium-diffusion shadow to distinguish them from the page surface.

## Shapes

To reinforce the professional and academic tone, this design system uses **Sharp (0px)** corners for almost all structural elements, including buttons, input fields, and cards.

This lack of rounding creates a "precision-engineered" look that mirrors traditional textbook layouts and high-end professional software. Avoid any rounded or organic shapes unless they are inherently circular (like avatars or radio buttons).

## Components

- **Buttons:** Sharp corners. Primary buttons use Deep Indigo background with white text. Secondary buttons use Dark Slate borders and text. Height should be exactly 48px for primary actions to ensure a large hit target.
- **Input Fields:** 1px solid border (#2d2f31). Labels are always visible above the field in `label-lg` style. On focus, the border thickens to 2px Indigo.
- **Cards:** White background, 1px border (#d1d7dc), sharp corners. Content inside cards uses 16px or 24px padding.
- **Chips/Tags:** Used for course categories or filters. High-contrast background (Dark Slate) with white text, or light gray background with Dark Slate text. Sharp corners.
- **Lists:** Clean lines with 1px horizontal separators. Use `body-md` for list items with consistent 12px vertical padding.
- **Progress Bars:** Essential for learning. Use Deep Indigo for the fill and a light neutral (#f7f9fa) for the track. No rounding on the bar ends.
- **Video Player:** Dark Slate container (#2d2f31) to minimize distraction, with Indigo used for the playhead and active controls.
