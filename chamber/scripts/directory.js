// scripts/directory.js

// -----// ----- Load members from JSON -----
async function loadMembers(view = "grid") {
  const container = document.getElementById("members");
  if (!container) return;

  try {
    const res = await fetch("data/members.json");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    // support both array [] or { members: [] }
    const members = Array.isArray(data) ? data : data.members || [];
    displayMembers(members, view);
  } catch (err) {
    console.error("Error loading members:", err);
    container.innerHTML = `<p style="color:#900">Failed to load directory. Check console for details.</p>`;
  }
}

function displayMembers(members, view) {
  const container = document.getElementById("members");
  container.innerHTML = "";
  container.classList.remove("grid-view", "list-view");
  container.classList.add(view === "grid" ? "grid-view" : "list-view");

  if (!members.length) {
    container.innerHTML = `<p>No members found.</p>`;
    return;
  }

  members.forEach(m => {
    const el = document.createElement("article");
    el.className = view === "grid" ? "card" : "list-item";

    const name = m.name || "No Name";
    const address = m.address || "";
    const phone = m.phone || "";
    const website = m.website ? `<a href="${m.website}" target="_blank" rel="noopener">${m.website}</a>` : "";
    const membership = m.membership || "";
    const info = m.info || "";
    const imgSrc = m.image ? `images/${m.image}` : `images/placeholder.png`;

    el.innerHTML = `
      <img src="${imgSrc}" alt="${name} logo" onerror="this.onerror=null;this.src='images/placeholder.png'">
      <div class="member-body">
        <h3>${name}</h3>
        ${address ? `<p><strong>Address:</strong> ${address}</p>` : ""}
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
        ${website ? `<p><strong>Website:</strong> ${website}</p>` : ""}
        ${membership ? `<p><strong>Membership:</strong> ${membership}</p>` : ""}
        ${info ? `<p>${info}</p>` : ""}
      </div>
    `;

    container.appendChild(el);
  });
}

// ----- Toggle view buttons -----
document.getElementById("gridBtn")?.addEventListener("click", () => loadMembers("grid"));
document.getElementById("listBtn")?.addEventListener("click", () => loadMembers("list"));

// ----- Hamburger menu -----
(function setupNavToggle() {
  const menuBtn = document.getElementById("menu");
  const navUl = document.querySelector("#nav-menu ul");
  if (!menuBtn || !navUl) return;

  menuBtn.addEventListener("click", () => {
    const isOpen = navUl.classList.toggle("show");
    menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  navUl.addEventListener("click", e => {
    if (e.target.tagName === "A") {
      navUl.classList.remove("show");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });
})();

// Load default view
document.addEventListener("DOMContentLoaded", () => loadMembers("grid"));
