// ----------------------------
// Footer Dynamic Year & Last Modified
// ----------------------------
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// ----------------------------
// Hamburger Menu Toggle
// ----------------------------
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("nav-menu");

menuBtn.addEventListener("click", () => {
  const expanded = menuBtn.getAttribute("aria-expanded") === "true" || false;
  menuBtn.setAttribute("aria-expanded", !expanded);
  navMenu.classList.toggle("open");
});
