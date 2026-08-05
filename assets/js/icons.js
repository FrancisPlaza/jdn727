/* Minimal line-icon set (24x24, stroke-based) — hand-authored, not a copy of any
   proprietary icon library. Used via icon('name','extra-class') -> SVG markup string. */
const ICON_PATHS = {
  menu: '<line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/>',
  x: '<line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/>',
  "external-link": '<path d="M14 4h6v6"/><path d="M20 4L10 14"/><path d="M18 13v5a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h5"/>',
  pin: '<path d="M12 2a6 6 0 00-6 6c0 4.5 6 12 6 12s6-7.5 6-12a6 6 0 00-6-6z"/><circle cx="12" cy="8" r="2"/>',
  plane: '<path d="M12 2l3 7h6l-5 4 2 7-6-4.5L6 20l2-7-5-4h6z" style="display:none"/><path d="M2 14l8-2 4-9 2 1-3 8 7 1v2l-7 1-2 6-2-1 1-6-8-1z"/>',
  ship: '<path d="M3 18l1.5-6h15L21 18"/><path d="M6 12V6h4v6"/><path d="M2 21c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0 3-1 4.5 0"/>',
  train: '<rect x="5" y="3" width="14" height="13" rx="2"/><line x1="5" y1="10" x2="19" y2="10"/><circle cx="8.5" cy="14.5" r="0" /><circle cx="8" cy="14" r="1"/><circle cx="16" cy="14" r="1"/><line x1="7" y1="21" x2="6" y2="16"/><line x1="17" y1="21" x2="18" y2="16"/>',
  jeepney: '<rect x="1" y="8" width="22" height="10" rx="2"/><line x1="1" y1="13" x2="23" y2="13"/><path d="M7 8V6a2 2 0 012-2h6a2 2 0 012 2v2"/><circle cx="6" cy="20" r="2"/><circle cx="18" cy="20" r="2"/><line x1="8" y1="20" x2="4" y2="20"/><line x1="16" y1="20" x2="20" y2="20"/><line x1="9" y1="10.5" x2="11" y2="10.5"/><line x1="13" y1="10.5" x2="15" y2="10.5"/>',
  "arrow-left": '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',
  "check-circle": '<circle cx="12" cy="12" r="9"/><polyline points="8 12.5 11 15.5 16 9"/>',
  clock: '<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15.5 14"/>',
  circle: '<circle cx="12" cy="12" r="9"/>',
  "book-open": '<path d="M12 6c-2-1.5-5-2-8-1.5v13c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5v-13c-3-.5-6 0-8 1.5z"/><line x1="12" y1="6" x2="12" y2="19"/>',
  "file-text": '<path d="M6 2h9l5 5v15H6z"/><polyline points="15 2 15 7 20 7"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="16.5" x2="15" y2="16.5"/>',
  scale: '<line x1="12" y1="3" x2="12" y2="21"/><path d="M12 5l-6 1"/><path d="M12 5l6 1"/><path d="M3 6l3 6-3 0-3-6 3 0z" style="display:none"/><path d="M2.5 12a3.5 3.5 0 007 0l-3.5-6-3.5 6z"/><path d="M14.5 12a3.5 3.5 0 007 0l-3.5-6-3.5 6z"/><line x1="7" y1="21" x2="17" y2="21"/>',
  "chevron-right": '<polyline points="9 6 15 12 9 18"/>',
  "chevron-down": '<polyline points="6 9 12 15 18 9"/>',
  "chevron-left": '<polyline points="15 6 9 12 15 18"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/>',
  link2: '<path d="M9 15l6-6"/><path d="M13 5l1.5-1.5a4 4 0 015.5 5.5L18 10.5"/><path d="M11 19l-1.5 1.5a4 4 0 01-5.5-5.5L6 13.5"/>',
  gavel: '<path d="M13 10l6 6"/><path d="M8 15l-5 5"/><path d="M14.5 6.5l4 4"/><path d="M9 11.5l4-4 4 4-4 4z"/><line x1="4" y1="20" x2="12" y2="20"/>',
  "alert-circle": '<circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="13"/><circle cx="12" cy="16.5" r="0.6" fill="currentColor" stroke="none"/>',
  "book-marked": '<path d="M6 3h12v18l-6-4-6 4z" style="display:none"/><path d="M18 3H8a2 2 0 00-2 2v15l5-3 5 3V5a2 2 0 00-2-2z"/><path d="M12 8v5"/><path d="M9.5 10.5h5"/>',
  search: '<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/>',
  "layout-grid": '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  list: '<line x1="9" y1="6" x2="21" y2="6"/><line x1="9" y1="12" x2="21" y2="12"/><line x1="9" y1="18" x2="21" y2="18"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/>',
};

function icon(name, cls) {
  const inner = ICON_PATHS[name] || "";
  return `<svg class="icon${cls ? " " + cls : ""}" viewBox="0 0 24 24">${inner}</svg>`;
}
