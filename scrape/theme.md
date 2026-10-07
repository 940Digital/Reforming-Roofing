# Theme (locked)

## Tradition: WPA / Federal Art Project poster, 1935 to 1943
Flat fields of saturated color, big condensed capitals, diagonal compositions, plain declarative lines, honest labor as the subject. The tradition fits for four reasons.
1. The audience is homeowners who want someone straightforward and who distrust polish. Poster design says its piece in one glance.
2. The company is veteran-owned and the owners are on every job. The WPA look reads as civic, American, earned.
3. The old site already ships this vocabulary: red, white and blue, Anton capitals, and a diagonal red/blue corner cut on every banner. We keep it and put it in better places.
4. The brand mark is a Luther rose and the company is named Roofing Reformation. A single heraldic ornament sits comfortably inside a mostly flat, blunt layout.

## Palette (old site leads)
- Navy #042D58: dark sections, hero overlay, footer
- Red #B42335: primary CTA, markers, the single loud accent
- Blue #095798: secondary accent, links on light, diagonal counterpart to red
- Cream #FFFDF2: page ground (the old site's own cream)
- Paper #F3EEDF: second light ground for alternating sections (added neutral)
- Ink #1A1A1A: text on light
- Pale blue #E5F0FE: tint for cards on cream

Red appears only on: primary buttons, eyebrow markers, the corner cut, key numerals. Blue carries secondary links and rules. Navy carries weight.

## Type
Anton for headings, eyebrows and numerals. Rubik for body. Both come from the old site.

## Shape language: three recurrences outside the hero
1. Eyebrow marker. A small red parallelogram (a shingle course) before every section eyebrow.
2. Diagonal corner cut. Cards and photo frames lose their top-left corner to a diagonal cut, echoing the old banners.
3. Section seams. Every dark/light boundary is a slanted edge (clip-path polygon), never a flat horizontal.
Bonus: the Luther rose ornament between the review and service-area blocks and in the footer.

## Motion tradition
Poster printing. Elements enter by a flat wipe (clip-path slide along the diagonal) or a short rise, like ink plates registering. No bounce, no spring overshoot. Hero gets one extra: a slow push-in on the photo and a staggered wipe on the H1 lines. Everything else uses one shared reveal (fade plus 24px rise, 0.6s ease-out) with `whileInView` and `viewport={{ once: false }}`. `prefers-reduced-motion` disables transforms.

Locked. No drift.
