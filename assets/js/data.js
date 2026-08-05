/* JDN727 Transportation Law — Class Hub data model
 *
 * SY 2026–2027, First Semester. Classes start Wed Jul 22, 2026 (verified:
 * the SBCA academic calendar has "Start of Classes — 1st Semester" on
 * Mon Jul 20, 2026; the first Wednesday session is two days later).
 *
 * No official syllabus has been issued yet. Course-specific weekly content
 * is intentionally empty until the professor confirms the topics, readings,
 * cases, assignments, and assessments.
 */

const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const MONTH_SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function parseISO(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}
function formatDateLong(iso) {
  const d = parseISO(iso);
  return `${MONTH_NAMES[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}
function formatDateShort(iso) {
  const d = parseISO(iso);
  return `${MONTH_SHORT[d.getMonth()]} ${d.getDate()}`;
}
// "Current" week = the Wednesday falling in the same Sun–Sat calendar week as today.
function deriveStatus(iso) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const day = today.getDay();
  const currentWed = new Date(today);
  currentWed.setDate(today.getDate() + (3 - day));
  const weekDate = parseISO(iso);
  weekDate.setHours(0, 0, 0, 0);
  if (weekDate.getTime() === currentWed.getTime()) return "current";
  return weekDate < currentWed ? "completed" : "upcoming";
}

const WEEKS = [];

const ANNOUNCEMENTS = [
  {
    id: 1, pinned: true, tag: "General",
    date: "2026-08-05",
    title: "Official course information is coming soon",
    body: "The official syllabus, weekly topics, readings, cases, assignments, and assessment requirements have not yet been released. This class hub will be updated as soon as the professor confirms the information.",
  },
  {
    id: 2, pinned: true, tag: "Materials",
    date: "2026-08-05",
    title: "Attendance and recitation tracker is available",
    body: "The shared attendance and recitation tracker is now available for the section. Use the tracker link on the home page or in the External Links section below.",
  },
];

const ATTENDANCE_TRACKER_URL = "https://docs.google.com/spreadsheets/d/1_Ysj6Oqo8fGbNb6mICDWLEw5NNsCDqCZ/edit?usp=sharing&ouid=101931306961146662095&rtpof=true&sd=true";

// Academic-calendar entries, First Semester SY 2026–2027 only — filtered from
// the official SBCA ICS (Other Documents/sbca-law-academic-calendar-2026-2027.ics).
// type: "holiday" (no-class day), "period" (multi-day academic block), "note" (informational, not a day off).
const ACADEMIC_EVENTS = [
  { date: "2026-07-20", title: "Start of Classes — First Semester", type: "note" },
  { date: "2026-07-20", endDate: "2026-07-28", title: "Adding/Dropping Period", type: "period" },
  { date: "2026-08-21", title: "Ninoy Aquino Day", type: "holiday" },
  { date: "2026-08-31", title: "National Heroes Day", type: "holiday" },
  { date: "2026-09-06", title: "2026 Bar Examinations (Day 1)", type: "note" },
  { date: "2026-09-08", title: "Feast of the Nativity of Mary", type: "holiday" },
  { date: "2026-09-09", title: "2026 Bar Examinations (Day 2)", type: "note" },
  { date: "2026-09-12", title: "Feast of Our Lady of Montserrat", type: "holiday" },
  { date: "2026-09-12", title: "2026 Bar Examinations (Day 3)", type: "note" },
  { date: "2026-09-28", endDate: "2026-10-06", title: "Midterm Examination Period (SBCA-wide)", type: "period" },
  { date: "2026-10-03", title: "Start of Final Term — First Semester", type: "note" },
  { date: "2026-11-01", title: "All Saints Day", type: "holiday" },
  { date: "2026-11-02", title: "All Souls Day", type: "holiday" },
  { date: "2026-11-30", title: "Andres Bonifacio Day", type: "holiday" },
  { date: "2026-12-08", title: "Feast of the Immaculate Conception", type: "holiday" },
  { date: "2026-12-09", endDate: "2026-12-17", title: "Final Examination Period (SBCA-wide)", type: "period" },
  { date: "2026-12-17", title: "Start of Christmas Break", type: "note" },
];

const RESOURCE_GROUPS = [
  {
    category: "Civil Code of the Philippines", icon: "scale",
    items: [
      { title: "Arts. 1732–1734 — Common Carriers Defined", desc: "Definition of common carrier; duty to carry; non-discrimination obligation.", scope: "Arts. 1732–1734", tag: "Civil Code" },
      { title: "Arts. 1735–1754 — Goods in Transit", desc: "Commencement and termination of the carrier's liability; bill of lading; goods in transit.", scope: "Arts. 1735–1754", tag: "Civil Code" },
      { title: "Arts. 1755–1766 — Passengers", desc: "The carrier's duty of extraordinary diligence to passengers; limitation clauses; exemptions.", scope: "Arts. 1755–1766", tag: "Civil Code" },
    ],
  },
  {
    category: "Code of Commerce", icon: "gavel",
    items: [
      { title: "Arts. 350–379 — Bill of Lading Provisions", desc: "Form, contents, and legal effect of bills of lading; obligations of carrier and shipper.", scope: "Arts. 350–379", tag: "Code of Commerce" },
      { title: "Arts. 573–869 — Maritime Commerce", desc: "Vessels and ownership; captain and crew; averages; shipwrecks; collisions; charter parties.", scope: "Arts. 573–869", tag: "Code of Commerce" },
    ],
  },
  {
    category: "Special Laws", icon: "file-text",
    items: [
      { title: "Public Service Act (CA 146, as amended by RA 11659)", desc: "Certificate of public convenience requirements; LTFRB/LTO jurisdiction; common carrier regulation post-2022.", scope: "CA 146 / RA 11659", tag: "Statute" },
      { title: "Carriage of Goods by Sea Act (CA 65)", desc: "COGSA governs import and outbound sea cargo — package limitation, one-year prescriptive period.", scope: "CA 65", tag: "Statute" },
      { title: "Domestic Shipping Development Act (RA 9295)", desc: "Regulation of domestic water transport operations; franchises; MARINA jurisdiction.", scope: "RA 9295", tag: "Statute" },
      { title: "Civil Aeronautics Act (RA 776)", desc: "Regulation of civil aviation in the Philippines; CAAP authority; licensing of air carriers.", scope: "RA 776", tag: "Statute" },
    ],
  },
  {
    category: "International Conventions", icon: "plane",
    items: [
      { title: "Warsaw Convention (1929)", desc: "Original international air-carrier liability framework — per-passenger limits, two-destination rule.", scope: "49 Stat. 3000", tag: "Convention" },
      { title: "Montreal Convention (1999)", desc: "Modernized framework superseding Warsaw — two-tier liability, SDR-based limits, 5-year prescription.", scope: "ICAO Doc. 9740", tag: "Convention" },
    ],
  },
  {
    category: "Reference & Supplementary", icon: "book-marked",
    items: [
      { title: "Transportation Law textbook", desc: "A prescribed textbook and edition will be listed here once confirmed by the professor.", scope: "Not yet assigned", tag: "Reference" },
      { title: "LTFRB MC 2018-005 (TNVS Guidelines)", desc: "Transport Network Vehicle Service accreditation — Grab, InDriver, and similar platforms.", scope: "LTFRB", tag: "Admin Issuance" },
      { title: "Ship Mortgage Decree (PD 1521)", desc: "Preferred ship mortgages; maritime liens; enforcement proceedings against vessels.", scope: "PD 1521", tag: "Statute" },
      { title: "SC E-Library (full-text cases)", desc: "Supreme Court Electronic Library — search and retrieve full-text decisions by G.R. number.", scope: "sc.judiciary.gov.ph", tag: "Database" },
    ],
  },
];

const NAV_LINKS = [
  { label: "Home", href: "index.html" },
  { label: "Modules", href: "modules.html" },
  { label: "Announcements", href: "announcements.html" },
  { label: "Calendar", href: "calendar.html" },
  { label: "Course Info", href: "course-info.html" },
  { label: "Resources", href: "resources.html" },
];
