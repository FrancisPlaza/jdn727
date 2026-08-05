document.addEventListener("DOMContentLoaded", function () {
  var routeIcons = ["jeepney", "plane", "ship", "train"];
  document.getElementById("resourcesMount").innerHTML = RESOURCE_GROUPS.map(function (group, gi) {
    var divider = gi > 0 ? `<div class="route-divider"><div class="line"></div><span>${icon(routeIcons[gi % routeIcons.length])}</span><div class="line"></div></div>` : "";
    var items = group.items.map(function (item) {
      return `
      <div class="resource-item">
        <div class="resource-item-top">
          <div style="flex:1;min-width:0;">
            <div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.25rem;">
              <h4>${escapeHTML(item.title)}</h4>
              <span class="tag" style="background:var(--secondary);color:var(--primary);">${escapeHTML(item.tag)}</span>
            </div>
            <p class="desc">${escapeHTML(item.desc)}</p>
            <p class="scope">${escapeHTML(item.scope)}</p>
          </div>
          <span class="btn-link" style="white-space:nowrap;">Links coming soon</span>
        </div>
      </div>`;
    }).join("");

    return `
    <div>
      ${divider}
      <div class="resource-group-head">${icon(group.icon)}<h3>${escapeHTML(group.category)}</h3></div>
      <div>${items}</div>
    </div>`;
  }).join("");
});
