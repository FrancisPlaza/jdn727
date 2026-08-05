# JDN727 Transportation Law — Class Website · Figma Make Prompt

Paste everything below the line into Figma Make as one prompt.

---

## Project brief

Design a class website for **JDN727 Transportation Law**, a Commercial Law bar subject at a Philippine law school, meeting online once a week (Wednesdays, 2 hours). I am the class beadle — the student officer responsible for organising the section — and this site is the class's central hub: announcements, week-by-week readings and assignments, a course calendar, and course logistics (Zoom link, professor's info, textbook). It is semi-official: classmates rely on it, and the professor may see it, so it needs to read as clean and credible, not a fan page.

This is **not** a personal study guide (no dense case-brief reading mode, no "recitation prep" tone) — it's a course hub, closer in spirit to a university course homepage (e.g. MIT/Stanford CS course sites) but with its own visual identity, not copying their layout or theme.

## Visual style

**Palette:** soft pastel purple/lavender as the primary colour (something in the lilac/periwinkle family), paired with a warm off-white or cream background — not stark white. Add one secondary pastel accent for contrast and hierarchy (a dusty rose or muted teal works well against lavender). Text in a deep plum or charcoal, never pure black, but dark enough to pass WCAG AA contrast against the pastel backgrounds — pastel-on-pastel must still be legible; treat accessibility as a hard constraint, not a nice-to-have.

**Mood:** simple, clean, calm, "easy on the eyes." Generous whitespace. Not corporate-sterile, not playful/childish — think a well-designed course site a professor would be comfortable being linked to.

**Transportation motif, used sparingly:** a subtle recurring visual language nodding to the subject matter — a dotted "route line" connecting elements (e.g. linking week cards, or as a section divider), small line-art icons for modes of carriage relevant to Philippine common-carrier law (jeepney/bus, ship, plane, train), maybe a boarding-pass or ticket-stub shape for card components. Keep it understated — a texture, not a theme park. No literal photos of traffic or airports.

**Typography:** one clean sans-serif for UI and headings, readable serif or sans for long-form reading content (case text, syllabus excerpts). Clear type-scale hierarchy since this is a reading-heavy site.

**Dark mode:** not required for v1 — this is a scan-and-read hub, not a late-night study reader (unlike my other two class sites). Skip it unless it comes easily.

## Information architecture

Seven areas:

1. **Home** — the landing/dashboard page
2. **Weekly Modules** — filterable list + detail view per week
3. **Announcements** — pinned highlights + full archive
4. **Calendar** — combined academic calendar + weekly sessions + due dates
5. **Course Info** — professor, textbook, grading, Zoom, syllabus
6. **Resources** — primary sources (codal provisions, statutes, conventions)
7. **Footer** — beadle credit + disclaimer, present site-wide

---

## Page-by-page detail

### 1. Home

- Hero/header: course name "JDN727 Transportation Law", section code, and a one-line description
- **"This week" card** — the current week's number, topic, and a compact reading list, with a "view full week" link into Weekly Modules. This is the single most important element on the page — it should be the first thing anyone sees.
- **Pinned announcements** — the 1–2 most recent or highlighted announcements (e.g. "No class Aug 19 — professor on leave"), each with a "view all announcements" link
- Quick-link row: Zoom meeting link, syllabus, course info, calendar
- Upcoming deadline strip if a task assignment is due soon

### 2. Weekly Modules

- A **filter/selector control** at the top — by week number (e.g. "Week 1–14" as tabs, a dropdown, or a horizontal scroller) so a user jumps straight to the week they need
- Each week, in list or card form, shows: week number, date, topic title, and a status flag (upcoming / current / past)
- **Week detail view**, opened per week, contains:
  - Topic(s) for the week
  - Codal/statutory provisions to read (e.g. "Civil Code, Arts. 1732–1734")
  - Textbook chapter(s) to read
  - Cases assigned, each as its own row with case name, G.R. number/citation, and a clickable link to the full text
  - Task assignment block, if any that week (e.g. a short paper or research task), with instructions and a due date, visually distinct from the reading list (different card treatment, e.g. accent border)
  - A small "per official syllabus" line linking back to the syllabus on the Course Info page

### 3. Announcements

- **Highlighted/pinned section** at the top — anything time-sensitive or important, visually distinct (accent background)
- **Full archive** below, reverse-chronological, each entry with a date, short title, and body text
- Simple filter or search would be a nice-to-have, not required

### 4. Calendar

- A **combined calendar** — class sessions (every Wednesday), assignment due dates, and academic-calendar milestones (start/end of term, holidays, exam periods) all layered on one view
- Support both a **month grid view** and a **list/agenda view**, toggleable
- Each entry type visually distinguishable (e.g. different colour dot or icon for "class session" vs "academic calendar" vs "assignment due")

### 5. Course Info

- Professor's name, consultation hours/contact if available
- Section code, schedule (day/time), Zoom meeting link (persistent link + ID/passcode fields)
- Textbook(s) and edition
- Grading breakdown (if known)
- **Syllabus block**: the full syllabus text rendered natively on the page — not a PDF download or embedded viewer. Present it as structured text: a week-by-week table (week, date, topic, readings) followed by any general course policies from the syllabus (grading, attendance, requirements), all as real page content a reader can scroll, search-in-browser (Cmd/Ctrl-F), and follow links from directly. This is the authoritative document; Weekly Modules is the enriched, browsable version of it — the two should never contradict each other.

### 6. Resources

- Primary sources for the subject, as a clean reference list with short one-line descriptions:
  - Civil Code of the Philippines, Arts. 1732–1766 (common carriers)
  - Code of Commerce (maritime commerce provisions)
  - Public Service Act
  - Warsaw Convention (1929) and Montreal Convention (1999) — international air carriage
  - Carriage of Goods by Sea Act (COGSA)
- Space for textbook and any shared reviewers, once available

### 7. Footer (site-wide)

- "Maintained by [beadle name], class beadle, JDN727" credit line
- Disclaimer: student-run resource, not an official registrar record; always confirm against the professor's own syllabus and announcements

---

## Sample content to seed the prototype

No real syllabus exists yet, so populate every page with realistic **placeholder** Transportation Law content, clearly a stand-in for the real thing (do not present it as confirmed course content). Suggested seed data:

- **Week 1** — Introduction to Transportation Law; Common Carriers Defined. Reading: Civil Code Arts. 1732–1734. Sample case: *Fabre v. Court of Appeals*.
- **Week 2** — Extraordinary Diligence of Common Carriers. Reading: Civil Code Arts. 1733, 1735–1745. Sample case: *Calalas v. Court of Appeals*.
- **Week 3** — Contract of Carriage of Passengers; Culpa Contractual. Sample case: *Sweet Lines, Inc. v. Teves*.
- **Week 4** — Carriage of Goods; Loss and Damage. Sample case: *Sarkies Tours Philippines, Inc. v. Court of Appeals*.
- **Week 5** — Air Carriage — Warsaw/Montreal Conventions. Sample case: *Philippine Airlines v. Court of Appeals*.
- A sample task assignment: "Short position paper (2 pages): is a school service (van/jeepney) a common carrier? Due end of Week 3."
- A sample pinned announcement: "Week 4 class moved to Thursday — professor conflict."
- A sample academic-calendar entry: "Midterm examination period" as a multi-day calendar block.
- A sample syllabus table on Course Info (textual, not a PDF), e.g. a 5-row table mirroring Weeks 1–5 above, followed by a short "Course Policies" text block (grading, attendance) as placeholder paragraphs.

**Note:** these sample case names are drawn from general knowledge of well-known Philippine transportation-law jurisprudence, not verified against the actual syllabus (which doesn't exist yet) — treat every case name, date, and assignment above as illustrative filler for the prototype only, to be replaced wholesale once the real syllabus is issued.

## Interaction notes

- Week filter/selector on Weekly Modules should feel instant (client-side filtering, no page reload)
- Calendar month/list toggle should preserve the selected date range
- Clicking a case link should be visually indicated as external (small icon), since it will eventually point to a case database
- Mobile-responsive throughout — several classmates will check this from a phone before class

## Non-goals for this prototype

- No login/auth, no backend, no database — this is a static-feeling informational site (it will actually be built as static HTML/CSS/JS, hand-maintained, no CMS)
- No personal student data (no grades, no attendance records, no roster) — content is limited to readings, announcements, schedule, and logistics
- Don't replicate MIT/Stanford's specific layout or theme — they're a reference for *scope* (a comprehensive course hub), not for look and feel
