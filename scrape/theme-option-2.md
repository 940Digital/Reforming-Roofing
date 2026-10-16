# Theme v2 (locked)

## The audience angle
Version 1 spoke to the visitor in crisis: a leak, a storm, a bad experience with a pushy roofer. It answered with a loud, blunt poster.

Version 2 speaks to the same people at a different moment: **the careful household making a considered decision about the biggest thing over their heads.** These are the faith-minded families the brief describes. They research, compare and read reviews. They ask their church group who they used, and they care who is actually standing on their roof. They are not in a panic. They are deciding whom to trust. What persuades them is calm, care and evidence. Noise does not.

So the page should feel like a well-made object: quiet, spacious, plain, built with care. One idea at a time, with room around it.

## Tradition: Shaker design (American, roughly 1780 to 1900)
The Shakers were a Christian community whose furniture and buildings are still the reference point for honest American craftsmanship: plain forms, nothing ornamental, every joint done properly because the work itself was an act of faith. It fits this company for three reasons.

1. **Faith expressed through the quality of the work.** That is the brand line ("Reforming roofs. Reflecting Christ.") made visible, without a single cross or verse used as decoration.
2. **Craft over show.** Owners on every job, plain-English explanations and a warranty are Shaker values. The design proves it by restraint.
3. **Space.** Shaker rooms are mostly empty wall with a peg rail. This answers the "too crowded" note on version 1 directly.

## Palette (the old site's colors lead, used sparingly)
- Cream #FFFDF2: the main ground, used across most of the page
- Paper #F3EEDF: second ground for alternating sections (added neutral)
- Navy #042D58: headings and body text, plus one deep section (the team)
- Red #B42335: primary buttons and the small peg markers only. Nothing else is red.
- Blue #095798: text links and the hover state
- Rule #042D58 at 15 percent opacity: hairlines (added tint)

## Type
- Headings: Libre Caslon Text. Caslon was the type of 18th and 19th century American printing, the Shakers' own era.
- Body: Rubik, carried over from the old site.
- Sentence case everywhere. No all-caps headlines. Small caps with wide tracking for eyebrows only.

## Shape language: three recurrences outside the hero
1. **Peg rail divider.** A thin horizontal rule with small round pegs spaced along it, between major sections.
2. **Peg marker.** A small red circle before every eyebrow label.
3. **Plain frames.** Photos sit in simple rectangles with a hairline inset border. No rounded corners, no cut corners, no shadows.

## Motion (slow, measured, like joinery)
- Every section: fade in with a 16px rise over 0.9s, `whileInView` with `viewport={{ once: false }}`.
- Peg rail rules draw left to right (scaleX) as they enter.
- Hero, the one with a little more flair: the drone video plays behind a calm overlay, the eyebrow rule draws in, then the H1 and the rest fade up in sequence.
- No wipes, no slants, no bounce. `prefers-reduced-motion` gets a still photo and no transforms.

## Density rules (what makes it uncrowded)
- One idea per section. Generous vertical space (at least 7rem between sections on desktop).
- Body text max width about 60 characters.
- The hero carries the H1, one sentence and two buttons. No trust strip.
- Services as a plain two-column list with hairlines in place of eight boxed cards.
- The navy duotone banners from the old site are left out on purpose (see the asset inventory).

Locked. No drift.
