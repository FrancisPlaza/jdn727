document.addEventListener("DOMContentLoaded", function () {
  renderPinnedSection();
  renderArchive("");
  document.getElementById("archiveSearch").addEventListener("input", function (e) {
    renderArchive(e.target.value.toLowerCase());
  });
});

function renderPinnedSection() {
  var pinned = ANNOUNCEMENTS.filter(function (a) { return a.pinned; });
  if (!pinned.length) return;
  var html = `<p class="section-label" style="display:flex;align-items:center;gap:0.4rem;margin-bottom:1rem;">${icon("pin")} Pinned</p><div class="stack">`;
  html += pinned.map(function (a) {
    return `
    <div class="notice-card pinned">
      <div class="notice-top">
        <span style="display:flex;align-items:center;gap:0.4rem;">${icon("pin")}<span class="tag tag-${a.tag.toLowerCase()}">${escapeHTML(a.tag)}</span></span>
        <span class="notice-date">${formatDateLong(a.date)}</span>
      </div>
      <p class="notice-title">${escapeHTML(a.title)}</p>
      <p class="notice-body">${escapeHTML(a.body)}</p>
    </div>`;
  }).join("");
  html += "</div>";
  document.getElementById("pinnedSection").innerHTML = html;
}

function renderArchive(search) {
  var archive = ANNOUNCEMENTS.filter(function (a) { return !a.pinned; });
  var filtered = archive.filter(function (a) {
    return !search || a.title.toLowerCase().indexOf(search) !== -1 || a.body.toLowerCase().indexOf(search) !== -1;
  });
  var mount = document.getElementById("archiveMount");
  if (!filtered.length) {
    mount.innerHTML = search
      ? '<p class="empty-note">No announcements match your search.</p>'
      : '<p class="empty-note">No archived announcements yet.</p>';
    return;
  }
  mount.innerHTML = filtered.map(function (a) {
    return `
    <div class="notice-card">
      <div class="notice-top">
        <span class="tag tag-${a.tag.toLowerCase()}">${escapeHTML(a.tag)}</span>
        <span class="notice-date">${formatDateLong(a.date)}</span>
      </div>
      <p class="notice-title">${escapeHTML(a.title)}</p>
      <p class="notice-body">${escapeHTML(a.body)}</p>
    </div>`;
  }).join("");
}
