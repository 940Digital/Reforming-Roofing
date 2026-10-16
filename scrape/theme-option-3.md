# Theme: Option 3 (locked)

## Audience angle
The Denton or Collin County homeowner after a hailstorm. The roof might be damaged, the insurance process is unclear, and crews they have never heard of are knocking on the door. They want plain answers and a contractor who will still be local when the warranty matters.

The copy works whether or not Roofing Reformation handles insurance claims. It never says they file, negotiate or manage claims, and it never quotes outcomes. The homeowner calls their own insurer, and the policy and adjuster decide coverage.

## Tradition: NPS Unigrid (Massimo Vignelli, 1977)
The National Park Service brochure system: a solid title band across the top, a strict modular grid, plain sans-serif type, and maps and diagrams treated as main content.

It fits because:
- It is information design built to help people decide and act, which is what a post-storm homeowner needs.
- It reads as civic and dependable, which suits a veteran-owned company without flags or eagles.
- The disciplined grid holds more than Option 2 without Option 1's crowding.

## Palette (old site colors lead)
- Navy #042D58: title bands (Unigrid's black band), footer
- Red #B42335: primary buttons, numbered markers, map city markers
- Blue #095798: links, county outlines on the map
- Cream #FFFDF2: page ground
- White #FFFFFF: modules
- Rule #D9D4C7: module hairlines (added warm grey)

## Type
Public Sans (the US Web Design System typeface), used for everything. Headings are bold with tight leading, in sentence case. The logo is the only display flourish.

## Recurring motifs (outside the hero)
1. **Title band.** Each major section opens with a navy band carrying its label and number, like a Unigrid panel head.
2. **Module grid.** Content sits in white modules separated by 1px warm-grey rules (gap-px on a rule-colored grid).
3. **Numbered red markers.** Round red markers with white numerals for steps, map cities and list keys.

## Motion
- Modules unfold: fade plus a 20px rise, 0.6s, staggered across a row. `whileInView`, `viewport={{ once: false }}`.
- Map: county outlines draw (pathLength), then city markers pop in one by one.
- Hero (the one with extra flair): band text staggers in, then the video module opens upward from its baseline.
- `prefers-reduced-motion`: no transforms, and a still photo in place of the hero video.

Locked.
