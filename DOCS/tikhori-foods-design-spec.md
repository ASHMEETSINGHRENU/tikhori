# Tikhori Foods — Website Design Specification

**Brand:** Tikhori Foods
**Tagline:** "Spice Crafted Right"
**Reference layout:** Comptoir Libanais homepage (structure/rhythm only — palette and type replaced per brand)
**Doc purpose:** Single source of truth for design/dev handoff

---

## 1. Brand Foundation

### 1.1 Logo
- Circular badge lockup: scalloped/sunburst yellow ring, deep green disc, cream wordmark, illustrated red mustache + green chili icon above the wordmark, cream tagline beneath in small caps.
- Logo should always sit on a color it contrasts against — deep green backgrounds or cream backgrounds work best. Avoid placing on red or busy photography without a solid-color plate behind it.
- Maintain clear space around the logo equal to the width of the scalloped ring's points on all sides.

### 1.2 Brand Personality
Warm, handcrafted, confident, a little playful. Rooted in authentic spice-making tradition but presented with energy — not a sterile "premium foods" look. Think: market stall meets modern e-commerce.

---

## 2. Color Palette

| Role | Name | Hex (approx) | Usage |
|---|---|---|---|
| Primary | Forest Green | `#1B4D2E` | Dominant block backgrounds, primary text on cream, footer |
| Secondary | Golden Yellow | `#F2C230` | Accent blocks, scalloped shapes, eyebrow labels, badges |
| Accent | Chili Red | `#D6301F` | CTA buttons, icon accents, small high-energy pops |
| Base | Cream | `#FDF6E9` | Hero background, body sections, text-on-green |
| Support | Deep Brown/Near-Black | `#2B1D14` | Body copy on cream/yellow where green is too low-contrast |

**Usage rule:** No more than 3 colors visible in any single section (one dominant background + one text color + one accent). Red is reserved for CTAs and icon details only — never as a large background field, so it retains urgency/pop.

**Contrast checks required:**
- Cream text on Forest Green: pass (AA)
- Deep Brown text on Golden Yellow: pass (AA)
- White/Cream text on Chili Red: pass (AA) — safe for buttons
- Never set body copy in Golden Yellow on Cream (fails contrast)

---

## 3. Typography

| Role | Treatment | Notes |
|---|---|---|
| Logo wordmark | Hand-lettered script (as in logo) | Logo use only — never for headlines or body |
| Display headlines (H1/H2) | Bold, rustic slab-serif or chunky sans | Large scale, tight leading. Mix weights within one headline for personality (e.g., one word bolder or in red) |
| Section eyebrows | Small caps, wide letter-spacing (0.15em+), light/medium weight | Matches "SPICE CRAFTED RIGHT" tagline styling. Always used to label a section before its headline |
| Body copy | Clean sans-serif, regular weight, smaller scale | Supporting role — never competes with headline for attention |
| Buttons/CTAs | Bold, all-caps, short (2–4 words) | Tight letter-spacing |

**Suggested pairing (web-safe/Google Fonts equivalents):**
- Headlines: *Fraunces* or *Bitter* (rustic slab-serif energy)
- Eyebrow/UI labels: *Work Sans* or *Inter*, uppercase, tracked out
- Body: *Inter* or *Karla*, regular weight

---

## 4. Motifs & Iconography

- **Scalloped/sunburst shape** — reuse as: photo badge frames, "featured product" stickers, section dividers, button background shape (optional).
- **Mustache + chili icon** — use as a recurring small illustrated mark: bullet points, section dividers, near CTAs, loading states, email signup icon.
- **Circular stamp badges** — for origin stories, certifications ("100% Natural," "Small Batch"), or spotlighting a product/region — echoes the logo's own circular badge format.
- **Optional pattern strip** — a repeating chili-pepper or spice-jar motif in green/yellow/red as a thin decorative divider between major sections (parallel to Comptoir's tile-pattern strip).

Avoid literal Middle Eastern/Lebanese tile patterns from the reference site — replace with a Tikhori-specific pattern (chili, spice jar, or mustache-derived repeat) to keep the identity distinct.

---

## 5. Page Structure (Homepage)

Full-bleed, alternating color-block sections — no card grids, no subtle gray dividers. Each section is a confident single-color statement.

### Section 1 — Hero
- **Background:** Cream
- **Content:** Logo/wordmark prominent, bold headline (e.g., "Spice Crafted Right" or a founder-story hook line, styled like Comptoir's "FOOD SHARED IS A MEMORY MADE"), nav bar (Shop / Our Story / Recipes / Contact), primary CTA button in Chili Red
- **Imagery:** Hand-illustrated spice/chili elements bleeding off corners (echoing Comptoir's pomegranate/rose illustrations, using chili peppers, mustard seeds, spice pods instead)

### Section 2 — Origin Story
- **Background:** Forest Green, full-bleed
- **Content:** Yellow eyebrow label (e.g., "WHERE IT ALL STARTED"), large cream headline, short supporting body copy, Chili Red or Golden Yellow CTA button ("Discover Our Story")
- **Imagery:** Split layout — founder/archival photography on a patterned plate (spice-motif pattern background), circular scalloped badge overlaying photo (e.g., region/origin callout, mirroring "TIZI OUZOU IN LONDON")

### Section 3 — Product Showcase
- **Background:** Golden Yellow
- **Content:** Eyebrow label ("OUR SPICES"), bold green headline, Chili Red CTA ("Shop the Range")
- **Imagery:** Full-bleed product/food photography (spice blends, dishes made with them) opposite the text block

### Section 4 — Stockist / Where to Buy
- **Background:** Cream
- **Content:** "Find Tikhori Near You" — postcode/location search input, "Use My Location" + "View All" links
- **Imagery:** Small product photo card with a scalloped badge callout (e.g., a promo like Comptoir's "50% plant-based" badge — for Tikhori could be "Small-Batch Ground Fresh" or similar)

### Section 5 — Loyalty / Newsletter Perks
- **Split block:** Green (left) + Golden Yellow (right), or Green + Chili Red
- **Content:** "Join the Spice Club" style headline, CTA button, brief perks copy

### Section 6 — Decorative Divider
- Thin full-width strip using the custom spice/chili repeat pattern in green/yellow/red

### Section 7 — Newsletter Signup
- **Background:** Forest Green or Chili Red bar
- **Content:** Short headline + email input + submit button (icon or arrow, Golden Yellow accent)

### Section 8 — Footer
- **Background:** Cream
- **Content:** Logo lockup, link columns (Shop, Our Story, Recipes, Careers, Contact), social icons, legal line
- **Text color:** Forest Green

---

## 6. Buttons & CTAs

| State | Style |
|---|---|
| Primary | Chili Red background, Cream all-caps text, fully rounded or pill shape |
| Secondary | Golden Yellow background, Deep Brown/Green text |
| On dark (green) sections | Golden Yellow or Cream button preferred over red, for contrast and hierarchy |
| Hover | Slight darken (10%) of background color, no color-family jump |

Buttons are always short, punchy, action-first: "Shop Now," "Discover Our Story," "Find a Stockist," "Join the Club."

---

## 7. Imagery Guidelines

- Mix of real food/product photography and hand-illustrated botanical/spice elements (chilies, mustard seed pods, garlic, spice mounds) bleeding off section edges.
- Archival or founder photography (if available) should get the vintage scrapbook treatment: slight rotation, layered on a patterned plate, framed with a circular scalloped badge.
- No stock-generic "spice" photography — imagery should feel specific to Tikhori's actual products where possible.

---

## 8. Spacing & Layout Principles

- Sections are full-bleed and full-width; no contained "card" layouts within a section.
- Generous vertical padding per section (treat each block as its own "page").
- Headlines get significant negative space around them — don't crowd with body copy.
- Illustrated elements are allowed to break the section's bounding box (bleed off edges/corners) for visual energy.

---

## 9. Accessibility Notes

- Verify all text/background combinations against WCAG AA before finalizing (see palette table above for pre-checked safe pairs).
- Ensure the scalloped/decorative shapes never obscure or reduce legibility of overlaid text.
- Provide alt text for all illustrated/decorative elements describing their brand purpose where they carry meaning (e.g., origin badges).

---

## 10. What NOT to Carry Over from Reference Site

- Comptoir's Middle Eastern tile patterns — replace with Tikhori-original spice/chili pattern.
- Comptoir's maroon/orange palette — fully replaced per Section 2.
- Any Comptoir-specific copy, product names, or imagery.

---

## 11. Open Items for Client Input

- [ ] Confirm final hex values against original logo file (color-pick directly from source artwork for pixel-accurate match)
- [ ] Confirm headline font license/selection
- [ ] Source or commission founder/origin photography
- [ ] Define custom pattern motif (chili repeat vs. spice-jar repeat vs. mustache-derived repeat)
- [ ] Confirm product photography availability for showcase section
