/* Shared rendering helpers used across every page. */

function renderFooterExternal() {
  var el = document.getElementById("footerExternal");
  if (!el) return;
  var links = [
    { label: "Attendance & Recitation Tracker", href: ATTENDANCE_TRACKER_URL },
    { label: "Class Discord", href: CLASS_DISCORD_URL },
    { label: "SC E-Library", href: "https://sc.judiciary.gov.ph" },
    { label: "Official Gazette", href: "https://www.officialgazette.gov.ph" },
  ];
  el.innerHTML = links
    .map(function (l) {
      return '<a href="' + l.href + '" target="_blank" rel="noopener noreferrer">' + l.label + " " + icon("external-link") + "</a>";
    })
    .join("");
}

// Fills every [data-icon="name"] element with its SVG — covers route dividers,
// inline chevrons, and any other icon placeholder embedded directly in markup.
function renderInlineIcons() {
  document.querySelectorAll("[data-icon]").forEach(function (el) {
    el.innerHTML = icon(el.getAttribute("data-icon"));
  });
}

function statusBadgeHTML(status) {
  if (status === "completed") return '<span class="badge badge-completed">' + icon("check-circle") + "Completed</span>";
  if (status === "current") return '<span class="badge badge-current">' + icon("clock") + "This Week</span>";
  return '<span class="badge badge-upcoming">' + icon("circle") + "Upcoming</span>";
}

function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

document.addEventListener("DOMContentLoaded", function () {
  renderFooterExternal();
  renderInlineIcons();
});
