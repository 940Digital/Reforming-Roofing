# Option 3 plan: Roofing Reformation homepage

Status: **plan only.** Nothing is built or deployed until Owen approves.
Built as `/option-3` in the same repo, with a third tab added to the design-option switcher.

---

## 1. What Options 1 and 2 taught us

| | Option 1 (WPA poster) | Option 2 (Shaker) |
|---|---|---|
| Visitor it imagines | Stressed, burned by a pushy roofer | Calm family weighing a big decision |
| Strength | Unmistakably this brand. Red, white and blue, bold. | Room to breathe. Reads as careful and honest. |
| Weakness | Crowded and loud (Owen's note) | Quiet enough to be any company. Red and blue nearly disappear. |
| Gaps in both | No lead form (every "free inspection" button ends at a phone number). Only two reviews. Photos come only from the old site. Nothing speaks to the moment most DFW roofs actually get replaced. | |

Option 3 should keep Option 2's spacing, recover Option 1's brand presence, and close the shared gaps.

## 2. The angle: the homeowner after a North Texas hailstorm

In Denton and Collin Counties, most roof replacements start with hail. The homeowner's real questions:

1. Is my roof actually damaged?
2. Will insurance cover it, and how does that work?
3. Five crews knocked on my door this week. Which one will still be here when something goes wrong?

Question 3 is where Roofing Reformation wins. Its real, provable traits all answer it:
- local and serving the area for years
- the owners are named and on every job
- veteran-owned
- warranty-backed
- a faith-based "good name" principle (Proverbs 22:1)

Neither earlier option speaks to this moment. Option 3 is built around it: **the local, owner-run alternative to storm chasers.** It still covers every service and commercial work. Hail is the frame, so repairs, inspections and replacement read as the natural answers to it.

**Dependency (must confirm with Rob before building):** do they help homeowners through insurance claims, or meet the adjuster on site? The old site only says the Proverbs principle shapes how they deal with "insurance adjusters." If the answer is no, the fallback angle is **"the neighbor's recommendation"**: referral-driven, same layout, insurance copy removed.

**Facts the copy must avoid:**
- Bashing competitors by name
- "Storm chaser" scare tactics beyond one plain line
- Any claim about claim approval rates or outcomes

## 3. Design tradition: NPS Unigrid (Massimo Vignelli, 1977)

The National Park Service brochure system: a black title band across the top, a strict modular grid, plain sans-serif type, and maps and diagrams treated as first-class content.

**Why it fits:**
- **It's information design.** It was made to help people decide and act, and a post-storm homeowner needs exactly that: clear steps, a map, plain answers.
- **Civic trust.** It reads as American, official and dependable. That suits a veteran-owned company without flags or eagles.
- **Middle density.** A disciplined grid holds more than Option 2 without Option 1's crowding.
- **The structural skeleton differs from both earlier options:** a title band, modular panels, and a map as the signature element.

**Palette:** the old site's colors lead.
- The Unigrid black band becomes **navy #042D58**.
- **Red #B42335** for calls to action and the map's city markers.
- **Blue #095798** for links and the county outlines.
- **Cream #FFFDF2** ground.
- **White** panels.
- Possibly one warm grey for rules.

**Type:**
- **Public Sans** for everything. It is the typeface of the US Web Design System, the federal government's own. It is civic, plain and very legible.
- The logo's slab wordmark stays as the only display flourish.

**Recurring motifs (outside the hero):**
1. A navy title band at the head of each major section, the way Unigrid panels are labeled.
2. Thin grid rules that show the module edges.
3. Numbered red map-style markers. They are used on the map, the steps and the review attributions.

**Motion:**
- Panels unfold into place along the grid: a short slide plus fade, like a brochure opening.
- On the map, the counties draw in first, then the city markers drop in one by one.
- The hero keeps the autoplaying drone video (the client's request) under the title band.
- Every reveal reverses on scroll up (`whileInView`, `viewport={{ once: false }}`), and `prefers-reduced-motion` turns motion off.

## 4. Page skeleton

1. **Title band and hero.**
   - Navy band with the logo, phone and nav.
   - Video hero. H1: "Roofing contractor in Denton, TX".
   - One line, then "Book a free inspection" and a call button.
2. **About.** Three short ideas: what we do, why us, proof.
3. **Services.** Eight modules in a 4x2 grid (even rows at every breakpoint: 4x2, 2x4, 1x8). Each links to its future page.
4. **After the storm.** A three-step panel: what to do after hail, written as plain guidance (get a local inspection, document damage, choose a contractor who will be here). The insurance step depends on Rob's answer.
5. **How it works.** Numbered steps: inspection, plain-English plan, the work, clean-up and warranty.
6. **Why us.** The Proverbs 22:1 principle and the four reasons.
7. **Proof.**
   - Real reviews.
   - The neighborhood video.
   - The finished-job photos.
   - Plus any new real photos and reviews from step 6 below.
8. **Service area map (signature element).**
   - An SVG of Denton and Collin Counties, with city markers plotted from real coordinates.
   - Each city is also a text list underneath, for SEO and accessibility.
   - No Google Maps embed, so no API key and no address exposure.
9. **Team.** Rob, Jeremy, Robert (role pending).
10. **Request an inspection.** A real form with name, phone, address or city, and "what's going on", plus a call button.
11. **Footer.**

Copy keeps the brief: light arrogance, short declarative sentences, every claim backed by something on the page. No em dashes, no exclamation points, no "X, not Y" flourishes.

## 5. The lead form (the biggest conversion gain)

- **Same pattern as Brick by Brick:** a Next.js route handler that sends with Resend, with ALTCHA spam protection (no Google reCAPTCHA).
- **Needs:**
  - Rob's destination email
  - A Resend API key
  - A sending domain, or the 940Digital one
- **Testing:** all test submissions route to Owen, never to the client.
- **Until the key exists,** the form posts to a stub that returns a clear "call us" message, so nothing is silently lost.

## 6. Research before building (with permission)

The preference list says to exhaust real photo sources before stock. Options 1 and 2 only used the old site.

- **Search:** Google Business Profile, Facebook, Houzz, Nextdoor and Instagram for Roofing Reformation's own photos and reviews. A web search on 2026-10-15 found **no GBP or Facebook page**, only directory listings. Ask Rob directly.
- **Competitive reality:**
  - Denton competitors show hundreds of Google reviews (e.g. Gillean Brothers, 340).
  - Roofing Reformation can't win on review volume, so the page should lead with owner access and staying power, not a review count.
  - Separately, recommend Rob set up and work a Google Business Profile. That is the GBP management service Owen already offers.
- **Directory data conflicts to resolve with Rob:**
  - The Blue Book says established **2018**, the old site says **since 2019**.
  - The Blue Book lists them mainly as a **commercial** roofing subcontractor. If commercial is a bigger share of the business than the old site suggests, the commercial module may deserve more weight.
- **Inspection photos:** Rob's phone almost certainly has before-and-after and hail-damage photos. Ask for 10 to 20. These would beat anything on the old site.

## 7. What's needed from Rob (blocking items marked)

- **Blocking:** Do they help with insurance claims or meet adjusters? (Decides the angle.)
- **Blocking for the form:** destination email for inspection requests.
- Which phone number is real (469-321-5201, 469-972-4501, 469-236-2255).
- Founded 2018 or 2019.
- Warranty length and terms (workmanship and manufacturer).
- Any manufacturer certifications (GAF, CertainTeed, Malarkey, Atlas). Only listed if real.
- Robert Hines' role and a one-line bio.
- Google review link, Facebook or Instagram URLs.
- Recent job photos, especially hail damage and before-and-after.
- Address and hours (still not shown until confirmed).

## 8. Build steps once approved

1. Confirm the angle with Owen and, ideally, Rob's insurance answer.
2. Research pass from section 6. Download any new real photos and add them to the asset inventory.
3. Write `scrape/theme-option-3.md`, then lock it.
4. Build `/option-3` in `src/components/v3`, add the third switcher tab, and noindex it like Option 2.
5. Plot the map from real city coordinates.
6. Build the form against the stub. Wire Resend and ALTCHA only when the key and email exist.
7. Verify: build, desktop and 390px, mobile menu, reduced motion, form error states, form contrast on its real background, map labels, every link.
8. Update the asset inventory and report back. **No deploy and no push without Owen's go-ahead.**

## 9. Risks

- **The hail angle depends on one fact from Rob.** If he says no to insurance help, the fallback angle is ready.
- **The map is the most effort.** It is hand-plotted SVG from real coordinates, so it needs a careful accuracy check.
- **Unigrid can tip into "government form" if done stiffly.** The drone video, the red markers and the real job photos keep it warm.
