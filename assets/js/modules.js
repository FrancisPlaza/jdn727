var currentFilter = "all";
var currentSearch = "";
var expandedWeekId = null;

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("filterTabs").addEventListener("click", function (e) {
    var btn = e.target.closest(".filter-tab");
    if (!btn) return;
    document.querySelectorAll(".filter-tab").forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");
    currentFilter = btn.getAttribute("data-filter");
    renderList();
  });

  document.getElementById("searchInput").addEventListener("input", function (e) {
    currentSearch = e.target.value.toLowerCase();
    renderList();
  });

  window.addEventListener("hashchange", route);
  route();
});

function route() {
  var match = location.hash.match(/week=(\d+)/);
  if (match) {
    showDetail(parseInt(match[1], 10));
  } else {
    showList();
  }
}

function showList() {
  document.getElementById("detailView").style.display = "none";
  document.getElementById("listView").style.display = "";
  renderList();
}

function showDetail(id) {
  var week = WEEKS.find(function (w) { return w.id === id; });
  if (!week) { showList(); return; }
  document.getElementById("listView").style.display = "none";
  document.getElementById("detailView").style.display = "";
  renderDetail(week);
  window.scrollTo({ top: 0 });
}

function renderList() {
  var filtered = WEEKS.filter(function (w) {
    var status = w.isExam ? "exam" : deriveStatus(w.date);
    var matchStatus = currentFilter === "all" || status === currentFilter || (w.isExam && deriveStatus(w.date) === currentFilter);
    var matchSearch = !currentSearch || w.title.toLowerCase().indexOf(currentSearch) !== -1;
    return matchStatus && matchSearch;
  });

  var mount = document.getElementById("weekListMount");
  if (!filtered.length) {
    mount.innerHTML = '<p class="empty-note">No weeks match your filter.</p>';
    return;
  }

  mount.innerHTML = filtered.map(renderWeekCard).join("");
  renderInlineIcons();

  mount.querySelectorAll("[data-expand]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = parseInt(btn.getAttribute("data-expand"), 10);
      expandedWeekId = expandedWeekId === id ? null : id;
      renderList();
    });
  });
  mount.querySelectorAll("[data-detail]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      location.hash = "week=" + btn.getAttribute("data-detail");
    });
  });
}

function renderWeekCard(week) {
  var status = deriveStatus(week.date);
  var stripClass = week.isExam ? "exam" : status;
  var expanded = expandedWeekId === week.id;
  var badges = statusBadgeHTML(status);
  if (week.assignment && !week.isExam) badges += '<span class="badge badge-assignment">Has Assignment</span>';
  if (week.isExam) badges += '<span class="badge badge-exam">Examination</span>';

  var preview = "";
  if (expanded) {
    var codalChips = week.codal.map(function (c) { return '<span class="chip">' + escapeHTML(c) + "</span>"; }).join("");
    preview = `
      <div class="week-preview">
        <p>${escapeHTML(week.topic)}</p>
        ${codalChips ? '<div class="chip-row">' + codalChips + "</div>" : ""}
        <button class="btn-link" data-detail="${week.id}">Full week detail ${icon("chevron-right")}</button>
      </div>`;
  }

  return `
    <div class="week-card">
      <div class="week-card-row">
        <div class="week-strip ${stripClass}"></div>
        <button class="week-main" data-expand="${week.id}">
          <div style="flex:1; min-width:0;">
            <div class="week-badges">${badges}</div>
            <p class="week-title">${escapeHTML(week.title)}</p>
            <p class="week-date">${formatDateLong(week.date)}</p>
          </div>
          <span class="week-chevron">${icon(expanded ? "chevron-down" : "chevron-right")}</span>
        </button>
        <div class="week-stub">
          <span class="week-stub-label">WK</span>
          <span class="week-stub-num">${week.isExam ? "✦" : week.id}</span>
        </div>
      </div>
      ${preview}
    </div>`;
}

function renderDetail(week) {
  var status = deriveStatus(week.date);
  var body;

  if (week.isExam) {
    body = `
      <div class="exam-notice">
        ${icon("alert-circle")}
        <div><p>Examination Session</p><p>${escapeHTML(week.topic)}</p></div>
      </div>`;
  } else {
    var codalHTML = week.codal.length
      ? '<ul class="stack">' + week.codal.map(function (c) { return '<li style="display:flex;gap:0.5rem;font-size:0.875rem;">' + icon("scale") + escapeHTML(c) + "</li>"; }).join("") + "</ul>"
      : '<p class="italic-muted">No separate codal assignment this week.</p>';

    var casesHTML = week.cases.length
      ? week.cases.map(function (c) {
          return `
          <div class="case-row">
            <div style="flex:1;min-width:0;">
              <p class="case-name">${escapeHTML(c.name)}</p>
              <p class="case-gr">${escapeHTML(c.gr)}</p>
              <p class="case-topic">${escapeHTML(c.topic)}</p>
            </div>
            <a href="#" target="_blank" rel="noopener noreferrer" class="btn-link" style="white-space:nowrap;">Full text ${icon("external-link", "icon-sm")}</a>
          </div>`;
        }).join("")
      : "";

    var assignmentHTML = "";
    if (week.assignment) {
      assignmentHTML = `
        <div class="assignment-box">
          <div class="assignment-box-head">${icon("alert-circle")}<p>Assignment</p></div>
          <div class="assignment-box-body">
            <p class="a-title">${escapeHTML(week.assignment.title)}</p>
            <p class="a-due">Due: ${formatDateLong(week.assignment.due)}</p>
            ${week.assignment.instructions ? '<p class="a-instructions">' + escapeHTML(week.assignment.instructions) + "</p>" : ""}
          </div>
        </div>`;
    }

    body = `
      <div class="detail-block card card-pad">
        <h3>Topic Overview</h3>
        <p style="font-size:1rem;line-height:1.6;">${escapeHTML(week.topic)}</p>
      </div>
      <div class="detail-grid" style="margin-bottom:1.25rem;">
        <div class="card card-pad"><h3>Codal / Statutory Readings</h3>${codalHTML}</div>
        <div class="card card-pad"><h3>Textbook</h3>
          <div style="display:flex;gap:0.5rem;font-size:0.875rem;">${icon("book-open")}<span>${escapeHTML(week.textbook)}</span></div>
        </div>
      </div>
      ${casesHTML ? '<div class="card card-pad" style="margin-bottom:1.25rem;"><h3>Assigned Cases</h3>' + casesHTML + "</div>" : ""}
      ${assignmentHTML}`;
  }

  document.getElementById("weekDetailMount").innerHTML = `
    <button class="detail-back" onclick="location.hash=''">${icon("arrow-left")} Back to Modules</button>
    <div class="detail-head">
      <div>
        <p class="section-label" style="margin:0;">Week ${week.id}</p>
        <h2>${escapeHTML(week.title)}</h2>
        <p style="font-size:0.875rem;color:var(--muted-foreground);">${formatDateLong(week.date)}</p>
      </div>
      ${statusBadgeHTML(status)}
    </div>
    ${body}
    <div class="per-syllabus">
      <p>This page is derived from the official course syllabus. In case of discrepancy, the professor's syllabus controls.</p>
      <a class="btn-link" href="course-info.html#syllabus">View official syllabus ${icon("chevron-right", "icon-sm")}</a>
    </div>`;
}
