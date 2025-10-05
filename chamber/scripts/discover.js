// --------------------------
// Display current year & last modified date
// --------------------------
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// --------------------------
// LocalStorage last visit message
// --------------------------
const visitMessage = document.getElementById("visit-message");
const lastVisitKey = "chamber_last_visit_v1";

let lastVisit = localStorage.getItem(lastVisitKey);

if (!lastVisit) {
  // First visit
  visitMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
  let previousDate = new Date(parseInt(lastVisit));
  let now = new Date();
  let diffTime = now - previousDate;
  let diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 1) {
    visitMessage.textContent = "Back so soon! Awesome!";
  } else {
    let dayText = diffDays === 1 ? "day" : "days";
    visitMessage.textContent = `You last visited ${diffDays} ${dayText} ago.`;
  }
}

// Save current visit time
localStorage.setItem(lastVisitKey, Date.now());

// --------------------------
// Load JSON and create cards
// --------------------------
async function loadDiscoverCards() {
  try {
    const response = await fetch("data/discover.json");
    if (!response.ok) throw new Error("Failed to load JSON data");
    const members = await response.json();

    const cardsContainer = document.getElementById("cards");

    members.forEach(member => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <figure>
          <img src="${member.image}" alt="${member.title}" loading="lazy">
          
        </figure>
        <h3>${member.title}</h3>
        <address>${member.address}</address>
        <p>${member.description}</p>
        
      `;

      cardsContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading cards:", error);
    document.getElementById("cards").textContent = "Failed to load discover items.";
  }
}

// Call the function
loadDiscoverCards();
