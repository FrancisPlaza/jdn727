var MONTHS = [
  { year: 2026, month: 6, label: "July 2026" },
  { year: 2026, month: 7, label: "August 2026" },
  { year: 2026, month: 8, label: "September 2026" },
  { year: 2026, month: 9, label: "October 2026" },
  { year: 2026, month: 10, label: "November 2026" },
  { year: 2026, month: 11, label: "December 2026" },
];

var EVENT_STYLE = {
  class: { color: "var(--lavender)", label: "Class Session" },
  exam: { color: "var(--exam-dot)", label: "Examination" },
  due: { color: "#C87D8F", label: "Assignment Due" },
  academic: { color: "var(--muted-foreground)", label: "Academic Calendar" },
};

var activeMonth = 1;
var activeView = "grid";
var selectedDate = null;
var ALL_EVENTS = [];

document.addEventListener("DOMContentLoaded", function () {
  buildEvents();
  var today = new Date();
  var todayIdx = MONTHS.findIndex(function (m) { return m.year === today.getFullYear() && m.month === today.getMonth(); });
  if (todayIdx !== -1) activeMonth = todayIdx;

  renderLegend();
  document.getElementById("prevMonth").addEventListener("click", function () { if (activeMonth > 0) { activeMonth--; selectedDate = null; renderAll(); } });
  document.getElementById("nextMonth").addEventListener("click", function () { if (activeMonth < MONTHS.length - 1) { activeMonth++; selectedDate = null; renderAll(); } });
  document.getElementById("viewToggle").addEventListener("click", function (e) {
    var btn = e.target.closest("button");
    if (!btn) return;
    activeView = btn.getAttribute("data-view");
    document.querySelectorAll("#viewToggle button").forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");
    renderAll();
  });

  renderAll();
});

function buildEvents() {
  var events = [];
  if (WEEKS.length) {
    WEEKS.forEach(function (w) {
      events.push({ date: w.date, title: (w.isExam ? "" : "Week " + w.id + " — ") + w.title, type: w.isExam ? "exam" : "class", bucket: w.isExam ? "exam" : "class" });
      if (w.assignment && !w.isExam) {
        events.push({ date: w.assignment.due, title: w.assignment.title + " (due)", type: "due", bucket: "due" });
      }
    });
  } else {
    CLASS_SESSIONS.forEach(function (date) {
      events.push({ date: date, title: "JDN727 class session — course details coming soon", type: "class", bucket: "class" });
    });
  }
  ACADEMIC_EVENTS.forEach(function (e) {
    events.push({ date: e.date, endDate: e.endDate, title: e.title, type: e.type, bucket: "academic" });
  });
  ALL_EVENTS = events;
}

function renderLegend() {
  var activeBuckets = ALL_EVENTS.reduce(function (buckets, event) {
    buckets[event.bucket] = true;
    return buckets;
  }, {});
  document.getElementById("legendMount").innerHTML = Object.keys(EVENT_STYLE).filter(function (key) {
    return activeBuckets[key];
  }).map(function (key) {
    var s = EVENT_STYLE[key];
    return `<span class="legend-item"><span class="legend-dot" style="background:${s.color};"></span>${s.label}</span>`;
  }).join("");
}

function eventsOnDate(dateStr) {
  return ALL_EVENTS.filter(function (e) {
    if (e.endDate) return dateStr >= e.date && dateStr <= e.endDate;
    return e.date === dateStr;
  });
}

function updateNavButtons() {
  document.getElementById("prevMonth").innerHTML = icon("chevron-left");
  document.getElementById("nextMonth").innerHTML = icon("chevron-right");
  document.getElementById("prevMonth").disabled = activeMonth === 0;
  document.getElementById("nextMonth").disabled = activeMonth === MONTHS.length - 1;
  document.getElementById("viewToggle").querySelector('[data-view="grid"]').innerHTML = icon("layout-grid") + " Grid";
  document.getElementById("viewToggle").querySelector('[data-view="list"]').innerHTML = icon("list") + " List";
}

function renderAll() {
  var m = MONTHS[activeMonth];
  document.getElementById("monthLabel").textContent = m.label;
  updateNavButtons();

  document.getElementById("gridWrap").style.display = activeView === "grid" ? "" : "none";
  document.getElementById("listWrap").style.display = activeView === "list" ? "" : "none";

  if (activeView === "grid") renderGrid(m); else renderAgenda(m);
  renderDayPanel();
}

function pad(n) { return String(n).padStart(2, "0"); }

function renderGrid(m) {
  var firstDow = new Date(m.year, m.month, 1).getDay();
  var daysInMonth = new Date(m.year, m.month + 1, 0).getDate();
  var dows = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  var html = dows.map(function (d) { return '<div class="cal-dow">' + d + "</div>"; }).join("");
  for (var i = 0; i < firstDow; i++) html += '<div class="cal-cell empty"></div>';

  for (var day = 1; day <= daysInMonth; day++) {
    var dateStr = m.year + "-" + pad(m.month + 1) + "-" + pad(day);
    var dow = new Date(m.year, m.month, day).getDay();
    var evts = eventsOnDate(dateStr);
    var dots = evts.slice(0, 4).map(function (e) {
      return '<span class="cal-dot" style="background:' + EVENT_STYLE[e.bucket].color + ';"></span>';
    }).join("");
    var classes = "cal-cell" + (dow === 3 ? " wednesday" : "") + (selectedDate === dateStr ? " selected" : "");
    html += `<div class="${classes}" data-date="${dateStr}"><span class="daynum">${day}</span><div class="cal-dots">${dots}</div></div>`;
  }

  var el = document.getElementById("gridWrap");
  el.innerHTML = `<div class="cal-grid">${html}</div>`;
  el.querySelectorAll(".cal-cell[data-date]").forEach(function (cell) {
    cell.addEventListener("click", function () {
      selectedDate = selectedDate === cell.getAttribute("data-date") ? null : cell.getAttribute("data-date");
      renderAll();
    });
  });
}

function renderAgenda(m) {
  var monthKey = m.year + "-" + pad(m.month + 1);
  var monthEvents = ALL_EVENTS.filter(function (e) { return e.date.indexOf(monthKey) === 0; });
  monthEvents.sort(function (a, b) { return a.date < b.date ? -1 : 1; });

  var el = document.getElementById("listWrap");
  if (!monthEvents.length) {
    el.innerHTML = '<p class="empty-note">No events this month.</p>';
    return;
  }

  var grouped = {};
  monthEvents.forEach(function (e) {
    if (!grouped[e.date]) grouped[e.date] = [];
    grouped[e.date].push(e);
  });

  el.innerHTML = Object.keys(grouped).map(function (date) {
    var rows = grouped[date].map(function (e) {
      var extra = e.endDate ? " (through " + formatDateLong(e.endDate) + ")" : "";
      return `<div class="agenda-event"><span class="legend-dot" style="background:${EVENT_STYLE[e.bucket].color};"></span><span style="flex:1;font-size:0.875rem;">${escapeHTML(e.title)}${extra}</span></div>`;
    }).join("");
    return `<p class="agenda-date">${formatDateLong(date)}</p>${rows}`;
  }).join("");
}

function renderDayPanel() {
  var el = document.getElementById("dayPanel");
  if (!selectedDate || activeView !== "grid") { el.innerHTML = ""; return; }
  var evts = eventsOnDate(selectedDate);
  if (!evts.length) { el.innerHTML = ""; return; }
  el.innerHTML = `
    <div class="day-panel">
      <h4>${formatDateLong(selectedDate)}</h4>
      ${evts.map(function (e) {
        return `<div class="day-event-row"><span class="legend-dot" style="background:${EVENT_STYLE[e.bucket].color};"></span>${escapeHTML(e.title)}</div>`;
      }).join("")}
    </div>`;
}
