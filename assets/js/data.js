/* JDN727 Transportation Law — Class Hub data model
 *
 * SY 2026–2027, First Semester. Classes start Wed Jul 22, 2026 (verified:
 * the SBCA academic calendar has "Start of Classes — 1st Semester" on
 * Mon Jul 20, 2026; the first Wednesday session is two days later).
 *
 * Every week's topic, codal citation, textbook page range, and assignment
 * below is PLACEHOLDER content — no syllabus has been issued yet. The case
 * names and citations are real, well-known Philippine transportation-law
 * decisions (drawn from general knowledge, not re-verified against docrag
 * for this build) used here to show realistic density; treat every date,
 * topic label, and assignment as illustrative until the professor's actual
 * syllabus replaces it. Citations should be spot-checked before anyone
 * relies on them for recitation.
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

const WEEKS = [
  {
    id: 1, date: "2026-07-22",
    title: "Introduction to Transportation Law; Common Carriers Defined",
    topic: "What is transportation law and why it matters for the bar. Sources of the law of common carriage. Defining 'common carrier' under Art. 1732 — the duty to carry and non-discrimination.",
    codal: ["Civil Code, Arts. 1732–1734"],
    cases: [
      { name: "De Guzman v. Court of Appeals", gr: "G.R. No. L-47822, Dec. 22, 1988", topic: "Broadened the Art. 1732 definition to cover occasional/backhauling carriage, not just a carrier's principal business — the foundational common-carrier case." },
      { name: "Fabre v. Court of Appeals", gr: "G.R. No. 111127, Jul. 26, 1996", topic: "Van shuttle operated for a specific sector held a common carrier; extraordinary diligence applies regardless of route regularity." },
    ],
    textbook: "Aquino, Transportation Law, Ch. 1", assignment: null,
  },
  {
    id: 2, date: "2026-07-29",
    title: "Common Carrier vs. Private Carrier",
    topic: "Distinguishing a common carrier from a private/special contract of carriage. When a charter or lease of a vehicle still leaves extraordinary diligence in place.",
    codal: ["Civil Code, Art. 1732 in relation to special contracts"],
    cases: [
      { name: "Bascos v. Court of Appeals", gr: "G.R. No. 101089, Apr. 7, 1993", topic: "Lease of a truck to a single shipper did not convert the operator into a private carrier — held out to the public generally." },
      { name: "Planters Products, Inc. v. Court of Appeals", gr: "G.R. No. 101503, Sep. 15, 1993", topic: "Charter party for bulk cargo; when a vessel otherwise engaged as a common carrier reverts to private-carrier obligations." },
    ],
    textbook: "Aquino, Transportation Law, Ch. 1 cont'd", assignment: null,
  },
  {
    id: 3, date: "2026-08-05",
    title: "Extraordinary Diligence — The Standard",
    topic: "Why the standard is higher than ordinary diligence. The presumption of fault and negligence once loss, injury, or damage is shown.",
    codal: ["Civil Code, Arts. 1733, 1735"],
    cases: [
      { name: "Calalas v. Court of Appeals", gr: "G.R. No. 122039, May 31, 1999", topic: "Overloaded jeepney; causal connection between the carrier's negligence and the passenger's injury." },
    ],
    textbook: "Aquino, Transportation Law, Ch. 2", assignment: null,
  },
  {
    id: 4, date: "2026-08-12",
    title: "Extraordinary Diligence — Defenses and Fortuitous Event",
    topic: "Available defenses to the presumption of negligence. What counts as a fortuitous event, and why mechanical or maintenance failures usually do not qualify.",
    codal: ["Civil Code, Arts. 1739–1745"],
    cases: [
      { name: "Yobido v. Court of Appeals", gr: "G.R. No. 113003, Oct. 17, 1997", topic: "Tire blowout on a bus; fortuitous event defense rejected — extraordinary diligence extends to vehicle maintenance." },
      { name: "Necesito v. Paras", gr: "G.R. No. L-10605-06, Jun. 30, 1958", topic: "Steering-knuckle failure held a foreseeable mechanical defect, not a fortuitous event." },
    ],
    textbook: "Aquino, Transportation Law, Ch. 2 cont'd", assignment: null,
  },
  {
    id: 5, date: "2026-08-19",
    title: "Contract of Carriage of Passengers; Culpa Contractual",
    topic: "Nature of the contract of carriage. Culpa contractual versus culpa aquiliana, and why they cannot both be invoked for the same injury.",
    codal: ["Civil Code, Arts. 1755–1763", "Civil Code, Art. 2180"],
    cases: [
      { name: "Sweet Lines, Inc. v. Teves", gr: "G.R. No. L-37750, May 19, 1978", topic: "Printed conditions on a passenger ticket as an attempted limitation on liability; contracts of adhesion." },
      { name: "Calalas v. Court of Appeals", gr: "G.R. No. 122039, May 31, 1999", topic: "Revisited: quasi-delict cannot co-exist with culpa contractual for the same passenger injury." },
    ],
    textbook: "Aquino, Transportation Law, Ch. 3",
    assignment: {
      title: "Short Position Paper: School Service as Common Carrier",
      due: "2026-08-26",
      instructions: "In no more than two (2) pages, argue whether a school service van or private jeepney engaged exclusively for students of one school qualifies as a 'common carrier' under Art. 1732. Cite at least three (3) relevant cases. Submit in hard copy at the start of the Week 6 session.",
    },
  },
  {
    id: 6, date: "2026-08-26",
    title: "Stipulations Limiting Liability; Tickets as Contracts of Adhesion",
    topic: "When a carrier may validly limit its liability by stipulation, and when such stipulations are void as against public policy.",
    codal: ["Civil Code, Arts. 1757, 1758", "Civil Code, Art. 2220"],
    cases: [
      { name: "Sweet Lines, Inc. v. Teves", gr: "G.R. No. L-37750, May 19, 1978", topic: "A common carrier cannot use a printed condition to shirk a statutory liability." },
      { name: "Sarkies Tours Philippines, Inc. v. Court of Appeals", gr: "G.R. No. 108897, Oct. 2, 1997", topic: "Baggage-liability limitation clauses and their enforceability against a paying passenger." },
    ],
    textbook: "Aquino, Transportation Law, Ch. 3 cont'd", assignment: null,
  },
  {
    id: 7, date: "2026-09-02",
    title: "Carriage of Goods; the Bill of Lading",
    topic: "The bill of lading as both a receipt and the contract of carriage. Commencement and termination of the carrier's liability over goods.",
    codal: ["Civil Code, Arts. 1736–1749", "Code of Commerce, Arts. 350–379"],
    cases: [
      { name: "Sarkies Tours Philippines, Inc. v. Court of Appeals", gr: "G.R. No. 108897, Oct. 2, 1997", topic: "Loss of checked passenger baggage; extraordinary diligence extends to goods entrusted for carriage." },
      { name: "Mitsui O.S.K. Lines v. Court of Appeals", gr: "G.R. No. 119571, Mar. 11, 1998", topic: "What counts as a 'package or unit' for purposes of a carrier's declared liability." },
    ],
    textbook: "Aquino, Transportation Law, Ch. 4", assignment: null,
  },
  {
    id: 8, date: "2026-09-09",
    title: "Loss, Damage, and Delay of Goods",
    topic: "Carrier liability for loss, damage, and delay; the shipper's declared value; the deviation doctrine.",
    codal: ["Civil Code, Arts. 1750–1753"],
    cases: [
      { name: "Eastern Shipping Lines v. Intermediate Appellate Court", gr: "G.R. No. L-69044, May 29, 1987", topic: "Applicability of COGSA to outgoing cargo; the deviation doctrine." },
      { name: "Calvo v. UCPB General Insurance Co.", gr: "G.R. No. 148496, Mar. 19, 2002", topic: "A customs broker held a common carrier — bailee for hire, bailee's duty of diligence." },
    ],
    textbook: "Aquino, Transportation Law, Ch. 4 cont'd", assignment: null,
  },
  {
    id: 9, date: "2026-09-16",
    title: "Air Carriage — the Warsaw Convention",
    topic: "The 1929 Warsaw Convention framework for international air carrier liability. Per-passenger liability limits; notice requirements.",
    codal: ["Warsaw Convention (1929)", "Civil Aeronautics Act (RA 776)"],
    cases: [
      { name: "Philippine Airlines, Inc. v. Court of Appeals", gr: "G.R. No. 120262, Jul. 17, 1997", topic: "Bumping-off of a confirmed passenger; Warsaw Convention scope; carrier's obligation to reroute." },
    ],
    textbook: "Aquino, Transportation Law, Ch. 5", assignment: null,
  },
  {
    id: 10, date: "2026-09-23",
    title: "Air Carriage — the Montreal Convention",
    topic: "The 1999 Montreal Convention's two-tier liability system and how it modernizes Warsaw. Philippine applicability and the SDR-based limits.",
    codal: ["Montreal Convention (1999)"],
    cases: [
      { name: "Philippine Airlines, Inc. v. Court of Appeals", gr: "G.R. No. 120262, Jul. 17, 1997", topic: "Revisited for comparison against the Montreal framework's unlimited bodily-injury liability." },
    ],
    textbook: "Aquino, Transportation Law, Ch. 5 cont'd", assignment: null,
  },
  {
    id: 11, date: "2026-09-30", isExam: true,
    title: "MIDTERM EXAMINATION",
    topic: "Coverage: Weeks 1–10. Closed-book written examination. Bring a valid school ID. Falls within the SBCA-wide Midterm Examination period (Sep 28 – Oct 6, 2026); exact format and duration are the professor's call.",
    codal: [], cases: [], textbook: "Review all assigned readings and cases, Weeks 1–10",
    assignment: { title: "MIDTERM EXAM", due: "2026-09-30" },
  },
  {
    id: 12, date: "2026-10-07",
    title: "Maritime Transportation — Vessel Ownership and Registration",
    topic: "Vessel ownership and registration; the captain's authority; preferred ship mortgages.",
    codal: ["Code of Commerce, Arts. 573–668", "Ship Mortgage Decree (PD 1521)"],
    cases: [
      { name: "William Lines, Inc. v. Court of Appeals", gr: "G.R. No. 82978, May 20, 1994", topic: "Distinction between bareboat and time charter; liability allocation between owner and charterer." },
    ],
    textbook: "Aquino, Transportation Law, Ch. 6", assignment: null,
  },
  {
    id: 13, date: "2026-10-14",
    title: "Charter Parties; General and Particular Averages",
    topic: "Bareboat versus time versus voyage charters. General average contribution versus particular average loss.",
    codal: ["Code of Commerce, Arts. 669–756"],
    cases: [
      { name: "William Lines, Inc. v. Court of Appeals", gr: "G.R. No. 82978, May 20, 1994", topic: "Revisited on charter-party liability allocation." },
      { name: "Planters Products, Inc. v. Court of Appeals", gr: "G.R. No. 101503, Sep. 15, 1993", topic: "Revisited on the charter-party angle of a bulk cargo shipment." },
    ],
    textbook: "Aquino, Transportation Law, Ch. 6 cont'd", assignment: null,
  },
  {
    id: 14, date: "2026-10-21",
    title: "Collision, Shipwreck, and Passenger Liability at Sea",
    topic: "Liability rules for collision and shipwreck; a shipowner's liability for a passenger not on the manifest.",
    codal: ["Code of Commerce, Arts. 826–869"],
    cases: [
      { name: "Sulpicio Lines, Inc. v. Curso", gr: "G.R. No. 157009, Mar. 17, 2010", topic: "Shipowner liable for a passenger absent from the manifest — a carrier cannot escape liability on a technicality." },
    ],
    textbook: "Aquino, Transportation Law, Ch. 6 cont'd", assignment: null,
  },
  {
    id: 15, date: "2026-10-28",
    title: "Carriage of Goods by Sea Act (COGSA)",
    topic: "COGSA's applicability to import and outbound cargo; the one-year prescriptive period; the package-limitation rule.",
    codal: ["Carriage of Goods by Sea Act (CA 65)", "Civil Code, Arts. 1749–1753"],
    cases: [
      { name: "Mitsui O.S.K. Lines v. Court of Appeals", gr: "G.R. No. 119571, Mar. 11, 1998", topic: "Revisited on COGSA package limitation." },
      { name: "Eastern Shipping Lines v. Intermediate Appellate Court", gr: "G.R. No. L-69044, May 29, 1987", topic: "Revisited on COGSA applicability and the deviation doctrine." },
    ],
    textbook: "Aquino, Transportation Law, Ch. 7",
    assignment: { title: "Case Brief #1 — Student's choice, any Weeks 1–15 case", due: "2026-11-04", instructions: "IRAC format, four (4) pages maximum, double-spaced. Submit in hard copy at the start of the Week 16 session." },
  },
  {
    id: 16, date: "2026-11-04",
    title: "Land Transportation — the Public Service Act",
    topic: "The certificate of public convenience; LTFRB/LTO jurisdiction; franchise requirements for jeepneys, buses, and UV express.",
    codal: ["Public Service Act (CA 146) as amended by RA 11659 (2022)"],
    cases: [
      { name: "Kilusang Mayo Uno v. Garcia", gr: "G.R. No. 115381, Dec. 23, 1994", topic: "LTFRB jurisdiction; the constitutionality of transport-deregulation orders." },
    ],
    textbook: "Aquino, Transportation Law, Ch. 8", assignment: null,
  },
  {
    id: 17, date: "2026-11-11",
    title: "Common Carrier Status Beyond Vehicles — Pipelines, Brokers, Forwarders",
    topic: "How far the Art. 1732 definition extends: pipeline operators, freight forwarders, and customs brokers as common carriers.",
    codal: ["Civil Code, Art. 1732 (broad definition)"],
    cases: [
      { name: "First Philippine Industrial Corp. v. Court of Appeals", gr: "G.R. No. 125948, Dec. 29, 1998", topic: "A pipeline operator carrying fuel in transit held a common carrier — the definition expanded beyond vehicles." },
      { name: "Loadmasters Customs Services, Inc. v. Glodel Brokerage Corp.", gr: "G.R. No. 179446, Jan. 10, 2011", topic: "A freight forwarder is a common carrier and liable for loss of goods in transit." },
    ],
    textbook: "Aquino, Transportation Law, Ch. 9", assignment: null,
  },
  {
    id: 18, date: "2026-11-18",
    title: "Insurance in Transportation; Subrogation",
    topic: "Marine insurance and insurable interest. The insurer's right of subrogation against the carrier once a claim is paid.",
    codal: ["Insurance Code (RA 10607), Secs. 99–166", "Civil Code, Arts. 2207–2208"],
    cases: [
      { name: "Malayan Insurance Co., Inc. v. Court of Appeals", gr: "G.R. No. 119599, Mar. 20, 1997", topic: "Marine insurance; the insurer's subrogation right does not release the carrier from liability." },
    ],
    textbook: "Aquino, Transportation Law, Ch. 10",
    assignment: { title: "Case Brief #2 — Student's choice, any Weeks 12–18 case", due: "2026-11-25", instructions: "IRAC format, four (4) pages maximum, double-spaced. Submit in hard copy at the start of the Week 19 session." },
  },
  {
    id: 19, date: "2026-11-25",
    title: "Land Transport Continued — TNCs, the Boundary System, PUV Modernization",
    topic: "Transport network companies under RA 11659; the boundary system and the employer-employee question; the Public Utility Vehicle Modernization Program.",
    codal: ["RA 11659 (2022 PSA Amendments)", "LTFRB MC 2018-005 (TNVS Guidelines)"],
    cases: [
      { name: "Abad v. Court of First Instance", gr: "G.R. No. L-42735, Apr. 22, 1991", topic: "The boundary system and whether an employer-employee relationship exists in transport." },
      { name: "Kilusang Mayo Uno v. Garcia", gr: "G.R. No. 115381, Dec. 23, 1994", topic: "Revisited on LTFRB jurisdiction over deregulated routes." },
    ],
    textbook: "Aquino, Transportation Law, Ch. 8 cont'd", assignment: null,
  },
  {
    id: 20, date: "2026-12-02",
    title: "Synthesis and Bar Review Session",
    topic: "Comprehensive review of doctrines recurring across all modes of carriage; frequently tested bar questions; hypothetical problem-solving across carrier types.",
    codal: [], cases: [], textbook: "Consolidated reviewer (to be distributed)", assignment: null,
  },
  {
    id: 21, date: "2026-12-09",
    title: "Emerging Issues — TNCs, Drones, and Autonomous Vehicles",
    topic: "Transport network companies and app-based dispatch; drone delivery as carriage; the state of autonomous-vehicle regulation in the Philippines; recent bar-exam trends.",
    codal: ["RA 11659 (2022 PSA Amendments)"],
    cases: [], textbook: "Selected articles and LTFRB issuances (to be distributed)", assignment: null,
  },
  {
    id: 22, date: "2026-12-16", isExam: true,
    title: "FINAL EXAMINATION",
    topic: "Coverage: all topics, Weeks 1–21. Closed-book, long-form problem questions, emphasis on multi-modal carrier issues. Falls within the SBCA-wide Final Examination period (Dec 9–17, 2026); the exact date shown here is a placeholder — confirm the actual JDN727 slot once the professor or registrar posts it.",
    codal: [], cases: [], textbook: "All assigned readings for the semester",
    assignment: { title: "FINAL EXAM", due: "2026-12-16" },
  },
];

const ANNOUNCEMENTS = [
  {
    id: 1, pinned: true, tag: "Schedule",
    date: "2026-08-30",
    title: "Week 8 (Sep 9) Coincides with the 2026 Bar Examinations",
    body: "The SBCA academic calendar lists Sep 9, 2026 as a Bar Examination date. It is not marked a school holiday, so JDN727 is expected to proceed as scheduled — but confirm with the professor in Week 7, since some faculty have Bar-related commitments that week. Will update this notice once confirmed either way.",
  },
  {
    id: 2, pinned: true, tag: "Assignment",
    date: "2026-08-20",
    title: "Week 5 Position Paper — Guidelines Clarified",
    body: "A few questions have come in about the Week 5 position paper. To clarify: (1) two pages means two full pages of body text, not counting a title or citation page; (2) 'at least three cases' means three Philippine Supreme Court decisions; (3) any standard legal citation style is fine, applied consistently. Submit in hard copy at the start of Week 6.",
  },
  {
    id: 3, pinned: false, tag: "Materials",
    date: "2026-08-17",
    title: "Week 5 Reading Materials Uploaded",
    body: "Sweet Lines, Inc. v. Teves and the relevant Civil Code provisions (Arts. 1755–1763) are now on the class Google Drive, along with a one-page summary of culpa contractual vs. culpa aquiliana for quick reference. Please download before Wednesday's session.",
  },
  {
    id: 4, pinned: false, tag: "General",
    date: "2026-07-20",
    title: "Welcome to JDN727 Transportation Law",
    body: "Welcome to the class hub for JDN727 Transportation Law (2L, First Semester, SY 2026–2027). This site is the primary reference for course materials, announcements, and the class calendar. Bookmark this page. For urgent matters, reach the class beadle via the section group chat. First session: Wednesday, July 22, 2026.",
  },
];

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
      { title: "Aquino, Transportation Law", desc: "Prescribed textbook (edition TBC). The primary reference for this course.", scope: "Full text", tag: "Textbook" },
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
