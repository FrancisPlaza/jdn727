document.addEventListener("DOMContentLoaded", function () {
  var btn = document.getElementById("navToggle");
  var menu = document.getElementById("navMobile");
  if (!btn || !menu) return;
  btn.innerHTML = icon("menu");
  btn.addEventListener("click", function () {
    var open = menu.classList.toggle("open");
    btn.innerHTML = icon(open ? "x" : "menu");
  });
});
