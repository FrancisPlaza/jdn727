var GRADING = [
  { label: "Class Participation / Recitation", pct: 20 },
  { label: "Case Briefs (2 submissions)", pct: 20 },
  { label: "Midterm Examination", pct: 30 },
  { label: "Final Examination", pct: 30 },
];

var POLICIES = [
  { title: "Attendance", body: "Regular attendance is expected. Under the SBCA Student Handbook, JDN727 (2 units) allows a maximum of 7 hours of absence before automatic dropping, excused or not. Three tardiness instances count as one absence. Being more than 15 minutes late may be recorded as absent at the professor's discretion." },
  { title: "Class Participation / Recitation", body: "Cold-calling is the standard method of participation. Students must be prepared to recite on any assigned case or topic for the week. Recitation counts toward the class participation grade. Failing to recite when called, without prior notice to the beadle, is recorded as unprepared." },
  { title: "Case Briefs", body: "Two (2) case briefs are required across the semester. Each must follow IRAC format (Issue, Rule, Application, Conclusion) and shall not exceed four (4) pages, double-spaced, 12-pt Times New Roman, 1-inch margins. Submit in hard copy at the start of class on the due date. No late submissions accepted." },
  { title: "Examinations", body: "Both Midterm and Final examinations are closed-book. Bring a valid school ID. No admission after the first 15 minutes. Electronic devices are prohibited during examinations. Write legibly in blue or black ink." },
  { title: "Academic Integrity", body: "Plagiarism or any form of academic dishonesty will result in a failing grade for that requirement and may warrant disciplinary proceedings. All submitted work must be original. Cite all sources; the citation style is your choice, applied consistently." },
  { title: "Communication", body: "Official announcements are posted to this class hub and to the section group chat. Contact the class beadle for logistical concerns; route academic concerns to the professor directly or through office hours. Confirm any information here against what the professor communicates in class." },
];

document.addEventListener("DOMContentLoaded", function () {
  renderGrading();
  renderSyllabusTable();
  renderPolicies();

  document.getElementById("tabbar").addEventListener("click", function (e) {
    var btn = e.target.closest("button");
    if (!btn) return;
    setTab(btn.getAttribute("data-tab"));
  });

  if (location.hash === "#syllabus") setTab("syllabus");
});

function setTab(tab) {
  document.querySelectorAll("#tabbar button").forEach(function (b) { b.classList.toggle("active", b.getAttribute("data-tab") === tab); });
  document.querySelectorAll(".tab-panel").forEach(function (p) { p.classList.toggle("active", p.id === "tab-" + tab); });
}

function renderGrading() {
  document.getElementById("gradingMount").innerHTML = GRADING.map(function (g) {
    return `
    <div class="grade-row">
      <div class="grade-top"><span style="font-weight:500;">${g.label}</span><span class="pct">${g.pct}%</span></div>
      <div class="grade-bar"><div class="grade-fill" style="width:${g.pct}%;"></div></div>
    </div>`;
  }).join("");
}

function renderSyllabusTable() {
  var rows = WEEKS.map(function (w, i) {
    var rowClass = w.isExam ? "exam-row" : (i % 2 === 0 ? "odd" : "even");
    var readings = w.codal.concat(w.cases.map(function (c) { return c.name; }));
    return `
    <tr class="${rowClass}">
      <td class="wk-num">${w.isExam ? "✦" : w.id}</td>
      <td style="font-size:0.75rem;color:var(--muted-foreground);">${formatDateLong(w.date)}</td>
      <td>
        <p class="wk-topic">${escapeHTML(w.title)}</p>
        ${w.codal.length ? '<p class="wk-meta">' + escapeHTML(w.codal.join("; ")) + "</p>" : ""}
        ${w.cases.length ? '<p class="wk-cases">' + escapeHTML(w.cases.map(function (c) { return c.name; }).join("; ")) + "</p>" : ""}
      </td>
      <td>${w.assignment ? '<span class="wk-assignment">' + escapeHTML(w.assignment.title) + "</span>" : '<span style="color:var(--muted-foreground);">—</span>'}</td>
    </tr>`;
  }).join("");

  document.getElementById("syllabusTable").innerHTML = `
    <thead><tr><th>Wk</th><th>Date</th><th>Topic &amp; Readings</th><th>Assignment</th></tr></thead>
    <tbody>${rows}</tbody>`;
}

function renderPolicies() {
  document.getElementById("policiesMount").innerHTML = POLICIES.map(function (p) {
    return `<div class="policy-card card card-pad"><h3>${p.title}</h3><p>${p.body}</p></div>`;
  }).join("");
}
