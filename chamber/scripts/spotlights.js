
// ----------------------------
// Business Spotlights from JSON
// ----------------------------
async function loadSpotlights() {
  try {
    const response = await fetch("data/members.json");
    const members = await response.json();

    // Filter only Gold or Silver members
    const filtered = members.filter(m => m.membership === "Gold" || m.membership === "Silver");

    // Randomly select 2–3 members
    const spotlights = filtered.sort(() => 0.5 - Math.random()).slice(0, 3);

    const container = document.getElementById("spotlight-container");
    spotlights.forEach(member => {
      const card = document.createElement("div");
      card.classList.add("spotlight");
      card.innerHTML = `
        
        <h3>${member.name}</h3>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
        <p><strong>Membership:</strong> ${member.membership}</p>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error("Spotlight fetch error:", err);
    document.getElementById("spotlight-container").textContent = "Unable to load spotlights.";
  }
}

loadSpotlights();
