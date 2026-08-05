var GRADING = [];
var POLICIES = [];

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
  if (!GRADING.length) {
    document.getElementById("gradingMount").innerHTML = '<div class="notice-callout" style="margin-bottom:0;">The grading breakdown will be posted once the official course requirements are released.</div>';
    return;
  }
  document.getElementById("gradingMount").innerHTML = GRADING.map(function (g) {
    return `
    <div class="grade-row">
      <div class="grade-top"><span style="font-weight:500;">${g.label}</span><span class="pct">${g.pct}%</span></div>
      <div class="grade-bar"><div class="grade-fill" style="width:${g.pct}%;"></div></div>
    </div>`;
  }).join("");
}

function renderSyllabusTable() {
  if (!WEEKS.length) {
    document.getElementById("syllabusTable").innerHTML = '<tbody><tr><td colspan="4" style="text-align:center;color:var(--muted-foreground);padding:2rem;">The official syllabus will appear here once it is released.</td></tr></tbody>';
    return;
  }
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
  if (!POLICIES.length) {
    document.getElementById("policiesMount").innerHTML = '<div class="notice-callout" style="margin-bottom:0;">Official attendance, recitation, assessment, and communication policies will be posted here once confirmed by the professor.</div>';
    return;
  }
  document.getElementById("policiesMount").innerHTML = POLICIES.map(function (p) {
    return `<div class="policy-card card card-pad"><h3>${p.title}</h3><p>${p.body}</p></div>`;
  }).join("");
}
