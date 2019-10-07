
var menuBtn = document.getElementById("menu-btn");
var menu = document.getElementsByTagName("nav")[0];
var shown;
menuBtn.addEventListener("click", () => {
  if (shown == 1) {
    //Hide menu
    shown = 0;
    menu.removeAttribute("aria-expanded");
    menu.classList.remove("shown");
  } else {
    shown = 1;
    menu.setAttribute("aria-expanded", "true");
    menu.classList.add("shown");
  }
});
menu.addEventListener("click", () => {
  shown = 0;
  menu.removeAttribute("aria-expanded");
  menu.classList.remove("shown");
});