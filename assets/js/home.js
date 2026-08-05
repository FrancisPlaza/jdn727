document.addEventListener("DOMContentLoaded", function () {
  renderHeroLinks();
  renderThisWeek();
  renderPinned();
  renderDeadlines();
});

function renderHeroLinks() {
  var el = document.getElementById("heroLinks");
  var links = [
    { label: "Join Zoom Class", iconName: "link2", href: "#" },
    { label: "Class Google Drive", iconName: "file-text", href: "#" },
    { label: "View Syllabus", iconName: "book-open", href: "course-info.html#syllabus" },
    { label: "Class Calendar", iconName: "calendar", href: "calendar.html" },
  ];
  el.innerHTML = links
    .map(function (l) {
      var external = l.href === "#";
      return (
        '<a class="btn" href="' + l.href + '"' + (external ? ' target="_blank" rel="noopener noreferrer"' : "") + ">" +
        icon(l.iconName) + l.label + (external ? icon("external-link", "icon-sm") : "") +
        "</a>"
      );
    })
    .join("");
}

function findCurrentWeek() {
  var current = WEEKS.find(function (w) { return deriveStatus(w.date) === "current"; });
  if (current) return current;
  var upcoming = WEEKS.filter(function (w) { return deriveStatus(w.date) === "upcoming"; });
  if (upcoming.length) return upcoming[0];
  return WEEKS[WEEKS.length - 1];
}

function renderThisWeek() {
  var week = findCurrentWeek();
  var status = deriveStatus(week.date);
  var codalList = week.codal.map(function (c) {
    return '<li>' + icon("scale") + escapeHTML(c) + "</li>";
  }).join("");
  var casesList = week.cases.map(function (c) {
    return '<li><span class="case-name-inline">' + escapeHTML(c.name) + '</span><br><span style="font-size:0.75rem;color:var(--lavender);">' + escapeHTML(c.gr) + "</span></li>";
  }).join("") || '<li class="italic-muted">No cases assigned this week.</li>';

  var assignmentHTML = "";
  if (week.assignment) {
    assignmentHTML =
      '<div class="this-week-assignment">' + icon("alert-circle") +
      '<div><span style="font-weight:600;">Assignment due ' + formatDateLong(week.assignment.due) + ":</span> " + escapeHTML(week.assignment.title) + "</div></div>";
  }

  document.getElementById("thisWeekMount").innerHTML = `
    <div class="this-week">
      <div class="this-week-head">
        <div>
          <span class="section-label" style="margin:0;">Week ${week.id}</span>
          <h3>${escapeHTML(week.title)}</h3>
          <p style="font-size:0.875rem;color:var(--muted-foreground);margin-top:0.25rem;">${formatDateLong(week.date)}</p>
        </div>
        ${statusBadgeHTML(status)}
      </div>
      <div class="this-week-body">
        <div>
          <p class="this-week-col-label">Topic</p>
          <p style="font-size:0.875rem;line-height:1.6;">${escapeHTML(week.topic)}</p>
        </div>
        <div>
          <p class="this-week-col-label">Read</p>
          <ul class="stack" style="font-size:0.875rem;">${codalList}<li style="font-size:0.75rem;color:var(--muted-foreground);">${escapeHTML(week.textbook)}</li></ul>
        </div>
        <div>
          <p class="this-week-col-label">Cases</p>
          <ul class="stack" style="font-size:0.875rem;">${casesList}</ul>
        </div>
      </div>
      ${assignmentHTML}
      <div class="this-week-footer">
        <a class="btn-link" href="modules.html#week=${week.id}">View full week detail ${icon("chevron-right")}</a>
      </div>
    </div>`;
  renderInlineIcons();
}

function renderPinned() {
  var pinned = ANNOUNCEMENTS.filter(function (a) { return a.pinned; }).slice(0, 2);
  document.getElementById("pinnedMount").innerHTML = pinned
    .map(function (a) {
      return `
      <div class="notice-card">
        <div class="notice-top">
          <span style="display:flex;align-items:center;gap:0.4rem;">${icon("pin")}<span class="tag tag-${a.tag.toLowerCase()}">${escapeHTML(a.tag)}</span></span>
          <span class="notice-date">${formatDateLong(a.date)}</span>
        </div>
        <p class="notice-title">${escapeHTML(a.title)}</p>
        <p class="notice-body clamp-3">${escapeHTML(a.body)}</p>
      </div>`;
    })
    .join("");
  renderInlineIcons();
}

function renderDeadlines() {
  var todayISO = new Date().toISOString().slice(0, 10);
  var items = [];
  WEEKS.forEach(function (w) {
    if (w.assignment && w.assignment.due >= todayISO) {
      items.push({ date: w.assignment.due, title: w.assignment.title, isExam: !!w.isExam });
    }
  });
  items.sort(function (a, b) { return a.date < b.date ? -1 : 1; });
  items = items.slice(0, 4);

  var mount = document.getElementById("deadlinesMount");
  if (!items.length) {
    mount.innerHTML = '<p class="empty-note">No upcoming deadlines on the books right now.</p>';
    return;
  }
  mount.innerHTML = items
    .map(function (e) {
      return `
      <div class="deadline-row">
        <span class="deadline-dot${e.isExam ? " exam" : ""}"></span>
        <span class="deadline-title">${escapeHTML(e.title)}</span>
        <span class="deadline-date">${formatDateShort(e.date)}</span>
      </div>`;
    })
    .join("");
}
