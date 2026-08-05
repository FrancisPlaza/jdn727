# JDN727 Transportation Law · Class Hub

Class website for JDN727 Transportation Law at San Beda College Alabang School of Law (2L-1, First Semester, SY 2026–2027). Maintained by the class beadle as the section's central reference: announcements, week-by-week readings and assignments, the class calendar, and course logistics.

Unlike a personal study guide, this is a class-wide hub — the audience is the whole section (and potentially the professor), not just one student.

## Features

- 🏠 **Home** — this week at a glance, pinned announcements, upcoming deadlines
- 📚 **Weekly Modules** — filterable by status, searchable, with a full detail view per week (codal readings, textbook, cases, assignments)
- 📣 **Announcements** — pinned notices + a searchable archive
- 📅 **Calendar** — class sessions, assignment due dates, and the official SBCA academic calendar (First Semester only) in one grid/list view
- 🎓 **Course Info** — professor, schedule, Zoom link, textbook, grading, and the **full syllabus as real page text** (not a PDF)
- ⚖️ **Resources** — primary sources: Civil Code provisions, Code of Commerce, special laws, international conventions
- 📱 Mobile-responsive, no build step, no backend — plain HTML/CSS/JS

## Structure

```
jdn727/
├── index.html              # Home
├── modules.html             # Weekly Modules (list + hash-routed detail view, #week=N)
├── announcements.html       # Announcements
├── calendar.html            # Calendar
├── course-info.html         # Course Info (tabs: Overview / Syllabus / Policies)
├── resources.html           # Resources
├── assets/
│   ├── css/style.css        # Design tokens + all styling
│   └── js/
│       ├── data.js          # All content: weeks, announcements, academic calendar, resources
│       ├── icons.js         # Hand-authored line-icon set
│       ├── common.js        # Shared render helpers (footer, inline icons, badges)
│       ├── nav.js           # Mobile nav toggle
│       └── {home,modules,announcements,calendar,course-info,resources}.js
└── README.md
```

## Updating content week to week

Everything lives in `assets/js/data.js`:
- **`WEEKS`** — one entry per class session (topic, codal readings, textbook pages, cases, assignment). It is intentionally empty until the official syllabus is issued. `status` is **not** stored — it is computed live from each week's date against the visitor's current date (`deriveStatus` in `data.js`) once syllabus data is added.
- **`ANNOUNCEMENTS`** — pinned + archived notices.
- **`ACADEMIC_EVENTS`** — First-Semester-only entries pulled from the official SBCA academic calendar ICS (`Other Documents/sbca-law-academic-calendar-2026-2027.ics` in the Law School workspace). Re-check this against the source ICS if the registrar issues an update.
- **`RESOURCE_GROUPS`** — primary/secondary sources for the Resources page.

No syllabus has been issued yet as of this build. The site intentionally shows clear “coming soon” states for weekly topics, readings, cases, assignments, grading, and policies rather than publishing fictional course requirements. Populate `WEEKS`, `GRADING`, and `POLICIES` once the professor confirms the official information.

## Local Development

No build step. Just open `index.html` in a browser, or serve it locally:

```bash
cd ~/Code/sbca/jdn727
python -m http.server 8000
# Visit http://localhost:8000
```

## Deployment

Designed for GitHub Pages:

```bash
git init
git add .
git commit -m "Initial commit: JDN727 class hub"
git branch -M main
git remote add origin https://github.com/[your-username]/jdn727.git
git push -u origin main
```

Then enable GitHub Pages in the repository settings (Source: Deploy from branch `main`, folder `/`).

## Disclaimer

This is a student-run class resource maintained by the class beadle, not an official registrar record. Course-specific information will be added as it is officially released and may change. Always confirm against the professor's own communications.

## License

**CC BY-SA 4.0** — free to share and adapt with attribution. See [LICENSE](LICENSE) for details.
